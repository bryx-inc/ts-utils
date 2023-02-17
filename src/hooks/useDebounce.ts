import { useRef, useState } from "react";

/**
 * @author Adam Green
 */
export function useDebounce<T>(initialState: T | (() => T), delay: number): [T, (v: T) => void] {
    const [value, setValue] = useState(initialState);
    const timeout = useRef<NodeJS.Timeout>();

    return [
        value,
        (v: T) => {
            if (timeout.current) {
                clearTimeout(timeout.current);
                delete timeout.current;
            }

            timeout.current = setTimeout(() => {
                setValue(v);
            }, delay);
        },
    ];
}
