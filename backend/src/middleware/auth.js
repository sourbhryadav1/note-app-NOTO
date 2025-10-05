import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;


