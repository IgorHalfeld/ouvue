import { Strategy, CacheInstance } from './types'

function createInmemory(): CacheInstance {
  const data = new Map()

  function set<T>(key: string, value: T): void {
    data.set(key, value)
  }

  function get<T>(key: string): T {
    return data.get(key)
  }

  function has(key: string): boolean {
    return Boolean(data.get(key))
  }

  return { set, get, has }
}

export function create(strategy: string): CacheInstance {
  // @TODO: think in a better way to handle strategies
  const strategies: Strategy = {
    inmemory: createInmemory
  }

  return strategies[strategy]()
}
