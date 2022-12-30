import React from "react";

/**
 * Conditionally return a given value.
 * This is a useful replacement for `when ? something : undefined`.
 *
 * @example
 * ```
 * function getSx(isRed: boolean) {
 *  return { fontFamily: 'monospace', backgroundColor: iff(isRed, 'red') }
 * }
 *
 * console.log(getSx(false)); // { fontFamily: 'monospace' }
 * console.log(getSx(true)); // { fontFamily: 'monospace', backgroundColor: 'red' }
 * ```
 *
 * @param cond The condition to check
 * @param v The value to return if the `cond` is true
 * @returns v if `cond` is true, otherwise `undefined`
 */
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

export function orFragment(cond: boolean, node: React.ReactElement): React.ReactElement {
    return cond ? node : React.createElement(React.Fragment);
}
