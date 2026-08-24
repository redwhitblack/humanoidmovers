import { PageHeader } from "@/components/PageHeader";
import { operations } from "@/lib/content";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Operations",
  description: "How Humanoid Movers scans, packs, transits, and unpacks a home.",
};

export default function OperationsPage() {
  return (
    <>
      <PageHeader
        kicker="Protocol"
        title="A move with a control loop, not a clipboard."
        lede="Every object is scanned, every newton is measured, every mile is live. You watch it. We underwrite it."
      />
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="space-y-20">
          {operations.map((op) => (
            <article key={op.n} className="grid items-center gap-10 lg:grid-cols-2">
              <div className="relative min-h-[340px] overflow-hidden">
                <Image
                  src={op.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="mono text-cyan">{op.n}</p>
                <h2 className="mt-3 text-5xl">{op.title}</h2>
                <p className="mt-2 mono text-[11px] uppercase tracking-[0.16em] text-mute">{op.kicker}</p>
                <p className="mt-6 text-lg leading-relaxed text-fog">{op.body}</p>
              </div>
            </article>
          ))}
        </div>
        <section className="mt-24 grid gap-8 border-t border-line pt-16 md:grid-cols-3">
          {[
            ["Insurance", "Every object in the graph is covered at declared value. Claims are a rarity we treat as a systems bug."],
            ["HOA / buildings", "We file elevator windows, COIs, and night-load permits before a robot rolls onto the curb."],
            ["Human override", "A remote copilot can take any unit. Neighbors still see machines. You still have a person."],
          ].map(([t, b]) => (
            <article key={t} className="border-t border-line pt-5">
              <h3 className="text-2xl">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{b}</p>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
