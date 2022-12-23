import { Range } from "./range";

test("range", () => {
    /**
     * the following code block should not throw any type errors
     * if the `Range<>` type is healthy
     */

    for (const i of [0, 1, 2, 3] as const) {
        const _: Range<0, 3> = i;
    }
});
