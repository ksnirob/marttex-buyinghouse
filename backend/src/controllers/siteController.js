import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

let faviconColumnReady = false;

async function ensureFaviconColumn() {
  if (faviconColumnReady) return;

  try {
    await prisma.$queryRaw`SELECT faviconUrl FROM SiteSetting LIMIT 1`;
    faviconColumnReady = true;
    return;
  } catch (error) {
    if (error?.code !== "P2010" && !String(error?.message || "").includes("1054")) {
      throw error;
    }
  }

  await prisma.$executeRawUnsafe("ALTER TABLE `SiteSetting` ADD COLUMN `faviconUrl` TEXT NOT NULL DEFAULT ''");
  faviconColumnReady = true;
}

async function readFaviconUrl(settings) {
  if (!settings?.id) return settings || null;

  try {
    await ensureFaviconColumn();
    const rows = await prisma.$queryRaw`SELECT faviconUrl FROM SiteSetting WHERE id = ${settings.id} LIMIT 1`;
    return { ...settings, faviconUrl: rows?.[0]?.faviconUrl || "" };
  } catch {
    return { ...settings, faviconUrl: "" };
  }
}

async function writeFaviconUrl(settingsId, faviconUrl) {
  if (!settingsId || typeof faviconUrl !== "string") return;

  await ensureFaviconColumn();
  await prisma.$executeRaw`UPDATE SiteSetting SET faviconUrl = ${faviconUrl} WHERE id = ${settingsId}`;
}

export const getSiteSettings = asyncHandler(async (_req, res) => {
  const settings = await prisma.siteSetting.findFirst({ orderBy: { createdAt: "asc" } });
  res.json({ success: true, data: await readFaviconUrl(settings) });
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
  const settingsWithFavicon = await readFaviconUrl(settings);
  redirectToAsset(req, res, settingsWithFavicon?.faviconUrl || "");
});

export const updateSiteSettings = asyncHandler(async (req, res) => {
  const existing = await prisma.siteSetting.findFirst({ orderBy: { createdAt: "asc" } });
  const defaults = { phones: [], menuItems: [], socials: {}, seo: {} };
  const { faviconUrl, ...siteSettingsData } = req.validated.body;
  const settings = existing
    ? await prisma.siteSetting.update({
        where: { id: existing.id },
        data: siteSettingsData,
      })
    : await prisma.siteSetting.create({
        data: { ...defaults, ...siteSettingsData },
      });

  await writeFaviconUrl(settings.id, faviconUrl);

  res.json({ success: true, data: await readFaviconUrl(settings) });
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
