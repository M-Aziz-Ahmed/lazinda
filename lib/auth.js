import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import dbConnect from "@/lib/connectDb";
import User from "@/lib/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP Login",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        await dbConnect();
        const { email, otp } = credentials;
        const normalizedEmail = String(email).toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) throw new Error("Invalid credentials");

        if (!user.otpCode || !user.otpExpires) throw new Error("No OTP pending");
        if (user.otpExpires < new Date()) throw new Error("OTP expired");
        if (user.otpCode !== String(otp).trim()) throw new Error("Invalid OTP");

        // clear OTP fields
        user.otpCode = null;
        user.otpExpires = null;
        await user.save();

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // use JWT for stateless session
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.userId,
        role: token.role,
        name: token.name,
      };
      return session;
    },
  },
};
