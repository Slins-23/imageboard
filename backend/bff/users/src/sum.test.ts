import { expect, test } from "vitest";
import { sum } from "./sum.mts";

test("3 + 5 == 8", () => {
    expect(sum(3, 5)).toBe(8);
});
