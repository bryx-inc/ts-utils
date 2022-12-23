import { SizedTuple } from "./tuple";

test("sized tuple", () => {
  /**
   * the following code block should not throw any type errors
   * if the `SizedTuple<>` type is healthy.
   */

  expect(() => {
    const _: SizedTuple<6>["length"] extends 6 ? "pass" : never = "pass";
  });

  expect(() => {
    const _: SizedTuple<2, "v"> extends readonly ["v", "v"] ? "pass" : never =
      "pass";
  });

  expect(() => {
    const _: SizedTuple<3, "x", ["*"]> extends readonly ["x", "x", "*"]
      ? "pass"
      : never = "pass";
  });
});
