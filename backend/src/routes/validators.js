import { z } from "zod";

const idParam = z.object({ id: z.string().min(1) });
const slugParam = z.object({ slug: z.string().min(1) });
const keyParam = z.object({ key: z.string().min(1) });

const imageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().optional().default(""),
  sortOrder: z.number().optional().default(0),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const categoryCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    slug: z.string().optional(),
    description: z.string().optional().default(""),
    coverImage: z.string().optional().default(""),
    galleryImages: z
      .array(
        z.object({
          url: z.string().min(1),
          alt: z.string().optional().default(""),
          sortOrder: z.number().optional().default(0),
        }),
      )
      .optional(),
    sortOrder: z.number().optional().default(0),
    isActive: z.boolean().optional().default(true),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const categoryUpdateSchema = z.object({
  body: categoryCreateSchema.shape.body.partial(),
  query: z.object({}).passthrough(),
  params: idParam,
});

export const productCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    slug: z.string().optional(),
    category: z.string().min(1),
    summary: z.string().optional().default(""),
    description: z.string().optional().default(""),
    images: z.array(imageSchema).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    sortOrder: z.number().optional().default(0),
    isFeatured: z.boolean().optional().default(false),
    isActive: z.boolean().optional().default(true),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const productUpdateSchema = z.object({
  body: productCreateSchema.shape.body.partial(),
  query: z.object({}).passthrough(),
  params: idParam,
});

export const productSlugSchema = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: slugParam,
});

export const settingsSchema = z.object({
  body: z.object({
    companyName: z.string().optional(),
    email: z.string().email().or(z.literal("")).optional(),
    phones: z.array(z.string()).optional(),
    address: z.string().optional(),
    contactPerson: z.string().optional(),
    workingHours: z.string().optional(),
    whatsapp: z.string().optional(),
    logoUrl: z.string().optional(),
    faviconUrl: z.string().optional(),
    footerText: z.string().optional(),
    copyrightText: z.string().optional(),
    menuItems: z
      .array(
        z.object({
          label: z.string().min(1),
          path: z.string().min(1),
          isActive: z.boolean().optional().default(true),
        }),
      )
      .optional(),
    socials: z
      .object({
        facebook: z.string().optional(),
        linkedin: z.string().optional(),
        instagram: z.string().optional(),
      })
      .optional(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const contentSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    body: z.string().optional(),
    image: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    thumbnail: z.string().optional(),
    items: z.array(z.unknown()).optional(),
    isActive: z.boolean().optional(),
  }),
  query: z.object({}).passthrough(),
  params: keyParam,
});

export const enquiryCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    company: z.string().optional().default(""),
    email: z.string().email(),
    phone: z.string().optional().default(""),
    category: z.string().optional().default(""),
    quantity: z.string().optional().default(""),
    message: z.string().min(1),
  }),
  query: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
});

export const enquiryUpdateSchema = z.object({
  body: z.object({
    status: z.enum(["new", "read", "replied", "archived"]),
  }),
  query: z.object({}).passthrough(),
  params: idParam,
});

export const idSchema = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: idParam,
});

export const keySchema = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: keyParam,
});
