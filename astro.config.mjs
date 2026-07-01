import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import db from "@astrojs/db";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve("./src"),
            },
        },
    },

    integrations: [react(), db()],
    output: "server",
    adapter: vercel(),
});