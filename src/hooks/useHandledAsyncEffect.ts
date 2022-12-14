import { useEffect } from "react";

export function useHandledAsyncEffect<T>(getPromise: () => Promise<T>, handleRes: (res: T) => unknown, deps: React.DependencyList) {
    useEffect(() => {
        let effectDestroyed = false;

        getPromise().then((res) => {
            if (!effectDestroyed) handleRes(res);
        });

        return () => {
            effectDestroyed = true;
        };
    }, deps);
}
