import Link from "next/link";

export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="3" y="5" width="26" height="22" rx="7" fill="none" stroke="#d8c7b0" strokeWidth="1.6" />
      <rect x="8" y="14" width="16" height="4" rx="2" fill="#4fe0d0" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Humanoid Movers home">
      <Mark />
      <span className="display text-[15px] tracking-[0.18em] text-champagne">
        HUMANOID
        {!compact && (
          <span className="ml-1.5 font-medium tracking-[0.22em] text-fog/80 group-hover:text-cyan transition-colors">
            MOVERS
          </span>
        )}
      </span>
    </Link>
  );
}
