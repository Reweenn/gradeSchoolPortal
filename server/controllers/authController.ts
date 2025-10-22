import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../prisma/client";

// Helper to omit password before sending user back
const sanitizeUser = (user: any) => {
  if (!user) return user;
  const { password, ...rest } = user;
  return rest;
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, grade } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      grade?: string | null;
    };

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    // Check if user already exists
    const existing = await prisma.student.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save to DB
    const newUser = await prisma.student.create({
      data: {
        name,
        email,
        password: hashed,
        grade: grade || null,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: sanitizeUser(newUser),
      token,
    });
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await prisma.student.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      user: sanitizeUser(user),
      token,
    });
  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    // Log the full error details
    console.error("Full error details:", {
      error,
      stack: error instanceof Error ? error.stack : undefined,
    });
    res.status(500).json({ error: "Server error", details: error instanceof Error ? error.message : String(error) });
  }
};
