module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    //    parser: 'babel-eslint'
    //    parser: '@typescript-eslint-parser'
  },
  extends: [
    //    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'space-before-function-paren': 0,
    'arrow-parens': 'off'
  }
}
