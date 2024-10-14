// https://nuxt.com/docs/api/configuration/nuxt-config
import 'dotenv/config';
import type { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  buildModules: ['@nuxt/typescript-build'],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt3-leaflet'
  ],

  plugins: [
    { src: '~/plugins/quill.client.ts', mode: 'client' },
    { src: '~/plugins/echart.client.ts', mode: 'client' }
  ],

  // global meta
  app: {
    head: {
      title: "Shu's Page",
      meta: [
        { name: 'description', content: 'Practice of nuxt3 , vue3 and typescript' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,100,1,200', crossorigin: 'anonymous' }
      ],
    }
  },
  runtimeConfig: {
    // server 端使用
    currencyKey: process.env.CURRENCY_API_KEY,
    pixabayKey: process.env.PIXABAY_API_KEY,

    // client 端使用
    public: {
      finnhubKey: process.env.FINNHUB_API_KEY
    }
  },
  css: ['./assets/css/reset.scss']
};

export default config;
