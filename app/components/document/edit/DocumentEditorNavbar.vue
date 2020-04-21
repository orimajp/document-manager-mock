<template>
  <v-app-bar appdark fixed dense dark class="primary">
    <v-btn icon @click="goTop">
      <v-icon>
        mdi-home
      </v-icon>
    </v-btn>
    <v-chip>
      {{ editTarget }}
    </v-chip>
    <v-text-field
      outlined
      light
      dense
      filled
      flat
      hide-details
      placeholder="タイトル"
      class="header-input"
      :value="pageTitle"
      @input="updateTitle"
    />
    <v-btn-toggle v-model="option" dense multiple class="option-button-group">
      <v-btn value="DARK" color="secondary">
        DARK
      </v-btn>
    </v-btn-toggle>
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
import Vue from 'vue'
import { EDIT, DUAL, PREV } from '~/models/EditorDisplayMode'
export default Vue.extend({
  props: {
    pageTitle: {
      type: String,
      required: true
    },
    documentEdit: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    option: [],
    mode: DUAL,
    editValue: EDIT,
    dualValue: DUAL,
    prevValue: PREV
  }),
  computed: {
    title: {
      get() {
        return this.pageTitle
      },
      set(val) {
        this.$emit('updateTitle', val)
      }
    },
    editTarget(): String {
      return this.documentEdit ? 'D' : 'P'
    }
  },
  watch: {
    mode(newValue, oldValue) {
      // 押下済みのボタンを押すとundefinedが設定される問題への対応
      console.log(`watch.mode() newValue=${newValue}, oldValue=${oldValue}`)
      if (newValue !== undefined) {
        this.$emit('changeMode', this.mode)
        return
      }
      // 二度押しされたボタンが未選択状態になる問題への対応
      this.$nextTick(() => {
        // 描画完了を待ってから値を復元することにより表示状態も復元する
        this.mode = oldValue
      })
    },
    option(val) {
      this.$emit('darkModeState', val.includes('DARK'))
    }
  },
  methods: {
    goTop(): void {
      this.$emit('goTop')
    },
    updateTitle(newTitle): void {
      this.$emit('updateTitle', newTitle)
    }
  }
})
</script>

<style scoped>
.option-button-group {
  margin-right: 8px;
}
.header-input {
  margin-top: 0;
  margin-right: 10px;
  margin-left: 10px;
  background-color: #f5f5f5;
}
</style>
