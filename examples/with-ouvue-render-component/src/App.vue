<template>
  <p v-if="error" :style="{ color: 'red' }">Error happen</p>
  <p v-if="isLoading">Loading...</p>
  <pre>{{ data }}</pre>
</template>

<script>
import { useOuvue } from './ouvue'
import { reactive } from 'vue'

export default {
  name: 'App',
  setup() {
    const state = useOuvue({
      entity: 'posts',
      action: 'getAll'
    })

    return state
  }
}
</script>
