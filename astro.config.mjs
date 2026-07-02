import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
    adapter: vercel(),

    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve("./src"),
            },
        },
    },

    integrations: [react()],
});