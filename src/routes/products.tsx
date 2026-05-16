import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import knit from "@/assets/product-knit.jpg";
import denim from "@/assets/product-denim.jpg";
import woven from "@/assets/product-woven.jpg";
import kids from "@/assets/product-kids.jpg";
import hero from "@/assets/hero-garments.jpg";
import sourcing from "@/assets/sourcing.jpg";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/products")({
  component: Products,
  head: () => ({ meta: [{ title: "Products — Noor Threads" }, { name: "description", content: "Knit, woven, denim, outerwear and kidswear capabilities." }] }),
});

const cats = [
  { img: knit, name: "Knit & Jersey", items: ["T-shirts", "Polos", "Sweatshirts", "Loungewear", "Activewear"] },
  { img: woven, name: "Woven Shirts", items: ["Oxford", "Flannel", "Linen blends", "Office shirts", "Overshirts"] },
  { img: denim, name: "Denim & Bottoms", items: ["Jeans", "Chinos", "Shorts", "Skirts", "Denim jackets"] },
  { img: hero, name: "Outerwear", items: ["Puffers", "Parkas", "Quilted vests", "Soft shell", "Trench coats"] },
  { img: kids, name: "Kids & Babywear", items: ["Bodysuits", "Pyjamas", "Polos", "Dresses", "Co-ords"] },
  { img: sourcing, name: "Fabric & Trims", items: ["Cotton", "Modal", "Recycled poly", "Buttons", "Labels"] },
];

function Products() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Products" title="Categories we source, sample and ship." lead="Six core capability areas, supported by 60+ partner factories across Bangladesh." />
      <section className="container-x grid gap-8 py-24 md:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <article key={c.name} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={c.img} alt={c.name} width={1000} height={1200} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl text-primary">{c.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.items.map((i) => (
                  <li key={i} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-foreground/70">{i}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <section className="container-x pb-24">
        <div className="rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <h2 className="max-w-2xl font-display text-3xl md:text-4xl">Don't see your category? We probably still make it.</h2>
          <p className="mt-4 max-w-xl text-primary-foreground/80">Tell us what you're producing and we'll match it to the right factory within 48 hours.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-medium text-primary">
            Start a project <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
