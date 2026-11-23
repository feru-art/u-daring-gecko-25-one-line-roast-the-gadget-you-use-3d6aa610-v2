// One-Line Roast: The Gadget You Use Every Day
//
// Entry: a single original roast line about a gadget used every day.
// The program writes exactly that one line to /output/entry.txt so the
// sealed gate scorer can check it (UTF-8, 1-200 characters, one line)
// and the judge can compare it against the other entries.
//
// The roast targets the smartwatch stand reminder: the watch praises the
// wearer for standing up, as if sitting straight back down was not the
// whole point of standing in the first place.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The winning roast, picked by a local pairwise race of five fresh lines
// against the judge's published criteria (daily gadget first, then funny,
// fresh, neatly worded, specific).
const ROAST =
  "My smartwatch congratulates me for standing up, as if sitting back down wasn't the entire plan.";

// Where the grader expects the entry text.
const OUTPUT_PATH = "/output/entry.txt";

// The gate the sealed scorer applies: UTF-8 text of 1 to 200 characters,
// not only white space, a single line. Check it here before writing so a
// bad line fails loudly in development instead of silently at grading.
function assertGate(text: string): void {
  if ([...text].length < 1 || [...text].length > 200) {
    throw new Error(
      `roast must be 1-200 characters, got ${[...text].length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("roast must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("roast must be a single line");
  }
}

assertGate(ROAST);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ROAST, "utf8");

// Read the file back and confirm it holds exactly the roast, byte for byte:
// the entry is judged on the file's exact bytes, so a silent mismatch here
// would mean the judge reads something other than the line above.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ROAST) {
  throw new Error("entry.txt does not match the roast line");
}
console.log(`wrote ${[...ROAST].length} characters to ${OUTPUT_PATH}`);
