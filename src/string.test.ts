import { keyFrom, strAdd } from "./string";

test("Result.strAdd", () => {
    const res = strAdd(["1", "2", "3", "4", "5"]);

    expect(res).toStrictEqual("15");
});

test("Result.strAdd empty string", () => {
    const res = strAdd([""], {
        treatEmptyStringAsZero: true,
    });

    expect(res).toStrictEqual("0");
});

test("Result.strAdd null if not numbers", () => {
    const res = strAdd(["one"]);

    expect(res).toBeNull();
});

test("Result.keyFrom", () => {
    const res = keyFrom("one", 1, "two", 2);

    expect(res).toStrictEqual("one-1-two-2");
});
