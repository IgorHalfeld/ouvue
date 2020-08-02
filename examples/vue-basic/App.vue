<template>
  <div>
    <h1>Basic Example with Vue.js</h1>
    <p>Open your developer tools to see the requests on networking tab</p>
  </div>
</template>

<script>
import { create } from '../../dist/ouvue.es5.js'

const services = {
  posts: {
    async getAll () {
      console.log('Getting posts...')
      const res = await window.fetch('https://jsonplaceholder.typicode.com/posts')
      const result = await res.json()

      return result
    }
  }
}

const api = create({ services })

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
      return api.fetch('posts/getAll')
    }
  }
}
</script>

