import React from "react";
import { iff, expect as condExpect, orFragment, orThrow, cond } from "./condition";

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

test("or throw", () => {
    expect(() => orThrow(undefined, "value is undefined")).toThrow("value is undefined");
    expect(() => orThrow(null, "value is undefined")).toThrow("value is undefined");
    expect(() => orThrow(undefined)).toThrow("orThrow found a nullish value!");
    expect(() => orThrow(null)).toThrow("orThrow found a nullish value!");

    expect(orThrow("10", "value is undefined")).toEqual("10");
});

test("cond", () => {
    expect(cond([1 + 1 == 2, "apple"], [1 + 1 == 2, "banana"])).toEqual("apple");
    expect(cond([1 + 1 == 1, "apple"], [1 + 1 == 2, "banana"])).toEqual("banana");

    expect(() => cond([1 + 1 == 1, "never"])).toThrow("Failed to match any condition in `cond`");
});
