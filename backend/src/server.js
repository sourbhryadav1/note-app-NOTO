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
const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://note-app-noto.vercel.app", // main prod
  "https://note-app-noto-15tr2neoc-sourbhryadav1s-projects.vercel.app", // preview
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.endsWith(".vercel.app") || origin === "http://localhost:5173") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

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
