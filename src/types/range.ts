type _RangeTuple<N extends number, R extends unknown[]> = R["length"] extends N ? [R["length"], ...R] : _RangeTuple<N, [R["length"], ...R]>;
/**
 * A union type comprised of the set of the whole number unit types bounded by L and U inclusively.
 *
 * @example
 * type Example = Range<5, 10>; // 5 | 6 | 7 | 8 | 9 | 10
 */
export type Range<L extends number, U extends number> = (
    _RangeTuple<U, []> extends [...infer T, ..._RangeTuple<L, []>] ? [...T, L] : never
) extends (infer I)[]
    ? I
    : never;