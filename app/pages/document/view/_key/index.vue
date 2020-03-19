<template>
  <div>
    <!--
    <h1>テスト</h1>
    -->
    <document-drawer :current-node="treeNode" :page-key-array="pageKeyArray" />
    <document-navbar :document-navbar-content="documentNavbarContent" />
    <document-content :page-content="pageData" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { DocumentNavbarContent } from '~/components/document/DocumentNavbar.vue'
import DocumentNavbar from '~/components/document/DocumentNavbar'
import DocumentDrawer from '~/components/document/DocumentDrawer'
import DocumentContent from '~/components/document/DocumentContent.vue'
import { DocumentNode } from '~/models/document/DocumentNode'
import { DocumentMain } from '~/models/document/DocumentMain'
import { DocumentPage } from '~/models/document/DocumentPage'

export default Vue.extend({
  layout: 'viewer',
  components: {
    DocumentNavbar,
    DocumentContent,
    DocumentDrawer
  },
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

    const currentDocument = $accessor.document.document
    if (currentDocument.documentKey === '' || $accessor.documentKey) {
      console.log(`Document取得(): documentKey=${pageData.documentKey}`)
      await $accessor.document.fetchDocument(pageData.documentKey)
      await $accessor.setDocumentKey(pageData.documentKey)
    }

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
    },
    documentNavbarContent(): DocumentNavbarContent {
      return {
        pageTitle: this.pageData.pageTitle
      } as DocumentNavbarContent
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
