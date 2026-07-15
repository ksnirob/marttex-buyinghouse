import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { API_URL, assetUrl, getPublicSiteData, type ApiCategory, type SiteSettings } from "@/lib/site-api";

export function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [settings, setSettings] = useState<SiteSettings>({});
  const [categories, setCategories] = useState<ApiCategory[]>([]);

  useEffect(() => {
    void getPublicSiteData()
      .then((data) => {
        setSettings(data.settings);
        setCategories(data.categories);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const faviconUrl = assetUrl(settings.faviconUrl);
    if (!faviconUrl) return;
    const versionedUrl = `${faviconUrl}${faviconUrl.includes("?") ? "&" : "?"}v=${encodeURIComponent(settings.faviconUrl || "")}`;

    const setIcon = (rel: string) => {
      let icon = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!icon) {
        icon = document.createElement("link");
        icon.rel = rel;
        document.head.appendChild(icon);
      }
      icon.href = versionedUrl;
    }

    setIcon("icon");
    setIcon("shortcut icon");
    setIcon("apple-touch-icon");
  }, [settings.faviconUrl]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".section-reveal"));

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    const frame = window.requestAnimationFrame(() => {
      sections.forEach((section) => observer.observe(section));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav settings={settings} categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${(settings.whatsapp || settings.phones?.[0] || "8801905450850").replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl"
      >
        <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  const location = useLocation();
  const [pageContent, setPageContent] = useState<{
    title?: string;
    body?: string;
    seoTitle?: string;
    seoDescription?: string;
    thumbnail?: string;
  } | null>(null);

  useEffect(() => {
    const path = location.pathname.replace(/^\/|\/$/g, "");
    const supportedPages = new Set([
      "about",
      "profile",
      "products",
      "services",
      "gallery",
      "news",
      "contact",
    ]);

    if (!supportedPages.has(path)) {
      setPageContent(null);
      return;
    }

    const controller = new AbortController();
    fetch(`${API_URL}/api/content/page-${path}-header`, { signal: controller.signal })
      .then((response) => response.json())
      .then((result) => setPageContent(result.data || null))
      .catch(() => setPageContent(null));

    return () => controller.abort();
  }, [location.pathname]);

  useEffect(() => {
    if (!pageContent) return;
    const seoTitle = pageContent.seoTitle || pageContent.title;
    const seoDescription = pageContent.seoDescription || pageContent.body;
    const thumbnail = assetUrl(pageContent.thumbnail);

    if (seoTitle) document.title = seoTitle;

    const setMeta = (selector: string, attribute: "name" | "property", key: string, content?: string) => {
      if (!content) return;
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setMeta('meta[name="description"]', "name", "description", seoDescription);
    setMeta('meta[property="og:title"]', "property", "og:title", seoTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", seoDescription);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", seoTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", seoDescription);
    setMeta('meta[property="og:image"]', "property", "og:image", thumbnail);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", thumbnail);
  }, [pageContent]);

  const displayedTitle = pageContent?.title || title;
  const displayedLead = pageContent?.body || lead;

  return (
    <section className="section-reveal border-b border-border/60 bg-secondary/40">
      <div className="container-x py-20 md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-primary md:text-6xl">
          {displayedTitle}
        </h1>
        {displayedLead && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{displayedLead}</p>}
      </div>
    </section>
  );
}
