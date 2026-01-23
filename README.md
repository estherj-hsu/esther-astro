# Esther Astro Blog

A modern blog built with Astro and TinaCMS, migrated from Hugo.

## Features

- ⚡️ Astro for fast, static site generation
- 📝 TinaCMS for content management
- 🎨 SCSS for styling
- 🚀 GitHub Pages deployment
- 📱 Responsive design
- ♿️ Accessible UI

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy static assets (if not already done)
cp -r ../blog-hugo/static/icons public/
cp -r ../blog-hugo/static/img public/
cp -r ../blog-hugo/static/images public/

# 3. Migrate content from Hugo
npm run migrate

# 4. Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site!

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Install dependencies:

```bash
npm install
```

2. Copy static assets from Hugo blog (if not already done):

```bash
cp -r ../blog-hugo/static/icons public/
cp -r ../blog-hugo/static/img public/
cp -r ../blog-hugo/static/images public/
```

3. Migrate content from Hugo:

```bash
npm run migrate
```

This will convert Hugo markdown files to Astro-compatible format and migrate pages.

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### TinaCMS Setup

1. Sign up at [tina.io](https://tina.io)
2. Create a new project
3. Add your GitHub repository
4. Set environment variables:

```bash
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

5. Access the admin panel at `/admin`

### Building

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment to GitHub Pages

The project is configured to deploy automatically to GitHub Pages via GitHub Actions.

1. Push your code to the `main` branch
2. Go to your repository Settings > Pages
3. Set the source to "GitHub Actions"
4. The workflow will automatically build and deploy on every push to `main`

## Project Structure

```
esther-astro/
├── public/          # Static assets (images, icons, etc.)
├── src/
│   ├── components/  # Astro components
│   ├── content/     # Content collections (posts, pages)
│   ├── layouts/     # Page layouts
│   ├── pages/       # Route pages
│   └── styles/      # SCSS stylesheets
├── tina/            # TinaCMS configuration
└── scripts/         # Migration and utility scripts
```

## Content Migration

The migration script (`scripts/migrate-posts.js`) converts Hugo markdown files to Astro format:

- Converts frontmatter format
- Transforms Hugo shortcodes to Astro components
- Preserves content structure

## Styling

Styles are written in SCSS and located in `src/styles/`. The global stylesheet is imported in `BaseLayout.astro`.

## License

MIT
