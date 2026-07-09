import { Mail, MapPin, Phone, User } from "lucide-react";
import { assetUrl, type SiteSettings } from "@/lib/site-api";

const defaultExplore = [
  { label: "About", path: "/about" },
  { label: "Profile", path: "/profile" },
  { label: "Products", path: "/products" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "News", path: "/news" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const company = settings.companyName || "Mart Tex";
  const logo = assetUrl(settings.logoUrl);
  const links = (settings.menuItems?.length ? settings.menuItems : defaultExplore).filter(
    (item) => item.isActive !== false && item.path !== "/",
  );

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container-x grid gap-12 py-20 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            {logo ? (
              <img src={logo} alt={company} className="h-12 w-auto max-w-52 object-contain brightness-0 invert" />
            ) : (
              <>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground font-display text-lg text-primary">{company.charAt(0)}</span>
                <span className="font-display text-xl">{company}</span>
              </>
            )}
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
            {settings.footerText ||
              "A Bangladesh-based buying house connecting global fashion brands with vetted, ethical garment manufacturers — from sample to shipment."}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            {links.map((item) => (
              <li key={item.path}><a href={item.path} className="hover:text-primary-foreground">{item.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
            {settings.address && <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{settings.address}</li>}
            {settings.contactPerson && <li className="flex items-start gap-2"><User className="mt-0.5 h-4 w-4 shrink-0" />{settings.contactPerson}</li>}
            {(settings.phones || []).map((phone) => (
              <li key={phone} className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /><a href={`tel:${phone}`} className="hover:text-primary-foreground">{phone}</a></li>
            ))}
            {settings.email && <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /><a href={`mailto:${settings.email}`} className="hover:text-primary-foreground">{settings.email}</a></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {company}. {settings.copyrightText || "All rights reserved."}</p>
          <p>Built on threads. Driven by trust.</p>
        </div>
      </div>
    </footer>
  );
}
