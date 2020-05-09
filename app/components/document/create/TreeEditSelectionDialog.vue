<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title>
        ツリー編集確認
      </v-card-title>
      <v-card-text>
        ページが登録されました。引き続きメニュー階層を編集しますか？
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" text @click="goPage">
          ページに遷移
        </v-btn>
        <v-btn color="green darken-1" text @click="goTreeEdit">
          メニュー階層編集
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    documentKey: {
      type: String,
      required: true
    }
  },
  data: () => ({
    pageKey: null,
    dialog: false
  }),
  methods: {
    openDialog(pageKey) {
      this.dialog = true
      this.pageKey = pageKey
    },
    goPage() {
      this.$router.push(`/document/view/${this.pageKey}`)
    },
    goTreeEdit() {
      this.$router.push(`/document/tree/${this.documentKey}`)
    }
  }
})
</script>
