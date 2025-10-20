'use client';

import { useAuth } from "@/app/context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="p-4">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">Welcome, {user.name || user.email}!</h1>
          <p>You are logged in.</p>
          <button 
            onClick={logout} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}