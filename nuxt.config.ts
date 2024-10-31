// @ts-nocheck
import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `@use "sass:list"; @import "@assets/global.scss";`,
        },
      },
    },
  },

  alias: {
    "@assets": resolve("./assets"),
    "@types": resolve("./types"),
  },

  modules: ["nuxt-svgo", "@nuxtjs/google-fonts", "@nuxt/image"],

  googleFonts: {
    families: {
      Montserrat: {
        subsets: ["cyrillic", "latin"],
        wght: [100, 200, 300, 400, 500, 600, 700],
      },
    },
  },
});
