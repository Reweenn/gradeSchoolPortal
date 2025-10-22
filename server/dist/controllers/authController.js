"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../prisma/client"));
// Helper to omit password before sending user back
const sanitizeUser = (user) => {
    if (!user)
        return user;
    const { password, ...rest } = user;
    return rest;
};
const registerUser = async (req, res) => {
    try {
        const { name, email, password, grade } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "name, email and password are required" });
        }
        // Check if user already exists
        const existing = await client_1.default.student.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ message: "User with this email already exists" });
        }
        // Hash password
        const hashed = await bcrypt_1.default.hash(password, 10);
        // Save to DB
        const newUser = await client_1.default.student.create({
            data: {
                name,
                email,
                password: hashed,
                grade: grade || null,
            },
        });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "7d" });
        res.status(201).json({
            message: "User registered successfully",
            user: sanitizeUser(newUser),
            token,
        });
    }
    catch (error) {
        console.error("❌ Error in registerUser:", error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }
        const user = await client_1.default.student.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "7d" });
        res.json({
            message: "Login successful",
            user: sanitizeUser(user),
            token,
        });
    }
    catch (error) {
        console.error("❌ Error in loginUser:", error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.loginUser = loginUser;
