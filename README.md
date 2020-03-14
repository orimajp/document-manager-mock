# document-manager-mock
ドキュメント管理アプリ用モックプロジェクト。

# 目的
ドキュメントツリーを持つドキュメント表示フロントエンド開発技術調査。

# 技術要素
* Nuxt.js
* TypeScript
* nuxt-typed-vuex

# 状況
Vuexによるデータ管理を目指したが、mutationメソッド以外からの更新ができず断念。mutationメソッド以外では更新できないことは分かっていたが、ストアデータをTypeSciptのクラスでラップし、そのクラスのメソッドで更新すれば行けるのでないかはと試したが駄目だった。

対策としてmutationに更新メソッドを用意する方法が考えられるが、管理対象のデータがツリー構造を持っているため、mutationメソッド実行時に対象ノードを毎回検索するのは効率的とは思えない。

# 成果
nuxt-typed-vuexの利用方法がある程度分かった。

# 実行
1. git clone リポジトリ
2. cd リポジトリディレクトリ
3. npm install
4. npm run dev
5. http://localhost:3000/document/view/page0

上記より、以下のエラーが発生する。

```
[vuex] do not mutate vuex store state outside mutation handlers.
```

# 参考
* [NuxtJS + Vuexでいい感じのTypescript環境をあまり頑張らないで構築する - Qiita](https://qiita.com/shindex512/items/a90217b9e4c03c5b5215)
* [Introduction | 🏦 Nuxt Typed Vuex](https://nuxt-typed-vuex.roe.dev/)
* [danielroe/nuxt-typed-vuex: 🏦 A typed store accessor for Nuxt.](https://github.com/danielroe/nuxt-typed-vuex)
