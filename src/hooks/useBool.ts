import { useConst } from './useConst';
import { useState } from "react";

export type UseBooleanCallbacks = {
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
};

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
