import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { create } from '../src/ouvue'
import { OuvueInstance } from '../src/types'

type User = {
  id?: number
  name?: string
}

interface UserService {
  getAll(): Promise<User[]>
}

interface Services {
  users: UserService
}

let instance: OuvueInstance
const services: Services = {
  users: {
    getAll: () => Promise.resolve([{ id: 444, name: 'Test' }])
  }
}

const scopedSlots = {
  default: '<span slot-scope="{ data }">{{ data }}</span>'
}

describe('OuvueRender', () => {
  beforeEach(() => {
    instance = create<Services>({ services })
  })

  it('should fetch data from entity/action', () => {
    const wrapper = shallowMount(instance.OuvueRender, {
      propsData: {
        action: 'users/getAll'
      },
      scopedSlots
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toBe('{ id: 444, name: "Test" }')
    })
  })
})
