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
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
          <svg className="absolute right-10 top-10 h-40 w-40 text-primary/15" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} cx="50" cy="50" r={5 + i * 4.5} />
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
