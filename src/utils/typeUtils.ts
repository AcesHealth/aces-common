export type Brand<K, T> = K & { __brand__: T };
export type Id<T> = Brand<number, T>;
export type StringId<T> = Brand<string, T>;