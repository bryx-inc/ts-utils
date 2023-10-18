import {
    flatMapIntoDeepKey,
    deepKeyOf,
    getDeepValue,
    getObjByDeepKey,
    slicePropertyAtDeepKey,
} from "./index";

import { Maybe, mapKeys, quickDeepClone, unsafe } from "ts-utils";

test("getDeepObjKeys()", () => {
    const joe = {
        firstName: "Joe",
        lastName: "Smith",
        address: {
            city: "Somewhereville",
            state: "NY",
        },
        hobbies: [
            {
                name: "Golfing",
                equipment: ["Clubs", "Membership", "Golf Balls"],
            },
            {
                name: "Painting",
                equipment: ["Paint Brush"],
            },
        ],
        emptyKey: {},
    };

    const keys = deepKeyOf(joe);
    expect(keys).toEqual([
        "firstName",
        "lastName",
        "address",
        "address.city",
        "address.state",
        "hobbies",
        "hobbies.name",
        "hobbies.equipment",
        "emptyKey",
    ]);

    expect(() => deepKeyOf({ parent: [{ a: "a" }, { b: "b" }] })).toThrow(
        "Tried to call getDeepObjKeys with an array subobject that does not have a well-defined structure: a != b",
    );
});

test("quick deep clone", () => {
    const gizmo = { name: "gizmo", extraInfo: { tags: ["tag1", "tag2"] } };

    const clone = quickDeepClone(gizmo);
    expect(clone).toEqual(gizmo);
    expect(clone).not.toBe(gizmo);
    expect(clone.extraInfo).not.toBe(gizmo.extraInfo);
    expect(clone.extraInfo.tags).not.toBe(gizmo.extraInfo.tags);
});

test("slice property at deep key", () => {
    const obj = {
        firstname: "john",
        lastname: "doe",
        orders: [
            {
                day: "monday",
                items: [
                    {
                        name: "gizmo",
                        price: 5,
                    },
                    {
                        name: "thigy",
                        price: 2,
                    },
                ],
            },
            {
                day: "wednesday",
                items: [
                    {
                        name: "guitar",
                        price: 20,
                    },
                ],
            },
        ],
    };

    expect(slicePropertyAtDeepKey({ v: "foo" }, "v", "bar")).toEqual({ v: "bar" });

    type Thing = { a: { b?: { c: string } } };
    expect(slicePropertyAtDeepKey({ a: {} } as Thing, "a.b.c", "foo")).toEqual({ a: {} });

    expect(slicePropertyAtDeepKey({ arr: ["one", "two", "three"] }, "arr", ["four", "five"])).toEqual({ arr: ["four", "five"] });
    expect(
        slicePropertyAtDeepKey(
            {
                people: [
                    { name: "joe", age: 12 },
                    { name: "jane", age: 15 },
                ],
            },
            "people.name",
            ["foo", "bar"],
        ),
    ).toEqual({
        people: [
            { name: "foo", age: 12 },
            { name: "bar", age: 15 },
        ],
    });

    expect(slicePropertyAtDeepKey(obj, "orders.items.name", [["one", "two"], ["three"]])).toEqual({
        firstname: "john",
        lastname: "doe",
        orders: [
            {
                day: "monday",
                items: [
                    {
                        name: "one",
                        price: 5,
                    },
                    {
                        name: "two",
                        price: 2,
                    },
                ],
            },
            {
                day: "wednesday",
                items: [
                    {
                        name: "three",
                        price: 20,
                    },
                ],
            },
        ],
    });
});

test("get property unsafe", () => {
    const obj = {
        name: "John Smith",
    };

    const { name, age } = unsafe(({ getProperty }) => {
        return {
            name: getProperty(obj, "name"),
            age: getProperty(obj, "age")
        }
    });

    expect(name).toEqual("John Smith");
    expect(age).toStrictEqual(null);
});

test("cast unsafe", () => {
    const people = [
        { first: "john", last: "smith", state: "NY" },
        { first: "sam", last: "johnson", state: "NY" },
        { first: "john", last: "appleseed", state: "CO" },
    ];

    unsafe(({ cast }) => {
        expect(cast(people)).toBe(people);
    })
});

test("map keys", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = mapKeys(obj, (key) => key.toUpperCase());
    expect(result).toEqual(["A", "B", "C"]);
});

test("get deep value", () => {
    const obj = {
        firstname: "john",
        subobj1: {
            subobj2: {
                deepValue: 5,
            },
        },
        orders: [
            {
                day: "monday",
                items: [
                    {
                        name: "gizmo",
                        price: 5,
                    },
                    {
                        name: "thing",
                        price: 2,
                    },
                ],
            },
            {
                day: "wednesday",
                items: [
                    {
                        name: "guitar",
                        price: 20,
                    },
                ],
            },
        ],
    };

    type DeepObjectWithUndef = { a: { b?: { c: string } } };
    const deepObjWithUndef: DeepObjectWithUndef = { a: {} };
    expect(getDeepValue(deepObjWithUndef, "a.b.c")).toBeUndefined();
    expect(getDeepValue(obj, "firstname")).toEqual("john");
    expect(getDeepValue(obj, "subobj1.subobj2.deepValue")).toEqual(5);
    expect(getDeepValue(obj, "orders.day")).toEqual(["monday", "wednesday"]);
    expect(getDeepValue(obj, "orders.items.name")).toEqual([["gizmo", "thing"], ["guitar"]]);
});

test("getObjByDeepKey()", () => {
    const obj = {
        name: {
            first: "joe",
            last: "bean",
        },
        attrs: {
            age: 20,
            hobbies: [
                {
                    name: "coffee",
                    startDate: "today",
                },
                {
                    name: "other stuff",
                    startDate: "yesterday:",
                },
            ],
        },
    };

    expect(getObjByDeepKey(obj, "name.first")).toEqual({ name: { first: "joe" } });
    expect(getObjByDeepKey(obj, "name")).toEqual({ name: { first: "joe", last: "bean" } });
    expect(getObjByDeepKey(obj, "attrs.hobbies.name")).toEqual({ attrs: { hobbies: [{ name: "coffee" }, { name: "other stuff" }] } });
});

describe("flatMapIntoDeepKey()", () => {
    it("maps an array of objects into an associated array of the specified property", () => {
        const people = [
            { first: "joe", last: "smith" },
            { first: "jane", last: "doe" },
        ];

        const result = flatMapIntoDeepKey(people, "first");
        expect(result).toEqual(["joe", "jane"]);
    });

    it("maps an array of objects into an associated array of a deep property", () => {
        const gizmos = [
            {
                name: "gizmo1",
                parts: [
                    { partName: "spring", cost: 15 },
                    { partName: "sprocket", cost: 12 },
                ],
            },
            {
                name: "gizmo2",
                parts: [
                    { partName: "steel plate", cost: 20 },
                    { partName: "plastic cap", cost: 5 },
                ],
            },
        ];
        const result = flatMapIntoDeepKey(gizmos, "parts.partName");
        expect(result).toEqual(["spring", "sprocket", "steel plate", "plastic cap"]);
    });
});