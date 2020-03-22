# document-manager-mock
ドキュメント管理アプリ用モックプロジェクト。

# 目的
ドキュメントツリーを持つドキュメント表示フロントエンド開発技術調査。

# 技術要素
* Nuxt.js
* TypeScript
* nuxt-typed-vuex

# 状況
* Vuex(というかVuexに格納するクラス)にてデータ更新処理を行うよう変更することにより、ツリー表示については狙い通りの動作になりつつある。
* Markdownレンダリングの基本的な動作まではできたが、生成されたHTMLの内部リンクがアンカータグになるためリンククリック時のレスポンスがやたらと悪い。

# 実行
1. git clone リポジトリ
2. cd リポジトリディレクトリ
3. npm install
4. npm run dev
5. http://localhost:3000

# 参考
## VuexへのTypeScript適用
* [NuxtJS + Vuexでいい感じのTypescript環境をあまり頑張らないで構築する - Qiita](https://qiita.com/shindex512/items/a90217b9e4c03c5b5215)
* [Introduction | 🏦 Nuxt Typed Vuex](https://nuxt-typed-vuex.roe.dev/)
* [danielroe/nuxt-typed-vuex: 🏦 A typed store accessor for Nuxt.](https://github.com/danielroe/nuxt-typed-vuex)

## @nuxtjs/markdownit
* [vue-markdown をやめて nuxtjs/markdownit を利用する](https://blog.nakamu.life/posts/vue-markdown-nuxtjs-markdownit)
* [VuejsでMarkdownを使うときの最強な組み合わせ | WatchContents](https://watchcontents.com/best-combination-vuejs-markdown/)
