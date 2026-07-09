import "dotenv/config";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { prisma } from "../lib/prisma.js";

const sourcePath = fileURLToPath(
  new URL("../../../src/routes/news.$slug.tsx", import.meta.url),
);
const source = await readFile(sourcePath, "utf8");
const match = source.match(
  /export const articles = (\[[\s\S]*?\]);\s*\n\s*export const Route/,
);

if (!match) {
  throw new Error("Could not read the original news articles.");
}

const getArticles = new Function(
  "factory",
  "sourcing",
  "quality",
  `return ${match[1]}`,
);
const articles = getArticles(
  "/uploads/factory.jpg",
  "/uploads/sourcing.jpg",
  "/uploads/quality.jpg",
);
const items = articles.map(({ img, body, ...article }) => ({
  ...article,
  image: img,
  body: body.join("\n\n"),
}));

await prisma.contentBlock.upsert({
  where: { key: "site-news" },
  update: { title: "News", items },
  create: { key: "site-news", title: "News", items },
});

console.log(`Synced ${items.length} full news articles to the database.`);
await prisma.$disconnect();
