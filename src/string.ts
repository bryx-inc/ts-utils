import { isSome, Maybe } from "./maybe";

export type StrAddOptions = {
    treatEmptyStringAsZero?: boolean;
};

/**
 * Add two string representations of number
 */
export function strAdd(strs: string[], options?: StrAddOptions): Maybe<string> {
    const nums = strs.map((s) => {
        if (s == "" && options?.treatEmptyStringAsZero) return 0;
        return Number.parseFloat(s);
    });

    if (isSome(nums)) return nums.reduce((acc, cur) => acc + cur).toString();
    else return null;
}

export function keyFrom(...strs: (string | number)[]) {
    return strs.map((e) => e.toString()).join("-");
}
