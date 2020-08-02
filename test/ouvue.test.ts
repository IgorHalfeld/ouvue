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

  it('should not broke when pass a unknown key', async () => {
    const response = await instance.fetch<Services>('users/getAll')

    expect(response).toEqual({
      data: null,
      error: { message: 'users/getAll not found on services object' }
    })
  })
})
