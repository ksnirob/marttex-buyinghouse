import { Router } from "express";
import { uploadSingleImage } from "../controllers/uploadController.js";
import { requireAuth } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";

export const uploadRoutes = Router();

uploadRoutes.post("/image", requireAuth, uploadImage.single("image"), uploadSingleImage);
