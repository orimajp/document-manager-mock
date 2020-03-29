<template>
  <v-navigation-drawer app right clipped color="grey lighten-3">
    <!--<h1>ドロワ</h1>-->
    <div class="toc">
      <ul class="menu-list">
        <li
          v-for="(headline, index) in headlines"
          :key="index"
          :class="headlineClass(headline)"
          @click="goHeadline(headline.id)"
        >
          {{ headline.name }}
        </li>
      </ul>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { DocumentHeadline } from '../../models/document/DocumentHeadline'
export default Vue.extend({
  props: {
    headlines: {
      type: Array,
      required: true
    } as PropOptions<Array<DocumentHeadline>>
  },
  methods: {
    headlineClass(headline: DocumentHeadline): String {
      return `headline-${headline.label}`
    },
    goHeadline(id: string): void {
      // alert(id)
      this.$emit('goHeadline', id)
    }
  }
})
</script>

<style scoped>
.toc {
}
.menu-list {
  margin: 10px;
  padding: 0;
}
.menu-list li {
  list-style-type: none;
  font-size: 13px;
  padding-top: 4px;
  padding-bottom: 4px;
  word-wrap: break-word;
}
.menu-list li:hover {
  background-color: lightgrey;
}
.headline-1 {
}
.headline-2 {
  margin-left: 5px;
}
.headline-3 {
  margin-left: 10px;
}
.headline-4 {
  margin-left: 15px;
}
.headline-5 {
  margin-left: 20px;
}
.headline-6 {
  margin-left: 25px;
}
</style>
