"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    try {
        const secret = process.env.JWT_SECRET || "default_secret_key";
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded; // attach user info to the request object
        next();
    }
    catch (error) {
        console.error("❌ Invalid token:", error);
        res.status(403).json({ message: "Invalid or expired token." });
    }
};
exports.verifyToken = verifyToken;
