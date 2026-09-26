import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://scanclub.netlify.app',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
