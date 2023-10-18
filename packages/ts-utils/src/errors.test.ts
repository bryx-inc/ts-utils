import { throwError } from "./errors";

test("throw error", () => {
    const expr = () => {
        const _: string = throwError("some message"); // this function should have return type of "string"
        throw "this should not be reached";
    };

    expect(expr).toThrow("some message");
    expect(expr).not.toThrow("this should not be reached");

    const objErr = new Error("some error object");

    expect(() => throwError(objErr)).toThrow(objErr);
});
