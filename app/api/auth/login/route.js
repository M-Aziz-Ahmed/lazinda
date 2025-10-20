import { NextResponse } from 'next/server';
import dbConnect from '@/lib/connectDb';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // normalize email before lookup
    const normalizedEmail = String(email).toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    console.log("user",user);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // In a real application, you should hash passwords and compare the hash.
    // For this example, we are doing a plain text comparison.
    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    const serializedCookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    const response = NextResponse.json({ message: 'Login successful' });
    response.headers.set('Set-Cookie', serializedCookie);

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}
