import { VueConstructor } from 'vue'
import { mount } from '@vue/test-utils'
import { create } from '../src/ouvue'
import { OuvueInstance } from '../src/types'

type User = {
  id?: number
  name?: string
}

interface UserService {
  getAll(): User[]
}

interface Services {
  users: UserService
}

let component: VueConstructor
let instance: OuvueInstance
const services: Services = {
  users: {
    getAll: () => [{ id: 444, name: 'Test' }]
  }
}

const scopedSlots = {
  default: '<span slot-scope="{ data }">{{ data }}</span>',
  rejected: '<span slot-scope="{ error }">{{ error }}</span>'
}

describe('OuvueRender', () => {
  beforeEach(() => {
    instance = create<Services>({ services })
    component = instance.OuvueRender.setup()
  })

  it('should fetch data from entity/action', () => {
    const wrapper = mount(component, {
      propsData: {
        action: 'users/getAll'
      },
      scopedSlots
    })

    expect(wrapper.text()).toBe('<span>{ id: 444, name: "Test" }</span>')
  })
})
