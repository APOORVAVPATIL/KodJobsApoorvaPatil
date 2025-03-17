"use server"
import fs from 'fs/promises'
import path from 'path'
import type { User } from './types'

const filePath = path.join(process.cwd(), 'data/users.json')

// Create data directory and users.json if they don't exist
const initializeUserFile = async () => {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify({ users: [] }), { flag: 'wx' })
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      console.error('Error initializing user file:', error)
    }
  }
}

initializeUserFile()

// Fix: Allow number as a valid type
const calculateAge = (dob: string | Date | number): number => {
  let birthDate: Date

  if (typeof dob === 'number') {
    birthDate = new Date(dob) // Convert timestamp to Date
  } else if (typeof dob === 'string' || dob instanceof Date) {
    birthDate = new Date(dob)
  } else {
    throw new Error('Invalid date format')
  }

  if (isNaN(birthDate.getTime())) {
    throw new Error('Invalid date value')
  }
  
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export async function saveUser(userData: Omit<User, 'id' | 'age'>) {
  try {
    await initializeUserFile()
    const data = await fs.readFile(filePath, 'utf8')
    const { users } = JSON.parse(data)
    
    // Fix: Ensure dob is passed as string | Date | number
    const age = calculateAge(userData.dob as string | Date | number)

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      age
    }
    
    users.push(newUser)
    await fs.writeFile(filePath, JSON.stringify({ users }, null, 2))
    return { success: true }
  } catch (error) {
    console.error('Error saving user:', error)
    return { success: false, error: 'Failed to save user' }
  }
}

export async function verifyUser(email: string, password: string) {
  try {
    await initializeUserFile()
    const data = await fs.readFile(filePath, 'utf8')
    const { users } = JSON.parse(data)
    
    const user = users.find((u: User) => 
      u.email === email && u.password === password
    )
    
    if (user) {
      const currentAge = calculateAge(user.dob as string | Date | number)
      if (currentAge !== user.age) {
        user.age = currentAge
        await fs.writeFile(filePath, JSON.stringify({ users }, null, 2))
      }
      
      const { password, ...userWithoutPassword } = user
      return { success: true, user: userWithoutPassword }
    }
    
    return { success: false, error: 'Invalid credentials' }
  } catch (error) {
    console.error('Error verifying user:', error)
    return { success: false, error: 'Failed to verify user' }
  }
}
