import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["employee", "hod"], required: true },
    department: { type: String, required: true }, // Employee's department
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
