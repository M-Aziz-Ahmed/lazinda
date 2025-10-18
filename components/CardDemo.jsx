'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function CardDemo() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log(username, password);
    const handleLogin = (e) => {
        e.preventDefault();
        const credentials = { username, password };

    }
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-lg md:text-xl">Login to your account</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <form>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
              value={password}
              className="w-full"
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3 px-6 pb-6">
        <Button type="submit" className="w-full py-2">
          Login
        </Button>
        <Button variant="outline" className="w-full py-2">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
