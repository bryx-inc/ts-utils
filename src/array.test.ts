import { arrayIsEmpty, cloneArr, findFirstAndReplace, interleave, isIndexOf, lastElem, replaceAt, selectKeys, sliceAround, swapAt } from "./array";

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

test('find first and replace', () => {
    const arr = [1, 2, null, 3, null, 4];
    const newArr = findFirstAndReplace(arr, 9, v => v == null);

    expect(newArr).toEqual([1, 2, 9, 3, null, 4]);
    assertNoSideEffects(arr, newArr);
});

test('interleave', () => {
    const arr = ['apple', 'banana', 'orange'];
    const newArr = interleave(arr, '|');
    
    expect(newArr).toEqual(['apple', '|', 'banana', '|', 'orange']);
    assertNoSideEffects(arr, newArr);
});

test('is index of', () => {
    const arr = new Array(50);

    expect(isIndexOf(arr, 50)).toEqual(false);
    expect(isIndexOf(arr, -1)).toEqual(false);
    expect(isIndexOf(arr, 25)).toBe(true);
});

test('slice around', () => {
    const arr = ['one', 'two', 'three'];
    const newArr = sliceAround(arr, 2, 'foo');

    expect(newArr).toEqual(['one', 'two', 'foo', 'three']);
    assertNoSideEffects(arr, newArr);
});

test('replace at', () => {
    const arr = [1, 2, 3];
    const newArr = replaceAt(arr, 1, 9);

    expect(newArr).toEqual([1, 9, 3]);
    assertNoSideEffects(arr, newArr);
});

test('clone arr', () => {
    const arr = [1, 2, 3, 4];
    const newArr = cloneArr(arr);

    expect(arr).toEqual(newArr);
    expect(arr).not.toBe(newArr);
});