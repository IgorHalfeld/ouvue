import { create } from '@ouvue/core'

const PostsService = HTTPClient => ({
    async getAll () {
      console.log('Getting posts...')
      const res = await HTTPClient('https://jsonplaceholder.typicode.com/posts')
      const result = await res.json()

      return result
    }
})

const HTTPClient = window.fetch // think this like axios.create

const services = {
  posts: PostsService(HTTPClient)
}

export const api = create({ services })
export const useOuvue = api.useOuvue
