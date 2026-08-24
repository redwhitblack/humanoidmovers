import { DispatchForm } from "@/components/DispatchForm";
import { PageHeader } from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dispatch",
  description: "Get an instant Humanoid Movers quote and stage a crew.",
};

export default function DispatchPage() {
  return (
    <>
      <PageHeader
        kicker="Dispatch"
        title="Tell us the addresses. We’ll send the machines."
        lede="Instant quote, specialty loads, and a confirmation you can actually track. No estimate that evaporates on moving day."
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-12 md:px-8">
        <div className="lg:col-span-7">
          <DispatchForm />
        </div>
        <aside className="space-y-6 lg:col-span-5">
          <div className="border border-line p-6">
            <p className="kicker">Included</p>
            <ul className="mt-4 space-y-3 text-sm text-fog">
              <li>Full inventory scan and object graph</li>
              <li>Pack, load, transit, unpack</li>
              <li>Art-grade climate cells for fragile lots</li>
              <li>Live board tracking</li>
              <li>Damage underwriting at declared value</li>
            </ul>
          </div>
          <div className="border border-line p-6">
            <p className="kicker">Oracle</p>
            <p className="mt-3 text-fog">
              Unsure about a piano, a walk-up, or a same-week window? Open Ask Oracle in the
              corner. It prices and specs in plain language.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
