export const runtime = "nodejs";

export function GET() {
  return Response.json({ ok: true, service: "humanoidmovers", ts: Date.now() });
}
