import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ZoomIn } from "lucide-react";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import { BgShapes } from "@/components/site/BgShapes";
import { Lightbox, useLightbox } from "@/components/site/Lightbox";
import { assetUrl, getPublicSiteData, type ApiCategory } from "@/lib/site-api";

export const Route = createFileRoute("/products/")({
  component: Products,
  head: () => ({ meta: [{ title: "Products — Mart Tex" }] }),
});

function Products() {
  const [active, setActive] = useState("all");
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const lb = useLightbox();

  useEffect(() => {
    getPublicSiteData()
      .then((site) => {
        setCategories(site.categories);
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleCategories = active === "all" ? categories : categories.filter((item) => item.slug === active);
  const images = visibleCategories
    .flatMap((category) => category.galleryImages || [])
    .map((image) => assetUrl(image.url));

  return (
    <SiteLayout>
      <div className="relative">
        <BgShapes variant="default" />
        <PageHeader
          eyebrow="Products"
          title="From concept to collection."
          lead="Explore the garments, fabrics and finishes we source, develop and deliver for fashion brands worldwide."
        />
      </div>
      <section className="sticky top-20 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="container-x flex gap-2 overflow-x-auto py-4">
          <FilterPill label="All" active={active === "all"} onClick={() => setActive("all")} count={categories.reduce((total, category) => total + (category.galleryImages?.length || 0), 0)} />
          {categories.map((category) => (
            <FilterPill key={category._id} label={category.name} active={active === category.slug} onClick={() => setActive(category.slug)} count={category.galleryImages?.length || 0} />
          ))}
        </div>
      </section>
      <section className="relative">
        <BgShapes variant="soft" />
        <div className="container-x space-y-20 py-20">
          {loading && <p className="text-muted-foreground">Loading products...</p>}
          {!loading && visibleCategories.every((category) => !category.galleryImages?.length) && <p className="rounded-2xl border border-border bg-card p-8 text-muted-foreground">No gallery images have been added to this category yet.</p>}
          {visibleCategories.map((category) => {
            const gallery = category.galleryImages || [];
            if (!gallery.length) return null;
            return (
              <div key={category._id}>
                <p className="eyebrow">Category</p>
                <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">{category.name}</h2>
                {category.description && <p className="mt-3 max-w-2xl text-muted-foreground">{category.description}</p>}
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {gallery.map((image) => {
                      const src = assetUrl(image.url);
                      const index = images.indexOf(src);
                      return (
                        <button key={`${category._id}-${src}`} onClick={() => lb.open(index)} className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                          <div className="relative aspect-[4/5] overflow-hidden">
                            <img src={src} alt={image.alt || category.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                            <span className="absolute inset-0 grid place-items-center bg-primary/35 opacity-0 transition group-hover:opacity-100"><ZoomIn className="h-7 w-7 text-white" /></span>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Lightbox images={images} index={lb.index} onClose={lb.close} onIndex={lb.to} />
    </SiteLayout>
  );
}

function FilterPill({ label, active, onClick, count }: { label: string; active: boolean; onClick: () => void; count: number }) {
  return <button onClick={onClick} className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/70"}`}>{label}<span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-foreground">{count}</span></button>;
}
