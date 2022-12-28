export function iff<T>(cond: boolean | undefined, v: T): T | undefined {
    if (!!cond) return v;
    else return undefined;
}

/**
 * Expect a certain condition and, given that condition, return a value.
 * This often serves as a fill-in for `const v = maybe ? thing : (throw 'err')`, since that syntax is not supported.
 *
 * @example
 * ```
 * type Result = {
 *  isFetched: boolean,
 *  isSuccess: boolean,
 *  data?: string,
 *  ...
 * }
 *
 * function getData() {
 *   const res: Result = ...
 *
 *   if (res.isFetched)
 *     return expect(res.isSuccess, res.data, 'result failed!');
 * }
 * ```
 *
 * @param assertation The control assertation to check.
 * @param then The value to return if the assertation passes.
 * @param err The Error or error message to throw of the assertation fails. If none is provided, a generic message will be thrown instead.
 * @returns The `then` value, given a passing assertation.
 */
export function expect<T>(assertation: boolean, then: T, err?: Error | string): T {
    if (assertation) return then;
    else throw err ?? `'expect' method found false assertation!`;
}
