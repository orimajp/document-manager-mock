<template>
  <v-content>
    <v-container fluid>
      <h1>{{ pageTitle }}</h1>
      <div class="document-area">
        <div>{{ pageData }}</div>
      </div>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { DocumentPage } from '~/models/document/DocumentPage'
export default Vue.extend({
  props: {
    pageContent: {
      type: Object,
      required: true
    } as PropOptions<DocumentPage>
  },
  computed: {
    pageTitle(): string {
      return this.pageContent.pageTitle
    },
    pageData(): string {
      return this.pageContent.pageData
    }
  }
})
</script>

<style>
.document-area {
  padding: 10px;
}
</style>
