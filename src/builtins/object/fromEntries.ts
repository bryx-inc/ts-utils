import { Unarray } from "../../array";
import { Narrow } from "../../types";

type RecursiveWriteable<T> = { -readonly [P in keyof T]: RecursiveWriteable<T[P]> };

// type Cast<X, Y> = X extends Y ? X : Y;
type FromEntries<T> = T extends [infer Key, any][]
    ? { [K in Narrow<Key, string>]: Extract<Unarray<T>, [K, any]>[1] }
    : { [key in string]: any };

type FromEntriesWithReadOnly<T> = FromEntries<RecursiveWriteable<T>>;

declare global {
    export interface ObjectConstructor {
        fromEntries<T>(obj: T): FromEntriesWithReadOnly<T>;
    }
}
