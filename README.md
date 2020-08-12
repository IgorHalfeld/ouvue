## Ouvue 👂🏻

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/IgorHalfeld/ouvue)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/IgorHalfeld/ouvue.svg)](https://travis-ci.org/IgorHalfeld/ouvue)
[![Coveralls](https://img.shields.io/coveralls/alexjoverm/typescript-library-starter.svg)](https://coveralls.io/github/alexjoverm/typescript-library-starter)
[![Dev Dependencies](https://david-dm.org/IgorHalfeld/ouvue/dev-status.svg)](https://david-dm.org/IgorHalfeld/ouvue?type=dev)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/AJoverMorales)

> ⚠️  Beta version!! Do not use in production!!

Simple and unopinionated service layer with cache out of the box for REST clients 

- 🔥 Suports Vue.js 2 and 3 _(in progress on branch `next`)_
- 😙 Zero dependencies
- 💅 Typescript suport
- 😍 Code coverage with >90% 

### Usage

```html
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
```

See this code [live](https://ouvue-basic-vue-demo.surge.sh/) and check out [examples folder](https://github.com/IgorHalfeld/ouvue/tree/master/examples/)

```javascript
import something from 'mylib/dist/lib/something'
```

### NPM scripts

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)


#### Setup steps

Follow the console instructions to install semantic release and run it (answer NO to "Do you want a `.travis.yml` file with semantic-release setup?").

_Note: make sure you've setup `repository.url` in your `package.json` file_

```bash
npm install -g semantic-release-cli
semantic-release-cli setup
# IMPORTANT!! Answer NO to "Do you want a `.travis.yml` file with semantic-release setup?" question. It is already prepared for you :P
```

From now on, you'll need to use `npm run commit`, which is a convenient way to create conventional commits.

Automatic releases are possible thanks to [semantic release](https://github.com/semantic-release/semantic-release), which publishes your code automatically on [github](https://github.com/) and [npm](https://www.npmjs.com/), plus generates automatically a changelog. This setup is highly influenced by [Kent C. Dodds course on egghead.io](https://egghead.io/courses/how-to-write-an-open-source-javascript-library)

