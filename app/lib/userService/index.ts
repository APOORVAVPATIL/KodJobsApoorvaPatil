import fs from 'fs'
import path from 'path'
import type { User } from '../types'

const filePath = path.join(process.cwd(), 'app/lib/userService/users.json')

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export const saveUser = async (userData: Omit<User, 'id' | 'age'>) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8')
    const { users } = JSON.parse(data)
    
    const age = calculateAge(userData.dob)
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      age
    }
    
    users.push(newUser)
    await fs.promises.writeFile(filePath, JSON.stringify({ users }, null, 2))
    return { success: true }
  } catch (error) {
    console.error('Error saving user:', error)
    return { success: false, error: 'Failed to save user' }
  }
}

export const verifyUser = async (email: string, password: string) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8')
    const { users } = JSON.parse(data)
    
    const user = users.find((u: User) => 
      u.email === email && u.password === password
    )
    
    if (user) {
      const currentAge = calculateAge(user.dob)
      if (currentAge !== user.age) {
        user.age = currentAge
        await fs.promises.writeFile(filePath, JSON.stringify({ users }, null, 2))
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

console.log('Received data:', { action, name, email, dob, password }); 