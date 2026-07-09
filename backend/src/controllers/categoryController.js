import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { makeSlug } from "../utils/slug.js";

export const listCategories = asyncHandler(async (req, res) => {
  const where = req.query.includeInactive === "true" ? {} : { isActive: true };
  const categories = await prisma.category.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  res.json({ success: true, data: categories });
});

export const createCategory = asyncHandler(async (req, res) => {
  const payload = req.validated.body;
  const slug = payload.slug ? makeSlug(payload.slug) : makeSlug(payload.name);
  const category = await prisma.category.create({ data: { ...payload, slug } });
  res.status(201).json({ success: true, data: category });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const payload = req.validated.body;
  if (payload.slug || payload.name) {
    payload.slug = makeSlug(payload.slug || payload.name);
  }

  const existing = await prisma.category.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, "Category not found.");
  const category = await prisma.category.update({ where: { id: req.params.id }, data: payload });
  res.json({ success: true, data: category });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const existing = await prisma.category.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, "Category not found.");
  const [, category] = await prisma.$transaction([
    prisma.product.deleteMany({ where: { categoryId: req.params.id } }),
    prisma.category.delete({ where: { id: req.params.id } }),
  ]);
  res.json({ success: true, data: category });
});
