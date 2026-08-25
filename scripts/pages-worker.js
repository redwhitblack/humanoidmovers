const sizes = [
  { id: "studio", base: 890 },
  { id: "1br", base: 1480 },
  { id: "2br", base: 2190 },
  { id: "3br", base: 2940 },
  { id: "4br", base: 3720 },
  { id: "office", base: 4100 },
];
const extrasList = [
  { id: "piano", price: 240 },
  { id: "art", price: 320 },
  { id: "wine", price: 180 },
  { id: "safe", price: 280 },
  { id: "auto", price: 400 },
  { id: "pool", price: 260 },
];
const cities = "San Francisco, Los Angeles, Seattle, Portland, Denver, Phoenix, Austin, Dallas, Chicago, Nashville, Atlanta, Miami, New York, Boston";

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function computeQuote(input) {
  const size = sizes.find((s) => s.id === input.size) ?? sizes[1];
  const extrasTotal = extrasList
    .filter((e) => (input.extras || []).includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  const origin = input.origin || "";
  const destination = input.destination || "";
  const sameCity =
    origin.split(",")[0]?.trim().toLowerCase() ===
    destination.split(",")[0]?.trim().toLowerCase();
  const n = (hash(origin + destination) % 42) + 6;
  const distanceFee = !origin.trim() || !destination.trim() ? 180 : sameCity ? 90 + n * 4 : 240 + n * 12;
  const total = size.base + extrasTotal + distanceFee;
  const id = `HM-${(hash((input.email || "") + (input.date || "") + origin) % 9000 + 1000).toString().padStart(4, "0")}`;
  const heavy = (input.extras || []).some((e) => ["piano", "safe", "pool"].includes(e));
  const crew = heavy ? "Atlas ×2  ·  Finch ×2  ·  Hauler" : "Atlas ×1  ·  Finch ×2  ·  Hauler";
  const window = heavy ? "06:00–11:00 arrival" : "07:00–12:00 arrival";
  return { id, subtotal: size.base, extrasTotal, distanceFee, total, crew, window };
}
function usd(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
function localOracle(last) {
  const q = last.toLowerCase();
  if (q.includes("piano") || q.includes("grand") || q.includes("bosendorfer") || q.includes("bösendorfer")) {
    return "Yes. Atlas treats a concert grand as a controlled load, not a team lift. Add the piano specialty ($240) on dispatch. Walk-up brownstones are routine — we do not book street cranes for a stair that fits the instrument.";
  }
  if (q.includes("quote") || q.includes("cost") || q.includes("price") || q.includes("bedroom")) {
    const quote = computeQuote({ origin: "San Francisco", destination: "Oakland", date: new Date().toISOString().slice(0, 10), size: q.includes("1") ? "1br" : "2br", extras: q.includes("piano") ? ["piano"] : [], name: "Oracle", email: "dispatch@humanoidmovers.com" });
    return `Indicative corridor: ${usd(quote.total)} for a typical 2-bedroom Bay Area hop, crew ${quote.crew}. Lock a real number on /dispatch — stairs, elevators, and specialty lots move the line.`;
  }
  if (q.includes("city") || q.includes("cover") || q.includes("where")) {
    return `Live now: ${cities}. Hubs hold hot standby. Point-to-point between live cities is standard. If you are off-map, still ask — Hauler already runs dark staging miles.`;
  }
  return "Humanoid Movers deploys Atlas, Finch, Hauler as a finished move: scan, pack, transit, unpack. Damage rate 0.04%. Open /dispatch with two addresses, or tell me the origin, destination, and home size.";
}

const SYSTEM = `You are ORACLE, dispatch intelligence for Humanoid Movers. Voice: precise, calm, slightly dry. Company: Humanoid Movers, humanoidmovers.com, HQ Pier 70, San Francisco, founded 2024. Units: Atlas (1,200 lb), Finch (0.2 mm placement), Hauler (1,800 cu ft). Oracle is powered by SpaceXAI (Grok). Damage rate 0.04%. Live cities: ${cities}. Email: dispatch@humanoidmovers.com. If asked to quote, give a range and send them to /dispatch. Keep answers under 180 words.`;

async function concierge(request, env) {
  const body = await request.json().catch(() => ({ messages: [] }));
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const last = messages.filter((m) => m.role === "user").at(-1)?.content ?? "";
  const key = env.XAI_API_KEY;
  if (!key) return new Response(localOracle(String(last)), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "grok-4.6",
      stream: true,
      temperature: 0.5,
      messages: [
        { role: "system", content: SYSTEM },
        ...messages.filter((m) => m.role === "user" || m.role === "assistant").slice(-12).map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) })),
      ],
    }),
  });
  if (!res.ok || !res.body) return new Response(localOracle(String(last)), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const readable = new ReadableStream({
    async start(controller) {
      const reader = res.body.getReader();
      let buffer = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const t = JSON.parse(data).choices?.[0]?.delta?.content ?? "";
              if (t) controller.enqueue(encoder.encode(t));
            } catch {}
          }
        }
      } catch {
        controller.enqueue(encoder.encode(localOracle(String(last))));
      } finally {
        controller.close();
      }
    },
  });
  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}

async function dispatch(request, env) {
  const body = await request.json().catch(() => ({}));
  const quote = computeQuote(body);
  let oracle = "Oracle staged the crew from the inventory you described. A human copilot will confirm elevator windows 24 hours prior.";
  const key = env.XAI_API_KEY;
  if (key) {
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "grok-4.6",
          temperature: 0.4,
          messages: [
            { role: "system", content: "You are Oracle at Humanoid Movers. Write 2 short sentences confirming a staged move: crew mix, any specialty caution, no emojis, no markdown." },
            { role: "user", content: JSON.stringify({ origin: body.origin, destination: body.destination, size: body.size, extras: body.extras, notes: body.notes, crew: quote.crew }) },
          ],
        }),
      });
      if (res.ok) {
        const json = await res.json();
        oracle = json.choices?.[0]?.message?.content?.trim() || oracle;
      }
    } catch {}
  }
  return Response.json({ ok: true, id: quote.id, quote, oracle });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health" && request.method === "GET") {
      return Response.json({ ok: true, service: "humanoidmovers", ts: Date.now() });
    }
    if (url.pathname === "/api/concierge" && request.method === "POST") return concierge(request, env);
    if (url.pathname === "/api/dispatch" && request.method === "POST") return dispatch(request, env);
    return env.ASSETS.fetch(request);
  },
};
