type Fn<P> = (p: P) => unknown;

/**
 * Transform a union into an intersection
 *
 * !> Note: this only works if your `tsconfig.json` has `"strict": true`.
 *
 * @example
 * ```ts
 * type Things = { a: string } | { b: number };
 * type _ = IntersectUnion<Things>;
 * //   ^? { a: string } & { b: number };
 * ```
 */
export type IntersectUnion<Union> = (Union extends Union ? Fn<Union> : never) extends Fn<infer Intersection> ? Intersection : never;
