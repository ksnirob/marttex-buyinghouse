import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ZoomIn } from "lucide-react";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import { Lightbox, useLightbox } from "@/components/site/Lightbox";
import { assetUrl, getPublicSiteData, type ApiCategory } from "@/lib/site-api";

export const Route = createFileRoute("/products/$category")({
  component: ProductCategory,
  head: ({ params }) => ({ meta: [{ title: `${params.category} — Mart Tex` }] }),
});

function ProductCategory() {
  const { category } = Route.useParams();
  const [categoryData, setCategoryData] = useState<ApiCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const lb = useLightbox();

  useEffect(() => {
    getPublicSiteData()
      .then((result) => setCategoryData(result.categories.find((item) => item.slug === category) || null))
      .finally(() => setLoading(false));
  }, [category]);

  const gallery = categoryData?.galleryImages || [];
  const images = gallery.map((image) => assetUrl(image.url));

  return (
    <SiteLayout>
      <PageHeader eyebrow="Products" title={categoryData?.name || (loading ? "Loading..." : "Category")} lead={categoryData?.description} />
      <div className="container-x py-6"><Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> All Products</Link></div>
      <section className="container-x py-12">
        {!loading && !gallery.length && <p className="rounded-2xl border border-border bg-card p-8">Category not found or has no gallery images.</p>}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gallery.map((image) => {
            const src = assetUrl(image.url);
            return (
              <button key={src} onClick={() => lb.open(images.indexOf(src))} className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm">
                <div className="relative aspect-[4/5] overflow-hidden"><img src={src} alt={image.alt || categoryData?.name || "Product"} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute inset-0 grid place-items-center bg-primary/35 opacity-0 transition group-hover:opacity-100"><ZoomIn className="h-7 w-7 text-white" /></span></div>
              </button>
            );
          })}
        </div>
      </section>
      <Lightbox images={images} index={lb.index} onClose={lb.close} onIndex={lb.to} />
    </SiteLayout>
  );
}
