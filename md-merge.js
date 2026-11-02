#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const OUTPUT = "merged-markdown.md";
const recursive = process.argv.includes("-r");
const root = process.cwd();
const outputPath = path.join(root, OUTPUT);

function collect(dir) {
  const files = [];
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        recursive &&
        entry.name !== "node_modules" &&
        !entry.name.startsWith(".")
      ) {
        files.push(...collect(full));
      }
    } else if (
      entry.name.toLowerCase().endsWith(".md") &&
      full !== outputPath
    ) {
      files.push(full);
    }
  }
  return files;
}

const files = collect(root);

if (files.length === 0) {
  console.log("No markdown files found.");
  process.exit(0);
}

const merged = files
  .map((file) =>
    fs
      .readFileSync(file, "utf8")
      .replace(/^\uFEFF/, "")
      .trim(),
  )
  .join("\n\n---\n\n");

fs.writeFileSync(outputPath, merged + "\n", "utf8");
console.log(`Merged ${files.length} file(s) into ${OUTPUT}`);
