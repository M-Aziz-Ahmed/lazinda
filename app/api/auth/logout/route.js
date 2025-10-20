import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function GET() {
  const serializedCookie = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Expire the cookie immediately
    path: '/',
  });

  const response = NextResponse.json({ message: 'Logged out' });
  response.headers.set('Set-Cookie', serializedCookie);
  return response;
}
