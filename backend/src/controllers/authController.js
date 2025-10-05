import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN = "7d";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existing = await User.findOne({ username: username.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username: username.toLowerCase(), passwordHash });

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.status(201).json({ token, username: user.username });
  } catch (error) {
    // Handle duplicate key (race condition) for unique username
    if (error && error.code === 11000) {
      return res.status(409).json({ message: "Username already taken" });
    }
    console.log("Error in signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.log("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


