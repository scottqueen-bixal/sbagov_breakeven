import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import testConfig from "./vite-config/test";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // semantic-ui theming requires the import path of theme.config to be rewritten to our local theme.config file
    alias: {
      "../../theme.config": path.resolve(
        __dirname,
        "./src/semantic/theme.config"
      ),
      "~semantic-ui-less/theme.less": path.resolve(
        __dirname,
        "./node_modules/semantic-ui-less/theme.less"
      ),
    },
  },
  server: {
    port: 3000,
    open: "/",
  },
  test: testConfig,
  build: {
    emptyOutDir: true,
    outDir: "build",
    chunkSizeWarningLimit: "1000",
    rollupOptions: {
      output: {
        manualChunks: {},
        entryFileNames: `js/sbagov-breakeven.min.js`,
        assetFileNames: `css/sbagov-breakeven.min.[ext]`,
      },
    },
  },
});
