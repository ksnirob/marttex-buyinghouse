import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import { BgShapes } from "@/components/site/BgShapes";
import { Lightbox, useLightbox } from "@/components/site/Lightbox";
import { useMemo } from "react";
import { ZoomIn, ArrowLeft } from "lucide-react";

import knit from "@/assets/product-knit.jpg";
import denim from "@/assets/product-denim.jpg";
import woven from "@/assets/product-woven.jpg";
import kids from "@/assets/product-kids.jpg";
import sourcing from "@/assets/sourcing.jpg";
import tshirt from "@/assets/p-tshirt-white.jpg";
import sweat from "@/assets/p-sweat-grey.jpg";
import polo from "@/assets/p-polo-olive.jpg";
import shirtBlue from "@/assets/p-shirt-blue.jpg";
import flannel from "@/assets/p-shirt-flannel.jpg";
import jeans from "@/assets/p-jeans-indigo.jpg";
import chino from "@/assets/p-chino-beige.jpg";
import puffer from "@/assets/p-puffer-black.jpg";
import trench from "@/assets/p-trench-camel.jpg";
import baby from "@/assets/p-baby-mint.jpg";
import kidsStripe from "@/assets/p-kids-stripe.jpg";
import fabric from "@/assets/p-fabric-cotton.jpg";
import knit01 from "@/assets/p-knit-01.jpg";
import knit02 from "@/assets/p-knit-02.jpg";
import knit03 from "@/assets/p-knit-03.jpg";
import woven01 from "@/assets/p-woven-01.jpg";
import woven02 from "@/assets/p-woven-02.jpg";
import woven03 from "@/assets/p-woven-03.jpg";
import denim01 from "@/assets/p-denim-01.jpg";
import denim02 from "@/assets/p-denim-02.jpg";
import denim03 from "@/assets/p-denim-03.jpg";
import outer01 from "@/assets/p-outer-01.jpg";
import outer02 from "@/assets/p-outer-02.jpg";
import outer03 from "@/assets/p-outer-03.jpg";
import kids01 from "@/assets/p-kids-01.jpg";
import kids02 from "@/assets/p-kids-02.jpg";
import kids03 from "@/assets/p-kids-03.jpg";
import fabric01 from "@/assets/p-fabric-01.jpg";
import fabric02 from "@/assets/p-fabric-02.jpg";
import fabric03 from "@/assets/p-fabric-03.jpg";

const cats = [
  { key: "knit",   name: "Knit & Jersey",   desc: "T-shirts, polos, sweats, loungewear and performance knitwear.",   items: [tshirt, knit, sweat, polo, knit01, knit02, knit03] },
  { key: "woven",  name: "Woven Shirts",    desc: "Casual, formal, oxford, flannel and technical wovens.",            items: [shirtBlue, woven, flannel, woven01, woven02, woven03] },
  { key: "denim",  name: "Denim & Bottoms", desc: "Jeans, chinos, shorts, skirts and denim jackets.",                items: [jeans, denim, chino, denim01, denim02, denim03] },
  { key: "outer",  name: "Outerwear",       desc: "Puffers, trenches, bombers and technical shell jackets.",          items: [puffer, trench, outer01, outer02, outer03] },
  { key: "kids",   name: "Kids & Babywear", desc: "Soft, safe, certified fabrics for infants and children.",          items: [kidsStripe, kids, baby, kids01, kids02, kids03] },
  { key: "fabric", name: "Fabric & Trims",  desc: "Cotton, blends, recycled fibres and accessory sourcing.",          items: [fabric, sourcing, fabric01, fabric02, fabric03] },
];

export const Route = createFileRoute("/products/$category")({
  component: ProductCategory,
  head: ({ params }) => {
    const cat = cats.find((c) => c.key === params.category);
    return { meta: [{ title: `${cat?.name ?? "Category"} — MartXBD` }] };
  },
});

function ProductCategory() {
  const { category } = Route.useParams();
  const cat = useMemo(() => cats.find((c) => c.key === category), [category]);
  const lb = useLightbox();

  if (!cat) {
    return (
      <SiteLayout>
        <div className="container-x py-32 text-center">
          <h1 className="font-display text-4xl text-primary">Category not found</h1>
          <Link to="/products" className="btn-primary mt-8 inline-flex">All Products</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="relative">
        <BgShapes variant="default" />
        <PageHeader
          eyebrow="Products"
          title={cat.name}
          lead={cat.desc}
        />
      </div>

      <div className="container-x pt-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> All Products
        </Link>
      </div>

      <section className="relative">
        <BgShapes variant="soft" />
        <div className="container-x py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cat.items.map((src, i) => (
              <button
                key={`${cat.key}-${i}`}
                onClick={() => lb.open(i)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={src}
                    alt={cat.name}
                    loading="lazy"
                    width={1000}
                    height={1200}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                </div>
                <span className="absolute inset-0 grid place-items-center bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-background/95 text-primary shadow-lg">
                    <ZoomIn className="h-6 w-6" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={cat.items} index={lb.index} onClose={lb.close} onIndex={lb.to} />
    </SiteLayout>
  );
}
