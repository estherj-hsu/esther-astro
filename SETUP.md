# Setup Guide

## Initial Setup

1. **Install dependencies:**
   ```bash
   cd esther-astro
   npm install
   # or
   pnpm install
   ```

2. **Copy static assets:**
   ```bash
   # From the project root
   cp -r blog-hugo/static/icons esther-astro/public/
   cp -r blog-hugo/static/img esther-astro/public/
   cp -r blog-hugo/static/images esther-astro/public/
   ```

3. **Migrate content:**
   ```bash
   cd esther-astro
   npm run migrate
   ```
   
   This will:
   - Convert all Hugo posts to Astro format
   - Migrate pages (esther, portfolio, playground)
   - Transform Hugo shortcodes to Astro components

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:4321` to see your site.

## TinaCMS Setup

1. **Sign up for TinaCMS:**
   - Go to [tina.io](https://tina.io)
   - Create a free account
   - Create a new project

2. **Connect your repository:**
   - Add your GitHub repository to TinaCMS
   - Follow the setup instructions

3. **Set environment variables:**
   
   Create a `.env` file in the project root:
   ```env
   NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id_here
   TINA_TOKEN=your_token_here
   ```

4. **Access the admin panel:**
   - Run `npm run tinacms:dev` to start with TinaCMS
   - Or visit `/admin` after building

## Development Workflow

### Regular Development
```bash
npm run dev
```

### With TinaCMS
```bash
npm run tinacms:dev
```

### Build for Production
```bash
npm run build
npm run preview  # Preview the build locally
```

## GitHub Pages Deployment

The project is configured with GitHub Actions for automatic deployment:

1. **Enable GitHub Pages:**
   - Go to your repository Settings > Pages
   - Set source to "GitHub Actions"

2. **Push to main branch:**
   - Every push to `main` will trigger a build and deploy
   - Check the Actions tab for deployment status

3. **Custom domain (optional):**
   - Add your custom domain in repository Settings > Pages
   - Update `site` in `astro.config.mjs` if needed

## Troubleshooting

### SCSS not compiling
- Make sure `sass` is installed: `npm install sass`
- Check that `src/styles/global.scss` is imported in `BaseLayout.astro`

### MDX components not working
- Components need to be imported in MDX files
- For the `<Esther>` component, use: `import Esther from '../components/Esther.astro'`

### TinaCMS not loading
- Check that environment variables are set
- Verify your TinaCMS project is connected to the repository
- Make sure you've run `npm run tinacms:build` at least once

### Build errors
- Clear `.astro` cache: `rm -rf .astro`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
