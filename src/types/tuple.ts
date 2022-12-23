export type SizedTuple<Size extends number, Fill = unknown, _T extends unknown[] = []> = _T["length"] extends Size
    ? _T
    : SizedTuple<Size, Fill, [Fill, ..._T]>;
