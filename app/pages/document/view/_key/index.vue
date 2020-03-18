<template>
  <div>
    <h1>テスト</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { DocumentNode } from '../../../../models/document/DocumentNode'
import { DocumentMain } from '../../../../models/document/DocumentMain'
import { DocumentPage } from '../../../../models/document/DocumentPage'

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
  },
  data: () => ({
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

      // const topNode = this.getTopNode()
      // const topNode = this.getDocument()

      // topNode.expand = false
      // topNode.closeNodes()
      // topNode.select = false
      // topNode.unselectNode()
      // openNode(topNode, list)
      this.$accessor.document.openChildren(list)
    }
  }
})
</script>

<style></style>
