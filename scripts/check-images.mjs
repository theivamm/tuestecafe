import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicImg = path.join(root, "public", "img");

const files = new Set(
  (await readdir(publicImg)).filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f)).map((f) => `/img/${f}`),
);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx|ts|css)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const srcFiles = [
  ...(await walk(path.join(root, "src"))),
];

const used = new Map();
for (const f of srcFiles) {
  const content = await readFile(f, "utf8");
  for (const m of content.matchAll(/\/img\/[A-Za-z0-9._-]+\.(?:jpg|jpeg|png|webp|avif)/g)) {
    const list = used.get(m[0]) ?? [];
    if (!list.includes(path.relative(root, f))) list.push(path.relative(root, f));
    used.set(m[0], list);
  }
}

const missing = [...used.keys()].filter((u) => !files.has(u));
const unused = [...files].filter((f) => !used.has(f));

console.log(`referenced: ${used.size}`);
console.log(`on disk:    ${files.size}`);
console.log(`\nMISSING (${missing.length}):`);
for (const m of missing) console.log(`  ${m}  <- ${used.get(m).join(", ")}`);
console.log(`\nUNUSED (${unused.length}): ${unused.join(" ")}`);
