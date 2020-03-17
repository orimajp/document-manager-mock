<template>
  <div>
    <h1>テスト</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
// import { documentService } from '@/services/DocumentService'
import {
  DocumentMain,
  DocumentNode,
  DocumentPage
} from '@/models/DocumentModel'
/*
const openChildNode = (topNode: DocumentNode, list: Array<string>): void => {
  // topNode.expand = false
  topNode.closeNodes()
  // topNode.select = false
  topNode.selectNode()
  openNode(topNode, list)
}
*/
const openNode = (node: DocumentNode, list: Array<string>): void => {
  // node.select = node.pageKey === list[list.length - 1]
  if (node.pageKey === list[list.length - 1]) {
    node.selectNode()
  } else {
    node.unselectNode()
  }
  if (!node.nodes || node.nodes.length === 0) {
    return
  }
  // node.expand = !!list.includes(node.pageKey)
  if (list.includes(node.pageKey)) {
    node.openNodes()
  } else {
    node.closeNodes()
  }
  if (!node.expand) {
    return
  }
  for (let i = 0; i < node.nodes.length; i++) {
    openNode(node.nodes[i], list)
  }
}
/*
const selectNode = (topNode: DocumentNode, pageKey: string): Array<string> => {
  console.log(`topNode=${topNode}, pageKey=${pageKey}`)
  // TODO 階層ページキーリストを取得
  return []
}
 */

export default Vue.extend({
  //  async fetch(ctx: Context) {
  async fetch({ params, app: { $accessor } }: Context) {
    const key = params.key
    console.log(`pageKey=${key}`)
    await $accessor.page.fetchPage(key)
    await $accessor.setPageKey(key)
    const pageData = $accessor.page.getPage(key)
    if (pageData === null) {
      throw new Error('page not dound')
    }
    await $accessor.document.fetchDocument(pageData.documentKey)
    await $accessor.setDocumentKey(pageData.documentKey)
    // const keyArray = $accessor.document.getNestedKeyArray(key)
    const keyArray = $accessor.document.document.getNestedKeyArray(key)
    $accessor.document.openChildren(keyArray)
    const document = $accessor.document.document
    console.log(JSON.stringify(pageData, null, 2))
    console.log(JSON.stringify(document, null, 2))

    /*
    // const params = ctx.params
    const key = params.key
    console.log(`pageKey=${key}`)
    // await $accessor.fetchPage(key)
    await $accessor.page.fetchPage(key)
    await $accessor.setPageKey(key)
    const page = $accessor.page.pageMap.get(key) as DocumentPage
    if (page === undefined) {
      throw new Error('page not dound')
    }
    await $accessor.document.fetchDocument(page.documentKey)
    await $accessor.setDocumentKey(page.documentKey)
    const document = $accessor.document.document as DocumentMain
    const topNode = document.node
    console.log(topNode)
    console.log('before change')
    // topNode.expand = true
    topNode.openNodes()
    console.log('after change')
    const list = selectNode(topNode, key)
    openChildNode(topNode, list)
     */
  },
  /*
  async asyncData(ctx: Context): Promise<object | void> | object | void {
    const params = ctx.params
    const key = params.key
    console.log(`key=${key}`)
    // ページ取得
    const targetPage = await documentService.getPage(key)
    const targetDocument = await documentService.getDocument(
      targetPage.documentKey
    )
    const topNode = targetDocument.node
    topNode.expand = true

    // ドキュメント存否判定
    // 該当ドキュメントが格納されていなかったら、ドキュメント取得
    // ツリー選択
    const list = selectNode(topNode, key)
    openChildNode(topNode, list)

    return {
      document: targetDocument,
      page: targetPage
    }
  },
   */
  data: () => ({
    // document: DocumentMain
    pageKeyArray: [] as Array<String>
  }),
  computed: {
    pageData(): DocumentPage {
      const pageKey = this.$accessor.pageKey
      return this.$accessor.page.getPage(pageKey)
    },
    treeNode(): DocumentNode {
      return this.getDocument().node
    }
  },
  methods: {
    getDocument(): DocumentMain {
      return this.$accessor.document.document
    },
    openChildren(list: Array<string>): void {
      const pageKey = list[list.length - 1]
      this.$accessor.setPageKey(pageKey)

      const topNode = this.getTopNode()
      // topNode.expand = false
      topNode.closeNodes()
      // topNode.select = false
      topNode.unselectNode()
      openNode(topNode, list)
    },
    getTopNode(): DocumentNode {
      // return this.document.node
      return this.getDocument().node
    }
  }
})
</script>

<style></style>
