import { SizedTuple } from "./tuple";

type TypeCheck<Sample, Target> = Sample extends Target ? "pass" : "fail";

test("sized tuple", () => {
    /**
     * the following code block should not throw any type errors
     * if the `SizedTuple<>` type is healthy.
     */

    expect(() => {
        const _: TypeCheck<SizedTuple<2>, [unknown, unknown]> = "pass";
    });

    expect(() => {
        const _: TypeCheck<SizedTuple<2, "v">, ["v", "v"]> = "pass";
    });

    expect(() => {
        const _: TypeCheck<SizedTuple<3, "x", ["*"]>, ["x", "x", "*"]> = "pass";
    });
});
