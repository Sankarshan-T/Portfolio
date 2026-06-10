// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
      resolve: {
          alias: {
              '@': path.resolve('./src'),
          },
      },
  },

  integrations: [react()],
});