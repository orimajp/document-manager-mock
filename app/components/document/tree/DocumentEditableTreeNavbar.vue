<template>
  <v-app-bar appdark dense dark class="primary">
    <v-btn icon @click="goTop">
      <v-icon>
        mdi-home
      </v-icon>
    </v-btn>
    <v-toolbar-title>
      <small>メニュー階層変更: {{ pageTitle }}</small>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export interface DocumentTreeNavbarContent {
  pageTitle: String
}

export default Vue.extend({
  props: {
    documentTreeNavbarContent: {
      type: Object,
      required: true
    } as PropOptions<DocumentTreeNavbarContent>
  },
  computed: {
    pageTitle(): string {
      return this.documentTreeNavbarContent.pageTitle
    }
  },
  methods: {
    goTop(): void {
      this.$router.push('/')
    }
  }
})
</script>

<style scoped></style>
