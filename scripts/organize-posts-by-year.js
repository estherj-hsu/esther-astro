/**
 * Move post .mdx files into year folders (e.g. posts/2026/...) using frontmatter date.
 * Run from repo root: node scripts/organize-posts-by-year.js
 */

import { readdir, readFile, mkdir, rename } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = join(__dirname, '../src/content/posts');

async function getYearFromFrontmatter(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const match = content.match(/^date:\s*(\d{4})/m);
  if (!match) return null;
  return match[1];
}

async function main() {
  const entries = await readdir(postsDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.mdx'));

  for (const f of files) {
    const src = join(postsDir, f.name);
    const year = await getYearFromFrontmatter(src);
    if (!year) {
      console.warn('Skip (no date):', f.name);
      continue;
    }
    const yearDir = join(postsDir, year);
    await mkdir(yearDir, { recursive: true });
    const dest = join(yearDir, f.name);
    await rename(src, dest);
    console.log(`${f.name} → ${year}/`);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
