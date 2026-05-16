import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import { Boxes, ClipboardCheck, Factory, Globe2, Layers, Palette, Ruler, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({ meta: [{ title: "Services — Noor Threads" }, { name: "description", content: "Sourcing, sampling, production, QA, compliance and logistics services." }] }),
});

const items = [
  { i: Palette, t: "Product Development", d: "From mood board and tech pack to first proto. Pattern, fit and trim engineering done in-house." },
  { i: Layers, t: "Sourcing", d: "Fabric, trims and accessories from mills we know personally. Best price, predictable lead times." },
  { i: Ruler, t: "Sampling", d: "Salesman, fit, size set and PPS samples in nine days on average." },
  { i: Factory, t: "Production", d: "Allocation across 60+ audited factories, matched to product type, capacity and certification needs." },
  { i: ShieldCheck, t: "Quality Assurance", d: "In-line, mid-line and final inspections to AQL 2.5 — or your custom protocol." },
  { i: ClipboardCheck, t: "Compliance", d: "WRAP, BSCI, Sedex SMETA, Accord. Fresh audit reports with every PO." },
  { i: Boxes, t: "Packing & Labelling", d: "Polybag, carton, hangtag, RFID. Retailer-ready straight from the factory floor." },
  { i: Globe2, t: "Logistics", d: "FCL, LCL, air. Door-to-door with customs handled by our forwarding partners." },
];

function Services() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Services" title="Eight services, one accountable team." lead="Pick the bundle you need. Most brands work with us end-to-end — from a sketch to a stocked warehouse." />
      <section className="container-x grid gap-6 py-24 md:grid-cols-2">
        {items.map(({ i: Icon, t, d }) => (
          <div key={t} className="flex gap-5 rounded-2xl border border-border bg-card p-7">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon className="h-6 w-6" /></span>
            <div>
              <h3 className="font-display text-2xl text-primary">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="container-x">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">A predictable, six-step process.</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Brief & quote", "Send tech pack, target FOB and quantity. Quote in 48 hours."],
              ["02", "Sampling", "Proto, fit and PPS samples within 9–14 days."],
              ["03", "Factory match", "Allocation to the right audited factory."],
              ["04", "Production", "Daily WIP, photo updates, in-line QA."],
              ["05", "Final inspection", "AQL 2.5 final inspection, report shared."],
              ["06", "Shipping", "Container loading, BL, doc handover."],
            ].map(([n, t, d]) => (
              <li key={n} className="rounded-2xl border border-border bg-card p-7">
                <span className="font-display text-3xl text-accent">{n}</span>
                <h3 className="mt-3 font-display text-xl text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteLayout>
  );
}
