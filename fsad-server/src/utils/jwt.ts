import jwt from "jsonwebtoken";

const SECRET = "supersecret"; // should use env var

export function generateToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
