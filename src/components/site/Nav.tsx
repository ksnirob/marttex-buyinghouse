import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { assetUrl, type ApiCategory, type SiteSettings } from "@/lib/site-api";

const defaultMenu = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Profile", path: "/profile" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "News", path: "/news" },
];

export function Nav({ settings, categories }: { settings: SiteSettings; categories: ApiCategory[] }) {
  const [open, setOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const location = useLocation();
  const menu = (settings.menuItems?.length ? settings.menuItems : defaultMenu).filter(
    (item) => item.isActive !== false,
  );
  const logo = assetUrl(settings.logoUrl || "");
  const company = settings.companyName || "Mart Tex";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {logo && (
            <img src={logo} alt={company} className="h-11 w-auto max-w-44 object-contain" />
          )}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {menu.map((item) =>
            item.path === "/products" ? (
              <div className="group relative" key={item.path}>
                <Link to="/products" className={`inline-flex items-center gap-1 border-b-2 py-2 text-sm transition ${location.pathname.startsWith("/products") ? "border-primary text-primary" : "border-transparent text-foreground/80 hover:text-primary"}`}>
                  {item.label} <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-2 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mt-3 rounded-2xl border border-border bg-card p-2 shadow-2xl">
                    <Link to="/products" className="flex rounded-lg px-4 py-2.5 text-sm hover:bg-secondary">All Products</Link>
                    {categories.map((category) => (
                      <Link key={category._id} to="/products/$category" params={{ category: category.slug }} className="flex rounded-lg px-4 py-2.5 text-sm hover:bg-secondary">
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.path} to={item.path as never} className={`border-b-2 py-2 text-sm transition ${location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(`${item.path}/`)) ? "border-primary text-primary" : "border-transparent text-foreground/80 hover:text-primary"}`}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="hidden btn-primary lg:inline-flex">
            Let's Talk <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button aria-label="Toggle menu" className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {menu.map((item) =>
              item.path === "/products" ? (
                <div key={item.path}>
                  <button onClick={() => setMobileProducts(!mobileProducts)} className="flex w-full items-center justify-between rounded-md px-2 py-3 text-sm hover:bg-muted">
                    {item.label}<ChevronDown className={`h-4 w-4 transition ${mobileProducts ? "rotate-180" : ""}`} />
                  </button>
                  {mobileProducts && (
                    <div className="ml-3 flex flex-col border-l border-border pl-3">
                      <Link to="/products" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm hover:bg-muted">All Products</Link>
                      {categories.map((category) => (
                        <Link key={category._id} to="/products/$category" params={{ category: category.slug }} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm hover:bg-muted">{category.name}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.path} to={item.path as never} onClick={() => setOpen(false)} className={`rounded-md border-l-2 px-2 py-3 text-sm ${location.pathname === item.path ? "border-primary bg-muted text-primary" : "border-transparent hover:bg-muted"}`}>{item.label}</Link>
              ),
            )}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 justify-center">Let's Talk</Link>
          </div>
        </div>
      )}
    </header>
  );
}
