import { Router } from "express";
import { uploadSingleImage, uploadSingleVideo } from "../controllers/uploadController.js";
import { requireAuth } from "../middleware/auth.js";
import { uploadImage, uploadVideo } from "../middleware/upload.js";

export const uploadRoutes = Router();

uploadRoutes.post("/image", requireAuth, uploadImage.single("image"), uploadSingleImage);
uploadRoutes.post("/video", requireAuth, uploadVideo.single("video"), uploadSingleVideo);
