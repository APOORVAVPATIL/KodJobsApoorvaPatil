export interface JobType {
  id: number
  title: string
  company: string
  type: string
  location: string
  experience: string
  postedAt: string
  description: string
}

export interface User {
  id: number
  name: string
  email: string
  dob: number
  age: number
  password: string
} 