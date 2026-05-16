import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex(((index ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex(((index ?? 0) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, images.length, onClose, onIndex]);

  if (!open || index === null) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 p-4 backdrop-blur-sm animate-fade-up">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition hover:bg-primary-foreground/20"
      >
        <X className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + images.length) % images.length); }}
        aria-label="Previous"
        className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition hover:bg-primary-foreground/20 md:left-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <img
        src={images[index]}
        alt=""
        className="max-h-[88vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % images.length); }}
        aria-label="Next"
        className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition hover:bg-primary-foreground/20 md:right-10"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-primary-foreground/70">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

export function useLightbox() {
  const [i, set] = useState<number | null>(null);
  return { index: i, open: (n: number) => set(n), close: () => set(null), to: (n: number) => set(n) };
}
