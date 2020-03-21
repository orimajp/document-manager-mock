<template>
  <div class="tree-block">
    <li
      v-if="!firstNode"
      class="doc-list"
      :class="{ selected: currentNode.select }"
      @click="openPage(currentPageKey)"
    >
      <v-icon class="collapse-icon" v-text="open" />
      <span class="doc-title" v-text="currentNode.pageTitle" />
    </li>
    <li
      v-if="currentNode.expand"
      class="collapse-list"
      :class="{ 'border-list': !firstNode }"
    >
      <ul class="doc-layer">
        <document-tree
          v-for="(child, index) in currentNode.nodes"
          :key="index"
          :page-key-array="addPageKeyArray"
          :current-node="child"
        />
      </ul>
    </li>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import DocumentTree from './DocumentTree'
import { DocumentNode } from '~/models/document/DocumentNode'
export default Vue.extend({
  name: 'DocumentTree', // ネストコンポーネントでは自身のコンポーネント名をnameプロパティにセットするのがキモ
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
    open(): String {
      if (!this.currentNode.nodes || this.currentNode.nodes.length === 0) {
        return ''
      }
      if (this.currentNode.nodes && !this.currentNode.expand) {
        return 'mdi-chevron-right'
      }
      return 'mdi-chevron-down'
    },
    firstNode(): boolean {
      return this.pageKeyArray.length === 0
    },
    addPageKeyArray(): Array<String> {
      return this.pageKeyArray.concat(this.currentPageKey)
    },
    currentPageKey(): string {
      return this.currentNode.pageKey
    }
  },
  methods: {
    openPage(pageKey: string): void {
      this.$router.push(`/document/view/${pageKey}`)
    }
  }
})
</script>

<style scoped>
.doc-layer {
  padding-left: 0;
}
.collapse-list {
  margin-left: 13px;
  padding: 0;
}
.border-list {
  border-left: solid 1px grey;
}

li {
  list-style-type: none;
  line-height: 1;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 13px;
  word-wrap: break-word;
  text-indent: -1em;
  padding-left: 1em;
}
.doc-list {
  cursor: pointer;
}
.doc-list:hover {
  /*background-color: lightgrey;*/
  background-color: darkgrey;
  /*background-color: white;*/
  padding-left: 13px;
}
.collapse-icon {
  color: white;
  margin: -4px -4px -4px 0;
  font-size: 13px;
  width: 13px;
}
.selected {
  font-weight: bold;
  color: black;
  /*background-color: white;*/
  background-color: lightgrey;
}
.selected .collapse-icon {
  color: black;
}
</style>
