import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Factory, Globe2, Layers, Leaf, Shield, Sparkles, Calendar } from "lucide-react";
import factory from "@/assets/factory.jpg";
import quality from "@/assets/quality.jpg";
import sourcing from "@/assets/sourcing.jpg";
import knit from "@/assets/product-knit.jpg";
import denim from "@/assets/product-denim.jpg";
import woven from "@/assets/product-woven.jpg";
import kids from "@/assets/product-kids.jpg";
import { SiteLayout } from "@/components/site/Layout";
import { BgShapes } from "@/components/site/BgShapes";
import { HeroSlider } from "@/components/site/HeroSlider";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [{ title: "Noor Threads — Built on Threads, Driven by Trust" }],
  }),
});

const stats = [
  { v: "18+", l: "Years sourcing" },
  { v: "120+", l: "Global brands" },
  { v: "40M", l: "Pieces shipped / yr" },
  { v: "60+", l: "Partner factories" },
];

const products = [
  { img: knit, name: "Knit & Jersey", desc: "T-shirts, polos, sweats, loungewear" },
  { img: woven, name: "Woven Shirts", desc: "Casual, formal, oxford, flannel" },
  { img: denim, name: "Denim & Bottoms", desc: "Jeans, chinos, shorts, jackets" },
  { img: kids, name: "Kids & Babywear", desc: "Soft, safe, certified fabrics" },
];

const services = [
  { icon: Layers, t: "Sourcing", d: "Fabric, trims and accessories at the best mill price." },
  { icon: Factory, t: "Production", d: "Vetted factories, audited for compliance and capacity." },
  { icon: Shield, t: "Quality Assurance", d: "In-line and final inspections aligned to AQL 2.5." },
  { icon: Globe2, t: "Logistics", d: "Door-to-door shipping, customs and consolidation." },
];

function Index() {
  return (
    <SiteLayout>
      {/* HERO SLIDER */}
      <section className="relative overflow-hidden">
        <BgShapes variant="hero" />
        <HeroSlider />
        <div className="container-x pb-16">
          <dl className="grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l}>
                <dt className="font-display text-3xl text-primary">{s.v}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><Award className="h-5 w-5" /></span>
            <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">WRAP & BSCI</span> certified partner factories</p>
          </div>
        </div>
      </section>



      {/* ABOUT STRIP */}
      <section className="container-x grid gap-12 py-24 lg:grid-cols-2 lg:py-32">
        <div className="relative">
          <img src={factory} alt="Garment factory floor" width={1600} height={1000} loading="lazy" className="aspect-[5/4] w-full rounded-3xl object-cover" />
          <img src={quality} alt="Fabric quality inspection" width={1200} height={1400} loading="lazy" className="absolute -bottom-10 -right-6 hidden aspect-[3/4] w-48 rounded-2xl border-4 border-background object-cover shadow-xl md:block" />
        </div>
        <div className="lg:pl-8">
          <p className="eyebrow">About us</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-primary md:text-5xl">
            A buying house that feels like an extension of your team.
          </h2>
          <p className="mt-6 text-muted-foreground">
            For nearly two decades we have helped brands navigate Bangladesh's garment industry — from the first sketch to the final container. We pair the right factory to the right product, hold the line on quality, and keep your timeline honest.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { i: Sparkles, t: "Design to delivery" },
              { i: Leaf, t: "Ethical, audited supply" },
              { i: Shield, t: "AQL inspections" },
              { i: Globe2, t: "Worldwide logistics" },
            ].map(({ i: Icon, t }) => (
              <li key={t} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                <span className="text-sm font-medium">{t}</span>
              </li>
            ))}
          </ul>
          <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline">
            Read our story <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Product capability</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl text-primary md:text-5xl">What we make, what we ship.</h2>
            </div>
            <Link to="/products" className="btn-outline">All categories <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <Link to="/products" key={p.name} className="group overflow-hidden rounded-2xl bg-card transition hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.img} alt={p.name} width={1000} height={1200} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-primary">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">From the first stitch to the last mile.</h2>
            <p className="mt-6 max-w-md text-muted-foreground">Four core services, one accountable team. We work as an integrated partner so your buyers stay focused on the brand, not on the back-office.</p>
            <Link to="/services" className="btn-primary mt-8">Explore services <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {services.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-5 font-display text-xl text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP BRANDS */}
      <section className="relative overflow-hidden border-y border-border bg-secondary/40 py-20 md:py-28">
        <BgShapes variant="soft" />
        <div className="container-x text-center">
          <p className="eyebrow justify-center">Our partners</p>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Top Brands</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            We're a trusted buying house connecting global fashion brands with Bangladesh's top garment manufacturers — handling sourcing, sampling, production and shipping under one roof.
          </p>
        </div>

        {/* Marquee rows */}
        <div className="mt-14 space-y-8">
          {[
            { dir: "left",  items: ["AURELIA", "MONT&CO", "NORTHWIND", "VESPER", "LOOMERY", "KINDRED", "HARLOW", "ATELIER 9"] },
            { dir: "right", items: ["BRIDGEPORT", "STITCH&CO", "OAKMONT", "RAVEN", "SAINT MARA", "FIELDNOTE", "RIVERA", "NORDEN"] },
          ].map((row, ri) => (
            <div key={ri} className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div
                className="flex w-max gap-14 px-6 will-change-transform"
                style={{ animation: `marquee-${row.dir} 40s linear infinite` }}
              >
                {[...row.items, ...row.items, ...row.items].map((b, i) => (
                  <div
                    key={`${b}-${i}`}
                    className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-border bg-card px-6 font-display text-xl tracking-[0.15em] text-primary/70 shadow-sm transition hover:scale-105 hover:text-primary hover:shadow-md"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LET'S WORK TOGETHER */}
      <section className="container-x py-24 md:py-32">
        <div className="relative grid items-center overflow-hidden rounded-3xl border border-border bg-secondary/60 md:grid-cols-[1.1fr_1fr]">
          {/* Decorative leaf shape */}
          <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute right-1/3 top-1/2 hidden h-[28rem] w-[28rem] -translate-y-1/2 text-primary/[0.06] md:block">
            <path d="M200 40 C 90 90 50 200 90 320 C 160 290 220 220 240 140 C 250 100 230 60 200 40 Z" fill="currentColor" />
            <path d="M210 80 C 240 140 240 220 200 300" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          <div className="relative z-10 p-10 md:p-16">
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] text-primary md:text-6xl">
              Let's Work <em className="italic font-normal">Together.</em>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Whether you're sampling a capsule or scaling a season, our Dhaka team plugs into your workflow — quick replies, transparent costing and factories that match your product.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Contact us <ArrowUpRight className="h-4 w-4" /></Link>
              <Link to="/services" className="btn-outline">How we work <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>

          <div className="relative h-72 md:h-full md:min-h-[28rem]">
            <img
              src={sourcing}
              alt="Stacked garments on a studio chair"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-transparent to-transparent md:from-secondary md:via-secondary/30" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-primary-foreground/5 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />

        <div className="container-x text-center">
          <p className="eyebrow justify-center text-primary-foreground/70">Partner voices</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Testimonials</h2>
          <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/75">
            We're not just another buying house — we're your local production partner in Bangladesh, trusted by global fashion brands for reliability, transparency and craft.
          </p>
        </div>

        <div className="container-x mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Elena Marquez", role: "Head of Sourcing, Aurelia Studio", initials: "EM", quote: "Noor Threads runs our Dhaka supply like it's their own brand. Sample turnaround dropped to nine days and our defect rate is the lowest in five seasons." },
            { name: "Tomás Bernal",  role: "Founder, Mont&Co",                 initials: "TB", quote: "From tech pack to FOB in record time. The QA photo reports alone are worth the partnership — we never ship a season blind anymore." },
            { name: "Priya Anand",   role: "Production Lead, Loomery",          initials: "PA", quote: "Their factory matching is unreal. Knit, denim, outerwear — every program lands with a mill that actually wants to make it well." },
            { name: "Jonas Weber",   role: "Buyer, Northwind Apparel",          initials: "JW", quote: "Honest costing, no surprises at shipment. That's the part most buying houses fail at, and the part Noor gets exactly right." },
            { name: "Amara Okafor",  role: "Design Director, Vesper",           initials: "AO", quote: "They speak design as fluently as they speak production. Trims and fabric ideas come back as good as what we briefed." },
            { name: "Liam Chen",     role: "Operations, Kindred Goods",         initials: "LC", quote: "Three seasons in and they feel like an extension of our team. Calm, accountable, and obsessed with the details." },
          ].map((t) => (
            <figure
              key={t.name}
              className="group relative flex flex-col rounded-2xl bg-primary-foreground/[0.06] p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-primary-foreground/[0.1]"
            >
              <span className="font-display text-6xl leading-none text-accent/80">"</span>
              <div className="-mt-3 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6L10 14.9 4.6 17.9l1.3-6L1.3 7.7l6.1-.6L10 1.5z" /></svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-primary-foreground/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-primary-foreground/10 pt-5">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-foreground/15 font-display text-sm">{t.initials}</div>
                <div>
                  <p className="font-medium leading-tight">{t.name}</p>
                  <p className="text-xs text-primary-foreground/65">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>


      {/* NEWS / INSIGHTS — editorial */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <BgShapes variant="soft" />
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">News & insights</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl text-primary md:text-5xl">From the floor, to your feed.</h2>
            </div>
            <Link to="/news" className="btn-outline">All articles <ArrowUpRight className="h-4 w-4" /></Link>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Feature post */}
            <Link to="/news" className="group relative block overflow-hidden rounded-3xl border border-border bg-card">
              <div className="aspect-[16/11] overflow-hidden">
                <img src={factory} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-8 text-primary-foreground md:p-10">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-primary-foreground/80">
                  <span className="rounded-full bg-primary-foreground/15 px-3 py-1 backdrop-blur">Industry</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-3 w-3" /> April 2026</span>
                </div>
                <h3 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-4xl">Bangladesh RMG exports cross USD 50B — what it means for buyers</h3>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">Read story <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
            </Link>

            {/* Side posts */}
            <div className="flex flex-col gap-6">
              {[
                { img: sourcing, tag: "Sourcing", date: "March 2026", title: "Cotton vs. recycled blends: a cost & quality look at SS27" },
                { img: quality, tag: "Quality", date: "February 2026", title: "Inside our QA protocol — defect rate cut by 38%" },
                { img: knit, tag: "Capability", date: "January 2026", title: "Knitwear capacity: what 12M pieces a season looks like" },
              ].map((p) => (
                <Link key={p.title} to="/news" className="group grid grid-cols-[140px_1fr] gap-5 overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[180px_1fr]">
                  <div className="overflow-hidden">
                    <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col justify-center py-4 pr-5">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{p.tag}</span><span className="text-primary/30">·</span><span>{p.date}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg leading-snug text-primary md:text-xl">{p.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-70 transition group-hover:opacity-100">Read more <ArrowUpRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-24 md:pb-32">
        <div className="relative grid items-center gap-10 overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:grid-cols-[1.4fr_1fr] md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl">Have a tech pack? Let's price it.</h2>
            <p className="mt-4 max-w-lg text-primary-foreground/80">Send your tech pack, target FOB and quantity. We'll come back within 48 hours with the right factory and a clear quote.</p>
          </div>
          <div className="relative flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:shadow-lg">Request a Quote <ArrowUpRight className="h-4 w-4" /></Link>
            <a href="mailto:hello@noorthreads.com" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10">Email us <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

void sourcing;

