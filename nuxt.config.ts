import * as path from 'path'
import { Configuration } from '@nuxt/types'
// import hljs from 'highlight.js' // こっちだけimportするとコードハイライトでコケる
// import hljsDefineVue from 'highlightjs-vue' // こちらはimortできない

const nuxtConfig: Configuration = {
  mode: 'spa',
  srcDir: 'app',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      /*
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css'
      }
      */
    ]
  },

  /*
   ** for IntelliJ IDEA / WebStorm
   */
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    //    root: path.resolve(__dirname, 'app/'),
    alias: {
      '@': path.resolve(__dirname, 'app/'),
      '~': path.resolve(__dirname, 'app/')
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'github-markdown-css',
    '../node_modules/highlight.js/styles/github-gist.css'
    // 'github-markdown-css' // github-gist.cssaが無いとハイライトされない
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vuetify'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    // '@nuxt/typescript-build',
    'nuxt-typed-vuex'
  ],
  vuetify: [],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/markdownit'],

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  // https://github.com/highlightjs/highlightjs-vue
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    highlight: (str: string, lang: string) => {
      const hljs = require('highlight.js')
      const hljsDefineVue = require('highlightjs-vue')
      hljsDefineVue(hljs)
      hljs.initHighlightingOnLoad()
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (__) {}
        return '' // use external default escaping
      }
    },
    use: [
      ['markdown-it-container', 'alert-primary'],
      ['markdown-it-container', 'alert-secondary'],
      ['markdown-it-container', 'alert-info'],
      ['markdown-it-container', 'alert-success'],
      ['markdown-it-container', 'alert-warning'],
      ['markdown-it-container', 'alert-danger'],
      'markdown-it-sanitizer'
    ]
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: [/typed-vuex/],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extend(config, ctx) {}
  }
}

module.exports = nuxtConfig
// export default nuxtConfig
