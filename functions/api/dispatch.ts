import { computeQuote, type QuoteInput } from "../../src/lib/quote";

export async function onRequestPost(context: { request: Request; env: { XAI_API_KEY?: string } }) {
  const body = (await context.request.json().catch(() => ({}))) as Partial<QuoteInput>;
  const quote = computeQuote({
    origin: body.origin ?? "",
    destination: body.destination ?? "",
    date: body.date ?? "",
    size: body.size ?? "2br",
    extras: Array.isArray(body.extras) ? body.extras : [],
    name: body.name ?? "",
    email: body.email ?? "",
    notes: body.notes,
  });

  let oracle =
    "Oracle staged the crew from the inventory you described. A human copilot will confirm elevator windows 24 hours prior.";

  const key = context.env.XAI_API_KEY;
  if (key) {
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "grok-4.6",
          temperature: 0.4,
          messages: [
            {
              role: "system",
              content:
                "You are Oracle at Humanoid Movers. Write 2 short sentences confirming a staged move: crew mix, any specialty caution, no emojis, no markdown.",
            },
            {
              role: "user",
              content: JSON.stringify({
                origin: body.origin,
                destination: body.destination,
                size: body.size,
                extras: body.extras,
                notes: body.notes,
                crew: quote.crew,
              }),
            },
          ],
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        oracle = json.choices?.[0]?.message?.content?.trim() || oracle;
      }
    } catch {
      /* keep fallback */
    }
  }

  return Response.json({ ok: true, id: quote.id, quote, oracle });
}
