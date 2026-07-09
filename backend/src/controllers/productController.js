import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination } from "../utils/pagination.js";
import { makeSlug } from "../utils/slug.js";

async function resolveCategory(category) {
  if (!category) return null;
  return prisma.category.findFirst({
    where: { OR: [{ id: category }, { slug: category }] },
  });
}

export const listProducts = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const where = req.query.includeInactive === "true" ? {} : { isActive: true };

  if (req.query.category) {
    const category = await resolveCategory(req.query.category);
    if (!category) throw new ApiError(404, "Category not found.");
    where.categoryId = category.id;
  }

  if (req.query.featured === "true") where.isFeatured = true;
  if (req.query.search) {
    where.OR = [
      { name: { contains: req.query.search } },
      { summary: { contains: req.query.search } },
      { description: { contains: req.query.search } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  res.json({ success: true, data: items, meta: { page, limit, total } });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await prisma.product.findFirst({
    where: { slug: req.params.slug, isActive: true },
    include: { category: true },
  });
  if (!product) throw new ApiError(404, "Product not found.");
  res.json({ success: true, data: product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const payload = req.validated.body;
  const category = await resolveCategory(payload.category);
  if (!category) throw new ApiError(422, "Valid category is required.");

  const slug = payload.slug ? makeSlug(payload.slug) : makeSlug(payload.name);
  const { category: _category, ...data } = payload;
  const product = await prisma.product.create({
    data: { ...data, categoryId: category.id, slug },
    include: { category: true },
  });
  res.status(201).json({ success: true, data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const payload = req.validated.body;

  if (payload.category) {
    const category = await resolveCategory(payload.category);
    if (!category) throw new ApiError(422, "Valid category is required.");
    payload.categoryId = category.id;
    delete payload.category;
  }

  if (payload.slug || payload.name) {
    payload.slug = makeSlug(payload.slug || payload.name);
  }

  const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, "Product not found.");
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: payload,
    include: { category: true },
  });
  res.json({ success: true, data: product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, "Product not found.");
  const product = await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ success: true, data: product });
});
