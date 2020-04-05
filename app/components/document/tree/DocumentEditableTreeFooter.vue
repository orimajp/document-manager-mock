<template>
  <v-footer fixed padless>
    <div class="flex-grow-1" />
    <!-- TODO 要改善 -->
    <div class="footer-button">
      <v-btn block @click="cancelTree">
        キャンセル
      </v-btn>
    </div>
    <div class="footer-button">
      <v-btn color="primary" block @click="registerTree">
        変更保存
      </v-btn>
    </div>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    registerTree() {
      this.$emit('registerTree')
    },
    cancelTree() {
      this.$emit('cancelTree')
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
