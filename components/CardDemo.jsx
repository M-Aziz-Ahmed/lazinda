"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import OtpInput from "@/components/ui/otp-input";
import { Label } from "@/components/ui/label";

export function CardDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // OTP sent
        setOtpSent(true);
        // If previewUrl returned (ethereal), show it in console for dev
        if (data.previewUrl) console.info('OTP preview:', data.previewUrl);
      } else {
        const data = await res.json();
        setError(data.error || "An error occurred.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.error || 'OTP verification failed');
      }
    } catch (err) {
      setError('OTP verification failed');
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-lg md:text-xl">Login to your account</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={otpSent ? handleVerifyOtp : handleLogin}>
        <CardContent className="px-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {!otpSent && (
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {otpSent && (
              <div className="grid gap-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <OtpInput length={6} value={otp} onChange={setOtp} inputClass="w-12 h-12 text-center rounded-md border" />
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3 px-6 pb-6">
          <Button type="submit" className="w-full py-2">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
