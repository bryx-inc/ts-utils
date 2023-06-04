import { calcMs } from "./calcMs";
import { unsafe } from "./unsafe";

describe("calcMs", () => {
    it("should calculate milliseconds from seconds", () => {
        expect(calcMs("1s")).toBe(1000);
        expect(calcMs("30 sec")).toBe(30000);
        expect(calcMs("10 seconds")).toBe(10000);
    });

    it("should calculate milliseconds from minutes", () => {
        expect(calcMs("1m")).toBe(60000);
        expect(calcMs("45 min")).toBe(2700000);
        expect(calcMs("5 minutes")).toBe(300000);
    });

    it("should calculate milliseconds from hours", () => {
        expect(calcMs("1hr")).toBe(3600000);
        expect(calcMs("12 hrs")).toBe(43200000);
        expect(calcMs("3 hours")).toBe(10800000);
    });

    it("should calculate milliseconds from days", () => {
        expect(calcMs("1d")).toBe(86400000);
        expect(calcMs("7 dy")).toBe(604800000);
        expect(calcMs("2 days")).toBe(172800000);
    });

    it("should calculate milliseconds from weeks", () => {
        expect(calcMs("1wk")).toBe(604800000);
        expect(calcMs("3 wks")).toBe(1814400000);
        expect(calcMs("4 weeks")).toBe(2419200000);
    });

    it("should throw an error for invalid input", () => {
        unsafe(({ cast }) => {
            expect(() => calcMs(cast<string, Parameters<typeof calcMs>["0"]>(""))).toThrowError("Failed to parse given time string!");
            expect(() => calcMs(cast<string, Parameters<typeof calcMs>["0"]>("10"))).toThrowError("Failed to parse given time string!");
            expect(() => calcMs(cast<string, Parameters<typeof calcMs>["0"]>("abc"))).toThrowError("Failed to parse given time string!");
            expect(() => calcMs(cast<string, Parameters<typeof calcMs>["0"]>("1 year"))).toThrowError("Failed to parse given time string!");
        });
    });
});
