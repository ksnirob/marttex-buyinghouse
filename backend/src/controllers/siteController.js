import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getSiteSettings = asyncHandler(async (_req, res) => {
  const settings = await prisma.siteSetting.findFirst({ orderBy: { createdAt: "asc" } });
  res.json({ success: true, data: settings });
});

function redirectToAsset(req, res, value) {
  const asset = value?.trim();

  if (!asset) {
    res.status(204).end();
    return;
  }

  const redirectUrl = /^https?:\/\//i.test(asset)
    ? asset
    : `${req.protocol}://${req.get("host")}${asset.startsWith("/") ? "" : "/"}${asset}`;

  res.set("Cache-Control", "no-store");
  res.redirect(302, redirectUrl);
}

export const getFavicon = asyncHandler(async (req, res) => {
  const settings = await prisma.siteSetting.findFirst({ orderBy: { createdAt: "asc" } });
  redirectToAsset(req, res, settings?.faviconUrl || "/uploads/mart-tex-logo.svg");
});

export const updateSiteSettings = asyncHandler(async (req, res) => {
  const existing = await prisma.siteSetting.findFirst({ orderBy: { createdAt: "asc" } });
  const defaults = { phones: [], menuItems: [], socials: {}, seo: {} };
  const settings = existing
    ? await prisma.siteSetting.update({
        where: { id: existing.id },
        data: req.validated.body,
      })
    : await prisma.siteSetting.create({
        data: { ...defaults, ...req.validated.body },
      });

  res.json({ success: true, data: settings });
});

export const listContentBlocks = asyncHandler(async (req, res) => {
  const where = req.query.includeInactive === "true" ? {} : { isActive: true };
  const blocks = await prisma.contentBlock.findMany({ where, orderBy: { key: "asc" } });
  res.json({ success: true, data: blocks });
});

export const getContentBlock = asyncHandler(async (req, res) => {
  const block = await prisma.contentBlock.findFirst({
    where: { key: req.params.key, isActive: true },
  });
  res.json({ success: true, data: block });
});

export const upsertContentBlock = asyncHandler(async (req, res) => {
  const key = req.params.key.toLowerCase();
  const block = await prisma.contentBlock.upsert({
    where: { key },
    update: req.validated.body,
    create: { key, items: [], ...req.validated.body },
  });

  res.json({ success: true, data: block });
});
