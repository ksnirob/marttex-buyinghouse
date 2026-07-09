import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { env } from "./config/env.js";
import { uploadRoot } from "./config/paths.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { apiRoutes } from "./routes/index.js";

export const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  cors({
    origin: env.clientUrl.split(",").map((url) => url.trim()),
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    service: "garment-gemini-backend",
    message: "Backend is running. Use the /api routes for website content.",
    endpoints: {
      health: "/api/health",
      categories: "/api/categories",
      products: "/api/products",
      siteSettings: "/api/site-settings",
      content: "/api/content",
      enquiries: "/api/enquiries",
      login: "/api/auth/login",
    },
  });
});

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use("/uploads", express.static(path.resolve(uploadRoot)));
app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);
