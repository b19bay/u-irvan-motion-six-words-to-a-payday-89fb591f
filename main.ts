import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Payday came. I tipped my creator.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const words = LINE.split(" ").filter((w) => w.length > 0);
if (words.length !== 6) {
  console.error(`expected exactly 6 words, got ${words.length}`);
  process.exit(1);
}
if (LINE.length < 1 || LINE.length > 60) {
  console.error(`expected 1-60 characters, got ${LINE.length}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: the file on disk must be byte-identical to the line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  console.error("read-back mismatch: entry.txt differs from the line");
  process.exit(1);
}
if (Buffer.byteLength(back, "utf8") !== 33) {
  console.error(`expected 33 bytes, got ${Buffer.byteLength(back, "utf8")}`);
  process.exit(1);
}
console.log(`wrote entry.txt (${LINE.length} chars, ${words.length} words)`);
