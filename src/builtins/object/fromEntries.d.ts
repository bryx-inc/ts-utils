import { Unarray } from "../../array";

type RecursiveWriteable<T> = { -readonly [P in keyof T]: RecursiveWriteable<T[P]> };

type Cast<X, Y> = X extends Y ? X : Y;
type FromEntries<T> = T extends [infer Key, any][]
    ? { [K in Cast<Key, string>]: Extract<Unarray<T>, [K, any]>[1] }
    : { [key in string]: any };

type FromEntriesWithReadOnly<T> = FromEntries<RecursiveWriteable<T>>;

interface ObjectConstructor {
    fromEntries<T>(obj: T): FromEntriesWithReadOnly<T>;
}

export {};
