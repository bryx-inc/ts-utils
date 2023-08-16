import { iter, ChainableIterator, rangeIter } from "./iters";
import { Maybe } from "./maybe";

function elementIsEven(val: number) {
    return val % 2 == 0;
}

function maybeDivideByTwo(val: number): Maybe<number> {
    return val % 2 == 0 ? val / 2 : null;
}

describe("rangeIter", () => {
    it("should generate a range from lower to upper", () => {
        const result = [...rangeIter(1, 5)];
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should generate a single number if lower and upper are the same", () => {
        const result = [...rangeIter(10, 10)];
        expect(result).toEqual([10]);
    });

    it("should handle negative numbers correctly", () => {
        const result = [...rangeIter(-5, -1)];
        expect(result).toEqual([-5, -4, -3, -2, -1]);
    });

    it("should handle a large range", () => {
        const result = [...rangeIter(0, 1000)];
        expect(result.length).toBe(1001);
        expect(result[0]).toBe(0);
        expect(result[1000]).toBe(1000);
    });
});

describe("Chainable Iterator", () => {
    it("should properly construct itself", () => {
        function* func() {
            for (const i of rangeIter(0, 9)) yield i;
        }

        expect(iter(func).collect()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(iter(func()).collect()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(iter([1, 2, 3, 4, 5][Symbol.iterator]()).collect()).toEqual([1, 2, 3, 4, 5]);
        expect(iter([1, 2, 3, 4, 5]).collect()).toEqual([1, 2, 3, 4, 5]);

        const fn = jest.fn();
        iter([1, 2, 3, 4, 5]).forEach(fn);

        expect(fn).toBeCalledWith(1);
        expect(fn).toBeCalledWith(2);
        expect(fn).toBeCalledWith(3);
        expect(fn).toBeCalledWith(4);
        expect(fn).toBeCalledWith(5);

        expect(fn).toBeCalledTimes(5);
    });

    it("only calls each member of the iterator once", () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const fn3 = jest.fn();
        const fn4 = jest.fn();

        iter(function* () {
            fn1();
            yield 1;

            fn2();
            yield 2;

            fn3();
            yield 3;

            fn4();
            yield 4;
        })
            .map((val) => val * 2)
            .take(4)
            .take(3)
            .take(2)
            .filter((_) => true)
            .collect();

        expect(fn1).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(1);
        expect(fn3).not.toBeCalled();
        expect(fn4).not.toBeCalled();
    });

    it("should properly apply the 'map' function", () => {
        expect([...rangeIter(0, 5).map((val) => (val % 2 == 0 ? "even" : "odd"))]).toEqual(["even", "odd", "even", "odd", "even", "odd"]);
    });

    it("should properly apply the 'collect' function", () => {
        const iter = rangeIter(0, 5);
        expect(iter.collect()).toEqual([0, 1, 2, 3, 4, 5]);
        expect(iter.collect()).toEqual([]); // iter is now consumed
    });

    it("should properly apply the 'reduce' function", () => {
        expect(
            rangeIter(0, 9)
                .map((val) => val.toString())
                .reduce((acc, cur) => acc + cur),
        ).toEqual("0123456789");

        expect(() => {
            ChainableIterator.fromGeneratorFn(function* () {}).reduce((acc, _) => acc);
        }).toThrowError("Cannot reduce an empty iterator");
    });

    it("should properly apply the 'filter' function", () => {
        expect(
            rangeIter(0, 10)
                .filter((val) => val % 2 == 0)
                .collect(),
        ).toEqual([0, 2, 4, 6, 8, 10]);
    });

    it("should properly apply the 'take' function", () => {
        expect(rangeIter(0, 10).take(5).collect()).toEqual([0, 1, 2, 3, 4]);
        expect(rangeIter(0, 4).take(10).collect()).toEqual([0, 1, 2, 3, 4]);
    });

    it("should properly handle Generator['return']", () => {
        expect(
            ChainableIterator.fromGeneratorFn(function* () {
                return;
            }).return().value,
        ).toEqual(void 0);
    });

    it("should properly handle Generator['throw']", () => {
        const fn = jest.fn();
        const iter = ChainableIterator.fromGeneratorFn(function* () {
            while (true) {
                try {
                    yield 0;
                } catch (ex) {
                    fn(ex);
                }
            }
        });

        iter.next();
        iter.throw("error");

        expect(fn).toBeCalledWith("error");
    });

    it("should properly apply the 'count' function", () => {
        expect(rangeIter(1, 5).count()).toEqual(5);
    });

    it("should properly apply the 'last' function", () => {
        expect(rangeIter(0, 5).last()).toEqual(5);
    });

    it("should properly apply the 'nth' function", () => {
        expect(rangeIter(0, 10).nth(4)).toEqual(4);
        expect(rangeIter(0, 0).nth(10)).toEqual(null);
    });

    it("should properly apply the 'chain' function", () => {
        expect(rangeIter(1, 3).chain(rangeIter(4, 6)).collect()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should properly apply the 'zip' function", () => {
        const iter1 = rangeIter(1, 3);
        const iter2 = rangeIter(4, 99);

        expect(iter1.zip(iter2).collect()).toEqual([
            [1, 4],
            [2, 5],
            [3, 6],
        ]);

        expect(iter([1, 2, 3]).zip(iter([])).count()).toEqual(0);
    });

    it("should properly apply the 'filterMap' function", () => {
        expect(rangeIter(0, 10).filterMap(maybeDivideByTwo).collect()).toEqual([0, 1, 2, 3, 4, 5]);
    });

    it("should properly apply the 'enumerate' function", () => {
        expect(
            rangeIter(1, 5)
                .map((n) => n * 10)
                .enumerate()
                .collect(),
        ).toEqual([
            [0, 10],
            [1, 20],
            [2, 30],
            [3, 40],
            [4, 50],
        ]);
    });

    it("should properly apply the 'takeWhile' function", () => {
        const _makeInfIter = (start: number): ChainableIterator<number> => {
            return iter(function* () {
                yield start;
                yield* _makeInfIter(start + 1);
            });
        };

        expect(
            iter(_makeInfIter(10))
                .takeWhile((val) => val <= 15)
                .collect(),
        ).toEqual([10, 11, 12, 13, 14, 15]);
    });

    it("should properly apply the 'skipWhile' function", () => {
        function isEven(val: number): boolean {
            return val % 2 == 0;
        }

        expect(iter([4, 2, 3, 2, 4]).skipWhile(isEven).collect()).toEqual([3, 2, 4]);
        expect(
            iter([1, 2, 3])
                .skipWhile((_) => false)
                .collect(),
        ).toEqual([1, 2, 3]);
    });

    it("should properly apply the 'mapWhile' function", () => {
        expect(iter([2, 4, 6, 7, 8]).mapWhile(maybeDivideByTwo).collect()).toEqual([1, 2, 3]);
    });

    it("should properly apply the 'skip' function", () => {
        // test in-place iterator consumption
        const iter = rangeIter(1, 5);
        iter.skip(1);
        iter.skip(2);
        expect(iter.collect()).toEqual([4, 5]);

        // test chaining
        expect(rangeIter(1, 5).skip(4).collect()).toEqual([5]);
    });

    it("should properly apply the 'scan' function", () => {
        expect(
            rangeIter(0, 5)
                .scan("", (prev, cur) => prev + cur)
                .collect(),
        ).toEqual(["0", "01", "012", "0123", "01234", "012345"]);
    });

    it("should properly apply the 'flatMap' function", () => {
        expect(
            rangeIter(1, 3)
                .flatMap((_) => ["a", "b"])
                .reduce((prev, cur) => prev + cur),
        ).toEqual("ababab");
    });

    it("should properly apply the 'flatten' function", () => {
        expect(
            iter([[1], 2, [3], [4, 5]])
                .flatten()
                .collect(),
        ).toEqual([1, 2, 3, 4, 5]);
    });

    it("should properly apply the 'fold' function", () => {
        expect(iter([[1], [2], [3], [4], [5]]).fold("## ", (acc, arr) => acc + arr[0])).toEqual("## 12345");
    });

    it("should properly apply the 'inspect' function", () => {
        const fn = jest.fn();

        expect(rangeIter(1, 3).inspect(fn).inspect(fn).collect()).toEqual([1, 2, 3]);
        expect(fn).toBeCalled();
    });

    it("should properly apply the 'partition' function", () => {
        const [evenIter, oddIter] = rangeIter(1, 5).partition(elementIsEven);

        expect(evenIter.collect()).toEqual([2, 4]);
        expect(oddIter.collect()).toEqual([1, 3, 5]);
    });

    it("should properly apply the 'every' function", () => {
        expect(rangeIter(0, 10).every(elementIsEven)).toEqual(false);
        expect(rangeIter(0, 10).filter(elementIsEven).every(elementIsEven)).toEqual(true);
    });

    it("should properly apply the 'dedup' function", () => {
        let it = iter(['one', 'two', 'two'] as const);
        let it2 = it.dedup();
           
        expect(rangeIter(0, 10).chain(rangeIter(0, 10)).dedup().collect()).toEqual(rangeIter(0, 10).collect());
    });
});
