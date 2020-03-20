<template>
  <v-app>
    <normal-navbar />
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import NormalNavbar from '~/components/NormalNavbar'
export default Vue.extend({
  components: {
    NormalNavbar
  }
})
</script>

<style></style>
