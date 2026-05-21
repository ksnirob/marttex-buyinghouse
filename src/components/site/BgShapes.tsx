export function BgShapes({ variant = "default" }: { variant?: "default" | "hero" | "soft" }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* grain dots */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" className="text-primary/15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {variant === "hero" && (
        <>
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl animate-blob" />
          <div className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
          <div className="absolute top-1/3 left-1/2 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-blob" style={{ animationDelay: "-8s" }} />
          <svg className="absolute right-10 top-10 h-40 w-40 text-primary/15 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} cx="50" cy="50" r={5 + i * 4.5} />
            ))}
          </svg>
          <svg className="absolute left-8 bottom-16 h-32 w-32 text-primary/10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.4">
            {Array.from({ length: 8 }).map((_, i) => (
              <polygon key={i} points="50,5 95,75 5,75" transform={`rotate(${i * 45} 50 50) scale(${1 - i * 0.08})`} style={{ transformOrigin: "50px 50px" }} />
            ))}
          </svg>
        </>
      )}

      {variant === "default" && (
        <>
          <div className="absolute -top-40 right-1/4 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        </>
      )}

      {variant === "soft" && (
        <div className="absolute top-1/2 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
      )}
    </div>
  );
}
