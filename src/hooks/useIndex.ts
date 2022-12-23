import { useState } from "react";
import { useConst } from "./useConst";

export type UseIndexCallbacks = {
    inc: () => void;
    dec: () => void;
    set: (i: number) => void;
};

export function useIndex(initialState: number): [number, UseIndexCallbacks] {
    const [value, setValue] = useState(initialState);

    const inc = useConst(() => () => {
        setValue(value + 1);
    });
    const dec = useConst(() => () => {
        setValue(value - 1);
    });
    const set = useConst(() => (i: number) => {
        setValue(i);
    });

    return [value, { inc, dec, set }];
}
