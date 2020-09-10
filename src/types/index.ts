export interface OuvueResult {
  data: any
  isLoading: boolean
  error: any
}

export interface Props {
  action: string
  payload: Record<string, any>
  options: FetchOptions
}

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
  fetch<T>(
    key: string,
    payload?: Record<string, any>,
    options?: any
  ): Promise<Response<Nullable<T>>>
  useOuvue: (props: Props) => OuvueResult
}

export type Nullable<T> = T | null

export interface Strategy {
  [key: string]: any
  inmemory(): CacheInstance
}

export type Response<T> = {
  data: T
  error: Nullable<any>
}

export type FetchOptions = {
  onlyNetwork: boolean
}
