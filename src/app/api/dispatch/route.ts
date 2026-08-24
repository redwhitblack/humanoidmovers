import { computeQuote, type QuoteInput } from "@/lib/quote";
import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json()) as QuoteInput;
  const quote = computeQuote(body);

  let oracle =
    "Oracle staged the crew from the inventory you described. A human copilot will confirm elevator windows 24 hours prior.";

  const key = process.env.XAI_API_KEY;
  if (key) {
    try {
      const client = new OpenAI({ apiKey: key, baseURL: "https://api.x.ai/v1" });
      const res = await client.chat.completions.create({
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
      });
      oracle = res.choices[0]?.message?.content?.trim() || oracle;
    } catch {
      /* keep fallback */
    }
  }

  return Response.json({ ok: true, id: quote.id, quote, oracle });
}
