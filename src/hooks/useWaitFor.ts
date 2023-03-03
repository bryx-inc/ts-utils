import { useRef, useEffect, useState } from "react";

/**
 * Fires the given `fn` a single time once all the given preconditions are `true`.
 *
 * @example
 * ```tsx
 * const Page = () => {
 *  const dataset1Loaded = useState(false);
 *  const dataset2Loaded = useState(false);
 *
 *  // load the data ...
 *
 *  // Trigger the print dialog once the component is ready
 *  useWaitFor(() => window.print(), dataset1Loaded, dataset2Loaded);
 *
 *  return dataset1Loaded && dataset2Loaded ? <Content /> : <Loader />;
 * }
 *
 * @category Hook
 * ```
 */
export function useWaitFor<T extends () => unknown>(fn: T, ...preconditions: boolean[]) {
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (done) return;
        if (preconditions.some((v) => !v)) return;

        fn();
        setDone(true);
    }, preconditions);
}
