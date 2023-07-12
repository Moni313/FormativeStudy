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
      "/categories": {
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/categories": "" },
        // ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/category":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/category": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/optionsLabsCategory":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/optionLabsCategory": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/optionsVitalsCategory":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/optionsVitalsCategory": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/optionsMedicationsCategory":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/optionsMedicationsCategory": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/logger":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/logger": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/participantTaskOrder":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/participantTaskOrder": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/prestudyQuestions":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/prestudyQuestions": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/poststudyQuestions":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/poststudyQuestions": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/posttaskQuestions":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/posttaskQuestions": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/scenarios":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/scenarios": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
      "/initialization":{
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/initialization": "" },
        //ws: false,
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
