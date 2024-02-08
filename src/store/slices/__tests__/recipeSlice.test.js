import { recipe, initialState } from "../recipe";

describe("tests for recipe slice", () => {
  test("initialize slice with initialValue", () => {
    const recipeSliceInit = recipe(initialState, { type: "unknown" });
    expect(recipeSliceInit).toBe(initialState);
  });
});