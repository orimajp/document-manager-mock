// import { accessorType } from '~/store'
import { accessorType } from '../store'
// import NuxtAppOptions from '@nuxt/types'

/*
declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
  }
}
*/

export interface Vue {
  $accessor: typeof accessorType
}

/*
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}
*/

export interface NuxtAppOptions {
  $accessor: typeof accessorType
}
