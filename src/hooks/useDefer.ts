import { useEffect, useState } from "react";

/**
 * Defer an action to be run later. By calling the returned method, the supplied function
 * will be called with the given parameter on next rerender. A rerender is then queued.
 *
 * @example
 * ```tsx
 * // console.log some message on next render
 * const deferMsg = useDefer((s: string) => console.log(s));
 *
 * const MyButton = <button onClick={() => {
 *    // ...
       deferMsg("second");
       console.log("first");
 *  }}>Click Me</button>;

    // when clicked...
    // --> "first"
    // --> "second"
 * ```
 */
export function useDefer<T>(fn: (v: T) => unknown) {
    const [[shouldRun, v], setInstr] = useState<[true, T] | [false, null]>([false, null]);

    useEffect(() => {
        if (shouldRun) fn(v as T);
        setInstr([false, null]);
    }, [shouldRun]);

    return (e: T) => {
        setInstr([true, e]);
    };
}
