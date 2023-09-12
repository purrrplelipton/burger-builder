import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
