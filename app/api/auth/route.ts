// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { User } from '@/lib/types';

const filePath = path.join(process.cwd(), 'data/users.json');

const getUsers = async () => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data).users || [];
  } catch (error) {
    console.error('Error reading users data:', error);
    return []; // Return an empty array if there's an error
  }
};

const saveUsers = async (users: User[]) => {
  await fs.promises.writeFile(filePath, JSON.stringify({ users }, null, 2));
};

const generateUniqueId = () => {
  return Date.now().toString(); // Generate a unique ID based on the current timestamp
};

export async function POST(req) {
  const { fullName, email, dateOfBirth, password } = await req.json();

  // Define the path to the users.json file
  const filePath = path.join(process.cwd(), 'data', 'users.json');

  // Read existing users
  let users = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    users = JSON.parse(fileData).users; // Ensure we access the users array
  }

  // Calculate age
  const dob = new Date(dateOfBirth);
  const age = new Date().getFullYear() - dob.getFullYear();
  
  // Create a new user
  const newUser = {
    id: Date.now().toString(), // Generate a unique ID
    name: fullName,
    email,
    dob: dateOfBirth,
    password, // In a real application, make sure to hash the password
    age: age >= 0 ? age : 25, // Ensure age is not negative
  };

  // Add the new user to the users array
  users.push(newUser);

  // Write the updated users array back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify({ users }, null, 2));

  // Return success response
  return NextResponse.json({ success: true });
}