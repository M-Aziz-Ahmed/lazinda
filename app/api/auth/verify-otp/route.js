import { NextResponse } from 'next/server';
import dbConnect from '@/lib/connectDb';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    await dbConnect();
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and otp required' }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    if (!user.otpCode || !user.otpExpires) {
      return NextResponse.json({ error: 'No OTP pending' }, { status: 400 });
    }

    if (user.otpExpires < new Date()) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
    }

    if (user.otpCode !== String(otp).trim()) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
    }

    if (!JWT_SECRET) {
      console.error('JWT_SECRET not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const token = jwt.sign({ userId: user._id, role: user.role, name:user.name }, JWT_SECRET, { expiresIn: '1h' });

    // clear OTP fields
    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    const response = NextResponse.json({ message: 'Authenticated' });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
