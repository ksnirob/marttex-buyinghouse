import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import factory from "@/assets/factory.jpg";
import quality from "@/assets/quality.jpg";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({ meta: [{ title: "About — Noor Threads" }, { name: "description", content: "Our story, values and team behind Noor Threads buying house." }] }),
});

const values = [
  { t: "Integrity first", d: "We say what we mean, quote what we'll deliver and own the gaps when they appear." },
  { t: "Quality is non-negotiable", d: "Inspections at every step, not just at final. Defects caught early cost less for everyone." },
  { t: "People before pieces", d: "We only work with factories that pay fairly, audit openly and treat workers with dignity." },
  { t: "Long partnerships", d: "Most of our buyers have been with us for 5+ years. That is how we measure success." },
];

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="A small team obsessed with getting your garments right."
        lead="Founded in 2007 in Dhaka, Noor Threads grew from a two-person merchandising desk into a 40-strong buying house representing brands from London, New York, Berlin and Sydney."
      />
      <section className="container-x grid gap-12 py-24 lg:grid-cols-2">
        <img src={factory} alt="Factory floor" width={1600} height={1000} loading="lazy" className="aspect-[5/4] w-full rounded-3xl object-cover" />
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">From a single tech pack to forty million pieces.</h2>
          <p className="mt-6 text-muted-foreground">Our founders started by helping a single European brand navigate Bangladesh's complex supply chain. Today we handle sourcing, production, QA and shipping for more than 120 brands — and we still answer every email ourselves.</p>
          <p className="mt-4 text-muted-foreground">We are headquartered in Banani, Dhaka, with a sampling studio in Narayanganj and merchandisers stationed inside our top partner factories.</p>
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="container-x">
          <p className="eyebrow">Our values</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl text-primary md:text-5xl">Four things we won't compromise on.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.t} className="rounded-2xl border border-border bg-card p-8">
                <CheckCircle2 className="h-7 w-7 text-primary" />
                <h3 className="mt-4 font-display text-2xl text-primary">{v.t}</h3>
                <p className="mt-2 text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-12 py-24 lg:grid-cols-[1fr_1.2fr]">
        <img src={quality} alt="Fabric quality check" width={1200} height={1400} loading="lazy" className="aspect-[3/4] w-full rounded-3xl object-cover" />
        <div>
          <p className="eyebrow">Compliance</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">Certifications you can stand behind.</h2>
          <p className="mt-6 text-muted-foreground">All partner factories are audited annually. Most carry WRAP, BSCI, Sedex SMETA, Accord and OEKO-TEX certifications. We share fresh audit reports with every order.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {["WRAP", "BSCI", "Sedex", "Accord", "OEKO-TEX", "GOTS"].map((c) => (
              <div key={c} className="rounded-xl border border-border bg-card px-4 py-5 text-center font-display text-lg text-primary">{c}</div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
