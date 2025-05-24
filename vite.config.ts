// examples/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      // This allows you to import your component library as if it were published
      "@src": path.resolve(__dirname, "../src"),
    },
  },
});
