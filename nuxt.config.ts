// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'notivue/nuxt'
  ],
  css: [
    'notivue/notifications.css',
    'notivue/animations.css'
  ],
  notivue: {
    limit: 1
  },
  devtools: { enabled: false }
})
