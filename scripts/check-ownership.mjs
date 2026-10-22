// Usage: node scripts/check-ownership.mjs <1|2>
// Fails if any file you changed or created is outside the paths owned by your role.
import { execSync } from "node:child_process";

const role = process.argv[2];
const OWN = {
  "1": ["packages/audio-detector/", "packages/text-classifier/", "colab/audio/", "colab/text/", "eval/audio/", "eval/text/", "eval/clips/labels/role1.csv", "docs/role1/"],
  "2": ["packages/vision-detector/", "packages/sync-detector/", "packages/challenge-verifier/", "colab/vision/", "eval/vision/", "eval/clips/labels/role2.csv", "docs/role2/"],
};
if (!OWN[role]) { console.error("Usage: node scripts/check-ownership.mjs <1|2>   (Role 3 owns everything else and is not checked)"); process.exit(2); }

const sh = (c) => execSync(c, { encoding: "utf8" }).split("\n").map((s) => s.trim()).filter(Boolean);
let changed;
try {
  changed = [...new Set([...sh("git diff --name-only scaffold-baseline"), ...sh("git ls-files --others --exclude-standard")])];
} catch {
  console.error('No baseline found. Run once, right after creating the scaffold:\n  git init && git add -A && git commit -m scaffold && git tag scaffold-baseline');
  process.exit(2);
}
const owned = (f) => OWN[role].some((p) => f === p || f.startsWith(p));
const outside = changed.filter((f) => !owned(f));
if (outside.length) {
  console.error(`FAIL: ${outside.length} file(s) changed outside the paths owned by Role ${role}:`);
  outside.forEach((f) => console.error("  " + f));
  console.error("Revert them (git checkout scaffold-baseline -- <file>) or ask the owner. Only owned paths are delivered.");
  process.exit(1);
}
console.log(`Ownership check passed for Role ${role}: ${changed.length} changed file(s), all inside owned paths.`);
