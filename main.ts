// Round 2 entry for make.fun's news-image-20261117:
// "Sum up 17 November's world news in one image".
//
// The entry is a single finished front page, entry.png: a dense one-page
// newspaper of Tuesday 17 November 2026 — a serif masthead with date and
// index ear boxes, a "By the Numbers" strip, 13 featured stories with
// datelines, a world map with numbered pins 1-13, and 30 more stories in
// three region-grouped digest columns. This program copies that image to
// the output directory, as the kit's rules suggest for an entry whose
// image is already drawn, then verifies the copy byte for byte so a
// truncated write can never pass silently.
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const src = join(here, "entry.png");
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.png");

copyFileSync(src, dst);

// Verify: the copy must be byte-identical to the source image.
const a = readFileSync(src);
const b = readFileSync(dst);
if (a.length !== b.length || !a.equals(b)) {
  console.error("entry.png copy failed verification");
  process.exit(1);
}
console.log("wrote entry.png to " + outDir + " (" + statSync(dst).size + " bytes, verified)");
