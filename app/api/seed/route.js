import { NextResponse } from 'next/server';
import dbConnect from '@/lib/connectDb';
import User from '@/lib/models/User';

export async function GET() {
  try {
    await dbConnect();

    await User.deleteMany({});

    const users = [
      {
        name: 'Aziz Ahmed',
        email: 'admin@example.com',
        password: 'admin', // In a real app, this should be hashed
        role: 'admin',
        department: 'IT'
      },
      {
        name: 'John Doe',
        email: 'abdul6282@gmail.com',
        password: 'admin',
        role: 'employee',
        department: 'Sales'
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        role: 'employee',
        department: 'Marketing'
      }
    ];

    
    await User.insertMany(users);

    return NextResponse.json({ message: 'Dummy users have been added.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error seeding users' }, { status: 500 });
  }
}
