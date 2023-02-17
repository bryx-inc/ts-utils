import { createCurriedGuardPredicate, pipe } from "./function";
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
