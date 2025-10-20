import { NextResponse } from 'next/server';
import dbConnect from '@/lib/connectDb';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import crypto from 'crypto';
import { sendOtpEmail } from '@/lib/mail';

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

    // Generate a short numeric OTP and store it on the user with expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.otpCode = otp;
    user.otpExpires = expires;
    await user.save();

    // send OTP by email
    try {
      const previewUrl = await sendOtpEmail(user.email, otp);
      // return previewUrl in dev to help testing
      return NextResponse.json({ message: 'OTP sent', previewUrl });
    } catch (err) {
      console.error('Error sending OTP', err);
      return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}
