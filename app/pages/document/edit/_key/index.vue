<template>
  <div>
    <document-editor-navbar @changeMode="changeMode" />
    <v-row class="content-area">
      <v-col v-show="displayEditForm" :cols="displayEditFormCols">
        <document-editor-form
          :page-content="page"
          :display-mode="displayMode"
          @updateTitle="updateTitle"
          @updatePageData="updatePageData"
        />
      </v-col>
      <v-col v-show="displayPreviewArea" :cols="displayPreviewAreaCols">
        <document-content ref="documentContent" :page-content="page" />
      </v-col>
    </v-row>
    <document-editor-footer
      class="editor-footter"
      @updateDocument="updateDocument"
      @cancelDocument="cancelDocument"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { documentService } from '~/services/document/DocumentService'
import DocumentEditorNavbar from '~/components/document/edit/DocumentEditorNavbar'
import DocumentEditorForm from '~/components/document/edit/DocumentEditorForm'
import DocumentContent from '~/components/document/DocumentContent.vue'
import DocumentEditorFooter from '~/components/document/edit/DocumentEditorFooter'
import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentMain } from '~/models/document/DocumentMain'
import { EDIT, DUAL, PREV } from '~/models/EditorDisplayMode'

/*
const getDocument = (page: DocumentPage | null) => {
  if (page === null) {
    return Promise.resolve(null)
  }
  return documentService.getDocument(page.documentKey)
}
*/

export default Vue.extend({
  layout: 'viewer',
  components: {
    DocumentEditorNavbar,
    DocumentEditorForm,
    DocumentContent,
    DocumentEditorFooter
  },
  async asyncData({ params }: Context) {
    const key = params.key
    const page = await documentService.getPage(key)
    const document = await documentService.getDocument(page.documentKey)
    return {
      document,
      page
    }
  },
  data: () => ({
    document: {} as DocumentMain,
    page: {} as DocumentPage,
    displayMode: DUAL // 初期値がコンポーネントと同期しない可能性あり
  }),
  computed: {
    isDocumentTopPage(): boolean {
      return this.page.documentKey === this.page.pageKey
    },
    displayEditForm() {
      return this.displayMode !== PREV
    },
    displayPreviewArea() {
      return this.displayMode !== EDIT
    },
    displayEditFormCols() {
      if (this.displayMode === PREV) {
        return 0
      }
      if (this.displayMode === EDIT) {
        return 12
      }
      return 6
    },
    displayPreviewAreaCols() {
      if (this.displayMode === PREV) {
        return 12
      }
      if (this.displayMode === EDIT) {
        return 0
      }
      return 6
    }
  },
  watch: {
    displayMode(newValue, oldValue) {
      console.log(`display mode change ${oldValue} to ${newValue}`)
    }
  },
  methods: {
    /*
    async registerPage() {
      // TODO ドキュメント新規登録処理、ページ新規登録処理 いずれもドキュメントサービス側で生成されたキーの返却が行われる
      const createdPage = await documentService.registerDocumentPage(this.page)
      await this.$router.push(`/document/view/${createdPage.pageKey}`)
    },
     */
    pageData() {
      return this.page
    },
    updateTitle(pageTitle) {
      console.log(`updateTitle() pageTitle=${pageTitle}`)
      this.page.pageTitle = pageTitle
    },
    updatePageData(pageData) {
      console.log(`updatePageData() pageData=${pageData}`)
      this.page.pageData = pageData
    },
    async updateDocument() {
      await documentService.updateDocumentPage(this.page)
      await this.$router.push(`/document/view/${this.page.pageKey}`)
    },
    cancelDocument() {
      this.$router.push(`/document/view/${this.page.pageKey}`)
    },
    changeMode(mode) {
      this.displayMode = mode
    }
  }
})
</script>

<style scoped>
.content-area {
  margin-top: 50px;
}
.editor-footter {
  bottom: 0;
}
</style>
