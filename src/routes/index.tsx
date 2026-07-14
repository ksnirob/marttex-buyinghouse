import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Award,
  Factory,
  Globe2,
  Layers,
  Leaf,
  Shield,
  Sparkles,
  Calendar,
} from "lucide-react";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { API_URL, assetUrl } from "@/lib/site-api";

export const Route = createFileRoute("/")({
  loader: loadHomeContent,
  component: Index,
  head: () => ({
    meta: [{ title: "Mart Tex — Built on Threads, Driven by Trust" }],
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

type Testimonial = {
  name: string;
  role: string;
  initials: string;
  quote: string;
};

async function loadHomeContent() {
  try {
    const [brandsResponse, testimonialsResponse] = await Promise.all([
      fetch(`${API_URL}/api/content/home-brands`),
      fetch(`${API_URL}/api/content/home-testimonials`),
    ]);
    const [brandsResult, testimonialsResult] = await Promise.all([
      brandsResponse.json(),
      testimonialsResponse.json(),
    ]);
    const brandLogos = Array.isArray(brandsResult.data?.items)
      ? brandsResult.data.items
          .map((item: { image?: string }) => assetUrl(item.image))
          .filter(Boolean)
      : [];
    const testimonials = Array.isArray(testimonialsResult.data?.items)
      ? (testimonialsResult.data.items as Testimonial[])
      : [];

    return { brandLogos, testimonials };
  } catch {
    return { brandLogos: [], testimonials: [] };
  }
}

const exportCountries = [
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇸🇪", name: "Sweden" },
  { flag: "🇩🇰", name: "Denmark" },
  { flag: "🇪🇸", name: "Spain" },
  { flag: "🇮🇹", name: "Italy" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇯🇵", name: "Japan" },
  { flag: "🇰🇷", name: "South Korea" },
  { flag: "🇵🇱", name: "Poland" },
  { flag: "🇧🇪", name: "Belgium" },
  { flag: "🇳🇴", name: "Norway" },
];

function Index() {
  const homeContent = Route.useLoaderData();
  const [testimonialApi, setTestimonialApi] = useState<CarouselApi>();
  const brandLogos = homeContent.brandLogos;
  const testimonials = homeContent.testimonials;

  useEffect(() => {
    if (!testimonialApi) return;

    const id = window.setInterval(() => {
      testimonialApi.scrollNext();
    }, 3500);

    return () => window.clearInterval(id);
  }, [testimonialApi]);

  const countryRows = [
    { code: "us", name: "United States" },
    { code: "gb", name: "United Kingdom" },
    { code: "de", name: "Germany" },
    { code: "fr", name: "France" },
    { code: "nl", name: "Netherlands" },
    { code: "se", name: "Sweden" },
    { code: "dk", name: "Denmark" },
    { code: "es", name: "Spain" },
    { code: "it", name: "Italy" },
    { code: "ca", name: "Canada" },
    { code: "au", name: "Australia" },
    { code: "jp", name: "Japan" },
    { code: "kr", name: "South Korea" },
    { code: "pl", name: "Poland" },
    { code: "be", name: "Belgium" },
    { code: "no", name: "Norway" },
  ];

  return (
    <SiteLayout>
      {/* HERO SLIDER */}
      <section className="relative overflow-hidden">
        <BgShapes variant="hero" />
        <HeroSlider />
        {/* <div className="container-x pb-16">
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
        </div> */}
      </section>

      {/* ABOUT STRIP */}
      <section className="section-reveal bg-white py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src={factory}
              alt="Garment factory floor"
              width={1600}
              height={1000}
              loading="lazy"
              className="aspect-[5/4] w-full rounded-3xl object-cover shadow-[0_30px_80px_-55px_oklch(0.22_0.04_220/0.55)]"
            />
            <img
              src={quality}
              alt="Fabric quality inspection"
              width={1200}
              height={1400}
              loading="lazy"
              className="absolute -bottom-10 -right-6 hidden aspect-[3/4] w-48 rounded-2xl border-4 border-white object-cover shadow-xl md:block"
            />
          </div>
          <div className="lg:pl-8">
            <p className="eyebrow">About us</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-primary md:text-5xl">
              A buying house that feels like an extension of your team.
            </h2>
            <p className="mt-6 text-muted-foreground">
              For nearly two decades we have helped brands navigate Bangladesh's garment industry —
              from the first sketch to the final container. We pair the right factory to the right
              product, hold the line on quality, and keep your timeline honest.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { i: Sparkles, t: "Design to delivery" },
                { i: Leaf, t: "Ethical, audited supply" },
                { i: Shield, t: "AQL inspections" },
                { i: Globe2, t: "Worldwide logistics" },
              ].map(({ i: Icon, t }) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-xl border border-border/80 bg-[oklch(0.985_0.006_205)] p-4 shadow-sm"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/12 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium">{t}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Read our story <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* COMPANY PROFILE */}
      <section className="section-reveal bg-[oklch(0.24_0.07_205)] py-20 text-white md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-white/70">Factory profile</p>
            <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
              Established manufacturing capacity with partner factory reach.
            </h2>
            <p className="mt-5 text-white/70">
              Mart Tex was established in 2010 with own knitwear production, a 14,000 sq ft facility
              and partner factory support for woven, denim and larger apparel programs.
            </p>
            <Link
              to="/profile"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              View company profile <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Factory, value: "14,000", label: "Sq ft production space" },
              { icon: Layers, value: "2M+", label: "Own factory pieces / year" },
              { icon: Shield, value: "149", label: "Listed machines" },
              { icon: Globe2, value: "20M+", label: "Partner factory supply capacity" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-2xl border border-white/15 bg-white/8 p-6">
                <Icon className="h-6 w-6 text-accent" />
                <p className="mt-5 font-display text-4xl text-white">{value}</p>
                <p className="mt-2 text-sm text-white/65">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section-reveal bg-[linear-gradient(180deg,oklch(0.95_0.014_205)_0%,oklch(0.985_0.004_205)_100%)] py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Product capability</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl text-primary md:text-5xl">
                What we make, what we ship.
              </h2>
            </div>
            <Link to="/products" className="btn-outline">
              All categories <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <Link
                to="/products"
                key={p.name}
                className="group overflow-hidden rounded-2xl border border-white/70 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    width={1000}
                    height={1200}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
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

      {/* GLOBAL REACH */}
      <section className="section-reveal overflow-hidden bg-[oklch(0.24_0.07_205)] py-16 text-white md:py-24">
        <div className="container-x">
          <div className="overflow-hidden py-12 md:py-16">
            <div className="px-6 text-center">
              <p className="eyebrow justify-center rounded-full bg-white/10 px-4 py-2 text-white/70">
                Global reach
              </p>
              <h2 className="mt-5 font-display text-4xl text-white md:text-5xl">
                We Export To <span className="text-accent">15+ Countries</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                From North America to Asia-Pacific, our garments reach buyers and retailers across
                the globe.
              </p>
            </div>

            <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 space-y-4 overflow-hidden">
              <div className="overflow-hidden">
                <div className="flex w-max animate-country-left gap-4">
                  {[...countryRows, ...countryRows].map((country, i) => (
                    <div
                      key={`top-${country.name}-${i}`}
                      className="flex h-14 min-w-44 items-center gap-3 rounded-2xl border border-white/15 bg-white/95 px-5 text-sm font-medium text-foreground shadow-sm"
                    >
                      <img
                        src={`https://flagcdn.com/w40/${country.code}.png`}
                        alt={`${country.name} flag`}
                        width={28}
                        height={20}
                        loading="lazy"
                        className="h-5 w-7 rounded-[2px] object-cover"
                      />
                      <span>{country.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex w-max animate-country-right gap-4">
                  {[...countryRows]
                    .reverse()
                    .concat([...countryRows].reverse())
                    .map((country, i) => (
                      <div
                        key={`bottom-${country.name}-${i}`}
                        className="flex h-14 min-w-44 items-center gap-3 rounded-2xl border border-white/15 bg-white/95 px-5 text-sm font-medium text-foreground shadow-sm"
                      >
                        <img
                          src={`https://flagcdn.com/w40/${country.code}.png`}
                          alt={`${country.name} flag`}
                          width={28}
                          height={20}
                          loading="lazy"
                          className="h-5 w-7 rounded-[2px] object-cover"
                        />
                        <span>{country.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-reveal bg-white py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow">Services</p>
              <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
                From the first stitch to the last mile.
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Four core services, one accountable team. We work as an integrated partner so your
                buyers stay focused on the brand, not on the back-office.
              </p>
              <Link to="/services" className="btn-primary mt-8">
                Explore services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map(({ icon: Icon, t, d }) => (
                <div
                  key={t}
                  className="rounded-2xl border border-border/80 bg-[oklch(0.985_0.006_205)] p-6 shadow-sm"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-primary">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOP BRANDS */}
      {brandLogos.length > 0 && (
      <section className="section-reveal overflow-hidden border-y border-border bg-[linear-gradient(180deg,white_0%,oklch(0.97_0.006_205)_100%)] py-12 md:py-16">
        <div className="container-x">
          <div className="text-center">
            <p className="eyebrow justify-center">Trusted by</p>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Top Brands</h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              We connect global fashion brands with Bangladesh's top garment manufacturers —
              handling sourcing, sampling, production and shipping under one roof.
            </p>
          </div>

          <div className="mx-auto mt-8 w-full max-w-6xl overflow-hidden">
            <div className="flex w-max animate-brand-marquee items-center gap-3 sm:gap-5 md:gap-8">
              {[...brandLogos, ...brandLogos].map((logo, i) => (
                <div
                  key={i}
                  className="flex h-20 w-28 shrink-0 items-center justify-center px-1 sm:w-32 md:h-24 md:w-44"
                >
                  <img
                    src={logo}
                    alt=""
                    loading="lazy"
                    className="h-16 w-auto max-w-[130px] object-contain sm:h-20 sm:max-w-[160px] md:h-24 md:max-w-[210px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* LET'S WORK TOGETHER */}
      <section className="section-reveal bg-[oklch(0.975_0.006_205)] py-24 md:py-32">
        <div className="container-x">
          <div className="relative grid items-center overflow-hidden rounded-3xl border border-border/80 bg-[linear-gradient(135deg,white_0%,oklch(0.94_0.015_205)_100%)] shadow-[0_30px_90px_-70px_oklch(0.22_0.04_220/0.7)] md:grid-cols-[1.1fr_1fr]">
            {/* Decorative leaf shape */}
            <svg
              aria-hidden
              viewBox="0 0 400 400"
              className="pointer-events-none absolute right-1/3 top-1/2 hidden h-[28rem] w-[28rem] -translate-y-1/2 text-primary/[0.06] md:block"
            >
              <path
                d="M200 40 C 90 90 50 200 90 320 C 160 290 220 220 240 140 C 250 100 230 60 200 40 Z"
                fill="currentColor"
              />
              <path
                d="M210 80 C 240 140 240 220 200 300"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            <div className="relative z-10 p-10 md:p-16">
              <p className="eyebrow">Get in touch</p>
              <h2 className="mt-4 font-display text-5xl leading-[1.05] text-primary md:text-6xl">
                Let's Work <em className="italic font-normal">Together.</em>
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Whether you're sampling a capsule or scaling a season, our Dhaka team plugs into
                your workflow — quick replies, transparent costing and factories that match your
                product.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Contact us <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link to="/services" className="btn-outline">
                  How we work <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative h-72 md:h-full md:min-h-[28rem]">
              <img
                src={sourcing}
                alt="Stacked garments on a studio chair"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-transparent to-transparent md:from-[oklch(0.94_0.015_205)] md:via-[oklch(0.94_0.015_205/0.3)]" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
      <section className="section-reveal relative overflow-hidden bg-[oklch(0.965_0.011_205)] py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.61_0.14_150/0.12),transparent_58%)]" />

        <div className="container-x text-center">
          <p className="eyebrow justify-center">Partner voices</p>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Testimonials</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            We're not just another buying house — we're your local production partner in Bangladesh,
            trusted by global fashion brands for reliability, transparency and craft.
          </p>
        </div>

        <div className="container-x mt-14">
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={setTestimonialApi}
            className="w-full"
          >
            <CarouselContent className="-ml-5">
              {testimonials.map((t) => (
                <CarouselItem key={t.name} className="pl-5 md:basis-1/2 lg:basis-1/3">
                  <figure className="flex h-full flex-col rounded-2xl border border-white/80 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <span className="font-display text-5xl leading-none text-primary/20">"</span>
                    <div className="-mt-2 flex gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6L10 14.9 4.6 17.9l1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/80">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 font-display text-sm text-primary">
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-medium leading-tight text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-center gap-3">
              <CarouselPrevious className="relative left-auto top-auto translate-y-0 h-11 w-11 rounded-full border-border bg-white shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary" />
              <CarouselNext className="relative right-auto top-auto translate-y-0 h-11 w-11 rounded-full border-border bg-white shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary" />
            </div>
          </Carousel>
        </div>
      </section>
      )}

      {/* NEWS / INSIGHTS — editorial */}
      <section className="section-reveal relative overflow-hidden bg-white py-24 md:py-32">
        <BgShapes variant="soft" />
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">News & insights</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl text-primary md:text-5xl">
                From the floor, to your feed.
              </h2>
            </div>
            <Link to="/news" className="btn-outline">
              All articles <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Feature post */}
            <Link
              to="/news/$slug"
              params={{ slug: "bangladesh-rmg-exports" }}
              className="group relative block overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="aspect-[16/11] overflow-hidden">
                <img
                  src={factory}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="rounded-full bg-secondary px-3 py-1">Industry</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" /> April 2026
                  </span>
                </div>
                <h3 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-primary md:text-4xl">
                  Bangladesh RMG exports cross USD 50B — what it means for buyers
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Read story{" "}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Side posts */}
            <div className="flex flex-col gap-6">
              {[
                {
                  slug: "cotton-recycled-blends",
                  img: sourcing,
                  tag: "Sourcing",
                  date: "March 2026",
                  title: "Cotton vs. recycled blends: a cost & quality look at SS27",
                },
                {
                  slug: "qa-protocol",
                  img: quality,
                  tag: "Quality",
                  date: "February 2026",
                  title: "Inside our QA protocol — defect rate cut by 38%",
                },
                {
                  slug: "knitwear-capacity",
                  img: knit,
                  tag: "Capability",
                  date: "January 2026",
                  title: "Knitwear capacity: what 12M pieces a season looks like",
                },
              ].map((p) => (
                <Link
                  key={p.slug}
                  to="/news/$slug"
                  params={{ slug: p.slug }}
                  className="group grid grid-cols-[140px_1fr] gap-5 overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[180px_1fr]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={p.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-4 pr-5">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{p.tag}</span>
                      <span className="text-primary/30">·</span>
                      <span>{p.date}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg leading-snug text-primary md:text-xl">
                      {p.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-70 transition group-hover:opacity-100">
                      Read more <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-reveal bg-white pb-24 md:pb-32">
        <div className="container-x">
          <div className="relative grid place-items-center gap-10 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,oklch(0.24_0.07_205)_0%,oklch(0.31_0.075_214)_58%,oklch(0.38_0.11_150)_100%)] p-10 text-center text-primary-foreground shadow-[0_35px_90px_-55px_oklch(0.24_0.07_205/0.8)] md:p-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative max-w-3xl">
              <h2 className="font-display text-4xl md:text-5xl">
                Have a tech pack? Let's price it.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80">
                Send your tech pack, target FOB and quantity. We'll come back within 48 hours with
                the right factory and a clear quote.
              </p>
            </div>
            <div className="relative flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
              >
                Request a Quote <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:info@marttex.net"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10 sm:w-auto"
              >
                Email us <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

void sourcing;
