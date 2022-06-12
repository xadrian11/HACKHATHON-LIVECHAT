import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        worker: "./src/worker.ts",
        content: "./src/content.ts"
      },
      output: {
        entryFileNames: (info) =>
          info.name === "main" ? "assets/[name].[hash].js" : "[name].js",
      },
    },
  },
});
