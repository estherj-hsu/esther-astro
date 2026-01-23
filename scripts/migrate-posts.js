import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hugoPostsDir = path.join(__dirname, '../../blog-hugo/content/posts');
const astroPostsDir = path.join(__dirname, '../src/content/posts');

// Ensure astro posts directory exists
if (!fs.existsSync(astroPostsDir)) {
  fs.mkdirSync(astroPostsDir, { recursive: true });
}

// Read all markdown files from Hugo posts
const files = fs.readdirSync(hugoPostsDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const hugoPath = path.join(hugoPostsDir, file);
  const content = fs.readFileSync(hugoPath, 'utf-8');
  
  // Parse frontmatter and content
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const body = frontmatterMatch[2];
    
    // Convert Hugo frontmatter to Astro format
    let astroFrontmatter = frontmatter;
    
    // Convert date format if needed
    astroFrontmatter = astroFrontmatter.replace(/date:\s*(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})/g, 'date: $1');
    
    // Convert tags array format
    astroFrontmatter = astroFrontmatter.replace(/tags:\s*\[(.*?)\]/g, (match, tags) => {
      const tagList = tags.split(',').map(t => t.trim().replace(/"/g, ''));
      return `tags:\n${tagList.map(t => `  - "${t}"`).join('\n')}`;
    });
    
    // Replace Hugo shortcodes with MDX components
    let astroBody = body;
    astroBody = astroBody.replace(/\{\{<\s*esther\s*>\}\}/g, '<Esther>');
    astroBody = astroBody.replace(/\{\{<\s*\/esther\s*>\}\}/g, '</Esther>');
    astroBody = astroBody.replace(/<!--more-->/g, '');
    
    // Write to Astro posts directory
    const astroPath = path.join(astroPostsDir, file);
    const astroContent = `---\n${astroFrontmatter}\n---\n\n${astroBody}`;
    
    fs.writeFileSync(astroPath, astroContent, 'utf-8');
    console.log(`Migrated: ${file}`);
  }
});

console.log(`\nMigration complete! Migrated ${files.length} posts.`);
