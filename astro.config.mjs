// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

import node from '@astrojs/node';
import react from '@astrojs/react';
import db from '@astrojs/db';

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

    integrations: [react(), db()],
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
});