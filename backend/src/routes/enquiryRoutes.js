import { Router } from "express";
import {
  createEnquiry,
  deleteEnquiry,
  listEnquiries,
  updateEnquiry,
} from "../controllers/enquiryController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { enquiryCreateSchema, enquiryUpdateSchema, idSchema } from "./validators.js";

export const enquiryRoutes = Router();

enquiryRoutes.post("/", validate(enquiryCreateSchema), createEnquiry);
enquiryRoutes.get("/", requireAuth, listEnquiries);
enquiryRoutes.patch("/:id", requireAuth, validate(enquiryUpdateSchema), updateEnquiry);
enquiryRoutes.delete("/:id", requireAuth, validate(idSchema), deleteEnquiry);
