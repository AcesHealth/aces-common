export type Brand<K, T> = K & { __brand__: T }
export type Id<T> = Brand<number, T>;