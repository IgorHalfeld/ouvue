export type CacheOptions = {
  strategy: string
}

export type Options<T> = {
  cache?: CacheOptions
  services?: T
}

export interface CacheInstance {
  set<T>(key: string, value: T): void
  get<T>(key: string): T
  has(key: string): boolean
}

export interface OuvueInstance {
  fetch<T>(key: string, payload: Record<string, any>, options: any): Promise<T>
}

export interface Strategy {
  [key: string]: any
  inmemory(): CacheInstance
}
