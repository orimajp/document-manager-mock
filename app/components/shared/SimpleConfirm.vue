<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text v-if="!noContent">
        {{ content }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="disagree">
          いいえ
        </v-btn>
        <v-btn color="primary" @click="agree">
          はい
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: false,
      default: '確認'
    },
    content: {
      type: String,
      required: true
    }
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    noContent(): boolean {
      return this.content === ''
    }
  },
  methods: {
    openDialog() {
      console.log('openDialog() called.')
      this.dialog = true
    },
    agree() {
      this.dialog = false
      this.$emit('agree')
    },
    disagree() {
      this.dialog = false
      this.$emit('disagree')
    }
  }
})
</script>
