import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "img");
const TMP = path.join(process.env.TEMP ?? ".", "tueste-dl");

const PER_GROUP = Number(process.env.PER_GROUP ?? 5);
const WIDTH = Number(process.env.IMG_WIDTH ?? 1200);
const QUALITY = Number(process.env.IMG_QUALITY ?? 76);

const catalog = JSON.parse(await readFile(path.join(OUT, "catalog.json"), "utf8"));
await mkdir(TMP, { recursive: true });

const byGroup = new Map();
for (const item of catalog) {
  if (!byGroup.has(item.group)) byGroup.set(item.group, []);
  byGroup.get(item.group).push(item);
}

const manifest = [];
let ok = 0;
let fail = 0;

for (const [group, items] of byGroup) {
  const picked = items.slice(0, PER_GROUP);
  let n = 0;
  for (const item of picked) {
    const name = `${group}-${String(n + 1).padStart(2, "0")}.jpg`;
    const dest = path.join(OUT, name);
    try {
      const s = await stat(dest);
      if (s.size > 0) {
        manifest.push({ ...item, file: name });
        n++;
        ok++;
        continue;
      }
    } catch {}

    let buf = null;
    for (let attempt = 1; attempt <= 4 && !buf; attempt++) {
      try {
        const res = await fetch(item.url, {
          headers: { "User-Agent": "tueste-cafe/1.0" },
          signal: AbortSignal.timeout(60000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        buf = Buffer.from(await res.arrayBuffer());
      } catch (err) {
        if (attempt === 4) {
          console.log(`  FAIL ${name}: ${err.message}`);
          break;
        }
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
    if (!buf) continue;

    try {
      await sharp(buf)
        .rotate()
        .resize({ width: WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
        .toFile(dest);
      manifest.push({ ...item, file: name });
      ok++;
      n++;
    } catch (err) {
      console.log(`  SHARP-FAIL ${name}: ${err.message}`);
    }
  }
  console.log(`${group}: ${n} files`);
}

await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\nDONE ok=${ok} fail=${fail}`);
