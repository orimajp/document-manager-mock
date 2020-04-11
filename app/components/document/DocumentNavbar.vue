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
    <v-btn color="info" depressed @click="goPageEdit">
      ページ編集
    </v-btn>
    <v-btn
      color="success"
      depressed
      class="toolba-button"
      :disabled="!canTreeEdit"
      @click="goTreeEdit"
    >
      メニュー階層変更
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
.toolba-button {
  margin-left: 7px;
}
</style>
