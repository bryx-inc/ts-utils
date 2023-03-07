export type RecursiveWriteable<T> = { -readonly [P in keyof T]: RecursiveWriteable<T[P]> };
