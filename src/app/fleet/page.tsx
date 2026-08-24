import { PageHeader } from "@/components/PageHeader";
import { fleet } from "@/lib/content";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fleet",
  description: "Atlas, Finch, and Hauler — the Humanoid Movers crew.",
};

export default function FleetPage() {
  return (
    <>
      <PageHeader
        kicker="The machines"
        title="A crew that never strains, never ghosts, never drops the Bösendorfer."
        lede="Three platforms, one protocol. Humanoids for the building. Autonomous freight for the corridor. Oracle for the mind."
      />
      <div className="mx-auto max-w-7xl space-y-24 px-5 pb-24 md:px-8">
        {fleet.map((unit, i) => (
          <article
            key={unit.id}
            id={unit.id}
            className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div className="relative min-h-[420px] overflow-hidden">
              <Image
                src={unit.scene}
                alt={`${unit.name} in the field`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="kicker">{unit.class}</p>
              <h2 className="mt-3 text-5xl">{unit.name}</h2>
              <p className="mt-5 text-fog leading-relaxed">{unit.summary}</p>
              <p className="mt-4 mono text-xs uppercase tracking-[0.16em] text-cyan">
                {unit.height} · {unit.payload} · {unit.endurance}
              </p>
              <dl className="mt-8 divide-y divide-[var(--line)] border-y border-line">
                {unit.specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3 text-sm">
                    <dt className="text-mute">{k}</dt>
                    <dd className="text-right text-champagne">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
        <section className="grid gap-8 border-t border-line pt-16 lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden">
            <Image
              src="/media/atlas-portrait.jpg"
              alt="Atlas visor portrait"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="kicker">Oracle</p>
            <h2 className="mt-3 text-4xl">The fourth machine is a mind.</h2>
            <p className="mt-5 leading-relaxed text-fog">
              Oracle runs on SpaceXAI (Grok 4.6). It inventories rooms, prices corridors, predicts
              damage before a hand closes, and talks to you like a dispatcher who has already read
              the floor plan. Ask it anything from the dock on this page.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
