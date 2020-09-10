<template>
  <div>
    <ouvue-render action="posts/getAll">
      <template slot-scope="{ data, error, isLoading }">
        <p v-if="error" :style="{ color: 'red' }">Error happen</p>
        <p v-if="isLoading">Loading...</p>
        <pre>{{ data }}</pre>
      </template>
    </ouvue-render>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
