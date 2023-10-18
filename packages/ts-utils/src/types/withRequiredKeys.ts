export type WithRequiredKeys<TObj extends object, K extends keyof TObj> = Required<Pick<TObj, K>> & Omit<TObj, K>;
