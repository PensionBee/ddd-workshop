import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [react()],
});
