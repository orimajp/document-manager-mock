<template>
  <div>
    <v-content>
      <v-container>
        <!--
        <h1>ナビゲーション</h1>
        <ul>
          <li>
            <nuxt-link to="/document/view/page0">
              ツリー構造テスト(page0)
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/document/view/md-page0">
              markdownレンダリングテスト(md-page0)
            </nuxt-link>
          </li>
        </ul>
        -->
        <h1>ナビゲーション</h1>
        <ul>
          <li v-for="(record, index) in records" :key="index">
            <nuxt-link :to="getNuxtLink(record.documentKey)">
              {{ record.pageName }}
            </nuxt-link>
          </li>
        </ul>
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { documentService } from '~/services/document/DocumentService'

export default Vue.extend({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  asyncData(ctx: Context): Promise<object | void> | object | void {
    const records = documentService.getDocumentList()
    return {
      records
    }
  },
  methods: {
    getNuxtLink(documentKey) {
      return `/document/view/${documentKey}`
    }
  }
})
</script>

<style></style>
