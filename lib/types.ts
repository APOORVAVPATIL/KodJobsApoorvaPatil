export interface JobType {
  id: number
  title: string
  company: string
  location: string
  type: string
  experience: string
  salary: string
  description: string
  postedAt: string
  requirements: string[]
}

export interface UserType {
  id: string
  username: string
  email: string
  dob: string
}

export interface User {
  id: string;
  name: string;
  email: string;
  dob: string;
  password: string; // In a real application, this should be hashed
}

