import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import hero from "@/assets/hero-garments.jpg";
import factory from "@/assets/factory.jpg";
import quality from "@/assets/quality.jpg";
import sourcing from "@/assets/sourcing.jpg";
import knit from "@/assets/product-knit.jpg";
import denim from "@/assets/product-denim.jpg";
import woven from "@/assets/product-woven.jpg";
import kids from "@/assets/product-kids.jpg";
import { useEffect, useState } from "react";
import { API_URL, assetUrl } from "@/lib/site-api";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({ meta: [{ title: "Gallery — Mart Tex" }] }),
});

const imgs = [hero, factory, quality, sourcing, knit, denim, woven, kids];

function Gallery() {
  const [images, setImages] = useState<{ url: string; alt: string }[]>(
    imgs.map((url) => ({ url, alt: "Mart Tex garment sourcing gallery" })),
  );

  useEffect(() => {
    fetch(`${API_URL}/api/content/page-gallery-header`)
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.data?.items) && result.data.items.length) {
          setImages(
            result.data.items.map((image: { url: string; alt?: string }) => ({
              url: assetUrl(image.url),
              alt: image.alt || "Mart Tex garment sourcing gallery",
            })),
          );
        }
      })
      .catch(() => undefined);
  }, []);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
        title="Behind the seams."
        lead="A glimpse into our showrooms, sampling studio and partner factory floors."
      />
      <section className="section-reveal container-x py-24">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {images.map((image, i) => (
            <img
              key={`${image.url}-${i}`}
              src={image.url}
              alt={image.alt}
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
