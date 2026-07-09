import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/productController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  idSchema,
  productCreateSchema,
  productSlugSchema,
  productUpdateSchema,
} from "./validators.js";

export const productRoutes = Router();

productRoutes.get("/", listProducts);
productRoutes.get("/:slug", validate(productSlugSchema), getProduct);
productRoutes.post("/", requireAuth, validate(productCreateSchema), createProduct);
productRoutes.patch("/:id", requireAuth, validate(productUpdateSchema), updateProduct);
productRoutes.delete("/:id", requireAuth, validate(idSchema), deleteProduct);
