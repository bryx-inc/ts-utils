import {
    expectMaybe,
    FormalMaybe,
    intoMaybe,
    isNone,
    isSome,
    matchMaybe,
    maybe,
    Maybe,
    unwrapMaybe,
    unwrapOrUndef,
    withSome,
} from "./maybe";

const emptyMaybe: Maybe<string> = null;
const filledMaybe: Maybe<string> = "foo";

test("is none", () => {
    expect(isNone(emptyMaybe)).toEqual(true);
    expect(isNone(filledMaybe)).toEqual(false);
});

test("is some", () => {
    expect(isSome(emptyMaybe)).toEqual(false);
    expect(isSome(filledMaybe)).toEqual(true);
});

test("into maybe", () => {
    expect(intoMaybe("foo")).toEqual("foo");
    expect(intoMaybe()).toEqual(null);
});

test("match maybe", () => {
    expect(
        matchMaybe(filledMaybe, {
            some: (v) => v + "fizz",
            none: () => "buzz",
        }),
    ).toBe("foofizz");

    expect(
        matchMaybe(emptyMaybe, {
            some: (v) => v + "fizz",
            none: () => "buzz",
        }),
    ).toBe("buzz");
});

test("expect maybe", () => {
    expect(expectMaybe(filledMaybe, "some error")).toEqual("foo");
    expect(() => expectMaybe(emptyMaybe, "some error")).toThrow("some error");
});

test("unwrap maybe", () => {
    expect(unwrapMaybe(filledMaybe)).toEqual("foo");
    expect(() => unwrapMaybe(emptyMaybe)).toThrow("attempted to unwrap a null value!");
});

test("unwrap or undef", () => {
    expect(unwrapOrUndef(filledMaybe)).toEqual("foo");
    expect(unwrapOrUndef(emptyMaybe)).toStrictEqual(undefined);
});

test("expect maybe", () => {
    expect(expectMaybe(filledMaybe, "some error")).toEqual("foo");
    expect(() => expectMaybe(emptyMaybe, "some error")).toThrow("some error");
    expect(() => expectMaybe(emptyMaybe, new Error("some error"))).toThrow("some error");
});

test("with some", () => {
    expect(withSome(filledMaybe, (v) => v + "bar")).toEqual("foobar");
    expect(withSome(emptyMaybe, (v) => v + "bar")).toEqual(null);
});

test("formal maybe from", () => {
    const v = FormalMaybe.from(filledMaybe);
    expect(v).toBeInstanceOf(FormalMaybe);
    expect(v.inner()).toEqual(filledMaybe);
});

test("formal maybe some", () => {
    const v = FormalMaybe.Some("foo");
    expect(v).toBeInstanceOf(FormalMaybe);
    expect(v.inner()).toEqual("foo");
});

test("formal maybe none", () => {
    const v = FormalMaybe.None();
    expect(v).toBeInstanceOf(FormalMaybe);
    expect(v.inner()).toEqual(null);
});

test("formal maybe is some", () => {
    expect(FormalMaybe.from(filledMaybe).isSome()).toEqual(true);
    expect(FormalMaybe.from(emptyMaybe).isSome()).toEqual(false);
});

test("formal maybe is none", () => {
    expect(FormalMaybe.from(filledMaybe).isNone()).toEqual(false);
    expect(FormalMaybe.from(emptyMaybe).isNone()).toEqual(true);
});

test("formal maybe is some and", () => {
    expect(
        FormalMaybe.from(filledMaybe)
            .isSomeAnd(() => FormalMaybe.Some("bar"))
            .inner(),
    ).toEqual("bar");
    expect(
        FormalMaybe.from(emptyMaybe)
            .isSomeAnd(() => FormalMaybe.Some("bar"))
            .inner(),
    ).toEqual(null);
});

test("formal maybe unwrap", () => {
    expect(FormalMaybe.from(filledMaybe).unwrap()).toEqual("foo");
    expect(() => FormalMaybe.from(emptyMaybe).unwrap()).toThrow("Failed to unwrap!");
});

test("formal maybe or undefined", () => {
    expect(FormalMaybe.from(filledMaybe).unwrapOrUndef()).toEqual("foo");
    expect(FormalMaybe.from(emptyMaybe).unwrapOrUndef()).toStrictEqual(undefined);
});

test("formal maybe unwrap or", () => {
    expect(FormalMaybe.from(filledMaybe).unwrapOr("bar")).toEqual("foo");
    expect(FormalMaybe.from<string>(emptyMaybe).unwrapOr("bar")).toEqual("bar");
});

test("formal maybe expect", () => {
    expect(FormalMaybe.from(filledMaybe).unwrap()).toEqual("foo");
    expect(() => FormalMaybe.from(emptyMaybe).expect("some error")).toThrow("some error");
});

test("formal maybe unwrap or else", () => {
    const filledFn = jest.fn();
    const emptyFn = jest.fn();

    FormalMaybe.from(filledMaybe).unwrapOrElse(filledFn);
    FormalMaybe.from<string>(emptyMaybe).unwrapOrElse(emptyFn);

    expect(filledFn).not.toBeCalled();
    expect(emptyFn).toBeCalledTimes(1);
    expect(FormalMaybe.from<string>(emptyMaybe).unwrapOrElse(() => "bar")).toEqual("bar");
});

test("formal maybe when", () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    FormalMaybe.from(filledMaybe).when("some", fn1).when("none", fn2);

    expect(fn1).toBeCalledTimes(1);
    expect(fn1).toBeCalledWith("foo");
    expect(fn2).not.toBeCalled();

    FormalMaybe.from(emptyMaybe).when("some", fn1).when("none", fn2);

    expect(fn1).toBeCalledTimes(1);
    expect(fn2).toBeCalledTimes(1);
});

describe("take()", () => {
    it("should return the inner value and set it to null", () => {
        const value = "example";
        const nullableValue = new FormalMaybe(value);

        const takenValue = nullableValue.take();

        expect(takenValue).toEqual(value);
        expect(nullableValue.inner()).toBeNull();
    });

    it("should return null if the inner value is already null", () => {
        const nullableValue = FormalMaybe.None();

        const takenValue = nullableValue.take();

        expect(takenValue).toBeNull();
        expect(nullableValue.inner()).toBeNull();
    });
});

describe("maybe()", () => {
    it("should allow chaining methods and return the wrapped value", () => {
        const wrappedValue = maybe(42);
        const result = wrappedValue.let((it) => it * 2).take();

        expect(result).toBe(84);
    });

    it("should handle null or undefined values correctly", () => {
        expect(maybe(null as string | null)?.let((it) => it.length)).toEqual(undefined);
    });

    it('should handle "takeUnless" method correctly', () => {
        expect(maybe([1, 2, 3] as number[] | null)?.takeUnless((it) => it.length == 0)).toEqual([1, 2, 3]);
        expect(maybe([] as number[] | null)?.takeUnless((it) => it.length == 0)).toEqual(null);
    });

    it('should handle "takeIf" method correctly', () => {
        expect(maybe([1, 2, 3] as number[] | null)?.takeIf((it) => it.length > 0)).toEqual([1, 2, 3]);
        expect(maybe([] as number[] | null)?.takeIf((it) => it.length > 0)).toEqual(null);
    });

    it('should handle "if" method correctly', () => {
        expect(
            maybe([1, 2, 3] as number[] | null)
                ?.if((it) => it.length > 0)
                ?.take(),
        ).toEqual([1, 2, 3]);
        expect(
            maybe([1, 2, 3] as number[] | null)
                ?.if((it) => it.length == 0)
                ?.take(),
        ).toEqual(undefined);
    });

    it('should handle "unless" method correctly', () => {
        expect(
            maybe([1, 2, 3] as number[] | null)
                ?.unless((it) => it.length == 0)
                ?.take(),
        ).toEqual([1, 2, 3]);
        expect(maybe([] as number[] | null)?.unless((it) => it.length == 0)).toEqual(maybe(null));
    });

    it("should properly eject the wrapped value", () => {
        const thing = "foo" as Maybe<string>;
        const thing2 = null as Maybe<string>;

        expect(maybe(thing)?.take()).toEqual("foo");
        expect(maybe(thing2)?.take()).toEqual(undefined);
    });

    it("should properly call the mapping and eject the wrapped value", () => {
        const thing = "foo" as Maybe<string>;
        const thing2 = null as Maybe<string>;

        expect(maybe(thing)?.take((it) => it.length)).toEqual(3);
        expect(maybe(thing2)?.take((it) => it.length)).toEqual(undefined);
    });

    it('should handle "also" method correctly', () => {
        const thing = "foo" as Maybe<string>;
        const thing2 = null as Maybe<string>;

        const fn = jest.fn();

        expect(
            maybe(thing)
                ?.also((it) => {
                    fn(it);
                    return "bar";
                })
                .take(),
        ).toEqual("foo");

        expect(
            maybe(thing2)
                ?.also((it) => {
                    fn(it);
                    return "bar";
                })
                .take(),
        ).toEqual(undefined);

        expect(fn).toBeCalledTimes(1);
    });
});
