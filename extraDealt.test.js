const { expect } = require("@jest/globals");
const { extraDealt } = require("./app");

let testArray = [
    { name: 1, hands: [8, 9, 10], extra: [] },
    { name: 2, hands: [8, 9, 10], extra: [] },
    { name: 3, hands: [8, 9, 10], extra: [] },
    { name: 4, hands: [8, 9, 10], extra: [] },
]

let cards = [1, 1, 1, 1, 2, 2, 2, 2, 3, 4, 13, 4]

test("the winner should be Player 3", () => {
    expect(extraDealt(testArray, cards)).toEqual(3)
});