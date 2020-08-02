import { create } from '../src/ouvue'
import { OuvueInstance } from '../src/types'

interface UserService {
  getById(): void
}

interface Services {
  users: UserService
}

let instance: OuvueInstance
const services: Services = {
  users: {
    getById: jest.fn()
  }
}

describe('Ouvue', () => {
  beforeEach(() => {
    instance = create<Services>({ services })
  })

  it('should create a valid instance', () => {
    expect(instance.fetch).toBeTruthy()
  })
})
