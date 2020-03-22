<template>
  <v-content>
    <v-container fluid>
      <h1>{{ pageTitle }}</h1>
      <div class="document-area">
        <div class="markdown-body">
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

/* 重複が多くてスタイル定義がイケてないが、markdown-it-containerプラグインの設定を凝らなければ解消しないのでとりあえず放置 */
/* こちらのようなことをすればいいのだが、コードが不完全(TypeScript的にはエラーになる)でそのまま使えない https://blog.nakamu.life/posts/markdown-it-container-markdown-message-box */
.markdown-body .alert-primary {
  margin: 10px 0;
  padding: 10px 10px;
  border-radius: 5px;
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
}
.markdown-body .alert-primary p {
  margin: 0;
}

.markdown-body .alert-secondary {
  margin: 10px 0;
  padding: 10px 10px;
  border-radius: 5px;
  color: #383d41;
  background-color: #e2e3e5;
  border-color: #d6d8db;
}
.markdown-body .alert-secondary p {
  margin: 0;
}

.markdown-body .alert-success {
  margin: 10px 0;
  padding: 10px 10px;
  border-radius: 5px;
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
.markdown-body .alert-success p {
  margin: 0;
}

.markdown-body .alert-info {
  margin: 10px 0;
  padding: 10px 10px;
  border-radius: 5px;
  color: #0c5460;
  background-color: #d1ecf1;
  border-color: #bee5eb;
}
.markdown-body .alert-info p {
  margin: 0;
}

.markdown-body .alert-warning {
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}
.markdown-body .alert-warning p {
  margin: 0;
}

.markdown-body .alert-danger {
  margin: 10px 0;
  padding: 10px 10px;
  border-radius: 5px;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.markdown-body .alert-danger p {
  margin: 0;
}
</style>
