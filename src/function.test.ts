import { createCurriedGuardPredicate, pipe, tryOr, inject, withLet } from "./function";
import { castUnsafe } from "./object";

test("create curried guard predicate", () => {
    type Thing = { empty: true } | { empty: false; data: string };
    type ThingIsFilledGuard = (v: Thing) => v is Thing & { empty: false };

    const things: Thing[] = [{ empty: true }, { empty: false, data: "apple" }, { empty: false, data: "banana" }];

    const isThingFilledAnd = createCurriedGuardPredicate(((v) => !v.empty) as ThingIsFilledGuard);

    expect(things.some(isThingFilledAnd((v) => v.data == "banana"))).toEqual(true);

    expect(things.some(isThingFilledAnd((v) => v.data == "other"))).toEqual(false);
});

test("pipe", () => {
    const len = (s: string) => s.length;
    const double = (n: number) => n * 2;

    expect(pipe("joe")).toEqual("joe");
    expect(pipe("joe", len)).toEqual(3);
    expect(pipe("joe", len, double)).toEqual(6);
    expect(pipe("joe", len, double, double)).toEqual(12);
    expect(pipe("joe", len, double, double, double)).toEqual(24);
    expect(pipe("joe", len, double, double, double, double)).toEqual(48);
    expect(pipe("joe", len, double, double, double, double, double)).toEqual(96);

    // this is a forced bad case to test the `default` branch
    expect(pipe(...castUnsafe<any, [any]>(["joe", len, double, double, undefined, double, double, double]))).toEqual(48);
});

test("try or", () => {
    expect(tryOr(() => "success", "fallback")).toEqual("success");
    expect(
        tryOr(() => {
            throw new Error("error");
        }, "fallback"),
    ).toEqual("fallback");
});

test("inject", () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    const arr = [1, 2, 3];

    arr.map(inject(fn1)).forEach(fn2);

    expect(fn1).toHaveBeenCalledTimes(arr.length);
    expect(fn2).toHaveBeenCalledTimes(arr.length);
});

test("withLet", () => {
    expect(withLet(1 + 2 + 3, (it) => it + 4)).toEqual(1 + 2 + 3 + 4);
});
