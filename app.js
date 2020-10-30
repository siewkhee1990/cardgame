let originalDeck = [
    1, 1, 1, 1,
    2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5,
    6, 6, 6, 6,
    7, 7, 7, 7,
    8, 8, 8, 8,
    9, 9, 9, 9,
    10, 10, 10, 10,
    11, 11, 11, 11,
    12, 12, 12, 12,
    13, 13, 13, 13
];

const shuffleArray = (oriArray) => {
    let array = [...oriArray];
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
};

let shuffledDeck = shuffleArray(originalDeck)

class Player {
    constructor(name) {
        this.name = name;
        this.hands = [];
        this.extra = [];
    }
}
let playerOne = new Player(1);
let playerTwo = new Player(2);
let playerThree = new Player(3);
let playerFour = new Player(4);

let players = [playerOne, playerTwo, playerThree, playerFour];

let shuffledDistribution = shuffleArray(players)

const initialDealt = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < players.length; j++) {
            shuffledDistribution[j].hands.push(shuffledDeck[0]);
            shuffledDeck.splice(0, 1);
        }
    }
}

initialDealt();

// console.log("P1", playerOne);
// console.log("P2", playerTwo);
// console.log("P3", playerThree);
// console.log("P4", playerFour);
// console.log(shuffledDeck);
// console.log(players);
// console.log(shuffledDistribution);
// console.log(originalDeck === shuffledDeck);

shuffledDistribution.forEach(element => {
    return element.hands.sort((a, b) => a - b);
})

// console.log(shuffledDistribution)
// console.log("P1", playerOne);
// console.log("P2", playerTwo);
// console.log("P3", playerThree);
// console.log("P4", playerFour);

playerOne.hands = [1, 1, 7]
playerTwo.hands = [2, 3, 7]
playerThree.hands = [4, 5, 7]
playerFour.hands = [4, 4, 2]

let THREEOFAKIND = [];
let STRAIGHT = [];
let ONEPAIR = [];

const isThreeOfAKind = (object) => {
    return object.hands.every(((val, i, arr) => val === arr[0]));
}

const isStraight = (object) => {
    if (object.hands[1] === (object.hands[0] + 1) && object.hands[2] === (object.hands[1] + 1)) {
        return true;
    }
}

const isOnePair = (object) => {
    if ((object.hands[0] === object.hands[1] || object.hands[1] === object.hands[2]) && !isThreeOfAKind(object)) {
        return true;
    }
}

shuffledDistribution.forEach((element) => (isThreeOfAKind(element) ? THREEOFAKIND.push(element.name) : ""))
shuffledDistribution.forEach((element) => (isStraight(element) ? STRAIGHT.push(element.name) : ""))
shuffledDistribution.forEach((element) => (isOnePair(element) ? ONEPAIR.push(element.name) : ""))

// console.log(shuffledDistribution)

const extraDealt = (array) => {
    if (array.length > 1) {
        for (let m = 0; m < array.length; m++) {
            array[m].extra.push(shuffledDeck[0]);
            // array[m].extra.push(13);
            shuffledDeck.splice(0, 1);
        };
        // find the max value in extra array
        let currentComparison = [];
        for (let n = 0; n < array.length; n++) {
            currentComparison.push(array[n].extra[array[n].extra.length - 1])
            // console.log(array, currentComparison)
        }
        if (currentComparison.includes(1)) {
            let extraMax = Math.min(...currentComparison);
            let check = [];
            array.forEach((element) => (element.extra[element.extra.length - 1] === extraMax) ? check.push(element) : "")
            //console.log(array)
            if (check.length === 1) {
                return check[0].name;
            } else if (check.length > 1) {
                return extraDealt(check);
            }
        } else {
            let extraMax = Math.max(...currentComparison);
            let check = [];
            array.forEach((element) => (element.extra[element.extra.length - 1] === extraMax) ? check.push(element) : "")
            // console.log(array)
            if (check.length === 1) {
                return check[0].name;
            } else if (check.length > 1) {
                return extraDealt(check);
            }
        }
    }
}

const checkWin = () => {
    let newDistribution = [];
    if (THREEOFAKIND.length !== 0) {
        if (THREEOFAKIND.length === 1) {
            return THREEOFAKIND[0];
        } else if (THREEOFAKIND.length > 1) {
            for (let k = 0; k < THREEOFAKIND.length; k++) {
                shuffledDistribution.map((value, index) => {
                    if (value.name === THREEOFAKIND[k]) {
                        newDistribution.push(shuffledDistribution[index])
                    }
                });
            }
            if (newDistribution.length === 1) {
                console.log("Winner is Player " + newDistribution.name);
                return newDistribution.name;
            } else if (newDistribution.length > 1) {
                let containAces = newDistribution.find(value => value.hands[0] === 1);
                if (containAces) {
                    console.log("Winner is Player " + containAces.name);
                    return containAces.name;
                } else {
                    newDistribution.sort((a, b) => a.hands[0] - b.hands[0])
                    console.log("Winner is Player " + newDistribution[newDistribution.length - 1].name);
                    return newDistribution[newDistribution.length - 1].name
                }
            }
        }
    } else if (STRAIGHT.length !== 0) {
        if (STRAIGHT.length === 1) {
            return STRAIGHT[0];
        } else if (STRAIGHT.length > 1) {
            let maxes = [];
            for (let l = 0; l < STRAIGHT.length; l++) {
                shuffledDistribution.map((value, index) => {
                    if (value.name === STRAIGHT[l]) {
                        newDistribution.push(shuffledDistribution[index])
                    }
                });
                // console.log(newDistribution)
                maxes.push(Math.max(...newDistribution[l].hands))
            }
            let theMax = Math.max(...maxes)
            let multipleTheMax = []
            maxes.map(value => {
                if (value === theMax) {
                    multipleTheMax.push(value)
                }
            })
            if (multipleTheMax.length === 1) {
                let found = newDistribution.find(value => value.hands[2] === theMax)
                return found.name
            } else if (multipleTheMax.length > 1) {
                let finalDistribution = [];
                newDistribution.map((value, index) => {
                    if (value.hands[2] === multipleTheMax[0]) {
                        finalDistribution.push(newDistribution[index])
                    }
                });
                return extraDealt(finalDistribution);
            }
        }
    } else if (ONEPAIR.length !== 0) {
        if (ONEPAIR.length === 1) {
            return ONEPAIR[0];
        } else if (ONEPAIR.length > 1) {
            console.log(ONEPAIR)
        }
    }
}

console.log(checkWin());