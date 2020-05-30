<template>
  <v-dialog v-model="dialog" persistent max-width="800">
    <div class="tree-edit-content">
      <v-card outlined :height="dialogAreaHeight">
        <v-card-title>
          メニュー階層変更
        </v-card-title>
        <v-card-text :style="{ height: editAreaHeight }">
          <div class="tree-edit-area" :style="{ height: editAreaHeight }">
            <document-editable-tree
              v-model="treeNodes"
              :current-page-key="pageKey"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-f1" text @click="cancelTree">
            変更しない
          </v-btn>
          <v-btn color="blue darken-f1" text @click="registerTree">
            変更を保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { DocumentMainData, DocumentNodeData } from '~/types/document'
import { documentService } from '~/services/document/DocumentService'
import DocumentEditableTree from '~/components/document/tree/DocumentEditableTree.vue'

/* 高さ補正値 */
const ADJUST_HEIGHT = 136

/* ヘッダ・フッタ補正 */
const HEADER_FOOTER_HEIGHT = 117

export default Vue.extend({
  components: {
    DocumentEditableTree
  },
  data: () => ({
    document: {} as DocumentMainData,
    treeNodes: [] as Array<DocumentNodeData>,
    windowHeight: 0,
    pageKey: '',
    dialog: false
  }),
  computed: {
    editAreaHeight() {
      return this.windowHeight - ADJUST_HEIGHT - HEADER_FOOTER_HEIGHT + 'px'
    },
    dialogAreaHeight() {
      return this.windowHeight - ADJUST_HEIGHT
    }
  },
  mounted(): void {
    this.windowHeight = window.innerHeight
    window.addEventListener('resize', this.calculateWindowWidth, false)
  },
  beforeDestroy(): void {
    window.removeEventListener('resize', this.calculateWindowWidth, false)
  },
  methods: {
    async openDialog(pageKey) {
      const page = await documentService.getRowPage(pageKey)
      const document = await documentService.getRowDocument(page.documentKey)
      this.document = document
      this.treeNodes = document.node.nodes
      this.pageKey = pageKey
      this.$nextTick(() => {
        this.dialog = true
      })
    },
    async registerTree() {
      await documentService.updateRowDocumentNodes(
        this.document.documentKey,
        this.treeNodes
      )
      this.$accessor.crearDocumentKey() // これやらないと表示ページ再表示時にドキュメントが再ロードされずツリー変更が反映されない
      this.gotoView()
    },
    cancelTree() {
      this.gotoView()
    },
    gotoView() {
      this.$router.push(`/document/view/${this.pageKey}`)
    },
    calculateWindowWidth() {
      this.windowHeight = window.innerHeight
      console.log(this.windowHeight)
    }
  }
})
</script>

<style scoped>
.tree-edit-content {
  /*padding: 10px;*/
}
.tree-edit-area {
  width: 100%;
  overflow: scroll;
  padding: 20px;
  border: solid 1px lightgray;
  border-radius: 5px;
  background: repeating-linear-gradient(
    90deg,
    #eeeeee 0px,
    #eeeeee 20px,
    #e0e0e0 20px,
    #e0e0e0 40px
  );
}
</style>
