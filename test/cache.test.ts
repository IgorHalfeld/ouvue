import * as Cache from '../src/cache'
import { CacheInstance } from '../dist/types/types'

let data: CacheInstance

type TestPayload = {
  name: string
}

describe('Cache', () => {
  beforeEach(() => {
    data = Cache.create('inmemory')
    data.set('test', { name: 'testing' })
  })

  it('should return true when pass a existing key', () => {
    expect(data.has('test')).toBe(true)
  })

  it('should return false when pass a not found key', () => {
    expect(data.has('testblabla')).toBe(false)
  })

  it('should return correct payload to a valid key', () => {
    expect(data.get<TestPayload>('test')).toEqual({ name: 'testing' })
  })

  it('should set a value to a key', () => {
    data.set<TestPayload>('test2', { name: 'testing2' })
    expect(data.get<TestPayload>('test2')).toEqual({ name: 'testing2' })
  })
})
