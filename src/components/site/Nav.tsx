import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">N</span>
          <span className="font-display text-lg tracking-tight text-primary">Noor Threads</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-foreground/80 transition hover:text-primary"
              activeProps={{ className: "text-primary font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
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
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm hover:bg-muted"
              >
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
