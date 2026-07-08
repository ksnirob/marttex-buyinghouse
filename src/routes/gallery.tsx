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

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({ meta: [{ title: "Gallery — MartXBD" }] }),
});

const imgs = [hero, factory, quality, sourcing, knit, denim, woven, kids];

function Gallery() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
        title="Behind the seams."
        lead="A glimpse into our showrooms, sampling studio and partner factory floors."
      />
      <section className="section-reveal container-x py-24">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {imgs.concat(imgs).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
