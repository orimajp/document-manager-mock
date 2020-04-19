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
    <!--
    <v-btn-toggle v-model="mode" dense>
      <v-btn :value="editValue" color="secondary" :disabled="disableEdit">
        <span>EDIT</span>
      </v-btn>
      <v-btn :value="dualValue" color="secondary" :disabled="disableDual">
        <span>DUAL</span>
      </v-btn>
      <v-btn :value="prevValue" color="secondary" :disabled="disablePrev">
        <span>PREV</span>
      </v-btn>
    </v-btn-toggle>
    -->
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
    },
    disableEdit(): Boolean {
      return this.disableButton(EDIT)
    },
    disableDual(): Boolean {
      return this.disableButton(DUAL)
    },
    disablePrev(): Boolean {
      return this.disableButton(PREV)
    }
  },
  watch: {
    /*
    mode() {
      this.$emit('changeMode', this.mode)
    }
     */
    mode(newValue, oldValue) {
      // 押下済みのボタンを押すとundefinedが設定される問題への対応
      console.log(`watch.mode() newValue=${newValue}, oldValue=${oldValue}`)
      if (newValue === undefined) {
        this.mode = oldValue
        return
      }
      this.$emit('changeMode', this.mode)
    }
  },
  methods: {
    goTop(): void {
      this.$emit('goTop')
    },
    updateTitle(newTitle): void {
      this.$emit('updateTitle', newTitle)
    },
    disableButton(buttonMode: string): Boolean {
      return buttonMode === this.mode
    }
  }
})
</script>

<style scoped>
.header-input {
  margin-top: 0;
  margin-right: 10px;
  margin-left: 10px;
  background-color: #f5f5f5;
}
</style>
