<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title>
        メニュー階層編集確認
      </v-card-title>
      <v-card-text>
        ページが登録されました。引き続きメニュー階層を編集します。
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" text @click="goTreeEdit">
          OK
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
    dialog: false
  }),
  methods: {
    openDialog() {
      this.dialog = true
    },
    goTreeEdit() {
      this.$router.push(`/document/tree/${this.documentKey}`)
    }
  }
})
</script>
