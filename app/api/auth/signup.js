// app/api/auth/signup.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

  // Create a new user
  const newUser = {
    id: Date.now().toString(), // Generate a unique ID
    name: fullName,
    email,
    dob: dateOfBirth,
    password, // In a real application, make sure to hash the password
    age: new Date().getFullYear() - new Date(dateOfBirth).getFullYear(), // Calculate age
  };

  // Add the new user to the users array
  users.push(newUser);

  // Write the updated users array back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify({ users }, null, 2));

  // Return success response
  return NextResponse.json({ success: true });
}