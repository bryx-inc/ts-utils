import { act, renderHook } from "@testing-library/react";
import { useBool } from "./useBool";

test("useBool", () => {
    const { result } = renderHook(() => useBool(false));
    const [value] = result.current;

    expect(value).toBe(false);
});

test("useBool setTrue", () => {
    const { result } = renderHook(() => useBool(false));

    expect(result.current[0]).toBe(false);

    act(() => {
        result.current[1].setTrue();
    });

    expect(result.current[0]).toBe(true);
});

test("useBool setFalse", () => {
    const { result } = renderHook(() => useBool(true));

    expect(result.current[0]).toBe(true);

    act(() => {
        result.current[1].setFalse();
    });

    expect(result.current[0]).toBe(false);
});

test("useBool toggle", () => {
    const { result } = renderHook(() => useBool(true));

    expect(result.current[0]).toBe(true);

    act(() => {
        result.current[1].toggle();
    });

    expect(result.current[0]).toBe(false);
});
