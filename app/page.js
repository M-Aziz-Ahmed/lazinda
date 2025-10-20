'use client';
import { getCookieClient } from '@/lib/cookieUtils';
export default function Home() {

// inside a client component
const role = getCookieClient('role');

  // ...
  return (
    <>
    {role === 'admin' ? (
      <h1>Welcome, Admin!</h1>
    ) : (
      <h1>Welcome, User!</h1>
    )}

    </>
  );
}