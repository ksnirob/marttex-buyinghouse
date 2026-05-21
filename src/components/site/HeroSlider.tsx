import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import hero from "@/assets/hero-garments.jpg";
import factory from "@/assets/factory.jpg";
import quality from "@/assets/quality.jpg";
import sourcing from "@/assets/sourcing.jpg";

type Slide = {
  img: string;
  eyebrow: string;
  title: React.ReactNode;
  desc: string;
  cta: { label: string; to: string };
};

const slides: Slide[] = [
  {
    img: hero,
    eyebrow: "Bangladesh buying house",
    title: (<>Built on <em className="italic font-normal">Threads,</em><br />Driven by <em className="italic font-normal">Trust.</em></>),
    desc: "Empowering global fashion brands with seamless sourcing, ethical production and dependable partnerships from the heart of Dhaka.",
    cta: { label: "Request a Quote", to: "/contact" },
  },
  {
    img: factory,
    eyebrow: "Production at scale",
    title: (<>Factories you can <em className="italic font-normal">trust,</em><br />timelines you can <em className="italic font-normal">ship.</em></>),
    desc: "60+ audited partner factories across knit, woven, denim and outerwear — capacity ready when your season is.",
    cta: { label: "See Capabilities", to: "/products" },
  },
  {
    img: quality,
    eyebrow: "Quality assurance",
    title: (<>Inspected to the <em className="italic font-normal">last stitch.</em></>),
    desc: "AQL 2.5 in-line and final inspections, third-party verified, with photo reports delivered to your inbox.",
    cta: { label: "Our Services", to: "/services" },
  },
  {
    img: sourcing,
    eyebrow: "Sourcing & trims",
    title: (<>The right fabric, at the <em className="italic font-normal">right price.</em></>),
    desc: "Direct mill access for cotton, blends, denim and sustainable yarns — fast samples, transparent costing.",
    cta: { label: "Talk to Sourcing", to: "/contact" },
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const total = slides.length;
  const go = (n: number) => setI((n + total) % total);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % total), 6500);
    return () => clearInterval(id);
  }, [total]);

  const s = slides[i];

  return (
    <div className="container-x grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:py-28">
      {/* Text side — animates per slide via key */}
      <div key={`t-${i}`} className="animate-fade-up">
        <p className="eyebrow"><span className="h-px w-8 bg-muted-foreground/60" /> {s.eyebrow}</p>
        <h1 className="mt-6 font-display text-5xl leading-[1.02] text-primary md:text-6xl lg:text-7xl">
          {s.title}
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">{s.desc}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to={s.cta.to} className="btn-primary">{s.cta.label} <ArrowUpRight className="h-4 w-4" /></Link>
          <Link to="/products" className="btn-outline">See Our Products <ArrowUpRight className="h-4 w-4" /></Link>
        </div>

        {/* Controls + dots */}
        <div className="mt-12 flex items-center gap-5">
          <div className="flex gap-2">
            <button onClick={() => go(i - 1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => go(i + 1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-primary/30 text-primary transition hover:bg-primary hover:text-primary-foreground">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={"h-1.5 rounded-full transition-all duration-500 " + (idx === i ? "w-10 bg-primary" : "w-5 bg-primary/25 hover:bg-primary/50")} />
            ))}
          </div>
          <span className="ml-auto font-display text-sm text-muted-foreground">
            {String(i + 1).padStart(2, "0")} <span className="text-primary/30">/</span> {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Image side */}
      <div className="relative">
        <div className="absolute -inset-6 -z-10 rounded-3xl bg-accent/30 blur-2xl" />
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_oklch(0.22_0.04_220/0.5)]">
          {slides.map((sl, idx) => (
            <img
              key={idx}
              src={sl.img}
              alt=""
              width={1600}
              height={1200}
              className={"absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out " + (idx === i ? "scale-100 opacity-100" : "scale-110 opacity-0")}
            />
          ))}
          {/* gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
          {/* floating chip */}
          <div className="absolute bottom-5 left-5 rounded-full bg-background/90 px-4 py-2 backdrop-blur">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.eyebrow}</p>
          </div>
        </div>
        {/* progress bar */}
        <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-primary/10">
          <div key={`p-${i}`} className="h-full bg-primary" style={{ animation: "progress 6.5s linear forwards" }} />
        </div>
      </div>
    </div>
  );
}
