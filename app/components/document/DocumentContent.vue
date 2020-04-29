<template>
  <v-content>
    <v-container
      fluid
      :class="{ 'editor-container-fluid': editor && dualMode }"
    >
      <div
        id="markdown-viewer"
        ref="viewer"
        :class="{ 'edit-preview-style': editor }"
      >
        <h1 :class="{ 'markdown-edit-mode': editor }">
          {{ pageTitle }}
        </h1>
        <div
          class="markdown-body"
          :style="{ width: viewerWidth }"
          :class="{ 'markdown-edit-mode': editor }"
        >
          <div v-html="$md.render(pageData)" />
        </div>
      </div>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { DocumentHeadlineFactory } from '~/models/document/factory/DocumentHeadlineFactory'
import { DocumentHeadline } from '~/models/document/DocumentHeadline'
import { DocumentPage } from '~/models/document/DocumentPage'
import { WindowSize } from '~/models/WindowSize'
import { DUAL, EDIT, PREV } from '~/models/EditorDisplayMode'

const headlineSelector =
  '.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6'

const getInnerPath = (hrefs: string): string => {
  console.log(`navigate hrefs=${hrefs}`)
  const href = hrefs[0]
  console.log(`navigate href=${href}`)
  // 絶対パス
  if (href === '/') {
    return hrefs
  }
  // ハッシュ
  if (href === '#') {
    return hrefs
  }
  console.log(`hrefs=${hrefs}, location.origin=${location.origin}`)
  // 自サイトへのプロトコル付きリンク(何て言えばいいのか?)
  if (hrefs.startsWith(location.origin)) {
    return hrefs.slice(location.origin.length)
  }
  // 外部サイトリンク
  return null
}

const calculateViewerWidth = (windowWidth: number, displayMode: string) => {
  switch (displayMode) {
    case DUAL:
      return windowWidth / 2
    case EDIT:
      return 0
    default:
      return windowWidth
  }
}

const createHeadline = (element: HTMLElement): DocumentHeadline => {
  return DocumentHeadlineFactory.createDocumentHeadline(element)
}

export default Vue.extend({
  props: {
    pageContent: {
      type: Object as PropType<DocumentPage>,
      required: true
    },
    windowSize: {
      type: Object as PropType<WindowSize>,
      required: false,
      default: () => ({ height: 0, width: 0 })
    },
    editor: {
      type: Boolean,
      required: false,
      default: false
    },
    displayMode: {
      type: String,
      required: false,
      default: () => PREV
    }
  },
  data: () => ({
    timeoutId: null as number,
    isScrollRecieved: false
  }),
  computed: {
    pageTitle(): string {
      return this.pageContent.pageTitle
    },
    pageData(): string {
      return this.pageContent.pageData
    },
    viewer() {
      return this.$refs.viewer
    },
    dualMode() {
      return this.displayMode === DUAL
    },
    windowWidth() {
      return calculateViewerWidth(this.windowSize.width, this.displayMode)
    },
    viewerWidth() {
      return this.editor ? this.windowWidth + 'px' : '100%'
    }
  },
  watch: {
    pageData() {
      this.contentUpdated()
      this.collectHeadlines()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.addListeners()
      this.updateDrawer()
      this.collectHeadlines()
    })
  },
  beforeDestroy() {
    this.removeListeners()
  },
  methods: {
    // https://github.com/nuxt-community/modules/issues/185
    // https://github.com/nuxt/nuxtjs.org/blob/master/components/commons/HtmlParser.global.vue
    navigate(event): void {
      const hrefs = event.target.getAttribute('href')
      if (!hrefs) {
        return
      }
      const innerPath = getInnerPath(hrefs)
      if (innerPath !== null) {
        event.preventDefault()
        if (innerPath.startsWith('#fnref')) {
          this.goHeadline(innerPath.slice(1))
          return
        }
        if (innerPath.startsWith('#')) {
          // FIXME ここは難しい。脚注へのリンクとは限らない
          this.goFootNode(innerPath.slice(1))
          return
        }
        if (this.editor) {
          alert('編集中は画面遷移できません。')
          return
        }
        this.$router.push(innerPath)
        return
      }
      event.preventDefault()
      window.open(hrefs, '_blank')
    },
    contentUpdated(): void {
      this.removeListeners()
      this.$nextTick(() => {
        this.addListeners()
        // これはここである必要は無いのだがメニュー操作時にドロワを閉じるタイミングを遅らせたい
        this.updateDrawer()
      })
    },
    addListeners() {
      console.log('addListeners() called.')
      if (this.editor) {
        document
          .getElementById('markdown-viewer')
          .addEventListener('scroll', this.handleScroll)
      }
      this._links = this.$el.getElementsByTagName('a')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false)
      }
    },
    removeListeners() {
      console.log('removeListeners() called.')
      if (this.editor) {
        document
          .getElementById('markdown-viewer')
          .removeEventListener('scroll', this.handleScroll)
      }
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].removeEventListener('click', this.navigate, false)
      }
      this._links = []
    },
    updateDrawer() {
      // index.vueが初期化中で?メソッド呼び出しが効かないのでストアメソッドを直接呼び出す
      this.$accessor.drawer.setDrawer(false)
    },
    collectHeadlines() {
      if (this.editor) {
        return
      }
      this.$accessor.headline.clearHeadlines()
      const headers = this.$el.querySelectorAll(headlineSelector) as NodeListOf<
        HTMLElement
      >
      for (const header of headers) {
        this.$accessor.headline.addHeadline(createHeadline(header))
      }
      console.log(JSON.stringify(this.$accessor.headline.headlines, null, 2))
    },
    goHeadline(id: string): void {
      // 日本語見出しに対してmarkdown-it-anchorが生成するIDが文法的に誤っているため、querySelector()や$vuetify.goTo()で利用できない
      // this.$vuetify.goTo(`#${id}`)
      // alert(`content id=${id}`)
      // const element = this.$el.querySelector(`#${id}`)
      // this.$vuetify.goTo(element)
      window.location.href = `#${id}`
      // this.$nextTick(() => {
      // window.scrollBy(0, -300)
      // })
      // 固定ナビテーション分無理矢理位置合わせ
      setTimeout(() => window.scrollBy(0, -60), 100)
    },
    goFootNode(id: string): void {
      window.location.href = `#${id}`
    },
    setTimeout(clearOnly) {
      // clearOnly不要では？
      if (this.timeoutId) {
        window.clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
      if (!clearOnly) {
        this.timeoutId = window.setTimeout(() => {
          this.isScrollRecieved = false
          this.timeoutId = null
        }, 200)
      }
    },
    setScrollTop(v) {
      // v = nullはトップへ戻るボタン用だが現状使っていない (position: fixed;にしてない通常表示時は動かない気がする)
      if (v === null) {
        this.viewer.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        return
      }
      this.isScrollRecieved = true
      this.setTimeout(false)
      const topEnd = this.viewer.scrollHeight - this.viewer.clientHeight
      this.$nextTick(() => {
        this.viewer.scrollTop = topEnd * v
      })
    },
    handleScroll(e) {
      if (this.isScrollRecieved) {
        return
      }
      const el = e.target
      if (el && el.clientHeight && el.scrollHeight) {
        const topEnd = el.scrollHeight - el.clientHeight
        if (topEnd > 0) {
          this.$nextTick(() => {
            this.$emit('onScrollUpdatedEditor', el.scrollTop / topEnd)
          })
        }
      }
    }
  }
})
</script>

<style>
/* エディタプレビュー時 */
.edit-preview-style {
  top: 48px;
  bottom: 30px;
  position: fixed;
  overflow-y: auto;
}

.editor-container-fluid {
  padding-left: 0;
  padding-right: 0;
}

/* ここはmarkdown-itの都合上scopedは使えない(Vuetifyの既存スタイルを打ち消すため) */
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

.markdown-edit-mode {
  padding-left: 12px;
  padding-right: 12px;
}

.markdown-body {
}

.markdown-body pre > code {
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

.markdown-body .footnotes-list {
  font-size: 85%;
}
</style>
