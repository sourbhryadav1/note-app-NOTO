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

// Normalize and allow-list CORS origins (remove trailing slashes to match browser Origin exactly)
const rawCorsOrigins = process.env.CORS_ORIGIN;
// use const rawCorsOrigins = http://localhost:5173; for local development
const allowedOrigins = rawCorsOrigins
  .split(",")
  .map((o) => o.trim().replace(/\/+$/g, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin requests (no Origin header) e.g., curl/health checks
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/+$/g, "");
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(rateLimiter);

// API routes
app.use("/api/notes", notesRoutes);

// Serve frontend in production
const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });

  // use app.get("/", (req, res) => {
  //   res.send("API is running...");
  // }); for local development

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
