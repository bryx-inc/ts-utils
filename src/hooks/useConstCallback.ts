import { useRef, useCallback } from "react";

/**
 * Construct a function that maintains referential equality throughout lifecycle rerenders of the component. The returned function, however, will have updated closured values of each render's state.
 *
 * @example
 * ```ts
 * function MyComponent() {
 *   const [ name, setName ] = useState("jonny appleseed");
 *   const onClick = useConstCalback(() => alert(name));
 *
 *   return <Button onClick={onClick}>Say Hello</Button> // doesn't rerender when `setName` is called
 * }
 * ```
 *
 * @author Mary Strodl
 * @category Hook
 */
export function useConstCallback<T extends (...args: unknown[]) => unknown>(cb: T): T {
    const cbRef = useRef<T>(cb);
    cbRef.current = cb;

    return useCallback((...args: Parameters<T>) => cbRef.current(...args), []) as T;
}
