import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import { ArrowUpRight } from "lucide-react";
import { articles } from "./news.$slug";

export const Route = createFileRoute("/news/")({
  component: News,
  head: () => ({ meta: [{ title: "News — Mart Tex" }] }),
});

function News() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="News"
        title="Notes from the floor."
        lead="Sourcing trends, factory updates and what's shifting in Bangladesh garment supply."
      />
      <section className="section-reveal container-x grid gap-8 py-24 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((p) => (
          <article
            key={p.slug}
            className="group overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="aspect-[5/4] overflow-hidden">
              <img
                src={p.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <span>{p.tag}</span>
                <span>·</span>
                <span>{p.date}</span>
              </div>
              <Link
                to="/news/$slug"
                params={{ slug: p.slug }}
                className="mt-3 block font-display text-2xl leading-tight text-primary hover:underline underline-offset-2"
              >
                {p.title}
              </Link>
              <Link
                to="/news/$slug"
                params={{ slug: p.slug }}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                Read article <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
