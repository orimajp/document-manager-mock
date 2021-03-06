<template>
  <div>
    <document-editor-navbar
      :page-title="page.pageTitle"
      :document-edit="false"
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
      :document-edit="false"
      @createPage="createPage"
      @cancelDocument="cancelDocument"
    />
    <!--
    <tree-edit-selection-dialog ref="dialog" :document-key="documentKey" />
    -->
    <!--
    <tree-edit-alert-dialog ref="dialog" />
    -->
    <tree-edit-dialog ref="dialog" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
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
// import TreeEditSelectionDialog from '~/components/document/create/TreeEditSelectionDialog'
// import TreeEditAlertDialog from '~/components/document/create/TreeEditAlertDialog'
import TreeEditDialog from '~/components/document/create/TreeEditDialog'
import { NewPageData } from '~/models/document/NewPageData'
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
    DocumentEditorCreateFooter,
    // TreeEditSelectionDialog,
    // TreeEditAlertDialog
    TreeEditDialog
  },
  async asyncData({ params, query }: Context) {
    const key = params.key
    const prevendChildTargetKey = query.prevendChildTargetKey
      ? query.prevendChildTargetKey
      : null
    const appendNextTargetKey = query.appendNextTargetKey
      ? query.appendNextTargetKey
      : null
    const targetKey = prevendChildTargetKey || appendNextTargetKey || null
    console.log(`key=${key}, targetKey=${targetKey}`)
    const page = await documentService.getRowPage(key)
    const document = await documentService.getRowDocument(page.documentKey)
    return {
      currentPageKey: key,
      prevendChildTargetKey,
      appendNextTargetKey,
      documentKey: document.documentKey
    }
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
    async createPage() {
      console.log('createPage(): documentKey=' + this.documentKey)
      this.savePage = true
      const newPageData = new NewPageData(
        this.page.pageTitle,
        this.page.pageData,
        this.documentKey
      )
      if (this.prevendChildTargetKey !== null) {
        await this.registerNewPagePrevendChild(newPageData)
        return
      }
      if (this.appendNextTargetKey !== null) {
        await this.registerNewPageAppendNext(newPageData)
        return
      }
      await this.registerNewPage(newPageData)
    },
    async canTreeEdit() {
      const document = await documentService.getDocument(this.documentKey)
      const treeNode = document.node
      if (treeNode.nodes.length > 1) {
        return true
      }
      return treeNode.nodes.length === 1 && treeNode.nodes[0].nodes.length > 0
    },
    async registerNewPage(newPageData) {
      const key = await documentService.registerNewPage(newPageData)
      this.$accessor.crearDocumentKey() // これやらないと表示ページ再表示時にドキュメントが再ロードされずツリー変更が反映されない
      if (await this.canTreeEdit()) {
        this.$refs.dialog.openDialog(key)
        return
      }
      await this.$router.push(`/document/view/${key}`)
    },
    async registerNewPagePrevendChild(newPageData) {
      const key = await documentService.registerNewPagePrevendChild(
        this.prevendChildTargetKey,
        newPageData
      )
      this.$accessor.crearDocumentKey() // これやらないと表示ページ再表示時にドキュメントが再ロードされずツリー変更が反映されない
      await this.$router.push(`/document/view/${key}`)
    },
    async registerNewPageAppendNext(newPageData) {
      const key = await documentService.registerNewPageAppendNext(
        this.appendNextTargetKey,
        newPageData
      )
      this.$accessor.crearDocumentKey() // これやらないと表示ページ再表示時にドキュメントが再ロードされずツリー変更が反映されない
      await this.$router.push(`/document/view/${key}`)
    },
    cancelDocument() {
      this.$router.push(`/document/view/${this.currentPageKey}`)
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
