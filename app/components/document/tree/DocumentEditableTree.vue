<template>
  <draggable
    class="item-container"
    :list="list"
    :value="value"
    :group="{ name: 'treeNodes' }"
    animation="200"
    @input="emitter"
  >
    <div v-for="child in readValue" :key="child.pageKey" class="item-group">
      <div class="item">
        {{ child.pageTitle }}
      </div>
      <editable-tree :list="child.nodes" class="item-sub" />
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
    }
  },
  computed: {
    readValue() {
      return this.value ? this.value : this.list
    }
  },
  methods: {
    emitter(value) {
      this.$emit('input', value)
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
  /*padding: 1rem;*/
  padding: 5px 10px;
  border: solid darkgrey 1px;
  border-radius: 5px;
  background-color: #fefefe;
}
.item-sub {
  /*margin: 0 0 0 1rem;*/
  margin: 1px 0 1px 20px;
}
</style>
