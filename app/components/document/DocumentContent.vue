<template>
  <v-content>
    <v-container fluid>
      <h1>{{ pageTitle }}</h1>
      <div class="document-area">
        <div class="markdown-body">
          <!--
          <div>{{ pageData }}</div>
          -->
          <div v-html="$md.render(pageData)" />
        </div>
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
/* ここはmarkdown-itの都合上scopedは使えない */
.v-application code {
  box-shadow: none;
  border-radius: 0;
  font-weight: normal;
  font-size: 100%;
  color: black;
  /*text-indent: 0;*/
  padding: 0;
}

.v-application code::after {
  content: none;
}
/*.v-application pre > code {
  margin-bottom: -20px;
}*/
.v-application pre {
  text-indent: -0.5em;
}
.document-area {
  padding: 10px;
}
.document-area pre > code {
  font-weight: 500;
}
</style>
