import path from "path";
import multer from "multer";
import { env } from "../config/env.js";
import { uploadRoot } from "../config/paths.js";
import { ApiError } from "../utils/apiError.js";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/x-icon",
  "image/vnd.microsoft.icon",
]);
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".ico"]);
const allowedVideoTypes = new Set([
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
]);
const allowedVideoExtensions = new Set([".mp4", ".webm", ".ogv", ".ogg", ".mov"]);

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
    cb(null, `${Date.now()}-${base || "upload"}${ext}`);
  },
});

export const uploadImage = multer({
  storage,
  limits: { fileSize: env.maxUploadMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.has(file.mimetype) && !allowedExtensions.has(ext)) {
      cb(new ApiError(422, "Only JPG, PNG, WEBP, GIF, SVG and ICO images are allowed."));
      return;
    }
    cb(null, true);
  },
});

export const uploadVideo = multer({
  storage,
  limits: { fileSize: env.maxVideoUploadMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedVideoTypes.has(file.mimetype) && !allowedVideoExtensions.has(ext)) {
      cb(new ApiError(422, "Only MP4, WEBM, OGG and MOV videos are allowed."));
      return;
    }
    cb(null, true);
  },
});
