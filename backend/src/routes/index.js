import { Router } from "express";
import { authRoutes } from "./authRoutes.js";
import { categoryRoutes } from "./categoryRoutes.js";
import { enquiryRoutes } from "./enquiryRoutes.js";
import { productRoutes } from "./productRoutes.js";
import { siteRoutes } from "./siteRoutes.js";
import { uploadRoutes } from "./uploadRoutes.js";

export const apiRoutes = Router();

apiRoutes.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok", service: "garment-gemini-backend" });
});

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/categories", categoryRoutes);
apiRoutes.use("/products", productRoutes);
apiRoutes.use("/enquiries", enquiryRoutes);
apiRoutes.use("/uploads", uploadRoutes);
apiRoutes.use("/", siteRoutes);
