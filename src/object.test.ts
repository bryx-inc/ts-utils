import { Maybe } from "./maybe";
import {
    castUnsafe,
    derecordify,
    dropKeys,
    dropNullValues,
    getObjKeys,
    getPropertyUnsafe,
    objectIsEmpty,
    recordify,
    selectObjectKeys,
    mapKeys,
    pickKeys,
    getDeepObjKeys,
    slicePropertyAtDeepKey,
    quickDeepClone,
    getDeepValue,
    getObjEntries,
} from "./object";
import { DeepKeyOf, DeepValue } from "./types";

function assertNoSideEffects<T extends object, E extends object>(o1: T, o2: E) {
    expect(o1).not.toEqual(o2);
    expect(o1).not.toBe(o2);
}

test("drop null values", () => {
    const obj = {
        k1: "something",
        k2: "nifty",
        k3: null,
    };

    const newObj = dropNullValues(obj);

    expect(Object.keys(newObj)).toEqual(["k1", "k2"]);
    assertNoSideEffects(obj, newObj);
});

test("drop keys", () => {
    const obj = {
        first: "John",
        last: "Smith",
        age: 23,
        state: "NY",
    };

    const newObj = dropKeys(obj, ["age", "state"]);
    expect(newObj).toEqual({
        first: "John",
        last: "Smith",
    });
    assertNoSideEffects(obj, newObj);
});

test("pick keys", () => {
    const person = {
        first: "John",
        last: "Smith",
        age: 23,
        state: "NY",
    };

    const newObj = pickKeys(person, ["first", "last"]);
    expect(newObj).toEqual({ first: "John", last: "Smith" });
});

test("select keys", () => {
    const obj = {
        first: "John",
        last: "Smith",
        age: 23,
        state: "NY",
    };

    const newObj = selectObjectKeys(obj, ["first", "last"]);

    expect(newObj).toEqual({
        first: "John",
        last: "Smith",
    });
    assertNoSideEffects(obj, newObj);
});

test("object is empty", () => {
    expect(objectIsEmpty(new Object())).toEqual(true);
    expect(objectIsEmpty({ foo: "bar" })).toEqual(false);
});

test("derecordify", () => {
    const ages = {
        bill: 38,
        john: 21,
        adam: 25,
    };

    const obj = derecordify(ages, { k: "name", v: "age" });
    expect(obj).toEqual([
        {
            name: "bill",
            age: 38,
        },
        {
            name: "john",
            age: 21,
        },
        {
            name: "adam",
            age: 25,
        },
    ]);

    assertNoSideEffects(ages, obj);
});

test("derecordify spread", () => {
    const people = {
        bill: {
            age: 38,
            hobbies: ["cooking"],
        },
        john: {
            age: 21,
            hobbies: ["gardening", "fishing"],
        },
        adam: {
            age: 25,
            hobbies: ["hiking"],
        },
    };

    const obj = derecordify(people, { k: "name", v: "..." });

    expect(obj).toEqual([
        {
            name: "bill",
            age: 38,
            hobbies: ["cooking"],
        },
        {
            name: "john",
            age: 21,
            hobbies: ["gardening", "fishing"],
        },
        {
            name: "adam",
            age: 25,
            hobbies: ["hiking"],
        },
    ]);

    assertNoSideEffects(people, obj);
});

test("recordify", () => {
    const people = [
        { first: "john", last: "smith", state: "NY" },
        { first: "sam", last: "johnson", state: "NY" },
        { first: "john", last: "appleseed", state: "CO" },
    ];

    const peopleByState = recordify(people, "state");

    expect(peopleByState).toEqual({
        NY: [
            { first: "john", last: "smith", state: "NY" },
            { first: "sam", last: "johnson", state: "NY" },
        ],
        CO: [{ first: "john", last: "appleseed", state: "CO" }],
    });

    assertNoSideEffects(people, peopleByState);
});

test("get obj keys", () => {
    const obj = {
        first: "John",
        last: "Smith",
        age: 23,
        state: "NY",
    };

    const keys = getObjKeys(obj);

    expect(keys).toEqual(["first", "last", "age", "state"]);
    assertNoSideEffects(obj, keys);
});

test("get obj entries", () => {
    const obj = {
        first: "John",
        last: "Smith",
        age: 23,
        state: "NY",
    };

    const entries = getObjEntries(obj);

    expect(entries).toEqual(Object.entries(obj));
    assertNoSideEffects(obj, entries);
});

test("get deep obj keys", () => {
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

    const keys = getDeepObjKeys(joe);
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

    expect(() => getDeepObjKeys({ parent: [{ a: "a" }, { b: "b" }] })).toThrow(
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

    const name: Maybe<string> = getPropertyUnsafe(obj, "name");
    const age: Maybe<number> = getPropertyUnsafe(obj, "age");

    expect(name).toEqual("John Smith");
    expect(age).toStrictEqual(null);
});

test("cast unsafe", () => {
    const people = [
        { first: "john", last: "smith", state: "NY" },
        { first: "sam", last: "johnson", state: "NY" },
        { first: "john", last: "appleseed", state: "CO" },
    ];

    expect(castUnsafe(people)).toBe(people);
});

test("map keys", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = mapKeys(obj, (key) => key.toUpperCase());
    expect(result).toEqual(["A", "B", "C"]);
});

test("get deep object", () => {
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
