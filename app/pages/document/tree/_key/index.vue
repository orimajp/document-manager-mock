<template>
  <div>
    <document-editable-tree-navbar
      :document-tree-navbar-content="documentTreeNavbarContent"
    />
    <v-content>
      <v-container>
        <div class="tree-edit-content">
          <v-card :height="editAreaHeight" class="tree-edit-area" outlined>
            <document-editable-tree
              v-model="treeNodes"
              :current-page-key="currentPageKey"
            />
          </v-card>
        </div>
      </v-container>
    </v-content>
    <document-editable-tree-fotter
      @registerTree="registerTree"
      @cancelTree="cancelTree"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { documentService } from '~/services/document/DocumentService'
import { DocumentTreeNavbarContent } from '~/components/document/tree/DocumentEditableTreeNavbar.vue'
import { DocumentMainData, DocumentNodeData } from '~/types/document'
import DocumentEditableTreeNavbar from '~/components/document/tree/DocumentEditableTreeNavbar'
import DocumentEditableTree from '~/components/document/tree/DocumentEditableTree.vue'
import DocumentEditableTreeFotter from '~/components/document/tree/DocumentEditableTreeFooter.vue'

/* 高さ補正値 */
const ADJUST_HEIGHT = 136

// https://wood-roots.com/web/vue-js/2537
// https://github.com/SortableJS/Vue.Draggable
// https://sortablejs.github.io/Vue.Draggable/#/nested-with-vmodel
export default Vue.extend({
  layout: 'viewer',
  components: {
    DocumentEditableTreeNavbar,
    DocumentEditableTree,
    DocumentEditableTreeFotter
  },
  async asyncData({ params }: Context) {
    const key = params.key
    console.log(`pageKey=${key}`)
    const page = await documentService.getRowPage(key)
    const document = await documentService.getRowDocument(page.documentKey)
    return {
      document,
      page,
      treeNodes: document.node.nodes
    }
  },
  data: () => ({
    document: {} as DocumentMainData,
    treeNodes: [] as Array<DocumentNodeData>,
    windowHeight: 0
  }),
  computed: {
    documentTreeNavbarContent(): DocumentTreeNavbarContent {
      return {
        pageTitle: this.page.pageTitle
      } as DocumentTreeNavbarContent
    },
    editAreaHeight() {
      return this.windowHeight - ADJUST_HEIGHT
    },
    currentPageKey() {
      return this.page.pageKey
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
      this.$router.push(`/document/view/${this.currentPageKey}`)
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
  padding: 10px;
}
.tree-edit-area {
  width: 100%;
  overflow: scroll;
  padding: 20px;
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
