/**
 * The following hook is the same as @react-hook/latest
 * https://github.com/jaredLunde/react-hook
 */
import * as React from "react";

const useLatest = <T>(current: T) => {
    const storedValue = React.useRef(current);
    React.useEffect(() => {
        storedValue.current = current;
    });
    return storedValue;
};

export default useLatest;
