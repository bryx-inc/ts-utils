import { act, renderHook } from "@testing-library/react";
import { useIndex } from "./useIndex";

test("useIndex", () => {
  const { result } = renderHook(() => useIndex(1));
  const [value] = result.current;

  expect(value).toBe(1);
});

test("useIndex increment", () => {
  const { result } = renderHook(() => useIndex(2));

  expect(result.current[0]).toBe(2);

  act(() => {
    result.current[1].inc();
  });

  expect(result.current[0]).toBe(3);
});

test("useIndex decrement", () => {
  const { result } = renderHook(() => useIndex(2));

  expect(result.current[0]).toBe(2);

  act(() => {
    result.current[1].dec();
  });

  expect(result.current[0]).toBe(1);
});

test("useIndex set", () => {
  const { result } = renderHook(() => useIndex(1));

  expect(result.current[0]).toBe(1);

  act(() => {
    result.current[1].set(5);
  });

  expect(result.current[0]).toBe(5);
});
