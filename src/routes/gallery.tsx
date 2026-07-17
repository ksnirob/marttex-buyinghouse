import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import { useEffect, useState } from "react";
import { API_URL, assetUrl } from "@/lib/site-api";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({ meta: [{ title: "Gallery — Mart Tex" }] }),
});

type GalleryMedia = {
  type?: "image" | "video";
  url: string;
  alt?: string;
  title?: string;
};

function Gallery() {
  const [images, setImages] = useState<{ url: string; alt: string }[]>([]);
  const [videos, setVideos] = useState<{ url: string; title: string }[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/content/page-gallery-header`)
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.data?.items) && result.data.items.length) {
          const media = result.data.items as GalleryMedia[];
          const galleryVideos = media.filter((item) => item.type === "video" && item.url);
          const galleryImages = media.filter((item) => item.type !== "video" && item.url);

          setVideos(
            galleryVideos.map((video) => ({
              url: assetUrl(video.url),
              title: video.title || video.alt || "Mart Tex gallery video",
            })),
          );
          setImages(
            galleryImages.map((image) => ({
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
        {videos.length > 0 && (
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {videos.map((video, i) => (
              <video
                key={`${video.url}-${i}`}
                src={video.url}
                title={video.title}
                controls
                preload="metadata"
                className="aspect-video w-full rounded-2xl bg-black object-cover"
              />
            ))}
          </div>
        )}
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
