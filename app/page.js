'use client';
import { useRouter } from 'next/navigation';
import Dashboard from '../components/Dashboard';
import { use, useState } from 'react';


export default function Home() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const route = useRouter();
  if (!userAuthenticated) {
     route.push('/login');
  }
  return (
    <>
    </>
  );
}