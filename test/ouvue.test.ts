import { create } from '../src/ouvue'
import { OuvueInstance } from '../src/types'

type User = {
  id?: number
  name?: string
}

interface UserService {
  getById({ id }: { id: number }): User
  getAll(): User[]
  update({ name }: { name: string }): void
  throwAnError(): void
}

interface Services {
  users: UserService
}

let user: User = { id: 444, name: 'Test' }

let instance: OuvueInstance
const services: Services = {
  users: {
    getAll: () => [user],
    getById: ({ id }: { id: number }): User => {
      return [user].find(u => u.id === id) ?? {}
    },
    update: ({ name }) => {
      // to test, needs to create another object to change the ref
      const u = { ...user, name }
      user = u
    },
    throwAnError() {
      throw new Error('throw an error')
    }
  }
}

describe('Ouvue', () => {
  beforeEach(() => {
    instance = create<Services>({ services })
  })

  it('should create a valid instance', () => {
    expect(instance.fetch).toBeTruthy()
  })

  it('should not break when not pass services', async () => {
    const i = create<Services>({})
    const response = await i.fetch<Services>('users/getAll', { name: 'Test getAll' })

    expect(response).toEqual({
      data: null,
      error: { message: 'users/getAll not found on services object' }
    })
  })
  it('should not break when not pass services', async () => {
    const i = create<Services>({ cache: { strategy: 'inmemory' } })
    const response = await i.fetch<Services>('users/getAll', { name: 'Test getAll' })

    expect(response).toEqual({
      data: null,
      error: { message: 'users/getAll not found on services object' }
    })
  })

  it('should not break when pass a unknown key', async () => {
    const response = await instance.fetch<Services>('users/create', { name: 'Test create' })

    expect(response).toEqual({
      data: null,
      error: { message: 'users/create not found on services object' }
    })
  })

  it('should not broke when pass a unknown key and now show a warning when production', async () => {
    process.env.NODE_ENV = 'production'
    const response = await instance.fetch<Services>('users/create', { name: 'Test create' })

    expect(response).toEqual({
      data: null,
      error: { message: 'users/create not found on services object' }
    })
  })

  it('should fetch correct payload calling a right service', async () => {
    const response = await instance.fetch<Services>('users/getById', { id: 444 })
    expect(response.data).toEqual({ name: 'Test', id: 444 })
    expect(response.error).toBeNull()
  })

  it('should work without a payload for getAll methods', async () => {
    const response = await instance.fetch<Services>('users/getAll')
    expect(response.data).toEqual([{ name: 'Test', id: 444 }])
    expect(response.error).toBeNull()
  })

  it('should fetch correct payload calling a right service', async () => {
    const response = await instance.fetch<Services>('users/getById', { id: 444 })
    expect(response.data).toEqual({ name: 'Test', id: 444 })
    expect(response.error).toBeNull()

    const updateRes = await instance.fetch<Services>('users/update', { name: 'Test 2' })
    expect(updateRes.error).toBeNull()

    const response2 = await instance.fetch<Services>('users/getById', { id: 444 })
    expect(response2.data).toEqual({ name: 'Test', id: 444 })
    expect(response2.error).toBeNull()

    // Use `onlyNetwork` to not check cache
    const response3 = await instance.fetch<Services>(
      'users/getById',
      { id: 444 },
      { onlyNetwork: true }
    )
    expect(response3.data).toEqual({ name: 'Test 2', id: 444 })
    expect(response3.error).toBeNull()

    // After use onlyNetwork, the cache was updated
    const response4 = await instance.fetch<Services>('users/getById', { id: 444 })
    expect(response4.data).toEqual({ name: 'Test 2', id: 444 })
    expect(response4.error).toBeNull()
  })

  it('should throw an error if service fail', async () => {
    const response = await instance.fetch<Services>('users/throwAnError')
    expect(response.data).toBeNull()
    expect(response.error).toEqual({ message: 'some error happen on request call' })
  })
})
