<template>
  <v-app-bar app clipped-left dark dense class="primary">
    <!--
    <v-app-bar-nav-icon />
    -->
    <v-btn icon @click="goTop">
      <v-icon>
        mdi-home
      </v-icon>
    </v-btn>
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
  },
  methods: {
    goTop(): void {
      this.$router.push('/')
    }
  }
})
</script>
