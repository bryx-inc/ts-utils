/**
 * Thows the given error
 *
 * ?> This is useful for cleaner one-line lambdas which function as branches which should only throw an error;
 *
 * @example
 * ```ts
 * const key: string = ...;
 *
 * const res = match(key)
 *  .with("value1", () => "apple")
 *  .with("value2", () => "banana")
 *  .otherwise(() => throwError<string, string>("no valid key. Did you specify the right one?");
 *
 * typeof res; // 'string'
 * ```
 *
 * @param err The error to throw
 *
 * @category Error
 */
export function throwError<T extends Error | string, R = void>(err: T): R {
    throw typeof err == "string" ? new Error(err) : err;
}
