const { expect } = require("@jest/globals");
const { shuffleArray } = require("./app");
const suffleArray = require("./app");

const testArray = [1, 2, 3, 4]

test("the resulting array should not be the same as original array", () => {
    expect(shuffleArray(testArray)).not.toBe(testArray)
});

