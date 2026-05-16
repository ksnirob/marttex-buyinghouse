import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="border-b border-border/60 bg-secondary/40">
      <div className="container-x py-20 md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-primary md:text-6xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{lead}</p>}
      </div>
    </section>
  );
}
