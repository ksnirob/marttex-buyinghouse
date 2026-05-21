import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import { BgShapes } from "@/components/site/BgShapes";
import { Lightbox, useLightbox } from "@/components/site/Lightbox";
import { useEffect, useMemo, useState } from "react";
import { ZoomIn } from "lucide-react";

import knit from "@/assets/product-knit.jpg";
import denim from "@/assets/product-denim.jpg";
import woven from "@/assets/product-woven.jpg";
import kids from "@/assets/product-kids.jpg";
import hero from "@/assets/hero-garments.jpg";
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

export const Route = createFileRoute("/products/")({
  component: Products,
  head: () => ({ meta: [{ title: "Products — MartXBD" }, { name: "description", content: "Knit, woven, denim, outerwear, kidswear and fabric capabilities." }] }),
});

type Cat = { key: string; name: string; items: string[] };

const cats: Cat[] = [
  { key: "knit",    name: "Knit & Jersey",     items: [tshirt, knit, sweat, polo, hero, tshirt, sweat, polo, knit] },
  { key: "woven",   name: "Woven Shirts",      items: [shirtBlue, woven, flannel, shirtBlue, flannel, woven, shirtBlue] },
  { key: "denim",   name: "Denim & Bottoms",   items: [jeans, denim, chino, jeans, chino, denim, jeans, chino] },
  { key: "outer",   name: "Outerwear",         items: [puffer, trench, puffer, trench, puffer, trench] },
  { key: "kids",    name: "Kids & Babywear",   items: [kidsStripe, kids, baby, kidsStripe, baby, kids, baby] },
  { key: "fabric",  name: "Fabric & Trims",    items: [fabric, sourcing, fabric, sourcing, fabric] },
];

function Products() {
  const [active, setActive] = useState<string>("all");
  const lb = useLightbox();

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "");
      if (h && (h === "all" || cats.some((c) => c.key === h))) setActive(h);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const visible = useMemo(() => {
    if (active === "all") return cats;
    return cats.filter((c) => c.key === active);
  }, [active]);

  const flat = useMemo(() => visible.flatMap((c) => c.items), [visible]);

  return (
    <SiteLayout>
      <div className="relative">
        <BgShapes variant="default" />
        <PageHeader
          eyebrow="Products"
          title="Categories we source, sample and ship."
          lead="Tap any image to view it up close. Use the arrow keys to move between pieces."
        />
      </div>

      <section className="sticky top-20 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="container-x flex gap-2 overflow-x-auto py-4">
          <FilterPill label="All" active={active === "all"} onClick={() => setActive("all")} count={cats.reduce((a, c) => a + c.items.length, 0)} />
          {cats.map((c) => (
            <FilterPill key={c.key} label={c.name} active={active === c.key} onClick={() => setActive(c.key)} count={c.items.length} />
          ))}
        </div>
      </section>

      <section className="relative">
        <BgShapes variant="soft" />
        <div className="container-x space-y-24 py-20">
          {visible.map((cat) => (
            <div key={cat.key} className="animate-fade-up">
              <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                  <p className="eyebrow">{String(visible.indexOf(cat) + 1).padStart(2, "0")} — Category</p>
                  <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">{cat.name}</h2>
                </div>
                <p className="hidden text-sm text-muted-foreground sm:block">{cat.items.length} pieces</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.items.map((src, i) => {
                  const flatIndex = flat.indexOf(src);
                  return (
                    <button
                      key={`${cat.key}-${i}`}
                      onClick={() => lb.open(flatIndex)}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img src={src} alt={cat.name} loading="lazy" width={1000} height={1200} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                      </div>
                      <span className="absolute inset-0 grid place-items-center bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="grid h-14 w-14 place-items-center rounded-full bg-background/95 text-primary shadow-lg">
                          <ZoomIn className="h-6 w-6" />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Lightbox images={flat} index={lb.index} onClose={lb.close} onIndex={lb.to} />
    </SiteLayout>
  );
}

function FilterPill({ label, active, onClick, count }: { label: string; active: boolean; onClick: () => void; count: number }) {
  return (
    <button
      onClick={onClick}
      className={
        "flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 " +
        (active
          ? "border-primary bg-primary text-primary-foreground shadow-md"
          : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-primary")
      }
    >
      {label}
      <span className={"rounded-full px-2 py-0.5 text-[10px] " + (active ? "bg-primary-foreground/20" : "bg-muted")}>{count}</span>
    </button>
  );
}
