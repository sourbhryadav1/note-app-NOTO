import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";
import helmet from "helmet";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(helmet());
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());
app.use(rateLimiter);

// API routes
app.use("/api/notes", notesRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
