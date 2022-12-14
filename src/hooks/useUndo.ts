import { useCallback, useRef } from "react";
import { lastElem } from "../array";
import { isNone } from "../maybe";

function eq<T>(o1: T, o2: T) {
    if (typeof o1 != "object") return o1 == o2;

    if (isNone(o1)) return isNone(o2);
    if (isNone(o2)) return isNone(o1);

    const v1 = Object.values(o1 as object);
    const v2 = Object.values(o2 as object);

    for (const i in v1) if (!eq(v1[i], v2[i])) return false;
    return true;
}

/**
 * `useUndo` watches and records some value on each component rerender, then it exposes a method to allow access to the old
 * versions of the values durring previous renders.
 *
 * ### Options:
 * #### `blockNextUpdateOnUndo`:
 * When true, whenever the exposed `undo` method is called, the hook will skip the next update of the watched value.
 * This particularly helpful if you plan on setting the watched value to the return value of `undo`.
 */
export function useUndo<T>(v: T, opts?: { blockNextUpdateOnUndo: boolean }): [() => T, boolean] {
    const ref = useRef<T[] | undefined>();
    const shouldAccept = useRef(true);

    if (!!opts?.blockNextUpdateOnUndo == false || shouldAccept.current == true) {
        if (ref.current == undefined) ref.current = [v];
        if (!eq(lastElem(ref.current) ?? ({} as T), v)) ref.current = [...ref.current, v];
    } else {
        shouldAccept.current = true;
    }

    return [
        useCallback(() => {
            if (ref.current == undefined) throw "history ref is empty after it should be set!";
            if (ref.current.length <= 1) throw "attempted to undo with insufficient elements!";

            shouldAccept.current = false;
            ref.current.pop();

            return lastElem(ref.current) as T;
        }, [ref]),
        (ref.current?.length ?? 0) > 1,
    ];
}
