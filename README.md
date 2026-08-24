# Humanoid Movers

The last moving company. A cinematic site for a commercial humanoid relocation fleet — Atlas, Finch, Hauler, and Oracle (SpaceXAI / Grok 4.6).

## Local

```bash
cp .env.example .env.local
# optional: XAI_API_KEY from https://console.x.ai
npm install
npm run dev
```

Oracle (Ask Oracle) streams from `https://api.x.ai/v1` when `XAI_API_KEY` is set, and falls back to a local dispatcher if it is not.

## Production

DigitalOcean App Platform, Node.js, `PORT` from the platform. Domain: humanoidmovers.com.
