<template>
  <monaco-editor
    ref="editor"
    v-model="editData"
    :style="{ width: editorWidth, height: editorHeight }"
    :options="{
      scrollBeyondLastLine: false,
      occurrencesHighlight: false,
      wordWrap: 'on',
      fontSize: fontSize
    }"
    :theme="theme"
    language="markdown"
    class="mdeditor"
    @editorWillMount="onEditorWillMount"
  />
</template>

<script lang="ts">
// https://qiita.com/Kray-G/items/445b5cfe8e9c746e2b81
// https://qiita.com/Kray-G/items/f2c29c38c9f5f19b465a
// https://blog.mamansoft.net/2018/07/16/nuxtjs-typescript-monacoeditor/
import Vue, { PropType } from 'vue'
import MonacoEditor from 'vue-monaco'
import * as monaco from 'monaco-editor'
import { WindowSize } from '~/models/WindowSize'
import { DUAL, PREV } from '~/models/EditorDisplayMode'
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor

const calculateEditorWidth = (windowWidth: number, displayMode: string) => {
  switch (displayMode) {
    case DUAL:
      return windowWidth / 2
    case PREV:
      return 0
    default:
      return windowWidth
  }
}

/* Markdown Editor高さ補正値 */
const ADJUST_HEIGHT = 95

export default Vue.extend({
  components: {
    MonacoEditor
  },
  props: {
    markdownData: {
      type: String,
      required: true
    },
    windowSize: {
      type: Object as PropType<WindowSize>,
      required: true
    },
    darkMode: {
      type: Boolean,
      required: true
    },
    displayMode: {
      type: String,
      required: true
    },
    editoMode: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      }
    }
  },
  data: () => ({
    fontSize: 13,
    monaco: null as monaco,
    editor: null as IStandaloneCodeEditor,
    timeoutId: null as number,
    isScrollRecieved: false
  }),
  computed: {
    windowHeight() {
      return this.windowSize.height - ADJUST_HEIGHT
    },
    windowWidth() {
      return calculateEditorWidth(this.windowSize.width, this.displayMode)
    },
    editorHeight() {
      console.log(`editorHeight=${this.windowHeight}px`)
      return this.windowHeight + 'px'
    },
    editorWidth() {
      console.log(`editorWidth=${this.windowWidth}px`)
      return this.windowWidth + 'px'
    },
    theme() {
      return this.darkMode ? 'vs-dark' : ''
    },
    editData: {
      get() {
        return this.markdownData
      },
      set(newValue) {
        this.$emit('updatePageData', newValue)
      }
    }
  },
  watch: {
    windowHeight() {
      // ★分割→プレビューへの遷移でハングする問題への対策
      if (this.windowWidth === 0) {
        return
      }
      this.resize()
    },
    windowWidth() {
      // ★分割→プレビューへの遷移でハングする問題への対策
      if (this.windowWidth === 0) {
        return
      }
      this.resize()
    }
  },
  mounted(): void {
    this.editor = this.$refs.editor.getEditor()
    this.editor.onDidScrollChange(this.handleScroll)
    if (this.editoMode) {
      this.focus()
    }
  },
  methods: {
    focus() {
      this.editor.focus()
    },
    onEditorWillMount(monaco) {
      this.monaco = monaco
    },
    resize() {
      this.$nextTick(() => {
        this.editor.layout()
      })
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
      this.isScrollRecieved = true
      this.setTimeout(false)
      const topEnd = this.editor.getScrollHeight() - this.windowHeight
      this.$nextTick(() => {
        this.editor.setScrollTop(topEnd * v)
      })
    },
    handleScroll() {
      if (this.isScrollRecieved) {
        return
      }
      const scrollTop = this.editor.getScrollTop()
      const topEnd = this.editor.getScrollHeight() - this.windowHeight
      if (topEnd > 0) {
        this.$nextTick(() => {
          this.$emit('onScrollUpdatedViewer', scrollTop / topEnd)
        })
      }
    }
  }
})
</script>

<style scoped>
.mdeditor {
  /*margin-left: -12px;*/
}
</style>
