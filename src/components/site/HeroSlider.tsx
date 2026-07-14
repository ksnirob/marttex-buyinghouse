import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import male1 from "@/assets/model-male-1.png";
import kid from "@/assets/model-kid.png";
import male2 from "@/assets/model-male-2.png";
import s2a from "@/assets/model-s2-male1.png";
import s2k from "@/assets/model-s2-kid.png";
import s2b from "@/assets/model-s2-male2.png";
import s3a from "@/assets/model-s3-male1.png";
import s3k from "@/assets/model-s3-kid.png";
import s3b from "@/assets/model-s3-male2.png";
import s4a from "@/assets/model-s4-male1.png";
import s4k from "@/assets/model-s4-kid.png";
import s4b from "@/assets/model-s4-male2.png";
import { API_URL, assetUrl } from "@/lib/site-api";

type Scene = {
  word: string;
  eyebrow: string;
  desc: string;
  models: string[];
};

const scenes: Scene[] = [
  {
    word: "CRAFT",
    eyebrow: "Spring / Summer 27",
    desc: "Defy the ordinary. Garments engineered with the kind of patience and detail your customer can feel.",
    models: [male1, kid, male2],
  },
  {
    word: "SOURCE",
    eyebrow: "Built in Bangladesh",
    desc: "Sourced, cut and stitched in audited Dhaka factories — the same hands behind the brands you already wear.",
    models: [s2a, s2k, s2b],
  },
  {
    word: "FAMILY",
    eyebrow: "Men · Women · Kids",
    desc: "From everyday menswear to soft, safe kidswear — one team, one quality bar, across every category.",
    models: [s3a, s3k, s3b],
  },
];

const HOLD = 4200;

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [dynamicScenes, setDynamicScenes] = useState<Scene[]>([]);
  const activeScenes = dynamicScenes.length ? dynamicScenes : scenes;
  const total = activeScenes.length;

  const go = (n: number) => {
    setTransitioning(true);
    window.setTimeout(() => {
      setI((n + total) % total);
      setTransitioning(false);
    }, 650);
  };

  useEffect(() => {
    const id = window.setInterval(() => go(i + 1), HOLD);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  useEffect(() => {
    fetch(`${API_URL}/api/content/page-home`)
      .then((response) => response.json())
      .then((result) => {
        const content = result.data;
        const items = Array.isArray(content?.items) ? content.items : [];
        const nextScenes = items
          .map((item: { word?: string; eyebrow?: string; description?: string; images?: string[] }) => ({
            word: item.word || "CREATE",
            eyebrow: item.eyebrow || "",
            desc: item.description || "",
            models: (item.images || []).map(assetUrl),
          }))
          .filter((item: Scene) => item.models.length > 0);
        if (nextScenes.length) {
          setDynamicScenes(nextScenes);
          setI(0);
        }

        if (content?.seoTitle) document.title = content.seoTitle;
        const metadata = [
          ["name", "description", content?.seoDescription],
          ["property", "og:title", content?.seoTitle],
          ["property", "og:description", content?.seoDescription],
          ["property", "og:image", assetUrl(content?.thumbnail)],
          ["name", "twitter:title", content?.seoTitle],
          ["name", "twitter:description", content?.seoDescription],
          ["name", "twitter:image", assetUrl(content?.thumbnail)],
        ];
        metadata.forEach(([attribute, key, value]) => {
          if (!value) return;
          let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute(attribute, key);
            document.head.appendChild(meta);
          }
          meta.content = value;
        });
      })
      .catch(() => undefined);
  }, []);

  const s = activeScenes[i] || activeScenes[0];

  return (
    <div className="relative isolate overflow-hidden bg-[oklch(0.975_0.006_205)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.36 0.07 220 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.36 0.07 220 / 0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to top, black, transparent)",
          transform: "perspective(900px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container-x flex items-center justify-between pt-6 text-[10px] uppercase tracking-[0.3em] text-primary/60 sm:pt-6">
        <span>{s.eyebrow}</span>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-5 z-0 flex justify-center sm:inset-0 sm:top-0 sm:items-center sm:pb-0">
          <h1
            key={`w-${i}`}
            className="select-none whitespace-nowrap font-display font-bold leading-none text-primary text-[clamp(4.7rem,24vw,22rem)] sm:text-[clamp(6rem,22vw,22rem)]"
            style={{
              letterSpacing: "-0.04em",
              animation: transitioning
                ? "word-out 0.65s cubic-bezier(.7,0,.3,1) forwards"
                : "word-in 0.9s cubic-bezier(.2,.7,.2,1) forwards",
              WebkitTextStroke: "1px oklch(0.36 0.07 220)",
            }}
          >
            <span
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.36 0.07 220) 0%, oklch(0.36 0.07 220) 55%, oklch(0.7 0.13 55) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {s.word}
            </span>
          </h1>
        </div>

        <div className="container-x relative grid h-[350px] grid-cols-3 items-end gap-2 pt-16 sm:h-[clamp(360px,58svh,680px)] sm:gap-6 sm:pt-0 xl:h-[clamp(460px,70svh,820px)]">
          {s.models.map((src, idx) => {
            const delay = idx * 120;
            const yOffset = 0;
            return (
              <figure
                key={`${i}-${idx}`}
                className="relative flex h-full items-end justify-center"
                style={{
                  animation: transitioning
                    ? `model-out 0.55s ease-out ${delay}ms forwards`
                    : `model-in 0.9s cubic-bezier(.2,.7,.2,1) ${delay}ms both`,
                }}
              >
                <span
                  aria-hidden
                  className="absolute bottom-[6%] left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-full bg-primary/25 blur-2xl"
                />
                <img
                  src={src}
                  alt=""
                  width={768}
                  height={1536}
                  className="relative z-10 h-[72%] w-auto max-w-full object-contain drop-shadow-[0_30px_40px_oklch(0.22_0.04_220/0.25)] sm:h-[86%] xl:h-[94%]"
                  style={{ transform: `translateY(${yOffset}px)` }}
                />
              </figure>
            );
          })}
        </div>

        <div className="pointer-events-none relative z-20 flex justify-center px-6 pb-8 sm:mt-0 sm:px-6 sm:pb-8">
          <p
            key={`d-${i}`}
            className="pointer-events-auto max-w-md text-center text-sm leading-relaxed text-primary/75 sm:text-base"
            style={{
              animation: transitioning ? "fade-out-soft 0.4s forwards" : "fade-up 0.8s 0.3s both",
            }}
          >
            {s.desc}
          </p>
        </div>
      </div>

      <div className="container-x grid items-center gap-4 border-t border-primary/10 py-5 sm:mt-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-2 justify-self-center md:justify-self-start">
          <button
            onClick={() => go(i - 1)}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-primary/20 text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(i + 1)}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-primary/20 text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="ml-3 flex items-center gap-2">
            {activeScenes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => idx !== i && go(idx)}
                aria-label={`Scene ${idx + 1}`}
                className={
                  "h-1.5 rounded-full transition-all duration-500 " +
                  (idx === i ? "w-10 bg-primary" : "w-4 bg-primary/25 hover:bg-primary/50")
                }
              />
            ))}
          </div>
        </div>

        <Link
          to="/products"
          className="inline-flex max-w-full items-center justify-self-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg sm:px-6 sm:text-[11px] sm:tracking-[0.25em]"
        >
          Explore the collection <ArrowUpRight className="h-4 w-4" />
        </Link>
        <span aria-hidden className="hidden md:block" />
      </div>
    </div>
  );
}
