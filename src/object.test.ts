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
} from "./object";

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
