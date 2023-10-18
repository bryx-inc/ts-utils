import { unsafe } from "./unsafe";

test("unsafe - cast", () => {
    const result = unsafe(({ cast }) => {
        // Perform unsafe operations using `utils` object
        const value: unknown = cast(42);
        return String(value);
    });

    expect(result).toBe("42");
});

test("unsafe - getProperty", () => {
    const obj = { foo: "bar" } as object;

    expect(
        unsafe(({ getProperty }) => {
            return getProperty(obj, "foo");
        }),
    ).toEqual("bar");

    expect(
        unsafe(({ getProperty }) => {
            return getProperty(obj, "invalid-key");
        }),
    ).toEqual(null);
});
