import { IDocumentService } from '~/services/document/IDocumentService'
import { DocumentMainData, DocumentNodeData, DocumentPageData } from '~/types'
import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentMainBuilder } from '~/models/document/DocumentMainBuilder'
import { DocumentMain } from '~/models/document/DocumentMain'
import { DocumentListRecord } from '~/models/document/DocumentListRecord'
import { NewDocumentData } from '~/models/document/NewDocumentData'
import { NewPageData } from '~/models/document/NewPageData'
import {
  documentNodeNestHandler,
  UNMATCH
} from '~/services/document/DocumentNodeNestHandler'

class FileDocumentService implements IDocumentService {
  getDocument(documentKey: string): Promise<DocumentMain> {
    console.log(documentKey)
    return new Promise<DocumentMain>((resolve, reject) => {
      const document = createDocument(documentKey)
      if (document === null) {
        reject(new Error(`document not found documentKey=${documentKey}`))
      }
      const builder = new DocumentMainBuilder(document as DocumentMainData)
      resolve(builder.createDocument())
    })
  }

  getPage(pageKey: string): Promise<DocumentPage> {
    console.log(pageKey)
    return new Promise<DocumentPage>(resolve => {
      const page = getPage(pageKey)
      resolve(new DocumentPage(page as DocumentPageData))
    })
  }

  getRowDocument(documentKey: string): Promise<DocumentMainData> {
    console.log(documentKey)
    return new Promise<DocumentMainData>((resolve, reject) => {
      const document = createDocument(documentKey)
      if (document === null) {
        reject(new Error(`document not found documentKey=${documentKey}`))
      }
      resolve(document as DocumentMainData)
    })
  }

  getRowPage(pageKey: string): Promise<DocumentPageData> {
    console.log(pageKey)
    return new Promise<DocumentPageData>(resolve => {
      const page = getPage(pageKey)
      resolve(page as DocumentPageData)
    })
  }

  updateRowDocumentNodes(
    documentKey: string,
    nodes: Array<DocumentNodeData>
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const document = createDocument(documentKey)
      if (document === null) {
        reject(new Error(`document not found documentKey=${documentKey}`))
      }
      const node = (document as DocumentMainData).node
      node.nodes = nodes
      resolve()
    })
  }

  updateRowDocumentPage(pageData: DocumentPageData) {
    for (const page of documentPages) {
      if (page.pageKey === pageData.pageKey) {
        page.pageTitle = pageData.pageTitle
        page.pageData = pageData.pageData
        return
      }
    }
    throw new Error('ページが見つかりません。')
  }

  updateDocumentPage(pageData: DocumentPage): void {
    for (const page of documentPages) {
      if (page.pageKey === pageData.pageKey) {
        page.pageTitle = pageData.pageTitle
        page.pageData = pageData.pageData
        return
      }
    }
    throw new Error('ページが見つかりません。')
  }

  registerDocumentPage(pageData: DocumentPage): DocumentPage {
    console.log(`registerDocumentPage() 開発中 pageData=${pageData}`)
    return {} as DocumentPage
  }

  getDocumentList(): Array<DocumentListRecord> {
    return [
      {
        pageName: 'マークダウン:md-page0',
        documentKey: 'md-page0'
      }
    ]
  }

  registerDocument(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    documentKey: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    newDocumentData: NewDocumentData
  ): Promise<void> {
    // TODO 登録系は実装しない
    return Promise.resolve()
  }

  registerPage(pageKey: string, newPageData: NewPageData): Promise<void> {
    return new Promise<void>(resolve => {
      const node = {
        pageTitle: newPageData.title,
        pageKey,
        nodes: [] as Array<DocumentNodeData>
      } as DocumentNodeData

      const documentKey = newPageData.documentKey as string
      const documentNode = nodeMap.get(documentKey) as DocumentNodeData
      documentNode.nodes.unshift(node)

      const pageData = {
        documentKey,
        pageKey,
        pageTitle: newPageData.title,
        pageData: newPageData.pageData
      } as DocumentPage

      documentPages.push(pageData) // 別のインタフェースだが、構造が同じなのでTypsScript的にはOK

      resolve()
    })
  }

  registerPageAppendChild(
    targetPagekey: string,
    newPageKey: string,
    newPageData: NewPageData
  ): Promise<void> {
    return new Promise<void>(resolve => {
      const pageData = {
        documentKey: newPageData.documentKey as string,
        pageKey: newPageKey,
        pageTitle: newPageData.title,
        pageData: newPageData.pageData
      } as DocumentPage

      documentPages.push(pageData) // 別のインタフェースだが、構造が同じなのでTypsScript的にはOK

      const node = {
        pageTitle: newPageData.title,
        pageKey: newPageKey,
        nodes: [] as Array<DocumentNodeData>
      } as DocumentNodeData

      prevendNewDocumentNode(
        targetPagekey,
        newPageData.documentKey as string,
        node
      )

      resolve()
    })
  }

  registerPageAppendNext(
    targetPagekey: string,
    newPageKey: string,
    newPageData: NewPageData
  ): Promise<void> {
    return new Promise<void>(resolve => {
      const pageData = {
        documentKey: newPageData.documentKey as string,
        pageKey: newPageKey,
        pageTitle: newPageData.title,
        pageData: newPageData.pageData
      } as DocumentPage

      documentPages.push(pageData) // 別のインタフェースだが、構造が同じなのでTypsScript的にはOK

      const node = {
        pageTitle: newPageData.title,
        pageKey: newPageKey,
        nodes: [] as Array<DocumentNodeData>
      } as DocumentNodeData

      appendNewDocumentNode(
        targetPagekey,
        newPageData.documentKey as string,
        node
      )

      resolve()
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

const getPage = (pageKey: string): DocumentPageData | null => {
  for (const page of documentPages) {
    if (page.pageKey === pageKey) {
      const pageData = {} as DocumentPageData
      pageData.pageKey = page.pageKey
      pageData.documentKey = page.documentKey
      pageData.pageTitle = page.pageTitle
      pageData.pageData = convertCr(page.pageData)
      return pageData
    }
  }

  return null
}

const convertCr = (page: string): string => {
  const cr = '0A'
  const crCode = String.fromCharCode(parseInt(cr, 16))
  return page.replace(/\\n/g, crCode)
}

const prevendNewDocumentNode = (
  targetPageKey: string,
  documentKey: string,
  newDocumentNode: DocumentNodeData
): void => {
  const documentNode = nodeMap.get(documentKey)
  if (documentNode === undefined) {
    throw new Error(
      `ドキュメントノードが見つかりません。documentKey=${documentKey}`
    )
  }

  const result = documentNodeNestHandler.prevendChileTargetNode(
    targetPageKey,
    documentNode,
    newDocumentNode
  )

  if (!result) {
    throw new Error(
      `ドキュメントノードが見つかりません。 pageKey=${targetPageKey}`
    )
  }
}

const appendNewDocumentNode = (
  targetPageKey: string,
  documentKey: string,
  newDocumentNode: DocumentNodeData
): void => {
  const documentNode = nodeMap.get(documentKey)
  if (documentNode === undefined) {
    throw new Error(
      `ドキュメントノードが見つかりません。documentKey=${documentKey}`
    )
  }

  const result = documentNodeNestHandler.appendNextTargetNode(
    targetPageKey,
    documentNode,
    newDocumentNode
  )

  if (result === UNMATCH) {
    throw new Error(
      `ドキュメントノードが見つかりません。 pageKey=${targetPageKey}`
    )
  }
}

// ファイル読み取りに苦戦しているのでとりあえずデータ定義で逃げる
const dummyPageData1 = `
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

# markdown-it-plantuml

@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml

# markdown-it-mark
==ハイライト表示== のテストです。
このプラグインは分かち書きが必要っぽい。

# markdown-it-footnote
これは脚注[^1]のテストです

[^1]:これは１つ目の脚注の内容です

# markdown-it-ins
++下線++

# markdown-it-sub

H~2~o

# markdown-it-abbr
The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium

# markdown-it-deflist
改行の制御はmarkdown-itのbreaksパラメータの影響を受けているっぽい。

名前 1
:  定義1
定義1の改行

名前2 *名前のマークアッップ*

:  定義2

# markdown-it-video
@[vimeo](365349055)

`

const documentPages: Array<DocumentPageData> = [
  {
    documentKey: 'md-page0',
    pageKey: 'md-page0',
    pageTitle: 'マークダウン:md-page0',
    pageData: dummyPageData1
  }
]

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
