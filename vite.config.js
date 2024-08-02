import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";

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
});
