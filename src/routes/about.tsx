import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import factory from "@/assets/factory.jpg";
import quality from "@/assets/quality.jpg";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About - Mart Tex" },
      {
        name: "description",
        content: "Our story, values and team behind Mart Tex apparel manufacturing and sourcing.",
      },
    ],
  }),
});

const values = [
  {
    t: "Integrity first",
    d: "We say what we mean, quote what we'll deliver and own the gaps when they appear.",
  },
  {
    t: "Quality is non-negotiable",
    d: "Inspections at every step, from fabric and trims to sewing, finishing and final packing.",
  },
  {
    t: "People before pieces",
    d: "Workplace safety, health safety, fire safety and product safety are part of the production system.",
  },
  {
    t: "Reliable supply",
    d: "Own factory production is supported by partner factory capacity for larger and more varied programs.",
  },
];

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="A manufacturing and sourcing team focused on getting garments right."
        lead="Established in 2010 in Dhaka, Mart Tex is a readymade garment manufacturer, supplier and exporter with own knitwear production and partner factory capacity across woven, denim and lingerie."
      />
      <section className="section-reveal container-x grid gap-12 py-24 lg:grid-cols-2">
        <img
          src={factory}
          alt="Factory floor"
          width={1600}
          height={1000}
          loading="lazy"
          className="aspect-[5/4] w-full rounded-3xl object-cover"
        />
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
            From own knitwear production to partner factory supply.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Mart Tex produces around 2 million pieces of garments per year in its own facility and
            can supply more than 20 million pieces through partner factories. The work spans
            manufacturing, sourcing, quality assurance and supply chain management.
          </p>
          <p className="mt-4 text-muted-foreground">
            The factory and office are located at Nikunja-02, Road-09, House-07, Khilkhet,
            Dhaka-1229, Bangladesh.
          </p>
        </div>
      </section>

      <section className="section-reveal bg-secondary/40 py-24">
        <div className="container-x">
          <p className="eyebrow">Our values</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl text-primary md:text-5xl">
            Four things we will not compromise on.
          </h2>
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

      <section className="section-reveal container-x grid items-center gap-12 py-24 lg:grid-cols-[1fr_1.2fr]">
        <img
          src={quality}
          alt="Fabric quality check"
          width={1200}
          height={1400}
          loading="lazy"
          className="aspect-[3/4] w-full rounded-3xl object-cover"
        />
        <div>
          <p className="eyebrow">Quality and safety</p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
            Controls you can stand behind.
          </h2>
          <p className="mt-6 text-muted-foreground">
            The factory profile describes SOP-driven quality control, laboratory testing through
            accredited labs, workplace safety monitoring and product safety checks across raw
            material sourcing, dyeing, washing and chemicals.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              "Fabric SOP",
              "Cutting SOP",
              "Sewing QA",
              "Final Inspection",
              "Lab Testing",
              "Safety Control",
            ].map((c) => (
              <div
                key={c}
                className="rounded-xl border border-border bg-card px-4 py-5 text-center font-display text-lg text-primary"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
