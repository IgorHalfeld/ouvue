import PostsService from './posts'

const HTTPClient = window.fetch // think this like axios.create

export default {
  posts: PostsService(HTTPClient)
}
