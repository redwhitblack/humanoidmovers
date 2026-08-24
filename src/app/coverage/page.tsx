import { PageHeader } from "@/components/PageHeader";
import { cities } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coverage",
  description: "Humanoid Movers cities and hub arrival times.",
};

export default function CoveragePage() {
  const hubs = cities.filter((c) => c.status === "hub");
  const live = cities.filter((c) => c.status === "live");
  return (
    <>
      <PageHeader
        kicker="Network"
        title="Fourteen cities. Same robots. Same night window."
        lede="Hubs hold Atlas, Finch, and Hauler on hot standby. Live cities share a corridor with the nearest hub. Long-haul between hubs is a scheduled Hauler run."
      />
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <p className="kicker mb-6">Hubs</p>
        <div className="grid gap-4 md:grid-cols-3">
          {hubs.map((c) => (
            <article key={c.id} className="frame p-6">
              <p className="mono text-[11px] uppercase tracking-[0.16em] text-cyan">{c.region}</p>
              <h2 className="mt-2 text-3xl">{c.name}</h2>
              <p className="mt-3 text-sm text-fog">Median arrival {c.eta}. Full inventory scan on-site.</p>
            </article>
          ))}
        </div>
        <p className="kicker mb-6 mt-16">Live cities</p>
        <div className="divide-y divide-[var(--line)] border-y border-line">
          {live.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="text-lg text-champagne">{c.name}</p>
                <p className="mono text-[11px] uppercase tracking-[0.14em] text-mute">{c.region}</p>
              </div>
              <p className="mono text-sm text-cyan">{c.eta} median</p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border border-line p-8">
          <div>
            <h2 className="text-3xl">Not on the map?</h2>
            <p className="mt-2 max-w-lg text-fog">
              Point-to-point between live cities is standard. Ask Oracle about a corridor we have
              not announced — Hauler already runs dark miles for staging.
            </p>
          </div>
          <Link href="/dispatch" className="btn btn-primary">
            Request a corridor
          </Link>
        </div>
      </div>
    </>
  );
}
