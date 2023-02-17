import { Maybe } from "./maybe";
import { tryToFold } from "./array";
import { Result } from "./result";

/**
 * @internal
 */
export type StrAddOptions = {
    treatEmptyStringAsZero?: boolean;
};

/**
 * Add two numbers as strings together, yeilding a string which is the sum of those numbers.
 *
 * @example
 * ```ts
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
 * ```ts
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
 * ```ts
 * new RegExp("$50").test("$50"); // false
 * new RegExp(escapeRegex("$50")).test("$50"); // true
 * ```
 *
 * ?> special thanks to mary.strodl@bryx.com and https://stackoverflow.com/a/3561711
 */
export function escapeRegex(s: string): string {
    return s.replace(/[\-\[\]\/\{}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); /* eslint-disable-line no-useless-escape */
}

/**
 * Construct an initialism (the first letters of each token) in a given string separated by a given separator
 *
 * @example
 * ```ts
 * console.log(initialism("adam blue")); // 'AB'
 * console.log(initialism("joe_schmoe", "_")); // 'JS'
 * console.log(initialism("balsam bagels", " ", false)); // 'bb'
 * ```
 *
 * @param s The string to initialize
 * @param separator Delimiter separating tokens in `s`; by default, a space (`' '`)
 * @param capitalize Whether to capitalize the letters or leave as is; by default, `true`
 * @returns The initialism of `s`
 *
 * @author Adam Green
 */
export function initialism(s: string, separator = " ", capitalize = true) {
    return s
        .split(separator)
        .map((s) => (capitalize ? s.at(0)?.toUpperCase() : s.at(0) ?? ""))
        .join("");
}

/**
 * Get a substring of the given string `str` from the origin of the string to the first or nth occurance of the given `to` string
 *
 * @example
 * ```ts
 * const str = 'apple.banana.orange.kiwi';
 * sliceStrTo(str, '.'); // 'apple.'
 * sliceStrTo(str, '.', 2); // 'apple.banana.orange.'
 * ```
 */
export function sliceStrTo(str: string, to: string, nth = 0): string {
    const sliced = str.slice(0, str.indexOf(to) + to.length);

    if (sliced == "") return str; // no match
    if (nth == 0) return sliced;
    else return sliced + sliceStrTo(str.slice(sliced.length), to, nth - 1);
}
