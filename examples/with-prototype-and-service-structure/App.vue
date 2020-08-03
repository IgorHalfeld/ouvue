<template>
  <div>
    <h1>With prototype and service structure</h1>
    <p>Open your developer tools to see the requests on networking tab</p>
  </div>
</template>

<script>
export default {
  async mounted () {
    const posts = await this.getPosts()
    console.log('Posts', posts)

    window.setTimeout(async () => {
      console.log(await this.getPosts())
    }, 2000)
  },
  methods: {
    async getPosts() {
      return this.$services.fetch('posts/getAll')
    }
  }
}
</script>

