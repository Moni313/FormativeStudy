import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// });

import Vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-vue-markdown";

export default {
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Markdown(),
  ],

  server: {
    open: '/',
    cors: true,
    proxy: {
      "/apiFS": {
        target: "http://localhost:3001",
        pathRewrite: { "^/apiFS": "" },
        // ws: false,
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
