import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const productCats = [
  { hash: "all", label: "All Products" },
  { hash: "knit", label: "Knit & Jersey" },
  { hash: "woven", label: "Woven Shirts" },
  { hash: "denim", label: "Denim & Bottoms" },
  { hash: "outer", label: "Outerwear" },
  { hash: "kids", label: "Kids & Babywear" },
  { hash: "fabric", label: "Fabric & Trims" },
] as const;

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">N</span>
          <span className="font-display text-lg tracking-tight text-primary">Noor Threads</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/" className="text-sm text-foreground/80 transition hover:text-primary" activeProps={{ className: "text-primary font-medium" }} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/about" className="text-sm text-foreground/80 transition hover:text-primary" activeProps={{ className: "text-primary font-medium" }}>About</Link>

          {/* Products dropdown */}
          <div className="group relative">
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-sm text-foreground/80 transition hover:text-primary"
              activeProps={{ className: "text-primary font-medium" }}
            >
              Products <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <ul className="p-2">
                  {productCats.map((c) => (
                    <li key={c.hash}>
                      <Link
                        to="/products"
                        hash={c.hash}
                        className="flex items-center justify-between rounded-lg px-4 py-2.5 text-sm text-foreground/80 transition hover:bg-secondary hover:text-primary"
                      >
                        {c.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {links.slice(2).map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-foreground/80 transition hover:text-primary" activeProps={{ className: "text-primary font-medium" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="hidden btn-primary lg:inline-flex">
            Let's Talk <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            <Link to="/" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-sm hover:bg-muted">Home</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-sm hover:bg-muted">About</Link>
            <button onClick={() => setMobileProducts((v) => !v)} className="flex items-center justify-between rounded-md px-2 py-3 text-sm hover:bg-muted">
              Products <ChevronDown className={"h-4 w-4 transition " + (mobileProducts ? "rotate-180" : "")} />
            </button>
            {mobileProducts && (
              <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                {productCats.map((c) => (
                  <Link key={c.hash} to="/products" hash={c.hash} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary">
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
            {links.slice(2).map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-sm hover:bg-muted">
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 justify-center">
              Let's Talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
