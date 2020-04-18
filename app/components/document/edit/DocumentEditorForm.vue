<template>
  <v-container
    fluid
    :style="{ width: containerWidth }"
    class="fixed-content center-line"
  >
    <v-row>
      <v-col cols="12">
        <v-textarea
          outlined
          placeholder="本文"
          dense
          filled
          hide-details
          :height="textareaHeight"
          :value="pageContent.pageData"
          @input="updatePageData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { DocumentPage } from '~/models/document/DocumentPage'
import { getDisplayEditFormCols } from '~/models/EditorPaneColumns'

/* textarea高さ補正値 */
const ADJUST_HEIGHT = 124

export default Vue.extend({
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
    windowHeight: 0
  }),
  computed: {
    textareaHeight() {
      return this.windowHeight - ADJUST_HEIGHT
    },
    containerWidth() {
      return `${(getDisplayEditFormCols(this.displayMode) * 100) / 12}%`
    }
  },
  mounted(): void {
    this.windowHeight = window.innerHeight
    window.addEventListener('resize', this.calculateWindowWidth, false)
  },
  beforeDestroy(): void {
    window.removeEventListener('resize', this.calculateWindowWidth, false)
  },
  methods: {
    updateTitle(newTitle) {
      this.$emit('updateTitle', newTitle)
    },
    updatePageData(newPageData) {
      this.$emit('updatePageData', newPageData)
    },
    calculateWindowWidth() {
      this.windowHeight = window.innerHeight
      console.log(this.windowHeight)
    }
  }
})
</script>

<style>
.fixed-content {
  top: 40px;
  position: fixed;
  z-index: 2;
}
.fixed-content textarea {
  line-height: 1.5em;
  font-size: 80%;
}
.fixed-content.center-line {
  border-right: 1px solid lightgray;
}
</style>
