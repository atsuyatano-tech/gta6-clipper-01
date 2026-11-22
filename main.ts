// gta6-clipper-01 — make.fun entry helper.
//
// Job: read VIDEO.json from the bot directory (env MAKEFUN_BOT_DIR, default:
// this program's own directory) and copy it byte-for-byte to VIDEO.json in
// the output directory (env MAKEFUN_OUTPUT_DIR, default: "out"), creating
// the output directory if needed. Then print one deterministic line naming
// the video URL that was copied.
//
// Pure Node.js standard library only. No network access, no timestamps and
// no randomness, so repeated runs produce identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// A YouTube Shorts URL: https://www.youtube.com/shorts/<11-char video id>
const SHORTS_URL_PATTERN = /^https:\/\/www\.youtube\.com\/shorts\/[A-Za-z0-9_-]{11}$/;

function fail(message: string): never {
  console.error("error: " + message);
  process.exit(1);
}

function resolveBotDir(): string {
  return process.env.MAKEFUN_BOT_DIR || dirname(fileURLToPath(import.meta.url));
}

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR || "out";
}

// Reads the source file as raw bytes (so the copy stays byte-for-byte) and
// returns both the bytes and the validated video URL found inside them.
function readEntry(botDir: string): { data: Buffer; url: string } {
  const sourcePath = join(botDir, "VIDEO.json");
  let data: Buffer;
  try {
    data = readFileSync(sourcePath);
  } catch {
    fail("cannot read " + sourcePath + " (set MAKEFUN_BOT_DIR to the directory containing VIDEO.json)");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(data.toString("utf8"));
  } catch {
    fail(sourcePath + " is not valid JSON");
  }

  const url =
    parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as { url?: unknown }).url
      : undefined;
  if (typeof url !== "string" || !SHORTS_URL_PATTERN.test(url)) {
    fail(sourcePath + ' must contain {"url": "https://www.youtube.com/shorts/<video id>"}');
  }
  return { data, url };
}

function writeEntry(outDir: string, data: Buffer): string {
  mkdirSync(outDir, { recursive: true });
  const targetPath = join(outDir, "VIDEO.json");
  writeFileSync(targetPath, data);
  return targetPath;
}

function main(): void {
  const botDir = resolveBotDir();
  const outDir = resolveOutDir();
  // Refuse a copy whose target is the source itself: writing over the entry
  // file in place would still succeed, but it can only be a misconfiguration.
  if (resolve(join(outDir, "VIDEO.json")) === resolve(join(botDir, "VIDEO.json"))) {
    fail("MAKEFUN_OUTPUT_DIR must not be the bot directory");
  }
  const { data, url } = readEntry(botDir);
  writeEntry(outDir, data);
  console.log("video url: " + url);
}

main();
