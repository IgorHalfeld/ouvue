import * as Cache from './cache'
import { Options, CacheInstance, CacheOptions, OuvueInstance } from './types'

export function create<T>(options: Options<T>): OuvueInstance {
  const services: { [key: string]: any } = options.services ?? {}
  const cacheOpts: CacheOptions = options.cache ?? { strategy: 'inmemory' }

  const cache: CacheInstance = Cache.create(cacheOpts.strategy)

  async function fetch<T>(key: string, payload: any): Promise<T> {
    const [entity, action] = key.split('/')

    if (cache.has(key)) {
      return cache.get<T>(key)
    }

    const response = await services[entity][action](payload)
    cache.set(key, response)

    return response
  }

  return { fetch }
}
