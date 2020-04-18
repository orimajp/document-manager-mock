<template>
  <v-footer padless fixed>
    <v-spacer />
    <div class="footer-button">
      <v-btn block @click="cancelDocument">
        キャンセル
      </v-btn>
    </div>
    <div class="footer-button">
      <v-btn color="primary" block :disabled="!change" @click="updateDocument">
        変更保存
      </v-btn>
    </div>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    change: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    updateDocument() {
      this.$emit('updateDocument')
    },
    cancelDocument() {
      this.$emit('cancelDocument')
    }
  }
})
</script>

<style scoped>
.footer-button {
  padding: 5px 5px 5px 0;
  min-width: 150px;
}
</style>
