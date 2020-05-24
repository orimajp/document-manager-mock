<template>
  <div>
    <v-content>
      <v-container>
        <h1>ドキュメント一覧</h1>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>ドキュメント名</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in records" :key="index">
                <td @click="goPage(record.documentKey)">
                  {{ record.pageName }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
      records: records.slice().reverse()
    }
  },
  methods: {
    goPage(documentKey) {
      this.$router.push(`/document/view/${documentKey}`)
    }
  }
})
</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
