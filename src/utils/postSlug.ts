import type { CollectionEntry } from 'astro:content';

/**
 * URL slug for a post. Uses frontmatter slug if set; otherwise strips
 * year folder prefix from id so /content/posts/2026/foo.mdx → /blog/foo/
 */
export function postSlug(post: CollectionEntry<'posts'>): string {
  let slug = post.data.slug ?? (post.id.includes('/') ? post.id.split('/').slice(1).join('/') : post.id);
  return slug.replace(/\.(mdx?|md)$/i, '');
}
