import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const ACCOUNT = "67af4cdcf8722a81f7ec7de4a89550ba";
const PROJECT = "humanoidmovers";
const OUT = path.resolve("out");
const JWT = process.env.PAGES_UPLOAD_JWT;
if (!JWT) {
  console.error("PAGES_UPLOAD_JWT missing");
  process.exit(1);
}

const MIME = {
  html: "text/html; charset=utf-8",
  js: "application/javascript",
  css: "text/css",
  json: "application/json",
  svg: "image/svg+xml",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  ico: "image/x-icon",
  txt: "text/plain; charset=utf-8",
  xml: "application/xml",
  map: "application/json",
  woff2: "font/woff2",
};

function hashBuf(buf, ext) {
  const h = createHash("sha256");
  h.update(buf);
  if (ext) h.update(ext);
  return h.digest("hex").slice(0, 32);
}

async function walk(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) files.push(...(await walk(abs, base)));
    else files.push(abs);
  }
  return files;
}

async function cf(pathname, { method = "GET", json, form, jwt = JWT } = {}) {
  const headers = { Authorization: `Bearer ${jwt}` };
  let body;
  if (json) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(json);
  }
  if (form) body = form;
  const res = await fetch(`https://api.cloudflare.com/client/v4${pathname}`, {
    method,
    headers,
    body,
  });
  const text = await res.text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${method} ${pathname} ${res.status}: ${text.slice(0, 800)}`);
  }
  return parsed;
}

const all = await walk(OUT);
const workerAbs = path.join(OUT, "_worker.js");
const staticFiles = all.filter((f) => f !== workerAbs);

const manifest = {};
const blobs = {};
for (const abs of staticFiles) {
  const rel = "/" + path.relative(OUT, abs).split(path.sep).join("/");
  const buf = await readFile(abs);
  const ext = path.extname(abs).slice(1);
  const hash = hashBuf(buf, ext);
  manifest[rel] = hash;
  blobs[hash] = { buf, ext, rel };
}

const hashes = Object.keys(blobs);
const missingRes = await cf("/pages/assets/check-missing", {
  method: "POST",
  json: { hashes },
});
const missing = missingRes.result || missingRes.hashes || [];
console.log(`files=${staticFiles.length} unique=${hashes.length} missing=${missing.length}`);

const chunkSize = 20;
for (let i = 0; i < missing.length; i += chunkSize) {
  const slice = missing.slice(i, i + chunkSize);
  const payload = slice.map((hash) => {
    const item = blobs[hash];
    return {
      key: hash,
      value: item.buf.toString("base64"),
      base64: true,
      metadata: { contentType: MIME[item.ext] || "application/octet-stream" },
    };
  });
  await cf("/pages/assets/upload", { method: "POST", json: payload });
  console.log(`uploaded ${Math.min(i + chunkSize, missing.length)}/${missing.length}`);
}

if (missing.length) {
  await cf("/pages/assets/upsert-hashes", { method: "POST", json: { hashes: missing } }).catch(
    () => {},
  );
}

const form = new FormData();
form.set("manifest", JSON.stringify(manifest));
form.set("branch", "main");
form.set("commit_message", "Cloudflare Pages free deploy");
try {
  const worker = await readFile(workerAbs);
  form.set(
    "_worker.js",
    new Blob([worker], { type: "application/javascript" }),
    "_worker.js",
  );
} catch {
  console.log("no _worker.js");
}

const deploy = await cf(`/accounts/${ACCOUNT}/pages/projects/${PROJECT}/deployments`, {
  method: "POST",
  form,
});
const url = deploy.result?.url || deploy.result?.aliases?.[0];
console.log("deployment", deploy.result?.id, url);
console.log("env", deploy.result?.environment);
