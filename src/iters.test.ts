import { rangeIter } from "./iters";

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
