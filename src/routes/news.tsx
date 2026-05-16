import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import factory from "@/assets/factory.jpg";
import sourcing from "@/assets/sourcing.jpg";
import quality from "@/assets/quality.jpg";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/news")({
  component: News,
  head: () => ({ meta: [{ title: "News — Noor Threads" }] }),
});

const posts = [
  { img: factory, tag: "Industry", date: "April 2026", title: "Bangladesh RMG exports cross USD 50B — what it means for buyers" },
  { img: sourcing, tag: "Sourcing", date: "March 2026", title: "Cotton vs. recycled blends: a cost and quality comparison for SS27" },
  { img: quality, tag: "Quality", date: "February 2026", title: "Inside our in-line QA protocol — how we cut defect rates by 38%" },
];

function News() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="News" title="Notes from the floor." lead="Sourcing trends, factory updates and what's shifting in Bangladesh garment supply." />
      <section className="container-x grid gap-8 py-24 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[5/4] overflow-hidden">
              <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <span>{p.tag}</span><span>·</span><span>{p.date}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl leading-tight text-primary">{p.title}</h3>
              <Link to="/news" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Read article <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
