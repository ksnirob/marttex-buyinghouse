import path from "path";
import multer from "multer";
import { env } from "../config/env.js";
import { uploadRoot } from "../config/paths.js";
import { ApiError } from "../utils/apiError.js";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadRoot);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    cb(null, `${Date.now()}-${base || "image"}${ext}`);
  },
});

export const uploadImage = multer({
  storage,
  limits: { fileSize: env.maxUploadMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedTypes.has(file.mimetype)) {
      cb(new ApiError(422, "Only JPG, PNG, WEBP and GIF images are allowed."));
      return;
    }
    cb(null, true);
  },
});
