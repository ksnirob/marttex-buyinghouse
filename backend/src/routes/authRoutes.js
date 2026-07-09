import { Router } from "express";
import { login, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { loginSchema } from "./validators.js";

export const authRoutes = Router();

authRoutes.post("/login", validate(loginSchema), login);
authRoutes.get("/me", requireAuth, me);
