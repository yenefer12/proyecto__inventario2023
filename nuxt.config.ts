
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
        titleTemplate:"%s Nakamas",
         htmlAttrs: {
            lang: 'es'
          },
          meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Programa de inventario documental para una gestión eficiente y organizada de documentos' },
            { name: 'keywords', content: 'inventario documental, gestión de documentos, software, organización de documentos' }
            ],
            link: [
                // {
                //     rel: 'stylesheet',
                //     href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
                //     integrity: 'sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD',
                //     crossorigin: 'anonymous'
                // }
                {
                  rel: 'stylesheet',
                  href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
                }

            ],
            script: [
                // {
                //     src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
                //     integrity: 'sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN',
                //     crossorigin: 'anonymous'
                // },
                {
                    src: 'https://kit.fontawesome.com/96549dedfc.js',
                    crossorigin: 'anonymous'
                },
            ],
    }
  },
  css: [
    "vuetify/styles",
    '~/assets/scss/main.scss',
  ],
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },
  vite:{
    ssr: {noExternal:["vuetify"]},
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;'
        }
      }
    }
  },
  modules: [
    "@nuxtjs/google-fonts",
    '@pinia/nuxt'
  ],
  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Kablammo: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    download:false,
    useStylesheet: true,
  },
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // Product page generated on-demand, revalidates in background
    '/products/**': { swr: true },
    // Blog post generated on-demand once until next deploy
    '/blog/**': { isr: true },
    // Admin dashboard renders only on client-side
    '/admin/**': { ssr: false },
    // Add cors headers on API routes
    '/api/**': { cors: true },
    // Redirects legacy urls
    '/old-page': { redirect: '/new-page' }
  }
});
