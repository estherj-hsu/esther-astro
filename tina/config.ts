import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  // See docs on content modeling for more info
  schema: {
    collections: [
      {
        name: 'posts',
        label: 'Posts',
        path: 'src/content/posts',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: false,
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft',
            required: false,
          },
          {
            type: 'boolean',
            name: 'hidden',
            label: 'Hidden',
            required: false,
          },
          {
            type: 'string',
            name: 'slug',
            label: 'Slug',
            required: false,
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            required: false,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
      {
        name: 'pages',
        label: 'Pages',
        path: 'src/content/pages',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: false,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
});
