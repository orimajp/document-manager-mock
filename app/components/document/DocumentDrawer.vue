<template>
  <v-navigation-drawer
    v-model="drawerState"
    :permanent="permanent"
    :temporary="!permanent"
    app
    clipped
    color="secondary"
  >
    <div class="pinned-area">
      <v-checkbox v-model="permanentState" label="Pinned" dark />
    </div>
    <div class="link-area">
      <div
        class="document-top-link"
        :class="{ selected: selected }"
        :data-page-key="documentKey"
        @click="goDocumentTop"
        @contextmenu="openContextMenu"
        v-text="pageTitle"
      />
      <ul class="tree-area">
        <document-tree
          :current-node="currentNode"
          :page-key-array="pageKeyArray"
          @openContextMenu="openContextMenu"
        />
      </ul>
    </div>
    <document-tree-context-menu ref="contextMenu" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import DocumentTree from './DocumentTree.vue'
import DocumentTreeContextMenu from './DocumentTreeContextMenu'
import { DocumentNode } from '~/models/document/DocumentNode'
export default Vue.extend({
  components: {
    DocumentTree,
    DocumentTreeContextMenu
  },
  props: {
    currentNode: {
      type: Object,
      required: true
    } as PropOptions<DocumentNode>,
    pageKeyArray: {
      type: Array,
      required: true
    } as PropOptions<Array<String>>,
    permanent: {
      type: Boolean,
      required: true
    },
    drawer: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    pageTitle(): string {
      return this.currentNode.pageTitle
    },
    selected(): boolean {
      const pageKey = this.$accessor.pageKey
      return this.currentNode.pageKey === pageKey
    },
    documentKey() {
      return this.currentNode.pageKey
    },
    drawerState: {
      get() {
        console.log('drawerState#get() state=' + this.drawer)
        return this.drawer
      },
      set(val): void {
        console.log('drawerState#set() state=' + this.drawer)
        if (val) {
          return
        }
        this.$emit('closeDrawer')
      }
    },
    permanentState: {
      get(): boolean {
        return this.permanent
      },
      set(val): void {
        console.log('permanentState()#set() state=' + val)
        this.$emit('setPermanent', val)
      }
    }
  },
  watch: {
    permanent() {
      console.log('watch#permanent(): permanent=' + this.permanent)
    }
  },
  methods: {
    goDocumentTop(): void {
      this.$router.push(`./${this.documentKey}`)
    },
    openContextMenu(e, pageKey) {
      this.$refs.contextMenu.openContextMenu(e, pageKey)
    }
  }
})
</script>

<style scoped>
.pinned-area {
  color: white;
  padding-left: 10px;
}
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
  background-color: lightgray;
  color: black;
}
.tree-area {
  margin-left: -13px;
  padding-left: 0;
}
.selected {
  font-weight: bold;
  color: black;
  /*background-color: white;*/
  background-color: lightgrey;
}
</style>
