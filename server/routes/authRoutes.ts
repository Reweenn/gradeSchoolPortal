import express from "express";
import { registerUser } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);

// Protected route example
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

export default router;
