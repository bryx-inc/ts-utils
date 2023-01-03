import { act, renderHook } from "@testing-library/react";
import { useBool } from "./useBool";
import { useDefer } from "./useDefer";

test("useDefer", () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useDefer(fn));

    const arg = Symbol();

    expect(result.current).toBeInstanceOf(Function);
    expect(fn).not.toHaveBeenCalled();

    expect(result.current).toBeInstanceOf(Function);
    expect(fn).not.toHaveBeenCalled();

    act(() => {
        result.current(arg);
    });

    expect(fn).toHaveBeenLastCalledWith(arg);
});
