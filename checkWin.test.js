const { expect } = require("@jest/globals");
const { checkWin } = require("./app");

let testArray = [
    { name: 1, hands: [1, 2, 2], extra: [] },
    { name: 2, hands: [1, 4, 6], extra: [] },
    { name: 3, hands: [2, 2, 13], extra: [] },
    { name: 4, hands: [3, 4, 9], extra: [] },
]

test("the winner should be Player 1", () => {
    expect(checkWin(testArray)).toEqual(1)
});