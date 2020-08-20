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
  throwAnError(): Error
}

interface Services {
  users: UserService
}

let user = { id: 444, name: 'Test' }
let instance: OuvueInstance
const services: Services = {
  users: {
    getAll: () => Promise.resolve([user]),
    throwAnError: () => {
      throw new Error('UserService - error on users service')
    }
  }
}

describe('OuvueRender', () => {
  beforeEach(() => {
    instance = create<Services>({ services })
  })

  it('should fetch data from entity/action', async () => {
    const wrapper = shallowMount<Vue & { fetch(): Promise<void> }>(instance.OuvueRender, {
      propsData: {
        action: 'users/getAll'
      },
      scopedSlots: {
        default: '<pre slot-scope="{ data }">{{ data }}</pre>'
      }
    })

    await wrapper.vm.fetch()

    const text = JSON.parse(wrapper.text())
    expect(text).toEqual([{ id: 444, name: 'Test' }])
  })

  it('should respect options received by props', async () => {
    const wrapper = shallowMount<Vue & { fetch(): Promise<void> }>(instance.OuvueRender, {
      propsData: {
        action: 'users/getAll',
        options: { onlyNetwork: true }
      },
      scopedSlots: {
        default: '<pre slot-scope="{ data }">{{ data }}</pre>'
      }
    })

    await wrapper.vm.fetch()

    const text1 = JSON.parse(wrapper.text())
    expect(text1).toEqual([{ id: 444, name: 'Test' }])

    const u = { ...user, id: 555 }
    user = u

    await wrapper.vm.fetch()

    const text2 = JSON.parse(wrapper.text())
    expect(text2).toEqual([{ id: 555, name: 'Test' }])
  })

  it('should return a error from entity/action', async () => {
    const wrapper = shallowMount<Vue & { fetch(): Promise<void> }>(instance.OuvueRender, {
      propsData: {
        action: 'users/throwAnError'
      },
      scopedSlots: {
        default: '<pre slot-scope="{ error }">{{ error }}</pre>'
      }
    })

    await wrapper.vm.fetch()

    const text = JSON.parse(wrapper.text())
    expect(text).toEqual({
      message: 'some error happen on request call'
    })
  })
})
