import { Maybe } from "./maybe";

export type StrAddOptions = {
    treatEmptyStringAsZero?: boolean;
};

/**
 * Add two string representations of number
 */
export function strAdd(strs: string[], options?: StrAddOptions): Maybe<string> {
    const nums = strs.map((s) => {
        if (s == "" && options?.treatEmptyStringAsZero) return 0;

        const parsedString = Number.parseFloat(s);

        return isNaN(parsedString) ? null : parsedString;
    });

    return nums.reduce((acc, cur) => acc + cur)?.toString() ?? null;
}

export function keyFrom(...strs: (string | number)[]) {
    return strs.map((e) => e.toString()).join("-");
}
