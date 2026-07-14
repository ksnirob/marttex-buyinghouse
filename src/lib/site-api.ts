export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "https://api.marttex.net" : "http://127.0.0.1:4000");

export type SiteMenuItem = {
  label: string;
  path: string;
  isActive?: boolean;
};

export type SiteSettings = {
  companyName?: string;
  email?: string;
  phones?: string[];
  address?: string;
  contactPerson?: string;
  workingHours?: string;
  whatsapp?: string;
  logoUrl?: string;
  footerText?: string;
  copyrightText?: string;
  menuItems?: SiteMenuItem[];
};

export type ApiCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  galleryImages?: { url: string; alt?: string; sortOrder?: number }[];
  sortOrder?: number;
  isActive?: boolean;
};

export type ApiProduct = {
  _id: string;
  name: string;
  slug: string;
  category: ApiCategory;
  summary?: string;
  description?: string;
  images?: { url: string; alt?: string; sortOrder?: number }[];
  tags?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
};

export function assetUrl(value?: string) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

export async function getPublicSiteData() {
  const [settingsResponse, categoriesResponse] = await Promise.all([
    fetch(`${API_URL}/api/site-settings`),
    fetch(`${API_URL}/api/categories`),
  ]);

  if (!settingsResponse.ok || !categoriesResponse.ok) {
    throw new Error("Could not load site options.");
  }

  const settings = (await settingsResponse.json()) as { data: SiteSettings | null };
  const categories = (await categoriesResponse.json()) as { data: ApiCategory[] };
  return { settings: settings.data || {}, categories: categories.data || [] };
}

export async function getPublicProducts(category?: string) {
  const query = new URLSearchParams({ limit: "100" });
  if (category) query.set("category", category);
  const response = await fetch(`${API_URL}/api/products?${query}`);
  if (!response.ok) throw new Error("Could not load products.");
  return (await response.json()) as { data: ApiProduct[] };
}
