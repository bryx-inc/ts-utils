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

/**
 * Return the given value if it is not nullish, otherwise throw the given error. If no error is provided, a generic error will be thrown instead.
 *
 * Helpful to support the lack of `(someObject ?: throw "err").someMethod()` syntax.
 *
 * @example
 * ```
 * const fruits = ["apple", "pear", "banana"];
 * console.log(orThrow(fruits.find(v => v == "orange"), "could not find 'orange'").toUpperCase()); // throws "could not find 'orange'"
 * console.log(orThrow(fruits.find(v => v == "pear"), "could not find 'pear'").toUpperCase()); // "PEAR"
 * ```
 */
export function orThrow<T>(v?: T, err?: string): T {
    if (typeof v == "undefined" || v === null) throw err ?? "orThrow found a nullish value!";
    else return v;
}

/**
 * Allows for simple control branching. Each instruction supplied is a tuple who's first value,
 * is a boolean, and who's second value is the value to return if the aformentioned boolean is `true`.
 *
 * @example
 * ```
 *
 * type Result = { type: "ok" | "warn" | "err"; msg: string };
 *
 * function alert(res: Result) {
 *   console.log(
 *       cond(
 *           [res.type == "ok", () => `Good news: ${res.msg}`],
 *           [res.type == "warn", () => `Quick Heads Up: ${res.msg}`],
 *           [res.type == "err", () => `Oh No!: ${res.msg}`],
 *       ),
 *   );
 * }
 *
 * alert({ msg: 'everything is good', type: 'ok' }) // Good news: everything is good'
 * alert({ msg: 'some stuff is down', type: 'warn' }) // Quick Heads Up: some stuff is down
 * alert({ msg: 'the world is on fire', type: 'err' }) // Oh No!: the world is on fire
 * ```
 */
export function cond<T>(...instrs: [when: boolean, then: () => T][]): T {
    for (const [when, then] of instrs) if (when) return then();

    throw "Failed to match any condition in `cond`";
}
