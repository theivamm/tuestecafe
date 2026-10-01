import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "img");

const QUERIES = [
  ["hero", "dark coffee shop interior"],
  ["hero", "barista pouring espresso"],
  ["hero", "cafe table coffee"],
  ["espresso", "espresso shot"],
  ["espresso", "espresso machine"],
  ["coffee", "latte art"],
  ["coffee", "cappuccino cup"],
  ["coffee", "iced coffee glass"],
  ["coffee", "cold brew"],
  ["coffee", "coffee beans"],
  ["coffee", "filter coffee pour over"],
  ["coffee", "cortado cup"],
  ["tea", "matcha latte"],
  ["tea", "herbal tea glass"],
  ["tea", "chai latte"],
  ["drink", "chocolate drink mug"],
  ["drink", "orange juice glass"],
  ["drink", "lemonade glass"],
  ["drink", "mocktail glass"],
  ["drink", "cocktail glass"],
  ["drink", "sparkling drink"],
  ["drink", "smoothie"],
  ["brunch", "avocado toast"],
  ["brunch", "french toast"],
  ["brunch", "pancakes stack"],
  ["brunch", "scrambled eggs toast"],
  ["brunch", "yogurt bowl granola"],
  ["brunch", "fruit plate"],
  ["brunch", "toast bread"],
  ["salad", "green salad bowl"],
  ["salad", "caesar salad"],
  ["salad", "quinoa salad"],
  ["sandwich", "roast beef sandwich"],
  ["sandwich", "chicken sandwich"],
  ["sandwich", "tuna sandwich"],
  ["sandwich", "grilled cheese sandwich"],
  ["sandwich", "focaccia sandwich"],
  ["sandwich", "wrap sandwich"],
  ["sandwich", "club sandwich"],
  ["sandwich", "mushroom toast"],
  ["sides", "french fries"],
  ["sides", "potato wedges"],
  ["bakery", "croissant"],
  ["bakery", "chocolate croissant"],
  ["bakery", "cookies chocolate chip"],
  ["bakery", "cookie stack"],
  ["bakery", "alfajores"],
  ["bakery", "bread loaf bakery"],
  ["bakery", "cinnamon roll"],
  ["dessert", "carrot cake slice"],
  ["dessert", "cheesecake slice"],
  ["dessert", "key lime pie"],
  ["dessert", "chocolate cake slice"],
  ["dessert", "oreo dessert"],
  ["dessert", "lemon tart"],
  ["dessert", "custard pudding"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(q) {
  const url =
    "https://api.openverse.org/v1/images/?q=" +
    encodeURIComponent(q) +
    "&page_size=20&source=stocksnap&license=cc0";
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json", "User-Agent": "tueste-cafe/1.0" },
        signal: AbortSignal.timeout(60000),
      });
      if (res.status === 429) {
        const wait = Math.min(60000, 3000 * 2 ** (attempt - 1) + Math.random() * 2000);
        process.stdout.write(`  429 ${q} -> retry in ${Math.round(wait / 1000)}s\n`);
        await sleep(wait);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()).results ?? [];
    } catch (err) {
      if (attempt === 6) {
        process.stdout.write(`  FAIL ${q}: ${err.message}\n`);
        return [];
      }
      await sleep(3000 * attempt);
    }
  }
  return [];
}

const catalog = new Map();
for (let i = 0; i < QUERIES.length; i++) {
  const [group, query] = QUERIES[i];
  const results = await search(query);
  let added = 0;
  for (const r of results) {
    if (catalog.has(r.id)) continue;
    if (!r.url || !/\.(jpe?g|png|webp)$/i.test(r.url)) continue;
    catalog.set(r.id, {
      id: r.id,
      group,
      query,
      title: r.title ?? "",
      creator: r.creator ?? "",
      creator_url: r.creator_url ?? "",
      license: r.license ?? "cc0",
      license_url: r.license_url ?? "",
      source_url: r.foreign_landing_url ?? "",
      width: r.width ?? null,
      height: r.height ?? null,
      url: r.url,
    });
    added++;
  }
  process.stdout.write(
    `[${i + 1}/${QUERIES.length}] ${group} :: ${query} -> +${added} (total ${catalog.size})\n`,
  );
  await sleep(1500);
}

await mkdir(OUT, { recursive: true });
const list = [...catalog.values()];
await writeFile(path.join(OUT, "catalog.json"), JSON.stringify(list, null, 2));
process.stdout.write(`\nDONE: ${list.length} unique images\n`);
