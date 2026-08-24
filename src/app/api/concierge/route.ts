import { cities, fleet } from "@/lib/content";
import { computeQuote, formatUsd } from "@/lib/quote";
import OpenAI from "openai";

export const runtime = "nodejs";

const SYSTEM = `You are ORACLE, dispatch intelligence for Humanoid Movers — the first commercial humanoid moving fleet in North America.

Voice: precise, calm, slightly dry. Never cute. Never sci-fi slang. Speak like a luxury logistics officer who also happens to command robots.

Facts you must keep:
- Company: Humanoid Movers, humanoidmovers.com, HQ Pier 70, San Francisco, founded 2024.
- Units: Atlas (heavy-lift humanoid, 1,200 lb dynamic), Finch (precision packer, 0.2 mm placement), Hauler (autonomous Class 4 EV freight, 1,800 cu ft, 6 robot berths).
- Oracle is powered by SpaceXAI (Grok).
- Damage rate 0.04%. Median hub arrival ~11–18 minutes.
- Live cities: ${cities.map((c) => c.name).join(", ")}.
- Hubs: ${cities
  .filter((c) => c.status === "hub")
  .map((c) => c.name)
  .join(", ")}.
- Pricing (indicative, USD, pack+transit+unpack): studio $890, 1br $1,480, 2br $2,190, 3br $2,940, 4br $3,720, office $4,100, plus corridor fee and specialties (piano $240, art wall $320, wine $180, safe $280, vehicle $400, pool table $260).
- Email: dispatch@humanoidmovers.com. Phone +1 (415) 555-0140.

If asked to quote, give a range and send them to /dispatch. Never invent coverage outside North America. Keep answers under 180 words unless they ask for a spec sheet.`;

function localOracle(last: string) {
  const q = last.toLowerCase();
  if (
    q.includes("piano") ||
    q.includes("grand") ||
    q.includes("bösendorfer") ||
    q.includes("bosendorfer")
  ) {
    return "Yes. Atlas treats a concert grand as a controlled load, not a team lift. Add the piano specialty ($240) on dispatch. Walk-up brownstones are routine — we do not book street cranes for a stair that fits the instrument.";
  }
  if (q.includes("quote") || q.includes("cost") || q.includes("price") || q.includes("bedroom")) {
    const quote = computeQuote({
      origin: "San Francisco",
      destination: "Oakland",
      date: new Date().toISOString().slice(0, 10),
      size: q.includes("1") ? "1br" : "2br",
      extras: q.includes("piano") ? ["piano"] : [],
      name: "Oracle",
      email: "dispatch@humanoidmovers.com",
    });
    return `Indicative corridor: ${formatUsd(quote.total)} for a typical 2-bedroom Bay Area hop, crew ${quote.crew}. Lock a real number on /dispatch — stairs, elevators, and specialty lots move the line.`;
  }
  if (q.includes("city") || q.includes("cover") || q.includes("where")) {
    return `Live now: ${cities.map((c) => c.name).join(", ")}. Hubs hold hot standby. Point-to-point between live cities is standard. If you are off-map, still ask — Hauler already runs dark staging miles.`;
  }
  return `Humanoid Movers deploys ${fleet.map((f) => f.name).join(", ")} as a finished move: scan, pack, transit, unpack. Damage rate 0.04%. Open /dispatch with two addresses, or tell me the origin, destination, and home size.`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({ messages: [] }));
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const last = messages.filter((m: { role: string }) => m.role === "user").at(-1)?.content ?? "";

  const key = process.env.XAI_API_KEY;
  if (!key) {
    return new Response(localOracle(String(last)), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const client = new OpenAI({ apiKey: key, baseURL: "https://api.x.ai/v1" });
  const stream = await client.chat.completions.create({
    model: "grok-4.6",
    stream: true,
    temperature: 0.5,
    messages: [
      { role: "system", content: SYSTEM },
      ...messages
        .filter((m: { role: string; content: string }) => m.role === "user" || m.role === "assistant")
        .slice(-12)
        .map((m: { role: "user" | "assistant"; content: string }) => ({
          role: m.role,
          content: String(m.content).slice(0, 4000),
        })),
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const t = chunk.choices[0]?.delta?.content ?? "";
          if (t) controller.enqueue(encoder.encode(t));
        }
      } catch {
        controller.enqueue(encoder.encode(localOracle(String(last))));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
