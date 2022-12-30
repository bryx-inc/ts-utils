import React from "react";
import { iff, expect as condExpect, orFragment } from "./condition";

test("iff", () => {
    expect(iff(2 + 2 == 5, "foo")).toBeUndefined();
    expect(iff(true, "foo")).toEqual("foo");
});

test("expect", () => {
    expect(condExpect(true, "foo")).toEqual("foo");
    expect(() => condExpect(false, "foo", "an error occured")).toThrow("an error occured");
    expect(() => condExpect(false, "foo")).toThrow("'expect' method found false assertation!");
});

test("or fragment", () => {
    React.createElement(React.Fragment);
    expect(orFragment(false, React.createElement("div")).type).toEqual(React.Fragment);
    expect(orFragment(true, React.createElement("div")).type).toEqual("div");
});
