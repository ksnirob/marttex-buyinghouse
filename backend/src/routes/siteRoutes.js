import { Router } from "express";
import {
  getContentBlock,
  getSiteSettings,
  listContentBlocks,
  updateSiteSettings,
  upsertContentBlock,
} from "../controllers/siteController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { contentSchema, keySchema, settingsSchema } from "./validators.js";

export const siteRoutes = Router();

siteRoutes.get("/site-settings", getSiteSettings);
siteRoutes.patch("/site-settings", requireAuth, validate(settingsSchema), updateSiteSettings);
siteRoutes.get("/content", listContentBlocks);
siteRoutes.get("/content/:key", validate(keySchema), getContentBlock);
siteRoutes.put("/content/:key", requireAuth, validate(contentSchema), upsertContentBlock);
