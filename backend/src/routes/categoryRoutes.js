import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { categoryCreateSchema, categoryUpdateSchema, idSchema } from "./validators.js";

export const categoryRoutes = Router();

categoryRoutes.get("/", listCategories);
categoryRoutes.post("/", requireAuth, validate(categoryCreateSchema), createCategory);
categoryRoutes.patch("/:id", requireAuth, validate(categoryUpdateSchema), updateCategory);
categoryRoutes.delete("/:id", requireAuth, validate(idSchema), deleteCategory);
