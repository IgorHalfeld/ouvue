import * as Cache from './cache'
import OuvueRender from './components/OuvueRender'
import {
  Options,
  Response,
  CacheInstance,
  CacheOptions,
  OuvueInstance,
  Nullable,
  FetchOptions
} from './types'

export function create<T>(options: Options<T>): OuvueInstance {
  const services: { [key: string]: any } = options.services ?? {}
  const cacheOpts: CacheOptions = options.cache ?? { strategy: 'inmemory' }

  const cache: CacheInstance = Cache.create(cacheOpts.strategy)

  async function fetch<K>(key: string): Promise<Response<Nullable<K>>>
  async function fetch<K>(
    key: string,
    payload?: Record<string, any>
  ): Promise<Response<Nullable<K>>>
  async function fetch<K>(
    key: string,
    payload?: Record<string, any>,
    options?: FetchOptions
  ): Promise<Response<Nullable<K>>> {
    const [entity, action] = key.trim().split('/')
    let data: Nullable<K>

    if (cache.has(key) && !options?.onlyNetwork) {
      data = cache.get<K>(key)
      const response: Response<Nullable<K>> = {
        data,
        error: null
      }
      return response
    }

    if (!services[entity] || !services[entity][action]) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`${key} not found on services object`)
      }

      const response: Response<Nullable<K>> = {
        data: null,
        error: { message: `${key} not found on services object` }
      }
      return response
    }

    try {
      data = await services[entity][action](payload)
      cache.set(key, data)
    } catch (err) {
      const response: Response<Nullable<K>> = {
        data: null,
        error: {
          ...err,
          message: 'some error happen on request call'
        }
      }

      return response
    }

    const result: Response<Nullable<K>> = {
      data,
      error: null
    }
    return result
  }

  return { fetch, OuvueRender: OuvueRender(fetch) }
}
