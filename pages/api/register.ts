import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@/lib/types'; // Ensure this import is correct
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, email, dob, password }: User = req.body; // Use the User type

    // Implement your registration logic here (e.g., save to database)

    // For demonstration, let's assume registration is successful
    return res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}