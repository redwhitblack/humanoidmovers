"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Concierge } from "./Concierge";
import { Logo } from "./Logo";
import { company, nav, tickerItems } from "@/lib/content";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="grid-bg min-h-screen">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-cyan focus:px-3 focus:py-2 focus:text-void"
      >
        Skip to content
      </a>
      <div className="relative z-[60] overflow-hidden border-b border-line bg-void">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap py-2">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="mono text-[10px] tracking-[0.22em] uppercase text-fog/80">
              <span className="mr-3 text-cyan">●</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <header className={`sticky top-0 z-40 ${scrolled ? "nav-glass" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
                  pathname === item.href ? "text-cyan" : "text-fog hover:text-champagne"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/dispatch" className="btn btn-primary">
              Dispatch
            </Link>
          </nav>
          <button
            type="button"
            className="mono text-[11px] tracking-[0.18em] uppercase text-champagne md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" className="border-t border-line bg-void px-5 py-6 md:hidden">
            <div className="flex flex-col gap-4">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="display text-2xl text-champagne">
                  {item.label}
                </Link>
              ))}
              <Link href="/dispatch" className="btn btn-primary mt-2 w-full">
                Dispatch a crew
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main id="content">{children}</main>

      <footer className="mt-24 border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-6 max-w-md text-fog">{company.lede}</p>
          </div>
          <div>
            <p className="kicker">Network</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-fog">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-cyan">
                  {item.label}
                </Link>
              ))}
              <Link href="/dispatch" className="hover:text-cyan">
                Dispatch
              </Link>
            </div>
          </div>
          <div>
            <p className="kicker">Signal</p>
            <div className="mt-4 space-y-2 text-sm text-fog">
              <p>{company.hq}</p>
              <a className="block hover:text-cyan" href={`mailto:${company.email}`}>
                {company.email}
              </a>
              <p className="mono text-xs tracking-widest">{company.phone}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-5 text-[11px] text-mute md:px-8">
          <p className="mono tracking-[0.16em] uppercase">
            © {new Date().getFullYear()} Humanoid Movers · Fleet ops, North America
          </p>
          <p className="mono tracking-[0.16em] uppercase">Oracle by SpaceXAI</p>
        </div>
      </footer>
      <Concierge />
    </div>
  );
}
