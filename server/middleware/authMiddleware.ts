import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "default_secret_key";
    const decoded = jwt.verify(token, secret) as JwtPayload;
    (req as any).user = decoded; // attach user info to the request object
    next();
  } catch (error) {
    console.error("❌ Invalid token:", error);
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
