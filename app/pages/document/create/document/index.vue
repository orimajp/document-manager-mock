<template>
  <div>
    <document-editor-navbar
      :page-title="page.pageTitle"
      :document-edit="true"
      :create-mode="true"
      @changeMode="changeMode"
      @goTop="goTop"
      @updateTitle="updateTitle"
      @darkModeState="darkModeState"
      @syncModeState="syncModeState"
    />
    <v-row class="content-area">
      <v-col v-show="displayEditForm" :cols="displayEditFormCols">
        <markdown-editor
          ref="editor"
          :markdown-data="page.pageData"
          :window-size="windowSize"
          :dark-mode="darkMode"
          :display-mode="displayMode"
          class="fixed-content"
          @updatePageData="updatePageData"
          @onScrollUpdatedViewer="onScrollUpdatedViewer"
        />
      </v-col>
      <v-col
        v-show="displayPreviewArea"
        :cols="displayPreviewAreaCols"
        class="preview-area"
      >
        <document-content
          ref="viewer"
          :page-content="page"
          :window-size="windowSize"
          :editor="true"
          :display-mode="displayMode"
          @onScrollUpdatedEditor="onScrollUpdatedEditor"
        />
      </v-col>
    </v-row>
    <document-editor-create-footer
      :change="titleFilled"
      :document-edit="true"
      @registerDocument="registerDocument"
      @cancelDocument="cancelDocument"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { documentService } from '~/services/document/DocumentService'
import DocumentEditorNavbar from '~/components/document/edit/DocumentEditorNavbar'
import DocumentContent from '~/components/document/DocumentContent.vue'
import { DocumentPage } from '~/models/document/DocumentPage'
import { EDIT, DUAL, PREV } from '~/models/EditorDisplayMode'
import {
  getDisplayEditFormCols,
  getDisplayPreviewAreaCols
} from '~/models/EditorPaneColumns'
import { WindowSize } from '~/models/WindowSize'
import MarkdownEditor from '~/components/document/editor/MarkdownEditor.vue'
import { NewDocumentData } from '~/models/document/NewDocumentData'
import DocumentEditorCreateFooter from '~/components/document/create/DocumentEditorCreateFooter.vue'

const LEAVE_CONFIRM_MESSAGE =
  '編集中のデータを破棄してページを離れます。よろしいですか？'

// https://crieit.net/posts/Nuxt-js-5e4d14a9d61f4
export default Vue.extend({
  layout: 'viewer',
  components: {
    DocumentEditorNavbar,
    MarkdownEditor,
    DocumentContent,
    DocumentEditorCreateFooter
  },
  data: () => ({
    page: {},
    displayMode: DUAL, // 初期値がコンポーネントと同期しない可能性あり
    change: false,
    darkMode: false,
    syncMode: true,
    savePage: false,
    windowHeight: 0,
    windowWidth: 0
  }),
  computed: {
    titleFilled() {
      return this.page.pageTitle !== ''
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
    },
    windowSize(): WindowSize {
      return { height: this.windowHeight, width: this.windowWidth }
    }
  },
  watch: {
    displayMode(newValue, oldValue) {
      console.log(`display mode change ${oldValue} to ${newValue}`)
    }
  },
  created() {
    this.createDocumentPage()
  },
  mounted(): void {
    this.calculateWindowSize()
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
    createDocumentPage() {
      this.page = new DocumentPage({
        documentKey: '',
        pageKey: '',
        pageTitle: '',
        pageData: ''
      })
    },
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
    async registerDocument() {
      this.savePage = true
      const newDocumentData = new NewDocumentData(
        this.page.pageTitle,
        this.page.pageData
      )
      const key = await documentService.registerNewDocument(newDocumentData)
      await this.$router.push(`/document/view/${key}`)
    },
    cancelDocument() {
      this.$router.push('/')
    },
    darkModeState(state) {
      this.darkMode = state
    },
    syncModeState(state) {
      this.syncMode = state
    },
    changeMode(mode) {
      this.displayMode = mode
    },
    goTop() {
      this.$router.push('/')
    },
    addListener() {
      window.addEventListener('beforeunload', this.confirmUnload, false)
      window.addEventListener('resize', this.calculateWindowSize, false)
    },
    removeListener() {
      window.removeEventListener('beforeunload', this.confirmUnload, false)
      window.removeEventListener('resize', this.calculateWindowSize, false)
    },
    confirmUnload(event: BeforeUnloadEvent) {
      if (this.change && !this.savePage) {
        event.preventDefault()
        // ここのメッセージはブラウザ依存
        event.returnValue = LEAVE_CONFIRM_MESSAGE
      }
    },
    onScrollUpdatedEditor(value) {
      if (!this.syncMode) {
        return
      }
      this.$refs.editor.setScrollTop(value > 1 ? 1 : value)
    },
    onScrollUpdatedViewer(value) {
      if (!this.syncMode) {
        return
      }
      this.$refs.viewer.setScrollTop(value > 1 ? 1 : value)
    },
    calculateWindowSize() {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
      console.log(
        `window height=${this.windowHeight}, width=${this.windowWidth}`
      )
    }
  }
})
</script>

<style scoped>
.content-area {
  margin-top: 50px;
  margin-bottom: 50px;
}
.fixed-content {
  top: 48px;
  position: fixed;
  z-index: 2;
}
.preview-area {
  padding-left: 0;
  padding-right: 0;
}
</style>
