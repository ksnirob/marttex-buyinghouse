import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-primary text-primary-foreground">
      <div className="container-x grid gap-12 py-20 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground text-primary font-display text-lg">N</span>
            <span className="font-display text-xl">Noor Threads</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
            A Bangladesh-based buying house connecting global fashion brands with vetted, ethical garment manufacturers — from sample to shipment.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-primary-foreground">About</Link></li>
            <li><Link to="/products" className="hover:text-primary-foreground">Products</Link></li>
            <li><Link to="/services" className="hover:text-primary-foreground">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-primary-foreground">Gallery</Link></li>
            <li><Link to="/news" className="hover:text-primary-foreground">News</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" /> House 24, Road 11, Banani, Dhaka 1213</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4" /> +880 1700 000 000</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4" /> hello@noorthreads.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Noor Threads. All rights reserved.</p>
          <p>Built on threads. Driven by trust.</p>
        </div>
      </div>
    </footer>
  );
}
