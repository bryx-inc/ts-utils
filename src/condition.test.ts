import { iff } from "./condition";

test("iff", () => {
    expect(iff(2 + 2 == 5, "foo")).toBeUndefined();
    expect(iff(true, "foo")).toEqual("foo");
});
