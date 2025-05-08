import { Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ username, password, role: "admin" });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error registering user", error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password }); // plain text match for simulation
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken({ username: user.username, role: user.role });

    return res.status(200).json({ token, user: { username: user.username, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err });
  }
};
