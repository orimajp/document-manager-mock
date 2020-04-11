<template>
  <v-app-bar appdark fixed dense dark class="primary">
    <v-btn icon @click="goTop">
      <v-icon>
        mdi-home
      </v-icon>
    </v-btn>
    <v-toolbar-title>
      ページ編集
    </v-toolbar-title>
    <v-spacer />
    <v-btn-toggle v-model="mode" dense>
      <v-btn :value="editValue" color="secondary">
        <span>EDIT</span>
      </v-btn>
      <v-btn :value="dualValue" color="secondary">
        <span>DUAL</span>
      </v-btn>
      <v-btn :value="prevValue" color="secondary">
        <span>PREV</span>
      </v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>

<script lang="ts">
// import Vue, { PropType } from 'vue'
import Vue from 'vue'
import { EDIT, DUAL, PREV } from '~/models/EditorDisplayMode'
export default Vue.extend({
  data: () => ({
    mode: DUAL,
    editValue: EDIT,
    dualValue: DUAL,
    prevValue: PREV
  }),
  watch: {
    mode() {
      this.$emit('changeMode', this.mode)
    }
  },
  methods: {
    goTop(): void {
      this.$router.push('/')
    }
  }
})
</script>

<style scoped>
.mode-button {
  min-width: 300px;
}
.mode-button-box {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
