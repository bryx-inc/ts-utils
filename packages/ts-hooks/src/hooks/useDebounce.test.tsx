import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

test("useDebounce", () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useDebounce(1, 100));

    act(() => result.current[1](2));
    expect(result.current[0]).toBe(1);

    act(() => result.current[1](3));
    act(() => jest.advanceTimersByTime(50));

    act(() => result.current[1](4));
    act(() => jest.advanceTimersByTime(50));
    expect(result.current[0]).toBe(1);

    act(() => jest.advanceTimersByTime(50));
    expect(result.current[0]).toBe(4);
});
