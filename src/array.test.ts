import {
    arrayIsEmpty,
    arrFromFactory,
    bailableMap,
    chunkArr,
    clearArr,
    cloneArr,
    dedupArr,
    dropIdx,
    findFirstAndReplace,
    flatMapIntoDeepKey,
    interleave,
    isIndexOf,
    lastElem,
    moveToIdx,
    objectifyArr,
    permutationsOf,
    repeat,
    replaceAt,
    selectKeys,
    sliceAround,
    swapAt,
    toPathedArr,
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

test("drop index", () => {
    const fruits = ["apple", "banana", "orange"];
    expect(dropIdx(fruits, 1)).toEqual(["apple", "orange"]);
    expect(dropIdx(fruits, -1)).toEqual(fruits);
});

test("to pathed arr", () => {
    const arr = [
        {
            name: "joe",
            age: 38,
            children: [
                { name: "alice", age: 15, children: [] },
                { name: "robert", age: 18, children: [] },
                { name: "travis", age: 3, children: [] },
            ],
        },
        {
            name: "gus",
            age: 72,
            children: [
                { name: "laura", age: 37, children: [{ name: "alek", age: 13, children: [] }] },
                { name: "ian", age: 55, children: [{ name: "lucy", age: 25, children: [{ name: "lonnie", age: 2, children: [] }] }] },
            ],
        },
    ];

    expect(toPathedArr(arr, { childKey: "children", pathDelim: "/", pathKey: "name" })).toEqual([
        { name: "joe", age: 38 },
        { name: "joe/alice", age: 15 },
        { name: "joe/robert", age: 18 },
        { name: "joe/travis", age: 3 },
        { name: "gus", age: 72 },
        { name: "gus/laura", age: 37 },
        { name: "gus/laura/alek", age: 13 },
        { name: "gus/ian", age: 55 },
        { name: "gus/ian/lucy", age: 25 },
        { name: "gus/ian/lucy/lonnie", age: 2 },
    ]);
});

test("repeat", () => {
    const fn = jest.fn();

    repeat(0, 5, (_) => fn());
    expect(fn).toBeCalledTimes(5);
});

test("permutations of", () => {
    expect(permutationsOf([2, 3, 2])).toEqual([
        [0, 0, 0],
        [0, 0, 1],
        [0, 1, 0],
        [0, 1, 1],
        [0, 2, 0],
        [0, 2, 1],
        [1, 0, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 1, 1],
        [1, 2, 0],
        [1, 2, 1],
    ]);
});

test("clear arr", () => {
    const arr1 = [1, 2, 3];
    clearArr(arr1);
    expect(arr1).toEqual([]);

    const arr2: number[] = [];
    clearArr(arr2);
    expect(arr2).toEqual([]);

    const arr3 = [{ a: 1 }, { b: 2 }];
    clearArr(arr3);
    expect(arr3).toEqual([]);
});

test("chunk arr", () => {
    expect(chunkArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
    expect(chunkArr([1, 2], 3)).toEqual([[1, 2]]);
    expect(chunkArr([], 3)).toEqual([]);
    expect(chunkArr([{ a: 1 }, { b: 2 }, { c: 3 }], 2)).toEqual([[{ a: 1 }, { b: 2 }], [{ c: 3 }]]);
});

describe("dedup arr", () => {
    it("removes duplicate elements from the array", () => {
        const arr = [1, 1, 1, 2, 1, 3, 4, 4, 2, 1, 2];
        const deduped = dedupArr(arr);
        expect(deduped).toEqual([1, 2, 3, 4]);
    });

    it("returns an empty array for an empty input array", () => {
        const emptyArr: number[] = [];
        const deduped = dedupArr(emptyArr);
        expect(deduped).toEqual([]);
    });

    it("preserves the order of elements", () => {
        const arr = [3, 1, 2, 2, 1, 4, 4, 3];
        const deduped = dedupArr(arr);
        expect(deduped).toEqual([3, 1, 2, 4]);
    });
});

describe("flat map into deep key", () => {
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
