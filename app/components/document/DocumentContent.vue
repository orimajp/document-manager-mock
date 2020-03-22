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
  },
  watch: {
    pageData() {
      this.contentUpdated()
    }
  },
  mounted() {
    this.$nextTick(this.addListeners)
  },
  beforeDestroy() {
    this.removeListeners()
  },
  methods: {
    // https://github.com/nuxt-community/modules/issues/185
    // https://github.com/nuxt/nuxtjs.org/blob/master/components/commons/HtmlParser.global.vue
    navigate(event): void {
      // const markdownBody = event.target.getElementsByClassName('markdown-body') // クラスによる絞り込みは何故か動かず
      // const hrefs = markdownBody[0].getAttribute('href')
      const hrefs = event.target.getAttribute('href')
      if (!hrefs) {
        return
      }
      console.log(`navigate hrefs=${hrefs}`)
      const href = hrefs[0]
      console.log(`navigate href=${href}`)
      if (href === '/') {
        event.preventDefault()
        this.$router.push(hrefs)
        return
      }
      if (hrefs.startsWith(location.origin)) {
        const pathName = hrefs.slice(location.origin.length)
        event.preventDefault()
        this.$router.push(pathName)
        return
      }
      location.href = href
    },
    contentUpdated(): void {
      this.removeListeners()
      this.$nextTick(() => {
        this.addListeners()
      })
    },
    addListeners() {
      console.log('addListeners() called.')
      // this._links = this.$el.getElementsByTagName('a')
      this._links = this.$el.getElementsByTagName('a')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false)
      }
    },
    removeListeners() {
      console.log('removeListeners() called.')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].removeEventListener('click', this.navigate, false)
      }
      this._links = []
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
