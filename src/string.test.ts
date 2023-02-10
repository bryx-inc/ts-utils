import { escapeRegex, keyFrom, strAdd, initialism } from "./string";

test("Result.strAdd", () => {
    const res = strAdd(["1", "2", "3", "4", "5"]);

    expect(res).toStrictEqual("15");
});

test("Result.strAdd empty string", () => {
    const res = strAdd([""], {
        treatEmptyStringAsZero: true,
    });

    expect(res).toStrictEqual("0");
    expect(strAdd([""])).toEqual(null);
});

test("Result.strAdd null if not numbers", () => {
    const res = strAdd(["one"]);

    expect(res).toBeNull();
});

test("Result.keyFrom", () => {
    const res = keyFrom("one", 1, "two", 2);

    expect(res).toStrictEqual("one-1-two-2");
});

test("escape regex", () => {
    expect(new RegExp("$50").test("$50")).toEqual(false);
    expect(new RegExp(escapeRegex("$50")).test("$50")).toEqual(true);
});

test("initialism", () => {
    expect(initialism("adam blue")).toStrictEqual("AB");
    expect(initialism("joe_schmoe", "_")).toStrictEqual("JS");
    expect(initialism("balsam bagels", " ", false)).toStrictEqual("bb");
    expect(initialism("bryx-inc", "-", false)).toStrictEqual("bi");
});
