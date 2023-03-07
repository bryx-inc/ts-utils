import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useWaitFor } from "./useWaitFor";

test("useWaitFor", () => {
    const fn = jest.fn();

    const {
        result: {
            current: { setV1, setV2 },
        },
    } = renderHook(() => {
        const [v1, setV1] = useState(false);
        const [v2, setV2] = useState(false);

        useWaitFor(fn, v1, v2);

        return { setV1, setV2 };
    });

    act(() => setV1(true));
    expect(fn).not.toBeCalled();

    act(() => setV2(true));
    expect(fn).toBeCalled();

    act(() => setV2(false));
    expect(fn).toBeCalledTimes(1);

    act(() => setV2(true));
    expect(fn).toBeCalledTimes(1);
});
