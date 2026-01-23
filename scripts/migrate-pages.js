import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hugoPagesDir = path.join(__dirname, '../../blog-hugo/content');
const astroPagesDir = path.join(__dirname, '../src/content/pages');

// Pages to migrate
const pagesToMigrate = [
  { hugoPath: 'esther/index.md', astroPath: 'esther/index.mdx' },
  { hugoPath: 'portfolio/index.md', astroPath: 'portfolio/index.mdx' },
  { hugoPath: 'playground/index.md', astroPath: 'playground/index.mdx' },
];

// Ensure astro pages directory exists
if (!fs.existsSync(astroPagesDir)) {
  fs.mkdirSync(astroPagesDir, { recursive: true });
}

pagesToMigrate.forEach(({ hugoPath, astroPath }) => {
  const hugoFullPath = path.join(hugoPagesDir, hugoPath);
  const astroFullPath = path.join(astroPagesDir, astroPath);
  
  if (!fs.existsSync(hugoFullPath)) {
    console.log(`Skipping ${hugoPath} - file not found`);
    return;
  }
  
  // Create directory if needed
  const astroDir = path.dirname(astroFullPath);
  if (!fs.existsSync(astroDir)) {
    fs.mkdirSync(astroDir, { recursive: true });
  }
  
  const content = fs.readFileSync(hugoFullPath, 'utf-8');
  
  // Parse frontmatter and content
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    let body = frontmatterMatch[2];
    
    // Convert Hugo shortcodes to MDX components
    body = body.replace(/\{\{<\s*esther\s*>\}\}/g, '<Esther>');
    body = body.replace(/\{\{<\s*\/esther\s*>\}\}/g, '</Esther>');
    
    // Write to Astro pages directory
    const astroContent = `---\n${frontmatter}\n---\n\n${body}`;
    
    fs.writeFileSync(astroFullPath, astroContent, 'utf-8');
    console.log(`Migrated: ${hugoPath} -> ${astroPath}`);
  } else {
    // No frontmatter, create default
    const astroContent = `---\ntitle: ${path.basename(astroPath, '.mdx')}\n---\n\n${content}`;
    fs.writeFileSync(astroFullPath, astroContent, 'utf-8');
    console.log(`Migrated (no frontmatter): ${hugoPath} -> ${astroPath}`);
  }
});

console.log(`\nPage migration complete!`);
