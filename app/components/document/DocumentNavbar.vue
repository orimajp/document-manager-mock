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
    <v-btn
      color="success"
      depressed
      :disabled="!canTreeEdit"
      @click="goTreeEdit"
    >
      メニュー階層変更
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export interface DocumentViewNavbarContent {
  pageTitle: String
  documentKey: String
}

export default Vue.extend({
  props: {
    documentViewNavbarContent: {
      type: Object,
      required: true
    } as PropOptions<DocumentViewNavbarContent>,
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
    goTreeEdit(): void {
      this.$router.push(
        `/document/tree/${this.documentViewNavbarContent.documentKey}`
      )
    }
  }
})
</script>
