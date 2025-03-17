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

const calculateAge = (dob: string | Date): number => {
  const birthDate = new Date(dob)
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
    
    const age = calculateAge(String(userData.dob))
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
      const currentAge = calculateAge(user.dob)
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
