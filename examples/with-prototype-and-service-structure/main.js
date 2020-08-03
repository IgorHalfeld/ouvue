import Vue from 'vue'
import services from './services'
import App from './App.vue'

import { create } from '../../dist/ouvue.es5.js'

const api = create({ services })

Object.defineProperty(Vue.prototype, '$services', {
  get: () => api,
  set() {
    throw new Error('Can\'t set $services')
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
