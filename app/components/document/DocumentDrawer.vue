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
        @click="goDocumentTop"
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
    <v-menu
      v-model="showContextMenu"
      :position-x="contextMenuX"
      :position-y="contextMenuY"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item class="menu-item">
          <v-list-item-title @click="openPage">
            新規ウィンドウで開く
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
  data: () => ({
    showContextMenu: false,
    contextMenuX: 0,
    contextMenuY: 0,
    openPageKey: null
  }),
  computed: {
    pageTitle(): string {
      return this.currentNode.pageTitle
    },
    selected(): boolean {
      const pageKey = this.$accessor.pageKey
      return this.currentNode.pageKey === pageKey
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
      this.$router.push(`./${this.currentNode.pageKey}`)
    },
    openContextMenu(e) {
      // https://stackoverflow.com/questions/55892377/how-to-add-right-click-event-for-v-treeview-to-open-menu-in-vuetify
      console.log(
        'openContextMenu(): called. pageKey=' + e.target.dataset.pageKey
      )
      this.openPageKey = e.target.dataset.pageKey
      e.preventDefault()
      this.showContextMenu = false
      this.contextMenuX = e.clientX
      this.contextMenuY = e.clientY
      this.$nextTick(() => {
        this.showContextMenu = true
      })
    },
    openPage() {
      const url = `/document/view/${this.openPageKey}`
      window.open(url, '_blank')
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
.menu-item {
  cursor: pointer;
  user-select: none;
}
.menu-item:hover {
  background-color: #fafafa;
}
</style>
