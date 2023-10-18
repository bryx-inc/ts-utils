import { useConst } from "./useConst";
import { useState } from "react";

/**
 * @internal
 */
export type UseBooleanCallbacks = {
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
};

/**
 * @category Hook
 */
export function useBool(initialState: boolean): [boolean, UseBooleanCallbacks] {
    const [value, setValue] = useState(initialState);

    const setTrue = useConst(() => () => {
        setValue(true);
    });
    const setFalse = useConst(() => () => {
        setValue(false);
    });
    const toggle = useConst(() => () => {
        setValue((currentValue) => !currentValue);
    });

    return [value, { setTrue, setFalse, toggle }];
}
