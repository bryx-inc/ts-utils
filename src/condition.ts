export function iff<T>(cond: boolean | undefined, v: T): T | undefined {
    if (!!cond) return v;
    else return undefined;
}