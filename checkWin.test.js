const { expect } = require("@jest/globals");
const { checkWin } = require("./app");

let testArray = [
    { name: 1, hands: [1, 2, 3], extra: [] },
    { name: 2, hands: [1, 2, 3], extra: [] },
    { name: 3, hands: [1, 2, 3], extra: [] },
    { name: 4, hands: [1, 2, 3], extra: [] },
]

let deck = [4, 4, 4, 4, 5, 5, 5, 5, 6, 8, 13, 11]

test("the winner should be Player 3", () => {
    expect(checkWin(testArray, deck)).toEqual(3)
});