"use client";

import { cities, jobs } from "@/lib/content";
import { useEffect, useMemo, useState } from "react";

const STATUS: Record<string, string> = {
  scan: "text-fog",
  packing: "text-ember",
  transit: "text-cyan",
  unpacking: "text-champagne",
};

export function LiveBoard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 2400);
    return () => window.clearInterval(id);
  }, []);

  const liveJobs = useMemo(
    () =>
      jobs.map((j, i) => ({
        ...j,
        eta: `${((tick + i * 3) % 46) + 4} min`,
        load: 92 - ((tick + i) % 7),
      })),
    [tick],
  );

  const pulse = cities[tick % cities.length];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="frame relative min-h-[420px] overflow-hidden lg:col-span-8">
        <p className="absolute left-4 top-4 z-10 kicker">North American corridor</p>
        <svg viewBox="0 0 100 100" className="h-full w-full min-h-[420px] bg-[#07080c]">
          <defs>
            <radialGradient id="g" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#10131c" />
              <stop offset="100%" stopColor="#050506" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#g)" />
          {[...Array(12)].map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              x2="100"
              y1={i * 9}
              y2={i * 9}
              stroke="rgba(216,199,176,0.06)"
              strokeWidth="0.15"
            />
          ))}
          {[...Array(14)].map((_, i) => (
            <line
              key={`v${i}`}
              y1="0"
              y2="100"
              x1={i * 7.5}
              x2={i * 7.5}
              stroke="rgba(216,199,176,0.06)"
              strokeWidth="0.15"
            />
          ))}
          <path
            d="M12 24 C 18 20, 22 28, 14 34 C 10 48, 16 62, 22 68 C 30 74, 38 62, 44 70 C 52 78, 64 72, 74 80 C 82 86, 88 72, 90 40 C 88 28, 80 24, 72 30 C 60 22, 50 32, 40 30 C 28 26, 20 18, 12 24"
            fill="none"
            stroke="rgba(79,224,208,0.22)"
            strokeWidth="0.4"
          />
          <path
            d="M12 46 L 24 64 L 44 70 L 60 38 L 84 36"
            fill="none"
            stroke="#4fe0d0"
            strokeWidth="0.35"
            className="map-route"
            strokeDasharray="2 2"
          />
          {cities.map((c) => (
            <g key={c.id}>
              <circle
                cx={c.x}
                cy={c.y}
                r={c.id === pulse.id ? 1.6 : c.status === "hub" ? 1.2 : 0.8}
                fill={c.status === "hub" ? "#4fe0d0" : "#d8c7b0"}
                opacity={c.id === pulse.id ? 1 : 0.8}
              />
              <text
                x={c.x + 1.8}
                y={c.y + 0.6}
                fill="#9aa3b0"
                fontSize="2.1"
                fontFamily="IBM Plex Mono, monospace"
              >
                {c.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="lg:col-span-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="kicker">Active missions</p>
          <span className="mono text-[10px] tracking-[0.16em] text-cyan">T+{tick * 2}s</span>
        </div>
        <ul className="divide-y divide-[var(--line)] border border-line">
          {liveJobs.map((j) => (
            <li key={j.id} className="px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="mono text-xs text-champagne">{j.id}</p>
                <p className={`mono text-[10px] uppercase tracking-[0.14em] ${STATUS[j.status]}`}>
                  {j.status}
                </p>
              </div>
              <p className="mt-1 text-sm text-fog">{j.route}</p>
              <p className="mt-1 mono text-[10px] uppercase tracking-[0.12em] text-mute">
                {j.unit} · {j.city} · eta {j.eta} · load {j.load}%
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
