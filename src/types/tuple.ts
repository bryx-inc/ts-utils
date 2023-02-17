export type SizedTuple<Size extends number, Fill = unknown, _T extends unknown[] = []> = _T["length"] extends Size
    ? _T
    : SizedTuple<Size, Fill, [Fill, ..._T]>;

export type TailOf<T extends unknown[]> = T extends [...infer _, infer Tail] ? Tail : never;
export type HeadOf<T extends unknown[]> = T extends [infer Head, infer _] ? Head : never;
