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
import Vue, { PropType } from 'vue'
import MonacoEditor from 'vue-monaco'

export interface WindowSize {
  height: Number
  width: Number
}

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
    }
  },
  data: () => ({
    fontSize: 13,
    monaco: null
  }),
  computed: {
    editorHeight() {
      console.log(`editorHeight=${this.windowSize.height}px`)
      return this.windowSize.height + 'px'
    },
    editorWidth() {
      console.log(`editorWidth=${this.windowSize.width}px`)
      return this.windowSize.width + 'px'
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
    windowSize() {
      // ★分割→プレビューへの遷移でハングする問題への対策
      if (this.windowSize.width === 0) {
        return
      }
      this.resize()
    }
  },
  methods: {
    onEditorWillMount(monaco) {
      this.monaco = monaco
    },
    resize() {
      this.$nextTick(() => {
        console.log('Editor.layout()')
        this.$refs.editor.getEditor().layout()
      })
    }
  }
})
</script>

<style scoped>
.mdeditor {
  margin-left: -12px;
}
</style>
