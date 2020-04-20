<template>
  <div>
    <document-editor-navbar
      :page-title="page.pageTitle"
      :document-edit="isDocumentTopPage"
      @changeMode="changeMode"
      @goTop="goTop"
      @updateTitle="updateTitle"
      @darkModeState="darkModeState"
    />
    <v-row class="content-area">
      <v-col v-show="displayEditForm" :cols="displayEditFormCols">
        <!--
        <document-editor-form
          :page-content="page"
          :display-mode="displayMode"
          @updateTitle="updateTitle"
          @updatePageData="updatePageData"
        />
        -->
        <!--
        <document-editor-pane
          :page-content="page"
          :display-mode="displayMode"
          @updatePageData="updatePageData"
          @updateEditorScrollStete="updateEditorScrollStete"
        />
        -->
        <document-editor-pane
          :page-content="page"
          :display-mode="displayMode"
          :dark-mode="darkMode"
          @updatePageData="updatePageData"
        />
      </v-col>
      <v-col
        v-show="displayPreviewArea"
        :cols="displayPreviewAreaCols"
        :class="{ 'preview-area': dualMode }"
      >
        <document-content
          ref="documentContent"
          :page-content="page"
          :editor="true"
        />
      </v-col>
    </v-row>
    <document-editor-footer
      :change="change"
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
// import DocumentEditorForm from '~/components/document/edit/DocumentEditorForm'
import DocumentEditorPane from '~/components/document/edit/DocumentEditorPane'
import DocumentContent from '~/components/document/DocumentContent.vue'
import DocumentEditorFooter from '~/components/document/edit/DocumentEditorFooter'
import { DocumentPage } from '~/models/document/DocumentPage'
import { DocumentMain } from '~/models/document/DocumentMain'
import { EDIT, DUAL, PREV } from '~/models/EditorDisplayMode'
import {
  getDisplayEditFormCols,
  getDisplayPreviewAreaCols
} from '~/models/EditorPaneColumns'

/*
const getDocument = (page: DocumentPage | null) => {
  if (page === null) {
    return Promise.resolve(null)
  }
  return documentService.getDocument(page.documentKey)
}
*/

const LEAVE_CONFIRM_MESSAGE =
  '編集中のデータを破棄してページを離れます。よろしいですか？'

// https://crieit.net/posts/Nuxt-js-5e4d14a9d61f4
export default Vue.extend({
  layout: 'viewer',
  components: {
    DocumentEditorNavbar,
    // DocumentEditorForm,
    DocumentEditorPane,
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
    displayMode: DUAL, // 初期値がコンポーネントと同期しない可能性あり
    change: false,
    distinationPath: '',
    darkMode: false,
    savePage: false
    // savePage: false,
    // scrollEditor: false,
    // scrollPreview: false
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
      return getDisplayEditFormCols(this.displayMode)
    },
    displayPreviewAreaCols() {
      return getDisplayPreviewAreaCols(this.displayMode)
    },
    dualMode() {
      return this.displayMode === DUAL
      /*
    },
    editorScrolling() {
      return this.scrollEditor
    },
    previewScrolling() {
      return this.scrollPreview
    },
    scrolling() {
      return this.editorScrolling || this.previewScrolling
      */
    }
  },
  watch: {
    displayMode(newValue, oldValue) {
      console.log(`display mode change ${oldValue} to ${newValue}`)
    }
  },
  mounted(): void {
    this.addListener()
  },
  beforeDestroy(): void {
    this.removeListener()
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteLeave(to, from, next) {
    if (!this.change || this.savePage) {
      return next()
    }
    const answer = window.confirm(LEAVE_CONFIRM_MESSAGE)
    if (answer) {
      next()
      return
    }
    next(false)
  },
  methods: {
    /*
    async registerPage() {
      // TODO ドキュメント新規登録処理、ページ新規登録処理 いずれもドキュメントサービス側で生成されたキーの返却が行われる
      const createdPage = await documentService.registerDocumentPage(this.page)
      await this.$router.push(`/document/view/${createdPage.pageKey}`)
    },
     */
    updateTitle(pageTitle) {
      console.log(`updateTitle() pageTitle=${pageTitle}`)
      this.change = true
      this.page.pageTitle = pageTitle
    },
    updatePageData(pageData) {
      console.log(`updatePageData() pageData=${pageData}`)
      this.change = true
      this.page.pageData = pageData
    },
    /*
    updateEditorScrollStete(state) {
      console.log(`updateEditorScrollStete(): state=${state}`)
      this.scrollEditor = state
    },
    updatePreviewScrollState(state) {
      this.scrollPreview = state
    },
     */
    async updateDocument() {
      this.savePage = true
      await documentService.updateDocumentPage(this.page)
      await this.$router.push(`/document/view/${this.page.pageKey}`)
    },
    cancelDocument() {
      this.$router.push(`/document/view/${this.page.pageKey}`)
    },
    darkModeState(state) {
      this.darkMode = state
    },
    changeMode(mode) {
      this.displayMode = mode
    },
    goTop() {
      this.$router.push('/')
    },
    addListener() {
      window.addEventListener('beforeunload', this.confirmUnload, false)
    },
    removeListener() {
      window.removeEventListener('beforeunload', this.confirmUnload, false)
    },
    confirmUnload(event: BeforeUnloadEvent) {
      if (this.change && !this.savePage) {
        event.preventDefault()
        // ここのメッセージはブラウザ依存
        event.returnValue = LEAVE_CONFIRM_MESSAGE
      }
    }
  }
})
</script>

<style scoped>
.content-area {
  margin-top: 50px;
  margin-bottom: 50px;
}
/* 以下は利用している */
.preview-area {
  padding-left: 0;
}
</style>
