<template>
  <v-container
    fluid
    :style="{ width: containerWidth }"
    class="fixed-content center-line"
  >
    <v-row>
      <v-col cols="12">
        <markdown-editor
          :markdown-data="pageContent.pageData"
          :window-size="editorSize"
          @updatePageData="updatePageData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { DocumentPage } from '~/models/document/DocumentPage'
import { getDisplayEditFormCols } from '~/models/EditorPaneColumns'
import MarkdownEditor, {
  WindowSize
} from '~/components/document/editor/MarkdownEditor'
import { DUAL, PREV } from '~/models/EditorDisplayMode'

const calculateEditorWidth = (windowWidth: number, displayMode: string) => {
  switch (displayMode) {
    case DUAL:
      return windowWidth / 2 - 10
    case PREV:
      return 0
    default:
      return windowWidth - 10
  }
}

/* Markdown Editor高さ補正値 */
const ADJUST_HEIGHT = 99

export default Vue.extend({
  components: {
    MarkdownEditor
  },
  props: {
    pageContent: {
      type: Object as PropType<DocumentPage>,
      required: true
    },
    displayMode: {
      type: String,
      required: true
    }
  },
  data: () => ({
    windowHeight: 0,
    windowWidth: 0
    // windowWidth: 0,
    // timeoutId: 0
  }),
  computed: {
    editorHeight() {
      return this.windowHeight - ADJUST_HEIGHT
    },
    editorWidth() {
      return calculateEditorWidth(this.windowWidth, this.displayMode)
    },
    editorSize(): WindowSize {
      const height = this.editorHeight
      const width = this.editorWidth
      console.log(`editor height=${height}, width=${width}`)
      return {
        height,
        width
      }
    },
    containerWidth() {
      return `${(getDisplayEditFormCols(this.displayMode) * 100) / 12}%`
    }
  },
  mounted(): void {
    this.calculateWindowSize()
    window.addEventListener('resize', this.calculateWindowSize, false)
    // window.addEventListener('scroll', this.updateEditorScrollStete, false)
  },
  beforeDestroy(): void {
    window.removeEventListener('resize', this.calculateWindowSize, false)
    // window.removeEventListener('scroll', this.updateEditorScrollStete, false)
  },
  methods: {
    updatePageData(newPageData) {
      this.$emit('updatePageData', newPageData)
    },
    calculateWindowSize() {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
      console.log(
        `window height=${this.windowHeight}, width=${this.windowWidth}`
      )
      /*
    },
    updateEditorScrollStete() {
      this.$emit('updateEditorScrollStete', true)
      window.clearTimeout(this.timeoutId)
      this.timeoutId = window.setTimeout(() => {
        this.$emit('updateEditorScrollStete', false)
      }, 500)
       */
    }
  }
})
</script>

<style scoped>
.fixed-content {
  /*top: 40px;*/
  top: 26px;
  position: fixed;
  z-index: 2;
}
.fixed-content.center-line {
  /*border-right: 1px solid lightgray;*/
}
</style>
