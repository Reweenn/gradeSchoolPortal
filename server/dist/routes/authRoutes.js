"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Auth routes
router.post("/register", authController_1.registerUser);
// Protected route example
router.get("/profile", authMiddleware_1.verifyToken, (req, res) => {
    res.json({ message: "Protected route accessed successfully" });
});
exports.default = router;
