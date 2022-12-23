import { createCurriedGuardPredicate } from "./function";

test("create curried guard predicate", () => {
    type Thing = { empty: true } | { empty: false; data: string };
    type ThingIsFilledGuard = (v: Thing) => v is Thing & { empty: false };

    const things: Thing[] = [{ empty: true }, { empty: false, data: "apple" }, { empty: false, data: "banana" }];

    const isThingFilledAnd = createCurriedGuardPredicate(((v) => !v.empty) as ThingIsFilledGuard);

    expect(things.some(isThingFilledAnd((v) => v.data == "banana"))).toEqual(true);

    expect(things.some(isThingFilledAnd((v) => v.data == "other"))).toEqual(false);
});
