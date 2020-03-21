<template>
  <v-navigation-drawer clipped permanent app color="secondary">
    <div class="link-area">
      <div
        class="document-top-link"
        @click="goDocumentTop"
        v-text="pageTitle"
      />
      <div class="tree-area">
        <document-tree
          :current-node="currentNode"
          :page-key-array="pageKeyArray"
        />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import DocumentTree from './DocumentTree.vue'
import { DocumentNode } from '~/models/document/DocumentNode'
export default Vue.extend({
  components: {
    DocumentTree
  },
  props: {
    currentNode: {
      type: Object,
      required: true
    } as PropOptions<DocumentNode>,
    pageKeyArray: {
      type: Array,
      required: true
    } as PropOptions<Array<String>>
  },
  computed: {
    pageTitle(): string {
      return this.currentNode.pageTitle
    }
  },
  methods: {
    goDocumentTop(): void {
      this.$router.push(`./${this.currentNode.pageKey}`)
    }
  }
})
</script>

<style scoped>
.link-area {
  padding: 10px 0 10px 0;
  color: white;
}
.document-top-link {
  padding: 0 0 0 10px;
  margin-bottom: 5px;
}
.document-top-link:hover {
  background-color: darkgrey;
}
.tree-area {
  /*margin-left: -13px;*/
  margin-left: -10px;
}
</style>
