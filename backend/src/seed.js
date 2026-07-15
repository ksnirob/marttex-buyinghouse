import bcrypt from "bcryptjs";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";

const categories = [
  { name: "Knit & Jersey", slug: "knit", sortOrder: 1 },
  { name: "Woven Shirts", slug: "woven", sortOrder: 2 },
  { name: "Denim & Bottoms", slug: "denim", sortOrder: 3 },
  { name: "Outerwear", slug: "outer", sortOrder: 4 },
  { name: "Kids & Babywear", slug: "kids", sortOrder: 5 },
  { name: "Fabric & Trims", slug: "fabric", sortOrder: 6 },
];

const contentBlocks = [
  {
    key: "home-brands",
    title: "Top Brands",
    items: [
      "tb-01.svg", "tb-02.svg", "tb-03.svg", "tb-04.svg", "tb-05.svg", "tb-06.svg",
      "tb-07.svg", "tb-08.svg", "tb-09.svg", "tb-10.svg", "tb-12.svg", "tb-13.svg",
    ].map((file, index) => ({ name: `Brand ${index + 1}`, image: `/uploads/${file}` })),
  },
  {
    key: "home-testimonials",
    title: "Testimonials",
    items: [
      { name: "Elena Marquez", role: "Head of Sourcing, Aurelia Studio", initials: "EM", quote: "Mart Tex runs our Dhaka supply like it's their own brand. Sample turnaround dropped to nine days and our defect rate is the lowest in five seasons." },
      { name: "Tomas Bernal", role: "Founder, Mont&Co", initials: "TB", quote: "From tech pack to FOB in record time. The QA photo reports alone are worth the partnership." },
      { name: "Priya Anand", role: "Production Lead, Loomery", initials: "PA", quote: "Their factory matching is unreal. Every program lands with a mill that wants to make it well." },
      { name: "Jonas Weber", role: "Buyer, Northwind Apparel", initials: "JW", quote: "Honest costing, no surprises at shipment. Mart Tex gets that exactly right." },
    ],
  },
  {
    key: "site-news",
    title: "News",
    items: [
      { slug: "bangladesh-rmg-exports", image: "/uploads/factory.jpg", tag: "Industry", date: "April 2026", title: "Bangladesh RMG exports cross USD 50B — what it means for buyers", lead: "Bangladesh's ready-made garment sector has crossed a historic milestone, signalling a maturing supplier ecosystem and new opportunities.", body: "Bangladesh's export base continues to grow across knitwear, woven and value-added categories.\n\nFor buyers, long-term relationships with trusted local partners remain the best way to secure capacity, quality and reliable lead times." },
      { slug: "cotton-recycled-blends", image: "/uploads/sourcing.jpg", tag: "Sourcing", date: "March 2026", title: "Cotton vs. recycled blends: a cost and quality comparison", lead: "A practical look at the cost, performance and sustainability tradeoffs for upcoming apparel programs.", body: "Recycled polyester is increasingly accessible while organic cotton still carries a meaningful premium.\n\nThe right fibre choice depends on product performance, target FOB and the sustainability story behind the collection." },
      { slug: "qa-protocol", image: "/uploads/quality.jpg", tag: "Quality", date: "February 2026", title: "Inside our in-line QA protocol", lead: "Quality assurance at final inspection is too late. Our process intervenes throughout production.", body: "Pre-production, cutting-room and inline checks catch issues before they become expensive rework.\n\nThis approach keeps quality consistent and shipment schedules honest." },
    ],
  },
  {
    key: "page-home",
    title: "Home",
    body: "Homepage slider and SEO settings.",
    seoTitle: "MartXBD | Garment Sourcing & Manufacturing Bangladesh",
    seoDescription:
      "MartXBD connects global fashion brands with trusted garment manufacturers, product development, quality control and sourcing expertise in Bangladesh.",
    items: [
      {
        word: "CRAFT",
        eyebrow: "Spring / Summer 27",
        description:
          "Defy the ordinary. Garments engineered with the kind of patience and detail your customer can feel.",
        images: [
          "/uploads/model-male-1.png",
          "/uploads/model-kid.png",
          "/uploads/model-male-2.png",
        ],
      },
      {
        word: "SOURCE",
        eyebrow: "Built in Bangladesh",
        description:
          "Sourced, cut and stitched in audited Dhaka factories — the same hands behind the brands you already wear.",
        images: [
          "/uploads/model-s2-male1.png",
          "/uploads/model-s2-kid.png",
          "/uploads/model-s2-male2.png",
        ],
      },
      {
        word: "FAMILY",
        eyebrow: "Men · Women · Kids",
        description:
          "From everyday menswear to soft, safe kidswear — one team, one quality bar, across every category.",
        images: [
          "/uploads/model-s3-male1.png",
          "/uploads/model-s3-kid.png",
          "/uploads/model-s3-male2.png",
        ],
      },
    ],
  },
  {
    key: "home-hero",
    title: "Global garment sourcing from Bangladesh.",
    subtitle: "MartXBD",
    body: "Sourcing, sampling and production support for knit, woven, denim, kidswear and fabric programs.",
  },
  {
    key: "products-header",
    title: "Categories we source, sample and ship.",
    subtitle: "Products",
    body: "Tap any image to view it up close. Use the arrow keys to move between pieces.",
  },
  {
    key: "contact-header",
    title: "Let's talk threads.",
    subtitle: "Contact",
    body: "Send your tech pack, target FOB and quantity. We'll come back within 48 hours.",
  },
  {
    key: "page-about-header",
    title: "A manufacturing and sourcing team focused on getting garments right.",
    body: "Established in 2010 in Dhaka, Mart Tex is a readymade garment manufacturer, supplier and exporter with own knitwear production and partner factory capacity across woven, denim and lingerie.",
    seoTitle: "About MartXBD | Garment Sourcing Bangladesh",
    seoDescription:
      "Meet MartXBD, a Bangladesh garment buying house connecting global fashion brands with trusted manufacturers, quality control and reliable production.",
  },
  {
    key: "page-profile-header",
    title: "Mart Tex apparel manufacturing and sourcing capability.",
    body: "A Bangladesh readymade garment manufacturer, supplier and exporter producing knitwear in-house while sourcing woven, denim and lingerie programs through partner factories.",
    seoTitle: "Company Profile | MartXBD Garment Buying House",
    seoDescription:
      "Explore MartXBD's apparel manufacturing, sourcing, quality assurance and export capabilities across knitwear, woven, denim and lingerie programs.",
  },
  {
    key: "page-products-header",
    title: "From concept to collection.",
    body: "Explore the garments, fabrics and finishes we source, develop and deliver for fashion brands worldwide.",
    seoTitle: "Garment Products & Fabric Sourcing | MartXBD",
    seoDescription:
      "Browse knitwear, woven shirts, denim, outerwear, kidswear, fabrics and trims sourced and developed by MartXBD for global fashion brands.",
  },
  {
    key: "page-services-header",
    title: "Eight services, one accountable team.",
    body: "Pick the bundle you need. Most brands work with us end-to-end — from a sketch to a stocked warehouse.",
    seoTitle: "Garment Sourcing & Production Services | MartXBD",
    seoDescription:
      "Discover end-to-end garment sourcing, product development, sampling, production, quality control, compliance and logistics services from Bangladesh.",
  },
  {
    key: "page-gallery-header",
    title: "Behind the seams.",
    body: "A glimpse into our showrooms, sampling studio and partner factory floors.",
    seoTitle: "Garment Production & Sourcing Gallery | MartXBD",
    seoDescription:
      "View MartXBD's garment samples, sourcing operations, showrooms and partner factory production across Bangladesh's apparel industry.",
    items: [
      { url: "/uploads/hero-garments.jpg", alt: "Mart Tex garment collection" },
      { url: "/uploads/factory.jpg", alt: "Garment factory floor" },
      { url: "/uploads/quality.jpg", alt: "Fabric quality inspection" },
      { url: "/uploads/sourcing.jpg", alt: "Garment sourcing" },
      { url: "/uploads/product-knit.jpg", alt: "Knitwear collection" },
      { url: "/uploads/product-denim.jpg", alt: "Denim collection" },
      { url: "/uploads/product-woven.jpg", alt: "Woven collection" },
      { url: "/uploads/product-kids.jpg", alt: "Kidswear collection" },
    ],
  },
  {
    key: "page-news-header",
    title: "Notes from the floor.",
    body: "Sourcing trends, factory updates and what's shifting in Bangladesh garment supply.",
    seoTitle: "Bangladesh Garment Industry News | MartXBD",
    seoDescription:
      "Read garment sourcing insights, factory updates, apparel trends and supply-chain news from MartXBD and Bangladesh's clothing industry.",
  },
  {
    key: "page-contact-header",
    title: "Let's talk threads.",
    body: "Send your tech pack, target FOB and quantity. We'll come back within 48 hours.",
    seoTitle: "Contact MartXBD | Garment Sourcing Bangladesh",
    seoDescription:
      "Contact MartXBD for garment sourcing, sampling and production support in Bangladesh. Share your tech pack, target price and order quantity.",
  },
];

const categoryImages = {
  knit: "/uploads/product-knit.jpg",
  woven: "/uploads/product-woven.jpg",
  denim: "/uploads/product-denim.jpg",
  outer: "/uploads/product-outer.jpg",
  kids: "/uploads/product-kids.jpg",
  fabric: "/uploads/product-fabric.jpg",
};

const galleryFiles = {
  knit: ["p-tshirt-white.jpg", "product-knit.jpg", "p-sweat-grey.jpg", "p-polo-olive.jpg", "p-knit-01.jpg", "p-knit-02.jpg", "p-knit-03.jpg"],
  woven: ["p-shirt-blue.jpg", "product-woven.jpg", "p-shirt-flannel.jpg", "p-woven-01.jpg", "p-woven-02.jpg", "p-woven-03.jpg"],
  denim: ["p-jeans-indigo.jpg", "product-denim.jpg", "p-chino-beige.jpg", "p-denim-01.jpg", "p-denim-02.jpg", "p-denim-03.jpg"],
  outer: ["p-puffer-black.jpg", "p-trench-camel.jpg", "p-outer-01.jpg", "p-outer-02.jpg", "p-outer-03.jpg"],
  kids: ["p-kids-stripe.jpg", "product-kids.jpg", "p-baby-mint.jpg", "p-kids-01.jpg", "p-kids-02.jpg", "p-kids-03.jpg"],
  fabric: ["p-fabric-cotton.jpg", "sourcing.jpg", "p-fabric-01.jpg", "p-fabric-02.jpg", "p-fabric-03.jpg"],
};

async function seed() {
  await connectDb();

  const email = env.adminEmail.toLowerCase();
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email } });
  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        name: env.adminName,
        email,
        passwordHash: await bcrypt.hash(env.adminPassword, 12),
      },
    });
    console.log(`Admin created: ${env.adminEmail}`);
  } else {
    console.log(`Admin already exists: ${env.adminEmail}`);
  }

  for (const category of categories) {
    const galleryImages = galleryFiles[category.slug].map((file, index) => ({
      url: `/uploads/${file}`,
      alt: category.name,
      sortOrder: index,
    }));
    const existingCategory = await prisma.category.findUnique({ where: { slug: category.slug } });
    await prisma.category.upsert({
      where: { slug: category.slug },
      update:
        existingCategory &&
        (!Array.isArray(existingCategory.galleryImages) ||
          existingCategory.galleryImages.length === 0)
          ? { galleryImages }
          : {},
      create: { ...category, galleryImages },
    });
  }
  console.log("Categories seeded");

  const categoryDocs = await prisma.category.findMany();
  for (const category of categoryDocs) {
    const slug = `${category.slug}-sample`;
    const existingProduct = await prisma.product.findUnique({ where: { slug } });
    await prisma.product.upsert({
      where: { slug },
      update:
        existingProduct && Array.isArray(existingProduct.images) && existingProduct.images.length === 0
          ? {
              images: [
                {
                  url: categoryImages[category.slug],
                  alt: `${category.name} sample`,
                  sortOrder: 0,
                },
              ],
            }
          : {},
      create: {
          name: `${category.name} Sample`,
          slug,
          categoryId: category.id,
          summary: `Sample ${category.name.toLowerCase()} product.`,
          description: "Replace this starter item from the admin panel.",
          images: [
            {
              url: categoryImages[category.slug],
              alt: `${category.name} sample`,
              sortOrder: 0,
            },
          ],
          tags: [],
          sortOrder: category.sortOrder,
          isActive: true,
      },
    });
  }
  console.log("Starter products seeded");

  const settings = await prisma.siteSetting.findFirst();
  if (!settings) {
    await prisma.siteSetting.create({
      data: {
        companyName: "Mart Tex",
        logoUrl: "/uploads/mart-tex-logo.svg",
        faviconUrl: "",
        email: "info@marttex.net",
        phones: ["+8801905450850", "+8801681624965"],
        address: "Nikunja-02, Road-09, House-07, Khilkhet, Dhaka-1229, Bangladesh",
        contactPerson: "Mukhlesur Rahman (Shakil)",
        workingHours: "Sunday - Thursday, 9:00 - 18:00 GMT+6",
        whatsapp: "+8801905450850",
        footerText:
          "A Bangladesh-based buying house connecting global fashion brands with vetted, ethical garment manufacturers — from sample to shipment.",
        copyrightText: "All rights reserved.",
        menuItems: [
          { label: "Home", path: "/", isActive: true },
          { label: "About", path: "/about", isActive: true },
          { label: "Products", path: "/products", isActive: true },
          { label: "Profile", path: "/profile", isActive: true },
          { label: "Services", path: "/services", isActive: true },
          { label: "Gallery", path: "/gallery", isActive: true },
          { label: "News", path: "/news", isActive: true },
        ],
        socials: {},
        seo: {},
      },
    });
  } else if (!settings.menuItems) {
    await prisma.siteSetting.update({
      where: { id: settings.id },
      data: {
        whatsapp: settings.whatsapp || "+8801905450850",
        footerText:
          settings.footerText ||
          "A Bangladesh-based buying house connecting global fashion brands with vetted, ethical garment manufacturers — from sample to shipment.",
        copyrightText: settings.copyrightText || "All rights reserved.",
        menuItems: [
          { label: "Home", path: "/", isActive: true },
          { label: "About", path: "/about", isActive: true },
          { label: "Products", path: "/products", isActive: true },
          { label: "Profile", path: "/profile", isActive: true },
          { label: "Services", path: "/services", isActive: true },
          { label: "Gallery", path: "/gallery", isActive: true },
          { label: "News", path: "/news", isActive: true },
        ],
      },
    });
  }
  console.log("Site settings seeded");

  for (const block of contentBlocks) {
    const existingBlock = await prisma.contentBlock.findUnique({ where: { key: block.key } });
    await prisma.contentBlock.upsert({
      where: { key: block.key },
      update:
        Array.isArray(block.items) &&
        block.items.length > 0 &&
        existingBlock &&
        Array.isArray(existingBlock.items) &&
        existingBlock.items.length === 0
          ? { items: block.items }
          : {},
      create: { ...block, items: block.items || [] },
    });
  }
  console.log("Content blocks seeded");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
