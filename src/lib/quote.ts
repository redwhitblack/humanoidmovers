import { extras, sizes } from "./content";

export type QuoteInput = {
  origin: string;
  destination: string;
  date: string;
  size: string;
  extras: string[];
  name: string;
  email: string;
  notes?: string;
};

export type QuoteResult = {
  id: string;
  subtotal: number;
  extrasTotal: number;
  distanceFee: number;
  total: number;
  crew: string;
  window: string;
};

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function estimateDistanceFee(origin: string, destination: string) {
  if (!origin.trim() || !destination.trim()) return 180;
  const sameCity =
    origin.split(",")[0]?.trim().toLowerCase() ===
    destination.split(",")[0]?.trim().toLowerCase();
  const n = (hash(origin + destination) % 42) + 6;
  return sameCity ? 90 + n * 4 : 240 + n * 12;
}

export function computeQuote(input: QuoteInput): QuoteResult {
  const size = sizes.find((s) => s.id === input.size) ?? sizes[1];
  const extrasTotal = extras
    .filter((e) => input.extras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  const distanceFee = estimateDistanceFee(input.origin, input.destination);
  const subtotal = size.base;
  const total = subtotal + extrasTotal + distanceFee;
  const id = `HM-${(hash(input.email + input.date + input.origin) % 9000 + 1000)
    .toString()
    .padStart(4, "0")}`;
  const heavy = input.extras.some((e) => ["piano", "safe", "pool"].includes(e));
  const crew = heavy ? "Atlas ×2  ·  Finch ×2  ·  Hauler" : "Atlas ×1  ·  Finch ×2  ·  Hauler";
  const window = heavy ? "06:00–11:00 arrival" : "07:00–12:00 arrival";
  return { id, subtotal, extrasTotal, distanceFee, total, crew, window };
}

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
