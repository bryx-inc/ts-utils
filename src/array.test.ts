import {
    arrayIsEmpty,
    arrFromFactory,
    bailableMap,
    cloneArr,
    findFirstAndReplace,
    interleave,
    isIndexOf,
    lastElem,
    moveToIdx,
    objectifyArr,
    replaceAt,
    selectKeys,
    sliceAround,
    swapAt,
    tryToFold,
} from "./array";

function assertNoSideEffects(baseArr: unknown[], newArr: unknown[]) {
    expect(baseArr).not.toEqual(newArr);
    expect(baseArr).not.toBe(newArr);
}

test("select keys", () => {
    const arr = [
        {
            first: "jonny",
            last: "appleseed",
            age: 20,
        },
        {
            first: "jane",
            last: "doe",
            age: 31,
        },
    ];

    const filtered = selectKeys(arr, "first", "age");

    // test functionality
    expect(filtered).toEqual([
        { first: "jonny", age: 20 },
        { first: "jane", age: 31 },
    ]);

    // assert no side effects
    expect(arr).toEqual([
        {
            first: "jonny",
            last: "appleseed",
            age: 20,
        },
        {
            first: "jane",
            last: "doe",
            age: 31,
        },
    ]);
});

test("move to idx", () => {
    const arr = ["apple", "banana", "orange", "pear", "kiwi"];
    const newArr = moveToIdx(arr, 1, 3);

    expect(newArr).toEqual(["apple", "orange", "pear", "banana", "kiwi"]);
    assertNoSideEffects(arr, newArr);
});

test("array is empty", () => {
    expect(arrayIsEmpty([])).toBe(true);
    expect(arrayIsEmpty(["something"])).toBe(false);
    expect(arrayIsEmpty([[]])).toBe(false);
});

test("swap at", () => {
    const arr = [1, 2, 3, 4];
    const swp = swapAt(arr, 1, 2);

    expect(swp).toEqual([1, 3, 2, 4]);

    assertNoSideEffects(arr, swp);
});

test("last elem", () => {
    expect(lastElem([])).toEqual(null);
    expect(lastElem([1, 2, 3])).toEqual(3);
});

test("find first and replace", () => {
    const arr1 = [1, 2, null, 3, null, 4];
    const arr2 = findFirstAndReplace(arr1, 9, (v) => v == null);
    const arr3 = findFirstAndReplace(arr1, 9, (v) => v == -1);

    expect(arr1).toEqual(arr3);
    expect(arr2).toEqual([1, 2, 9, 3, null, 4]);

    assertNoSideEffects(arr1, arr2);
});

test("interleave", () => {
    const arr = ["apple", "banana", "orange"];
    const newArr = interleave(arr, "|");

    expect(newArr).toEqual(["apple", "|", "banana", "|", "orange"]);
    assertNoSideEffects(arr, newArr);
});

test("is index of", () => {
    const arr = new Array(50);

    expect(isIndexOf(arr, 50)).toEqual(false);
    expect(isIndexOf(arr, -1)).toEqual(false);
    expect(isIndexOf(arr, 25)).toBe(true);
});

test("slice around", () => {
    const arr = ["one", "two", "three"];
    const newArr = sliceAround(arr, 2, "foo");

    expect(newArr).toEqual(["one", "two", "foo", "three"]);
    assertNoSideEffects(arr, newArr);
});

test("replace at", () => {
    const arr = [1, 2, 3];
    const newArr = replaceAt(arr, 1, 9);

    expect(newArr).toEqual([1, 9, 3]);
    assertNoSideEffects(arr, newArr);
});

test("clone arr", () => {
    const arr = [1, 2, 3, 4];
    const newArr = cloneArr(arr);

    expect(arr).toEqual(newArr);
    expect(arr).not.toBe(newArr);
});

test("bailable map", () => {
    const arr = ["one", "two", "three", "four", "five"];
    expect(bailableMap(arr, (v) => v.length).ok()).toEqual([3, 3, 5, 4, 4]);
    expect(
        bailableMap(arr, (v, bail) => {
            if (v == "four") return bail(4);
            else return v.length;
        }).err(),
    ).toEqual(4);
});

test("try to fold", () => {
    const arr = ["one", "two", "three", "four", "five"];

    expect(tryToFold(arr, (acc, cur) => acc + cur.length, 0).unwrap()).toEqual(19);
    expect(
        tryToFold(
            arr,
            (acc, cur, bail) => {
                if (cur == "three") return bail(5);
                else return acc + cur.length;
            },
            0,
        ).err(),
    ).toEqual(5);
});

test("arr from factory", () => {
    expect(arrFromFactory(5, (i) => i)).toEqual([0, 1, 2, 3, 4]);
});

test("objectify array", () => {
    const arr = [
        {
            first: "jane",
            last: "doe",
        },
        {
            first: "john",
            last: "smith",
        },
    ];

    expect(objectifyArr(arr)).toEqual({ first: ["jane", "john"], last: ["doe", "smith"] });
});
