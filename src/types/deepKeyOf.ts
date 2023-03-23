/**
 * The keys of the given deep, nested object `TObj`.
 *
 * @example
 * ```ts
 * type Person = {
 *   firstName: string,
 *   lastName: string,
 *   address: {
 *     city: string,
 *     state: zip
 *   },
 *   hobbies: {
 *     name: string,
 *     equipment: string[]
 *   }[]
 * }
 * DeepKeyOf<Person>;
 * // ^? 'firstName' | 'lastName' | 'address' | 'address.city' | 'address.state' | 'hobbies' | 'hobbies.name' | 'hobbies.equipment'
 * ```
 */
export type DeepKeyOf<TObj extends object> = TObj extends (infer Inner extends object)[]
    ? DeepKeyOf<Inner>
    : {
          [TKey in keyof TObj & string]: FormattedKey<TObj[TKey], `${TKey}`>;
      }[keyof TObj & string];

type FormattedKey<TValue, Text extends string> = TValue extends object[]
    ? Text | `${Text}.${DeepKeyOf<TValue[number]>}`
    : TValue extends (infer _)[]
    ? Text
    : TValue extends object
    ? Text | `${Text}.${DeepKeyOf<TValue>}`
    : Text;
