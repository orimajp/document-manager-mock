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
* Markdownレンダリングの基本的な動作まで完了。
* 生成されたHTMLの内部リンクがアンカータグになるためリンククリック時のレスポンスが悪い問題は、内部リンクのみ`router.push`するような仕組みを入れて対応。
* ホストを0.0.0.0、ポート番号を`3333`に変更。開発時は`http://localhost:3333`にアクセスする。

# 実行
1. git clone リポジトリ
2. cd リポジトリディレクトリ
3. npm install
4. npm run dev
5. http://localhost:3333 # ポート番号変更済み

# 参考
## VuexへのTypeScript適用
* [NuxtJS + Vuexでいい感じのTypescript環境をあまり頑張らないで構築する - Qiita](https://qiita.com/shindex512/items/a90217b9e4c03c5b5215)
* [Introduction | 🏦 Nuxt Typed Vuex](https://nuxt-typed-vuex.roe.dev/)
* [danielroe/nuxt-typed-vuex: 🏦 A typed store accessor for Nuxt.](https://github.com/danielroe/nuxt-typed-vuex)

## @nuxtjs/markdownit
* [vue-markdown をやめて nuxtjs/markdownit を利用する](https://blog.nakamu.life/posts/vue-markdown-nuxtjs-markdownit)
* [VuejsでMarkdownを使うときの最強な組み合わせ | WatchContents](https://watchcontents.com/best-combination-vuejs-markdown/)

## 内部リンク用画面遷移処理の参考になったページ
* https://github.com/nuxt-community/modules/issues/185
* https://github.com/nuxt/nuxtjs.org/blob/master/components/commons/HtmlParser.global.vue
* https://bitto.jp/posts/blog/nuxt%E5%8C%96/nuxt-md-anchor-convert/https://bitto.jp/posts/blog/nuxt%E5%8C%96/nuxt-md-anchor-convert/
