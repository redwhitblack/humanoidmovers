export async function onRequestGet() {
  return Response.json({ ok: true, service: "humanoidmovers", ts: Date.now() });
}
