<template>
  <draggable
    class="item-container"
    :list="list"
    :value="value"
    :group="{ name: 'treeNodes' }"
    animation="200"
    @input="emitter"
    @start="startMove"
    @end="endMove"
  >
    <div v-for="child in readValue" :key="child.pageKey" class="item-group">
      <div
        class="item"
        :class="{
          'current-item': isCurrentPage(child.pageKey),
          moving: moving,
          'select-item': selectionPage(child.pageKey)
        }"
        :data-page-key="child.pageKey"
        @mousedown="mouseDown"
        @mouseup="mouseUp"
      >
        {{ child.pageTitle }}
      </div>
      <editable-tree
        :list="child.nodes"
        :current-page-key="currentPageKey"
        class="item-sub"
      />
    </div>
  </draggable>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import draggable from 'vuedraggable'
import { DocumentNodeData } from '~/types/document'
export default Vue.extend({
  name: 'EditableTree',
  components: {
    draggable
  },
  props: {
    value: {
      type: Array as PropType<Array<DocumentNodeData>>,
      required: false,
      default: null
    },
    list: {
      type: Array as PropType<Array<DocumentNodeData>>,
      required: false,
      default: null
    },
    currentPageKey: {
      type: String,
      required: true
    }
  },
  data: () => ({
    moving: false,
    selectPageKey: null
  }),
  computed: {
    readValue() {
      return this.value ? this.value : this.list
    }
  },
  methods: {
    startMove(e) {
      console.log(e)
      this.moving = true
    },
    endMove() {
      this.moving = false
      this.selectPageKey = null
    },
    mouseDown(e) {
      if (e) {
        this.selectPageKey = e.target.dataset.pageKey
      }
    },
    mouseUp() {
      this.selectPageKey = null
    },
    emitter(value) {
      this.$emit('input', value)
    },
    isCurrentPage(pageKey) {
      return this.currentPageKey === pageKey
    },
    selectionPage(pageKey) {
      return this.selectPageKey === pageKey
    }
  }
})
</script>

<style scoped>
.item-container {
  /*max-width: 20rem;*/
  /*width: 100%;*/
  right: 0;
  margin: 0;
}
.item-group {
}
.item {
  cursor: grab;
  /*padding: 1rem;*/
  padding: 5px 10px;
  border: solid darkgrey 1px;
  border-radius: 5px;
  background-color: #fefefe;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
}
.item.current-item {
  border: solid darkgrey 3px;
}
.item.select-item {
  font-weight: bold;
}
.item.moving {
  cursor: grabbing;
}
.item-sub {
  /*margin: 0 0 0 1rem;*/
  margin: 1px 0 1px 20px;
}
</style>
