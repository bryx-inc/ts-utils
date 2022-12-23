import { renderHook } from "@testing-library/react";
import { useConst } from "./useConst";

test("useConst", () => {
    const { result } = renderHook(() => useConst(1));

    expect(result.current).toBe(1);
});

test("useConst function initial value", () => {
    const { result } = renderHook(() => useConst(() => 2));

    expect(result.current).toBe(2);
});
