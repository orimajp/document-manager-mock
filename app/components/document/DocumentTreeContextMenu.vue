<template>
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
      <v-divider />
      <v-list-item class="menu-item">
        <v-list-item-title @click="createChildPage">
          子の先頭にページを追加
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!top" class="menu-item">
        <v-list-item-title @click="createNextPage">
          次にページを追加
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { documentService } from '~/services/document/DocumentService'

// https://stackoverflow.com/questions/55892377/how-to-add-right-click-event-for-v-treeview-to-open-menu-in-vuetify
export default Vue.extend({
  data: () => ({
    showContextMenu: false,
    contextMenuX: 0,
    contextMenuY: 0,
    openPageKey: null,
    top: false
  }),
  methods: {
    openContextMenu(e, pageKey, top) {
      this.openPageKey = pageKey
      this.showContextMenu = false
      this.contextMenuX = e.clientX
      this.contextMenuY = e.clientY
      this.top = top
      this.$nextTick(() => {
        this.showContextMenu = true
      })
    },
    openPage() {
      const url = `/document/view/${this.openPageKey}`
      window.open(url, '_blank')
    },
    async createChildPage() {
      const page = await documentService.getRowPage(this.openPageKey)
      const documentKey = page.documentKey
      this.$router.push(
        `/document/create/page/${documentKey}?prevendChildTargetKey=${this.openPageKey}`
      )
    },
    async createNextPage() {
      const page = await documentService.getRowPage(this.openPageKey)
      const documentKey = page.documentKey
      this.$router.push(
        `/document/create/page/${documentKey}?appendNextTargetKey=${this.openPageKey}`
      )
    }
  }
})
</script>

<style scoped>
.menu-item {
  cursor: pointer;
  user-select: none;
}
.menu-item:hover {
  background-color: #fafafa;
}
</style>
