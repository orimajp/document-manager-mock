<template>
  <v-app-bar app clipped-left dark dense class="primary">
    <v-btn icon @click="goTop">
      <v-icon>
        mdi-home
      </v-icon>
    </v-btn>
    <v-toolbar-title v-text="pageTitle" />
    <v-spacer />
    <v-btn color="info" depressed @click="goCreateDocument">
      新規ドキュメント
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    pageTitle: {
      type: String,
      default: () => {
        return 'ドキュメント管理アプリモック'
      }
    }
  },
  methods: {
    goTop(): void {
      this.$router.push('/')
    },
    goCreateDocument() {
      this.$router.push('/document/create/document')
    }
  }
})
</script>
