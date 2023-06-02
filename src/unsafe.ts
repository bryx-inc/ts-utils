import { intoMaybe, Maybe } from "./maybe";

/**
 * Cast some given `T` to `E` without any type overlap checks.
 *
 * !> This function should be used _very_ sparingly, and only in situations where typescript cannot follow the typechecking. Often times, this happens when object properies are being checked on an indexed value. Although, in most cases this object should simply be explicitly bound to a variable, in sitations where it cannot, `unsafeCast` may be used.
 *
 * @example
 * ```ts
 * type Shape2D = ...;
 * type Shape3D = ...;
 *
 * type Shape =
 *  | { type: '2d', shape: Shape2D }
 *  | { type: '3d', shape: Shape3D }
 *
 * function print2DShape(shape: Shape2D) { ... }
 * function print3DShape(shape: Shape3D) { ... }
 *
 * function printShapeRange(shapes: Shape[], lowerIdx: number, upperIdx: number) {
 *  if (shapes[lowerIdx].type == '2d')
 *    print2DShape(castUnsafe(shapes[lowerIdx]));
 *  else
 *    print3DShape(castUnsafe(shapes[lowerIdx]))
 *
 *  if (lowerIdx < upperIdx)
 *    printShapeRange(shapes, lowerIdx + 1, upperIdx);
 * }
 *
 * ```
 *
 * @category Unsafe
 */
function cast<T, E>(v: T): E {
    return v as unknown as E;
}

/**
 * Maybe get a property on some object, who's type does not define the specified key. If no property is found on the given object at the given key, `null` is returned.
 *
 * @category Unsafe
 */
function getProperty<TObj extends object, TKey extends string, TReturn>(obj: TObj, key: TKey): Maybe<TReturn> {
    return intoMaybe((obj as TObj & Record<TKey, TReturn>)[key]);
}

/**
 * Execute a function in an "unsafe" context, allowing the usage of unsafe utilities.
 *
 * This function provides a controlled and opt-in approach to using unsafe utilities within your TypeScript code. It accepts a callback function that takes an object containing unsafe utilities as a parameter. The callback function can then make use of these unsafe utilities for specific scenarios where TypeScript's type checking falls short or cannot follow certain type constraints.
 *
 * ## Current utilities:
 * 
 * ### `cast`
 * 
 * {@inheritDoc cast}
 * 
 * ### `getProperty`
 * 
 * {@inheritDoc getProperty}
 *
 * @param fn - The callback function to execute in an unsafe context.
 * @returns The result of executing the callback function.
 *
 * @remarks
 * The `unsafe` function should be used judiciously and sparingly. It is intended for situations where TypeScript's type system cannot accurately infer or validate certain type relationships, particularly when dealing with indexed values or object properties that are not explicitly bound to variables. By using `unsafe`, you acknowledge the potential risks and override type checks, hence the name "unsafe"
 *
 * @example
 * ```ts
 * type Shape2D = { ... }
 * type Shape3D = { ... }
 *
 * type Shape =
 *   | { type: '2d', shape: Shape2D }
 *   | { type: '3d', shape: Shape3D };
 *
 * function print2DShape(shape: Shape2D) { ... }
 * function print3DShape(shape: Shape3D) { ... }
 *
 * function printShapeRange(shapes: Shape[], lowerIdx: number, upperIdx: number) {
 *   unsafe((utils) => {
 *     if (shapes[lowerIdx].type == '2d')
 *       print2DShape(utils.cast(shapes[lowerIdx]));
 *     else
 *       print3DShape(utils.cast(shapes[lowerIdx]));
 *
 *     if (lowerIdx < upperIdx)
 *       printShapeRange(shapes, lowerIdx + 1, upperIdx);
 *   });
 * }
 * ```
 *
 * @category Unsafe
 */
export function unsafe<TResult>(fn: (utils: { getProperty: typeof getProperty, cast: typeof cast }) => TResult): TResult {
    return fn({ getProperty, cast });
}
