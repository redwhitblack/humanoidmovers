import { PageHeader } from "@/components/PageHeader";
import { company } from "@/lib/content";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Company",
  description: "The company behind the first commercial humanoid moving fleet.",
};

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        kicker="Manifest"
        title="We built a moving company the way SpaceX built a launch company."
        lede="Start with the hard problem. Verticalize the machine. Sell the service, not the robot. Relentlessly retire the analog step."
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 md:grid-cols-2 md:px-8">
        <div className="relative min-h-[420px]">
          <Image
            src="/media/hallway-walk.jpg"
            alt="Atlas walking a residential hallway with stacked crates"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-fog">
          <p>
            Humanoid Movers is the first commercial humanoid relocation fleet in North America.
            Founded {company.founded}, based at {company.hq}. We do not sell robots. We sell a
            finished move.
          </p>
          <p>
            Atlas and Finch share a champagne-titanium platform: collaborative safety envelope,
            tactile skin, stair-capable gait, eighteen-hour packs. Software is the difference —
            heavy-lift versus conservator hands. Hauler is the corridor: an electric bay that
            treats humidity like a museum would.
          </p>
          <p>
            Oracle, our dispatcher, is built on SpaceXAI. It talks like a person, prices like a
            spreadsheet, and never loses the inventory graph. If you can describe the house, it
            can stage the crew.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="grid gap-px bg-line md:grid-cols-3">
          {[
            ["What we are", "A logistics company with a robotics manufacturing core."],
            ["What we are not", "A lab demo. The fleet is in buildings, on stairs, in the rain."],
            ["Who we serve", "Homes and studios that refuse to be treated like cargo."],
          ].map(([t, b]) => (
            <article key={t} className="bg-void p-8">
              <h2 className="text-2xl">{t}</h2>
              <p className="mt-3 text-fog">{b}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 grid gap-8 border-t border-line pt-12 md:grid-cols-2">
          <div>
            <p className="kicker">Press</p>
            <a href={`mailto:${company.press}`} className="mt-3 block text-xl hover:text-cyan">
              {company.press}
            </a>
          </div>
          <div>
            <p className="kicker">Dispatch</p>
            <a href={`mailto:${company.email}`} className="mt-3 block text-xl hover:text-cyan">
              {company.email}
            </a>
            <p className="mt-2 mono text-sm text-mute">{company.phone}</p>
          </div>
        </div>
      </div>
    </>
  );
}
