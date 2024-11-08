// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: [
  ],
  modules: ["@primevue/nuxt-module"],
  primevue: {
    // components: {
    //   include: ["Menu"],
    //   exclude: ['Galleria', 'Carousel']
    // },
    options: {
      // ripple: false,
      // inputVariant: "filled",
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: "system",
          cssLayer: false,
        },
      },
    },
  },
  build: {
    transpile: ["primevue"],
  },
});
