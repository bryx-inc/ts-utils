import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useConst } from "./useConst";
import { useConstCallback } from "./useConstCallback";

test("useConstCallback", () => {
    const { result } = renderHook(() => {
        const [v, setV] = useState("rainbow dash");
        const cb = useConstCallback(() => v);

        return { cb, setV, v };
    });

    expect(result.current.v).toEqual("rainbow dash");
    const firstCb = result.current.cb;
    expect(result.current.cb()).toEqual("rainbow dash");

    act(() => {
        result.current.setV("flutter shy");
    });

    expect(firstCb).toBe(result.current.cb);

    expect(result.current.cb()).toEqual("flutter shy");
    expect(result.current.v).toEqual("flutter shy");
});
