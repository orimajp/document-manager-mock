<template>
  <div>
    <document-editable-tree-navbar
      :document-tree-navbar-content="documentTreeNavbarContent"
    />
    <v-content>
      <v-container>
        <div class="tree-edit">
          <div class="tree-edit-area">
            <document-editable-tree v-model="treeNodes" />
          </div>
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
    console.log(`documentKey=${key}`)
    const document = await documentService.getRowDocument(key)
    const page = await documentService.getRowPage(key)
    return {
      document,
      page,
      treeNodes: document.node.nodes
    }
  },
  data: () => ({
    document: {} as DocumentMainData,
    treeNodes: [] as Array<DocumentNodeData>
  }),
  computed: {
    documentTreeNavbarContent(): DocumentTreeNavbarContent {
      return {
        pageTitle: this.page.pageTitle
      } as DocumentTreeNavbarContent
    }
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
      this.$router.push(`/document/view/${this.document.documentKey}`)
    }
  }
})
</script>

<style scoped>
.tree-edit {
  width: 100%;
  /*height: 100%;*/
  height: 500px; /* TODO 編集エリアの高さをウィンドウサイズに合わせて変更する方法 */
  /*bottom: 300px;*/
  overflow: scroll;
  padding: 20px;
  /*margin-top: 50px;*/
  /*margin-bottom: 100px;*/
  border-radius: 5px;
  background: repeating-linear-gradient(
    90deg,
    #eeeeee 0px,
    #eeeeee 20px,
    #e0e0e0 20px,
    #e0e0e0 40px
  );
}
.tree-edit-area {
}
</style>
