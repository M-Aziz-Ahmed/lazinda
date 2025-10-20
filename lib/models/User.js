import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // OTP for second factor (short-lived)
    otpCode: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      default: "employee",
    },
    department: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    collection: 'Users',
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
