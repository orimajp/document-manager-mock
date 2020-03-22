import { IDocumentService } from '~/services/document/IDocumentService'
import { DocumentMainData, DocumentNodeData, DocumentPageData } from '~/types'

class FileDocumentService implements IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMainData> {
    console.log(documentKey)
    return new Promise<DocumentMainData>((resolve, reject) => {
      const document = createDocument(documentKey)
      if (document === null) {
        reject(new Error(`document not found documentKey=${documentKey}`))
      }
      resolve(document as DocumentMainData)
    })
  }

  getPage(pageKey: string): Promise<DocumentPageData> {
    console.log(pageKey)
    return new Promise<DocumentPageData>(resolve => {
      const page = getPage(pageKey)
      resolve(page)
    })
  }
}

export const fileDocumentService = new FileDocumentService()

const createDocument = (documentKey: string): DocumentMainData | null => {
  const documentNode = nodeMap.get(documentKey)
  if (documentNode === undefined) {
    return null
  }

  return {
    documentKey,
    node: documentNode
  } as DocumentMainData | null
}

const getDocumentKey = (pageKey: string): string => {
  const documentKey = pageToDocument.get(pageKey)
  if (documentKey === undefined) {
    throw new Error(`DocumentKey not registerd. pageKey=${pageKey}`)
  }
  return documentKey
}

const getPage = (pageKey: string): DocumentPageData => {
  const page = {} as DocumentPageData
  page.pageKey = pageKey
  page.documentKey = getDocumentKey(pageKey)
  page.pageTitle = `マークダウン:${pageKey}`
  // page.pageData = require(`~/contents/${pageKey}.md`)
  // page.pageData = await import(`~/contents/${pageKey}.md`)
  // page.pageData = ''
  /*
  page.pageData = `
  # マークダウンテスト
  `
   */
  page.pageData = convertCr(dummyPageData)

  return page
}

const convertCr = (page: string): string => {
  const cr = '0A'
  const crCode = String.fromCharCode(parseInt(cr, 16))
  return page.replace(/\\n/g, crCode)
}

// ファイル読み取りに苦戦しているのでとりあえずデータ定義で逃げる
const dummyPageData = `
# (見出し1)
## (見出し2)
### (見出し3)
#### (見出し4)
##### (見出し5)
###### (見出し6)

> 引用

# リンクテスト
\`[]()\`記述によるリンクが通常のアンカータグになるためか遷移が遅いため、相対リンクの場合はNuxt.jsの画面遷移処理を実行する。

* [page0(/document/view/page0)](/document/view/page0)
* [page8(/document/view/page8)](/document/view/page8)
* [page8(http://localhost:3333/document/view/page8)](http://localhost:3333/document/view/page8)
* [Google(外部リンク)](https://www.google.com/)

## 内部リンク用画面遷移処理の参考になったページ
このうち\`HtmlParser.global.vue\`をアレンジして利用した。

* https://github.com/nuxt-community/modules/issues/185
* https://github.com/nuxt/nuxtjs.org/blob/master/components/commons/HtmlParser.global.vue
* https://bitto.jp/posts/blog/nuxt%E5%8C%96/nuxt-md-anchor-convert/https://bitto.jp/posts/blog/nuxt%E5%8C%96/nuxt-md-anchor-convert/

# コード
## TypeScript

\`\`\`ts
import { DocumentPage } from '~/models/document/DocumentPage'

export class DocumentPageHolder {
  private pageMap: Map<string, DocumentPage>
  constructor() {
    this.pageMap = new Map<string, DocumentPage>()
  }

  getPage(pageKey: string): DocumentPage | null {
    const page = this.pageMap.get(pageKey)
    return page || null // narrowing
  }

  addPage(pageKey: string, page: DocumentPage): void {
    this.pageMap.set(pageKey, page)
  }

  clearPageCache(): void {
    this.pageMap.clear()
  }
}
\`\`\`

## Vue.js

\`\`\`vue
<template>
  <div>
    <v-content>
      <v-container>
        <h1>ナビゲーション</h1>
        <ul>
          <li>
            <nuxt-link to="/document/view/page0">
              ツリー構造テスト(page0)
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/document/view/md-page0">
              markdownレンダリングテスト(md-page0)
            </nuxt-link>
          </li>
        </ul>
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style></style>
\`\`\`

# markdown-it-sanitizer
<b>これは強調されるが以下のscriptタグは無効化される。</b>

<script>
alert('危険!')
</script>

# markdown-it-container
とりあえずBootstrap風スタイル。

::: alert-primary
Primary
:::

::: alert-secondary
Secondary
:::

::: alert-success
Success
:::

::: alert-info
Info
:::

::: alert-warning
Warning
:::

::: alert-danger
Danger
:::

`

const documentNode1 = {
  pageTitle: 'マークダウン:md-page0',
  pageKey: 'md-page0',
  nodes: []
}

const documentNode100 = {
  pageTitle: 'マークダウン:md-page100',
  pageKey: 'md-page100',
  nodes: []
}

const nodeMap = new Map<String, DocumentNodeData>([
  ['md-page0', documentNode1],
  ['md-page100', documentNode100]
])

const pageToDocument = new Map<string, string>([
  ['md-page0', 'md-page0'],
  ['md-page100', 'md-page100']
])
