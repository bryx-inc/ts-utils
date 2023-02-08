import { RecursivePartial } from "./recursivePartial";

type TypeCheck<Sample, Target> = Sample extends Target ? "pass" : "fail";

test("recursive partial", () => {
    /**
     * the following code block should not throw any type errors
     * if the `RecursivePartial<>` type is healthy.
     */

    expect(() => {
        const _: TypeCheck<
            //    ^?
            RecursivePartial<{ where: { argument: { value: string } } }>,
            { where?: RecursivePartial<{ argument: { value: string } }> | undefined }
        > = "pass";
    });
});
