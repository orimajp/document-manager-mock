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
    } as PropOptions<DocumentNavbarContent>,
    permanent: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    pageTitle(): string {
      return this.documentNavbarContent.pageTitle
    }
  },
  methods: {
    goTop(): void {
      this.$router.push('/')
    },
    openDrawer(): void {
      this.$emit('openDrawer')
    }
  }
})
</script>
