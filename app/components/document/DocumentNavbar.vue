<template>
  <v-app-bar app clipped-left clipped-right dark dense class="primary">
    <v-app-bar-nav-icon v-if="!permanent" @click="openDrawer" />
    <v-btn icon @click="goTop">
      <v-icon>
        mdi-home
      </v-icon>
    </v-btn>
    <v-toolbar-title>
      <small>{{ pageTitle }}</small>
    </v-toolbar-title>
    <v-spacer />
    <v-btn color="info" depressed @click="goPageCreate">
      作成
    </v-btn>
    <v-btn color="info" class="toolbar-button" depressed @click="goPageEdit">
      {{ editButtonTitle }}
    </v-btn>
    <v-btn
      color="success"
      depressed
      class="toolbar-button"
      :disabled="!canTreeEdit"
      @click="goTreeEdit"
    >
      階層編集
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export interface DocumentViewNavbarContent {
  pageTitle: String
  documentKey: String
  pageKey: String
}

export default Vue.extend({
  props: {
    documentViewNavbarContent: {
      type: Object as PropType<DocumentViewNavbarContent>,
      required: true
    },
    permanent: {
      type: Boolean,
      required: true
    },
    canTreeEdit: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isDocumentTopPage(): boolean {
      return (
        this.documentViewNavbarContent.pageKey ===
        this.documentViewNavbarContent.documentKey
      )
    },
    editButtonTitle(): string {
      // return this.isDocumentTopPage ? 'ドキュメント編集' : 'ページ編集'
      return this.isDocumentTopPage ? '編集' : '編集'
    },
    pageTitle(): string {
      return this.documentViewNavbarContent.pageTitle
    }
  },
  methods: {
    goTop(): void {
      this.$router.push('/')
    },
    openDrawer(): void {
      this.$emit('openDrawer')
    },
    goPageCreate(): void {
      this.$router.push(
        `/document/create/page/${this.documentViewNavbarContent.documentKey}`
      )
    },
    goPageEdit(): void {
      this.$router.push(
        `/document/edit/${this.documentViewNavbarContent.pageKey}`
      )
    },
    goTreeEdit(): void {
      this.$router.push(
        `/document/tree/${this.documentViewNavbarContent.documentKey}`
      )
    }
  }
})
</script>

<style scoped>
.toolbar-button {
  margin-left: 7px;
}
</style>
