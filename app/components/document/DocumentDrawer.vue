<template>
  <v-navigation-drawer clipped permanent app color="secondary">
    <div class="link-area">
      <div
        class="document-top-link"
        :class="{ selected: selected }"
        @click="goDocumentTop"
        v-text="pageTitle"
      />
      <ul class="tree-area">
        <document-tree
          :current-node="currentNode"
          :page-key-array="pageKeyArray"
        />
      </ul>
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
    },
    selected(): boolean {
      const pageKey = this.$accessor.pageKey
      return this.currentNode.pageKey === pageKey
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
  /*padding: 0 0 0 10px;*/
  padding: 5px 0 5px 10px;
  margin-bottom: 5px;
  cursor: pointer;
}
.document-top-link:hover {
  background-color: darkgrey;
  color: black;
}
.tree-area {
  /*margin-left: -13px;*/
  /*margin-left: -10px;*/
  margin-left: -10px;
  padding-left: 0;
}
.selected {
  font-weight: bold;
  color: black;
  /*background-color: white;*/
  background-color: lightgrey;
}
</style>
