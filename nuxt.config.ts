// https://nuxt.com/docs/api/configuration/nuxt-config
import 'dotenv/config';
import type { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  buildModules: ['@nuxt/typescript-build'],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],

  // global meta
  app: {
    head: {
      title: "Shu's Page",
      meta: [
        { name: 'description', content: 'Practice of nuxt3 , vue3 and typescript' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ],
    }
  },
  runtimeConfig: {
    currencyKey: process.env.CURRENCY_API_KEY
  },
  css: ['./assets/css/reset.scss']
};

export default config;
