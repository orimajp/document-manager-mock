<template>
  <v-app-bar app clipped-left dark dense class="primary">
    <!--
    <v-app-bar-nav-icon />
    -->
    <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export interface DocumentNavbarContent {
  pageTitle: String
}

export default Vue.extend({
  props: {
    documentNavbarContent: {
      type: Object,
      required: true
    } as PropOptions<DocumentNavbarContent>
  },
  computed: {
    pageTitle(): string {
      return this.documentNavbarContent.pageTitle
    }
  }
})
</script>
