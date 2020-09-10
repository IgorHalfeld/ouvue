export default HTTPClient => ({
    async getAll () {
      console.log('Getting posts...')
      const res = await HTTPClient('https://jsonplaceholder.typicode.com/posts')
      const result = await res.json()

      return result
    }
})
