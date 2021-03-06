<template>
  <div>
    <document-drawer
      :current-node="treeNode"
      :page-key-array="pageKeyArray"
      :permanent="permanent"
      :drawer="drawer"
      @closeDrawer="closeDrawer"
      @setPermanent="setPermanent"
    />
    <document-navbar
      :document-view-navbar-content="documentViewNavbarContent"
      :permanent="permanent"
      :can-tree-edit="canTreeEdit"
      @openDrawer="openDrawer"
    />
    <document-content ref="documentContent" :page-content="pageData" />
    <document-toc-drawer :headlines="headlines" @goHeadline="goHeadline" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { DocumentHeadline } from '~/models/document/DocumentHeadline'
import DocumentNavbar from '~/components/document/DocumentNavbar'
import DocumentDrawer from '~/components/document/DocumentDrawer'
import DocumentContent from '~/components/document/DocumentContent.vue'
import DocumentTocDrawer from '~/components/document/DocumentTocDrawer'
import { DocumentNode } from '~/models/document/DocumentNode'
import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentViewNavbarContent } from '~/components/document/DocumentNavbar.vue'

export default Vue.extend({
  layout: 'viewer',
  components: {
    DocumentNavbar,
    DocumentContent,
    DocumentDrawer,
    DocumentTocDrawer
  },
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
    if (
      currentDocument.documentKey === '' ||
      $accessor.documentKey !== pageData.documentKey
    ) {
      console.log(
        `Document取得(): original documentKey=${currentDocument.documentKey} new documentKey=${pageData.documentKey}`
      )
      await $accessor.document.fetchDocument(pageData.documentKey)
      await $accessor.setDocumentKey(pageData.documentKey)
    }

    // const keyArray = $accessor.document.getNestedKeyArray(key)
    const keyArray = $accessor.document.document.getNestedKeyArray(key)
    $accessor.document.openChildren(keyArray)
    // const document = $accessor.document.document
    // console.log(JSON.stringify(pageData, null, 2))
    // console.log(JSON.stringify(document, null, 2))
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
      return this.$accessor.document.document.node
    },
    documentViewNavbarContent(): DocumentViewNavbarContent {
      return {
        pageTitle: this.pageData.pageTitle,
        documentKey: this.pageData.documentKey,
        pageKey: this.pageData.pageKey
      } as DocumentViewNavbarContent
    },
    drawer(): boolean {
      return this.$accessor.drawer.drawer
    },
    permanent(): boolean {
      return this.$accessor.drawer.permanent
    },
    headlines(): Array<DocumentHeadline> {
      return this.$accessor.headline.headlines
    },
    canTreeEdit(): boolean {
      if (this.treeNode.nodes.length > 1) {
        return true
      }
      return (
        this.treeNode.nodes.length === 1 &&
        this.treeNode.nodes[0].nodes.length > 0
      )
    }
  },
  mounted(): void {
    const hash = location.hash
    if (hash) {
      this.goHeadline(hash.slice(1))
    }
  },
  methods: {
    openDrawer(): void {
      this.$accessor.drawer.setDrawer(true)
    },
    closeDrawer(): void {
      console.log('closeDrawer() called.')
      this.$accessor.drawer.setDrawer(false)
    },
    setPermanent(state): void {
      console.log('index#setPermanent() called. state=' + state)
      this.$accessor.drawer.setPermanent(state)
    },
    goHeadline(id: string): void {
      // alert(`index id=${id}`)
      this.$refs.documentContent.goHeadline(id)
    },
    goFootNode(id: string): void {
      this.$refs.documentContent.goFootNode(id)
    }
  }
})
</script>

<style></style>
