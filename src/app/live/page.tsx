import { LiveBoard } from "@/components/LiveBoard";
import { PageHeader } from "@/components/PageHeader";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Live operations",
  description: "Watch Humanoid Movers crews in the field across North America.",
};

export default function LivePage() {
  return (
    <>
      <PageHeader
        kicker="Live ops"
        title="The fleet does not go dark."
        lede="Every unit, every crate, every corridor — streamed from the field. This is a live-style board of today's network."
      />
      <div className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <LiveBoard />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="relative min-h-[380px] overflow-hidden">
          <Image
            src="/media/ops-center.jpg"
            alt="Humanoid Movers operations center with a holographic city map and live robot feeds"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/50 to-transparent" />
          <div className="relative z-10 max-w-lg p-8 md:p-12">
            <p className="kicker">Pier 70 · Mission Control</p>
            <h2 className="mt-4 text-4xl">Four humans. Two thousand four hundred robots.</h2>
            <p className="mt-4 text-fog">
              Copilots watch exception states only. If a stair geometry surprises Atlas, a person
              is already on the loop.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
