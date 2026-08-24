"use client";

import Image from "next/image";
import Link from "next/link";
import { cases, fleet, operations, stats } from "@/lib/content";

export function HomeView() {
  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden">
        <Image
          src="/media/hero-penthouse.jpg"
          alt="Atlas-class humanoid carrying a sealed crate through a rain-lit penthouse"
          fill
          priority
          sizes="100vw"
          className="img-ken object-cover"
        />
        <div className="vignette absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-void/25 to-transparent" />

        <div className="hud absolute left-5 top-6 hidden md:block md:left-8">
          UNIT ATLAS-07
          <br />
          PAYLOAD 48.2 KG
          <br />
          INTEGRITY 100.00
        </div>
        <div className="hud absolute right-5 top-6 hidden text-right md:block md:right-8">
          SF · PIER 70
          <br />
          RAIN CELL 11%
          <br />
          ETA 00:11:04
        </div>

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-28 pt-24 md:px-8 md:pb-20 md:pt-28">
          <p className="kicker">Commercial humanoid fleet · North America</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(2.7rem,11vw,8.6rem)] text-champagne">
            The last
            <br />
            moving
            <br className="sm:hidden" /> company.
          </h1>
          <p className="lede mt-6 max-w-xl">
            We don’t hire crews. We deploy them. Humanoid robots pack, lift, and relocate your
            life — millimetric care, industrial strength, night-legal freight.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/dispatch" className="btn btn-primary">
              Dispatch a crew
            </Link>
            <Link href="/live" className="btn btn-ghost">
              Watch live ops
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-px border-y border-line bg-line md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-void px-6 py-10">
            <p className="display text-4xl text-champagne md:text-5xl">{s.value}</p>
            <p className="mt-3 mono text-[11px] tracking-[0.18em] uppercase text-cyan">{s.label}</p>
            <p className="mt-2 text-sm text-mute">{s.hint}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="kicker">Why we exist</p>
            <h2 className="mt-4 text-4xl text-champagne md:text-6xl">
              Moving is the last analog labor left in a digital house.
            </h2>
          </div>
          <p className="lede max-w-md">
            Everything else in a home is measured, scheduled, insured. The move is still strangers,
            tape, and a maybe. We replaced that with a fleet you can watch.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-12">
          <figure className="relative min-h-[340px] overflow-hidden md:col-span-7 md:min-h-[520px]">
            <Image
              src="/media/night-load.jpg"
              alt="Three Atlas units loading crates into an autonomous electric Hauler on a rain-slick street"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-void to-transparent p-6">
              <p className="kicker">Hauler bay · night corridor</p>
              <p className="mt-2 display text-2xl">Six robots. One silent truck. Zero shouting.</p>
            </figcaption>
          </figure>
          <div className="grid gap-4 md:col-span-5">
            <figure className="relative min-h-[250px] overflow-hidden">
              <Image
                src="/media/kitchen-pack.jpg"
                alt="Finch wrapping crystal wine glasses in a modern kitchen"
                fill
                sizes="40vw"
                className="object-cover"
              />
            </figure>
            <figure className="relative min-h-[250px] overflow-hidden">
              <Image
                src="/media/hand-detail.jpg"
                alt="Close-up of a titanium articulated hand seating a porcelain teacup into foam"
                fill
                sizes="40vw"
                className="object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-panel/40">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <p className="kicker">Operations</p>
          <h2 className="mt-4 max-w-3xl text-4xl md:text-6xl">Scan. Pack. Transit. Unpack.</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {operations.map((op) => (
              <article key={op.n} className="border-t border-line pt-6">
                <p className="mono text-cyan">{op.n}</p>
                <h3 className="mt-4 text-3xl">{op.title}</h3>
                <p className="mt-2 mono text-[11px] tracking-[0.16em] uppercase text-mute">{op.kicker}</p>
                <p className="mt-4 text-sm leading-relaxed text-fog">{op.body}</p>
              </article>
            ))}
          </div>
          <Link href="/operations" className="btn btn-ghost mt-12">
            Full protocol
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="kicker">The crew</p>
            <h2 className="mt-4 text-4xl md:text-6xl">Three machines. One move.</h2>
          </div>
          <Link href="/fleet" className="btn btn-ghost hidden md:inline-flex">
            Spec the fleet
          </Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {fleet.map((unit) => (
            <Link key={unit.id} href={`/fleet#${unit.id}`} className="group frame overflow-hidden">
              <div className="relative h-72">
                <Image
                  src={unit.image}
                  alt={`${unit.name} ${unit.class}`}
                  fill
                  sizes="33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="kicker">{unit.class}</p>
                <h3 className="mt-3 text-3xl">{unit.name}</h3>
                <p className="mt-3 text-sm text-fog">{unit.summary}</p>
                <p className="mt-5 mono text-[11px] tracking-[0.16em] uppercase text-cyan">
                  {unit.payload} · {unit.endurance}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src="/media/piano-lift.jpg"
          alt="Atlas lifting a concert grand piano in a sunlit brownstone"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-void/55" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-end px-5 py-20 md:px-8">
          <div className="max-w-2xl">
            <p className="kicker">Impossible loads</p>
            <h2 className="mt-4 text-4xl md:text-6xl">A piano is a geometry problem. We solved it.</h2>
            <p className="lede mt-5">
              Atlas treats mass as a control loop, not a grunt. If it fits the stair, it leaves with
              us — no crane, no street permit theater.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <p className="kicker">Field notes</p>
        <h2 className="mt-4 text-4xl md:text-6xl">Moves that used to be a production.</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cases.map((c) => (
            <article key={c.title}>
              <div className="relative h-56 overflow-hidden">
                <Image src={c.image} alt="" fill sizes="33vw" className="object-cover" />
              </div>
              <p className="mt-5 mono text-[11px] tracking-[0.16em] uppercase text-cyan">{c.city}</p>
              <h3 className="mt-2 text-2xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <div className="frame relative overflow-hidden px-8 py-16 md:px-16">
          <Image
            src="/media/atlas-portrait.jpg"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="relative z-10 max-w-2xl">
            <p className="kicker">Ready when you are</p>
            <h2 className="mt-4 text-4xl md:text-6xl">Give us an address. We’ll send a crew.</h2>
            <p className="lede mt-5">
              Instant quote, live tracking, white-glove unpack. Oracle will spec the robots. You
              keep the keys.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dispatch" className="btn btn-primary">
                Get a quote
              </Link>
              <Link href="/coverage" className="btn btn-ghost">
                See coverage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
