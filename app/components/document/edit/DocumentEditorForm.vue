<template>
  <v-container
    fluid
    :style="{ width: containerWidth }"
    class="fixed-content center-line"
  >
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-text-field
          outlined
          label="タイトル"
          placeholder="タイトル"
          dense
          filled
          :value="pageContent.pageTitle"
          @input="updateTitle"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          outlined
          label="本文"
          placeholder="本文"
          dense
          filled
          class="markdown-textarea"
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
import { EDIT, PREV } from '~/models/EditorDisplayMode'

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
      return this.windowHeight - 210
    },
    containerWidth() {
      if (this.displayMode === EDIT) {
        return '100%'
      }
      if (this.displayMode === PREV) {
        return '0%'
      }
      return '50%'
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

<style scoped>
.fixed-content {
  top: 40px;
  position: fixed;
  /*width: 50%;*/
  z-index: 2;
}
.center-line {
  border-right: 1px solid lightgray;
}
.markdown-textarea {
  /*display: block;*/
  font-size: 80%;
  /*line-height: 1.2;*/
}
</style>
