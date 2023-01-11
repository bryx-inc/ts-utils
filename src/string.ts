import { Maybe } from "./maybe";
import { tryToFold } from "./array";
import { Result } from "./result";

export type StrAddOptions = {
    treatEmptyStringAsZero?: boolean;
};

/**
 * Add two numbers as strings together, yeilding a string which is the sum of those numbers.
 *
 * @example
 * ```
 * console.log(strAdd('5', '8')); // '13'
 * ```
 */
export function strAdd(strs: string[], options?: StrAddOptions): Maybe<string> {
    const nums = strs.map((s) => {
        if (s == "" && options?.treatEmptyStringAsZero) return 0;
        return parseFloat(s);
    });

    return tryToFold(
        nums,
        (acc, cur, bail) => {
            if (isNaN(cur)) return bail(cur + " is NaN");
            else return acc + cur;
        },
        0,
    )
        .andThen((n) => Result.Ok(n.toString()))
        .ok();
}

/**
 * Construct a key from a list of given bases
 *
 * @example
 * ```
 * console.log(keyFrom('one', 'two', 10)); // 'one-two-10'
 * ```
 *
 * @param strs The bases to construct a key from
 * @returns The bases, interleaved with `-`
 */
export function keyFrom(...strs: (string | number)[]) {
    return strs.map((e) => e.toString()).join("-");
}

/**
 * Given a string that contains regex commands, escape those characters to match as literals with regex.
 *
 * @example
 * ```
 * new RegExp("$50").test("$50"); // false
 * new RegExp(escapeRegex("$50")).test("$50"); // true
 * ```
 *
 * @note special thanks to mary.strodl@bryx.com and https://stackoverflow.com/a/3561711
 */
export function escapeRegex(s: string): string {
    return s.replace(/[\-\[\]\/\{}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); /* eslint-disable-line no-useless-escape */
}
