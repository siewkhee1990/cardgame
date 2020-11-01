const { expect } = require("@jest/globals");
const { isThreeOfAKind } = require("./app");

const testObject = { hands: [1, 1, 1] }

test("It should be true when the 3 values in array is equal", () => {
    expect(isThreeOfAKind(testObject)).toBe(true)
});

