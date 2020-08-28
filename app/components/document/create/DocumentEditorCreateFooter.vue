<template>
  <v-footer padless fixed>
    <v-spacer />
    <div class="footer-button">
      <v-btn block @click="cancelDocument"> キャンセル </v-btn>
    </div>
    <div class="footer-button">
      <v-btn color="primary" block :disabled="!change" @click="createDocument">
        登録
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
    },
    documentEdit: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      }
    }
  },
  methods: {
    createDocument() {
      if (this.documentEdit) {
        this.$emit('registerDocument')
        return
      }
      // TODO 追加位置選択ダイアログを表示して、ページの登録位置を決定し、ページ登録後にツリー更新を行う。登録及び更新処理はページコンポーネントに実装する。
      this.$emit('createPage')
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
