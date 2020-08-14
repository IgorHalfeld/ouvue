import Vue from 'vue'
import services from './services'
import App from './App.vue'

import { create } from 'ouvue'
// import { create } from '../../../dist/ouvue.es5'

export const api = create({ services })

Object.defineProperty(Vue.prototype, '$services', {
  get: () => api,
  set () {
    throw new Error('Can\'t set $services')
  }
})

Vue.config.productionTip = false

const { OuvueRender } = api

Vue.component('ouvue-render', OuvueRender)

new Vue({
  render: h => h(App)
}).$mount('#app')
