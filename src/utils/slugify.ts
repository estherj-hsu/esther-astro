export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[/]/g, ' ')        // turn slashes into spaces
    .replace(/[^\w\s-]/g, '')    // remove non-word chars
    .replace(/\s+/g, '-')        // spaces → dashes
    .replace(/-+/g, '-');        // collapse multiple dashes
}