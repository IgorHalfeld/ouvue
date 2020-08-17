## Ouvue 👂🏻

[![Travis](https://img.shields.io/travis/IgorHalfeld/ouvue.svg)](https://travis-ci.org/IgorHalfeld/ouvue)
[![Coveralls](https://img.shields.io/coveralls/alexjoverm/typescript-library-starter.svg)](https://coveralls.io/github/alexjoverm/typescript-library-starter)
[![Donate](https://img.shields.io/badge/donate-picpay-green.svg)](http://picpay.me/igorhalfeld)

> ⚠️  Beta version!! Do not use in production!!

Simple and unopinionated service layer(with cache 🤩) for Vue REST clients 

- 🔥 Suports Vue.js 2 and 3 _(in progress on branch `next`)_
- 😙 Zero dependencies
- 💅 Typescript suport
- 😍 Code coverage with >90% 

### Install

```javascript
import { create } from '@ouvue/core'
```

### Usage

```html
<template>
  <div>
    <h1>Basic Example with Vue.js</h1>
    <p>Open your developer tools to see the requests on networking tab</p>
  </div>
</template>

<script>
import { create } from '@ouvue/core'

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
```

See this code [live](https://ouvue-basic-vue-demo.surge.sh/) and check out [examples folder](https://github.com/IgorHalfeld/ouvue/tree/master/examples/)

### NPM scripts

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)
