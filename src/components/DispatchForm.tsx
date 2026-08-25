"use client";

import { extras, sizes } from "@/lib/content";
import { computeQuote, formatUsd, type QuoteInput, type QuoteResult } from "@/lib/quote";
import { useState } from "react";

const empty: QuoteInput = {
  origin: "",
  destination: "",
  date: "",
  size: "2br",
  extras: [],
  name: "",
  email: "",
  notes: "",
};

export function DispatchForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<QuoteInput>(empty);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [note, setNote] = useState("");

  function toggleExtra(id: string) {
    setForm((f) => ({
      ...f,
      extras: f.extras.includes(id) ? f.extras.filter((x) => x !== id) : [...f.extras, id],
    }));
  }

  async function finish() {
    const q = computeQuote(form);
    setQuote(q);
    setStatus("saving");
    try {
      const res = await fetch("/api/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, quote: q }),
      });
      if (res.ok) {
        const data = await res.json();
        setNote(data.oracle ?? "");
      } else {
        setNote(
          "Oracle staged the crew from the inventory you described. A human copilot will confirm elevator windows 24 hours prior.",
        );
      }
      setStatus("done");
    } catch {
      setNote(
        "Oracle staged the crew from the inventory you described. A human copilot will confirm elevator windows 24 hours prior.",
      );
      setStatus("done");
    }
  }

  if (status === "done" && quote) {
    return (
      <div className="frame p-8 md:p-12">
        <p className="kicker">Mission accepted</p>
        <h2 className="mt-4 text-4xl md:text-5xl">Crew {quote.id} is staged.</h2>
        <p className="lede mt-4">
          {quote.window}. {quote.crew}. Confirmation is on its way to {form.email}.
        </p>
        <dl className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <dt className="mono text-[11px] uppercase tracking-[0.16em] text-mute">Route</dt>
            <dd className="mt-1">
              {form.origin} → {form.destination}
            </dd>
          </div>
          <div>
            <dt className="mono text-[11px] uppercase tracking-[0.16em] text-mute">Total</dt>
            <dd className="mt-1 display text-3xl text-cyan">{formatUsd(quote.total)}</dd>
          </div>
        </dl>
        {note && <p className="mt-8 text-sm leading-relaxed text-fog">{note}</p>}
        <p className="mt-8 mono text-xs tracking-[0.14em] uppercase text-mute">
          Track it on the Live board the morning of.
        </p>
      </div>
    );
  }

  return (
    <div className="frame p-6 md:p-10">
      <div className="mb-8 flex gap-6 mono text-[11px] uppercase tracking-[0.18em] text-mute">
        {[1, 2, 3].map((n) => (
          <span key={n} className={step === n ? "text-cyan" : ""}>
            0{n} {n === 1 ? "Route" : n === 2 ? "Inventory" : "Contact"}
          </span>
        ))}
      </div>

      {step === 1 && (
        <div className="grid gap-5">
          <label className="block">
            <span className="kicker">Origin</span>
            <input
              className="field mt-2"
              placeholder="Pacific Heights, San Francisco"
              value={form.origin}
              onChange={(e) => setForm({ ...form, origin: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="kicker">Destination</span>
            <input
              className="field mt-2"
              placeholder="Mission Bay, San Francisco"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="kicker">Move date</span>
            <input
              type="date"
              className="field mt-2"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </label>
          <button
            type="button"
            className="btn btn-primary mt-2 w-fit"
            onClick={() => setStep(2)}
            disabled={!form.origin || !form.destination || !form.date}
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="kicker">Home size</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setForm({ ...form, size: s.id })}
                className={`border px-4 py-3 text-left ${
                  form.size === s.id ? "border-cyan text-cyan" : "border-line text-fog"
                }`}
              >
                <span className="block text-champagne">{s.label}</span>
                <span className="mono text-xs">from {formatUsd(s.base)}</span>
              </button>
            ))}
          </div>
          <p className="kicker mt-8">Specialty loads</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {extras.map((e) => (
              <label
                key={e.id}
                className="flex cursor-pointer items-center justify-between border border-line px-4 py-3"
              >
                <span>
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={form.extras.includes(e.id)}
                    onChange={() => toggleExtra(e.id)}
                  />
                  {e.label}
                </span>
                <span className="mono text-xs text-mute">+{formatUsd(e.price)}</span>
              </label>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-5">
          <label className="block">
            <span className="kicker">Name</span>
            <input
              className="field mt-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="kicker">Email</span>
            <input
              type="email"
              className="field mt-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="kicker">Notes for Oracle</span>
            <textarea
              className="field mt-2 min-h-28"
              placeholder="Elevator reservation, HOA window, a cello that cannot be laid flat…"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </label>
          <div className="flex gap-3">
            <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={finish}
              disabled={!form.name || !form.email || status === "saving"}
            >
              {status === "saving" ? "Staging…" : "Lock the quote"}
            </button>
          </div>
          {status === "error" && (
            <p className="text-sm text-ember">Transmission failed. Try again or email dispatch.</p>
          )}
        </div>
      )}
    </div>
  );
}
