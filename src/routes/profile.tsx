import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/site/Layout";
import factory from "@/assets/factory.jpg";
import quality from "@/assets/quality.jpg";
import sourcing from "@/assets/sourcing.jpg";
import {
  ClipboardCheck,
  Factory,
  FlaskConical,
  Gauge,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Shirt,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({
    meta: [
      { title: "Company Profile - Mart Tex" },
      {
        name: "description",
        content:
          "Mart Tex company profile: apparel manufacturing, sourcing, quality assurance, production capacity and product capabilities.",
      },
    ],
  }),
});

const stats = [
  { value: "2010", label: "Established" },
  { value: "14,000", label: "Sq ft production space" },
  { value: "149", label: "Listed machines" },
  { value: "2M+", label: "Own factory pieces / year" },
];

const products = [
  {
    title: "Womenswear",
    items: "T-shirts, polos, sweatshirts, hoodies, skirts, dresses, tops, blouses and tank tops.",
  },
  {
    title: "Menswear",
    items:
      "T-shirts, polos, sweatshirts, hoodies, underwear, boxers, shorts, swimming shorts and briefs.",
  },
  {
    title: "Kidswear",
    items:
      "Hoodies, frocks with lace, floral and sequins, girls' skirts, T-shirts, polos, sweatshirts and underwear.",
  },
  {
    title: "Bottoms & Denim",
    items:
      "Knit or woven trousers, denim pants, shorts, skirts and boxers in canvas, twill, bedford, ripstop and denim.",
  },
];

const qualitySops = [
  "Fabric and shade band inspection",
  "Trim and accessories inspection",
  "Pattern, spreading and cutting control",
  "Sewing quality and measurement checks",
  "Needle, sharp edge and metal detection control",
  "Finishing, packing and final inspection",
];

const tests = [
  "Dimensional stability, spirality and twisting",
  "Colour fastness to washing, rubbing, perspiration and light",
  "Tear, seam, bursting, pilling, abrasion and tensile strength",
  "Azo, pH, formaldehyde, nickel and heavy metal checks",
];

const machines = [
  { name: "Plain stitching", qty: "50", type: "Sewing" },
  { name: "Overlock", qty: "45", type: "Sewing" },
  { name: "Flat bed", qty: "12", type: "Sewing" },
  { name: "Cylinder bed", qty: "6", type: "Special" },
  { name: "Iron tables", qty: "6", type: "Finishing" },
  { name: "Cutting machines", qty: "2", type: "Cutting" },
  { name: "Generator", qty: "150 KV", type: "Utility" },
];

function Profile() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Company profile"
        title="Mart Tex apparel manufacturing and sourcing capability."
        lead="A Bangladesh readymade garment manufacturer, supplier and exporter producing knitwear in-house while sourcing woven, denim and lingerie programs through partner factories."
      />

      <section className="section-reveal bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">Overview</p>
            <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
              Production, sourcing and supply chain under one accountable team.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Mart Tex is an apparel manufacturing, international garment sourcing and supply chain
              management company focused on delivering the right goods to the right place at the
              right time. The company produces around 2 million pieces of garments per year in its
              own facility and can supply more than 20 million pieces through partner factories.
            </p>
            <p className="mt-4 text-muted-foreground">
              Its own factory focuses mainly on knitwear, with partner capability across woven,
              denim and lingerie programs. Payment modes include L/C and TT, with FOB, CIF and CF
              terms available.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-[oklch(0.985_0.006_205)] p-6"
              >
                <p className="font-display text-4xl text-primary">{s.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-reveal bg-[linear-gradient(180deg,oklch(0.95_0.014_205)_0%,oklch(0.985_0.004_205)_100%)] py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <img
            src={factory}
            alt="Garment production floor"
            width={1600}
            height={1000}
            loading="lazy"
            className="aspect-[5/4] w-full rounded-3xl object-cover shadow-[0_30px_80px_-55px_oklch(0.22_0.04_220/0.55)]"
          />
          <div>
            <p className="eyebrow">Product capability</p>
            <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
              Knitwear, woven bottoms, denim and kidswear programs.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <div
                  key={product.title}
                  className="rounded-2xl border border-white/80 bg-white p-6 shadow-sm"
                >
                  <Shirt className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-display text-2xl text-primary">{product.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{product.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-reveal bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Quality assurance</p>
              <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
                Built-in quality from fabric to final packing.
              </h2>
              <p className="mt-6 text-muted-foreground">
                The profile describes a zero-defect quality mindset supported by SOPs throughout
                fabric inspection, cutting, sewing, finishing and final inspection.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {qualitySops.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
                  <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Feature
              icon={FlaskConical}
              title="Laboratory testing"
              text="Pre-production, production and shipment samples can be tested through accredited labs such as Intertek, SGS, Bureau Veritas, TUV and UL."
            />
            <Feature
              icon={Ruler}
              title="Inspection steps"
              text="Pre-production, during-production and final inspections cover fabric, measurements, trims, workmanship, packing and assortment."
            />
            <Feature
              icon={ShieldCheck}
              title="Safety control"
              text="Workplace and product safety areas include building, fire, health, electrical, chemical, washing and raw material controls."
            />
          </div>
        </div>
      </section>

      <section className="section-reveal bg-[oklch(0.24_0.07_205)] py-20 text-white md:py-28">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow text-white/70">Machine resources</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">
              A practical machine base for knit and light woven production.
            </h2>
            <p className="mt-6 max-w-2xl text-white/70">
              The profile lists core sewing, cutting, finishing and utility equipment, including
              plain stitching, overlock, flat bed, cylinder bed, bar tack, button stitch, button
              hole, cutting, boiler and generator resources.
            </p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/8 p-5 shadow-[0_30px_90px_-70px_black] backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-accent/20 bg-[oklch(0.31_0.075_214)] p-6 text-white sm:col-span-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
                      Total listed resources
                    </p>
                    <p className="mt-2 font-display text-5xl">149</p>
                  </div>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
                    <Factory className="h-7 w-7" />
                  </span>
                </div>
              </div>

              {machines.map((machine) => (
                <div
                  key={machine.name}
                  className="rounded-2xl border border-white/12 bg-white/10 p-5 transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                        {machine.type}
                      </p>
                      <h3 className="mt-2 text-sm font-medium text-white">{machine.name}</h3>
                    </div>
                    <p className="font-display text-3xl leading-none text-white">{machine.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-reveal bg-white py-20 md:py-28">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-8">
            <Factory className="h-8 w-8 text-primary" />
            <h3 className="mt-5 font-display text-2xl text-primary">Factory address</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Nikunja-02, Road-09, House-07, Khilkhet, Dhaka-1229, Bangladesh.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <Gauge className="h-8 w-8 text-primary" />
            <h3 className="mt-5 font-display text-2xl text-primary">Capacity model</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Own factory knitwear production with partner factory support for larger and more
              varied product programs.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <PackageCheck className="h-8 w-8 text-primary" />
            <h3 className="mt-5 font-display text-2xl text-primary">Payment terms</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              L/C and TT payment modes with FOB, CIF and CF commercial terms.
            </p>
          </div>
        </div>
      </section>

      <section className="section-reveal container-x pb-24 md:pb-32">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={sourcing}
            alt="Garments and sourcing materials"
            width={1600}
            height={1000}
            loading="lazy"
            className="h-80 w-full object-cover md:h-[28rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/55 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-2xl flex-col justify-center p-8 text-primary-foreground md:p-12">
            <p className="eyebrow text-primary-foreground/70">Quality culture</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Control the value chain before defects reach the buyer.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-primary-foreground/80">
              Mart Tex's quality system focuses on early detection across fabric, trims, cutting,
              sewing, finishing and final inspection, supported by lab testing where required.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ClipboardCheck;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-[oklch(0.985_0.006_205)] p-7">
      <Icon className="h-7 w-7 text-primary" />
      <h3 className="mt-5 font-display text-2xl text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

void quality;
