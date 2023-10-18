import { Result } from "./result";

test("Result.Ok", () => {
    const res = Result.Ok("foo");

    expect(res).toBeInstanceOf(Result);
    expect(res.isOk()).toEqual(true);
});

test("Result.Err", () => {
    const res = Result.Err("foo");

    expect(res).toBeInstanceOf(Result);
    expect(res.isErr()).toEqual(true);
});

test("Result::ok", () => {
    expect(Result.Ok("foo").ok()).toEqual("foo");
    expect(Result.Err("foo").ok()).toEqual(null);
});

test("Result::err", () => {
    expect(Result.Ok("foo").err()).toEqual(null);
    expect(Result.Err("foo").err()).toEqual("foo");
});

test("Result::map", () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    Result.Ok("foo").map(fn1, fn2);
    Result.Err("bar").map(fn1, fn2);

    expect(fn1).toBeCalledTimes(1);
    expect(fn1).toBeCalledWith("foo");

    expect(fn2).toBeCalledTimes(1);
    expect(fn2).toBeCalledWith("bar");

    expect(
        Result.Ok("foo")
            .map(
                (v) => v + "bar",
                (err) => err,
            )
            .ok(),
    ).toEqual("foobar");

    expect(
        Result.Err("foo")
            .map(
                (v) => v,
                (err) => err + "bar",
            )
            .err(),
    ).toEqual("foobar");
});

test("Result::transpose", () => {
    expect(Result.Ok(null).transpose()).toEqual(null);
    expect(Result.Ok("foo").transpose()?.ok()).toEqual("foo");
    expect(Result.Err(null).transpose()).not.toEqual(null);
});

test("Result::and", () => {
    const res1 = Result.Ok("foo");
    const res2 = Result.Ok("bar");
    const res3 = Result.Err("foobar");

    expect(res1.and(res2).ok()).toEqual("bar");
    expect(res3.and(Result.Ok("foo")).err()).toEqual("foobar");
});

test("Result::or", () => {
    const res1 = Result.Ok("foo");
    const res2 = Result.Ok("bar");
    const res3 = Result.Err("foobar");

    expect(res3.or(Result.Ok("foobar")).ok()).toEqual("foobar");
    expect(res1.or(res2).ok()).toEqual("foo");
});

test("Result::andThen", () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    Result.Ok("foo").andThen(fn1);
    Result.Err("foo").andThen(fn2);

    expect(fn1).toBeCalledTimes(1);
    expect(fn2).not.toBeCalled();

    expect(fn1).toBeCalledWith("foo");
});

test("Result::orElse", () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    Result.Ok("foo").orElse(fn1);
    Result.Err("foo").orElse(fn2);

    expect(fn1).not.toBeCalled();
    expect(fn2).toBeCalledTimes(1);

    expect(fn2).toBeCalledWith("foo");
});

test("Result::unwrap", () => {
    expect(Result.Ok("foo").unwrap()).toEqual("foo");
    expect(() => Result.Err("foo").unwrap()).toThrow("attempted to unwrap ERR result");
});

test("Result::unwrapOr", () => {
    expect(Result.Ok("foo").unwrapOr("bar")).toEqual("foo");
    expect(Result.Err("foo").unwrapOr("bar")).toEqual("bar");
});

test("Result::unwrapOrElse", () => {
    const fn1 = jest.fn((v: string) => v + "buzz");
    const fn2 = jest.fn();

    const res = Result.Err("fizz").unwrapOrElse(fn1);

    expect(res).toEqual("fizzbuzz");
    expect(fn1).toBeCalledTimes(1);
    expect(Result.Ok("fizz").unwrapOrElse(fn2)).toEqual("fizz");
    expect(fn2).not.toBeCalled();
});

test("Result::contains", () => {
    expect(Result.Ok("fizz").contains("buzz")).toEqual(false);
    expect(Result.Ok("fizz").contains("fizz")).toEqual(true);
    expect(Result.Err("fizz").contains("fizz")).toEqual(false);
});

test("Result::containsErr", () => {
    expect(Result.Err("fizz").containsErr("buzz")).toEqual(false);
    expect(Result.Err("fizz").containsErr("fizz")).toEqual(true);
    expect(Result.Ok("fizz").containsErr("fizz")).toEqual(false);
});

test("Result::equals", () => {
    expect(Result.Ok("foo").equals(Result.Ok("bar"))).toEqual(false);
    expect(Result.Ok("foo").equals(Result.Ok("foo"))).toEqual(true);
});

test("Result::toString", () => {
    expect(`${Result.Ok("foo")}`).toEqual('Ok("foo")');
    expect(`${Result.Err("foo")}`).toEqual('Err("foo")');
});

describe("Result.from", () => {
    test("should return Result.Ok when the function executes successfully", () => {
        const fn = () => 42;

        const result = Result.from(fn);

        expect(result.isOk()).toBe(true);
        expect(result.ok()).toBe(42);
    });

    test("should return Result.Err when the function throws an error", () => {
        const fn = () => {
            throw new Error("Something went wrong");
        };

        const result = Result.from(fn);

        expect(result.isErr()).toBe(true);
        expect(result.err()).toBe("Error: Something went wrong");
    });

    test("should map the error using the provided mapErr function", () => {
        const fn = () => {
            throw new Error("Invalid argument");
        };
        const mapErr = (err: Error) => `CustomError: ${err.message}`;

        const result = Result.from(() => {
            throw new Error("Invalid argument");
        }, mapErr);

        expect(result.isErr()).toBe(true);
        expect(result.err()).toBe("CustomError: Invalid argument");
    });

    test("Should throw an error if an invalid error type was thrown", () => {
        const fn = () => {
            throw new Error("Invalid argument");
        };
        const mapErr = (err: Error) => `CustomError: ${err.message}`;

        const result = Result.from(() => {
            throw "Invalid argument";
        }, mapErr);

        expect(result.isErr()).toBe(true);
        expect(result.err()).toBe("CustomError: Invalid argument");
    });

    test("should return Result.Err with the default error message when an unknown error occurs", () => {
        const result = Result.from(() => {
            throw "Something went wrong";
        });

        expect(result.isErr()).toBe(true);
        expect(result.err()).toBe("Error: Something went wrong");
    });

    test("should return Result.Err with the mapped value when an unknown error occurs and mapErr is provided", () => {
        const fn = () => {
            throw "Invalid argument";
        };
        const mapErr = (err: Error) => `Mapped Error: ${err.message}`;

        const result = Result.from(fn, mapErr);

        expect(result.isErr()).toBe(true);
        expect(result.err()).toBe("Mapped Error: Invalid argument");
    });

    test("should return Result.Err with 'null' if a nullish value was thrown", () => {
        const result = Result.from(() => {
            throw null;
        });

        expect(result.isErr()).toBe(true);
        expect(result.err()).toBe("Error: null");
    });

    test("should return Result.Err with the mapped value when a nullish value is thrown", () => {
        const mapErr = (err: Error) => `Mapped Error: ${err.message}`;

        const result = Result.from(() => {
            throw null;
        }, mapErr);

        expect(result.isErr()).toBe(true);
        expect(result.err()).toBe("Mapped Error: null");
    });
});
