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

const initialDealt = (playersArray, distributionSequence, playingDeck) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < playersArray.length; j++) {
            distributionSequence[j].hands.push(playingDeck[0]);
            playingDeck.splice(0, 1);
        }
    }
}

initialDealt(players, shuffledDistribution, shuffledDeck);

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

// playerOne.hands = [9, 11, 13]
// playerTwo.hands = [9, 11, 13]
// playerThree.hands = [9, 11, 13]
// playerFour.hands = [9, 11, 13]

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


const extraDealt = (array) => {
    if (array.length > 1) {
        for (let m = 0; m < array.length; m++) {
            array[m].extra.push(shuffledDeck[0]);
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
            if (check.length === 1) {
                return check[0].name;
            } else if (check.length > 1) {
                return extraDealt(check);
            }
        } else {
            let extraMax = Math.max(...currentComparison);
            let check = [];
            array.forEach((element) => (element.extra[element.extra.length - 1] === extraMax) ? check.push(element) : "")
            console.log(array)
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
                // console.log("Winner is Player " + newDistribution.name);
                return newDistribution.name;
            } else if (newDistribution.length > 1) {
                let containAces = newDistribution.find(value => value.hands[0] === 1);
                if (containAces) {
                    // console.log("Winner is Player " + containAces.name);
                    return containAces.name;
                } else {
                    newDistribution.sort((a, b) => a.hands[0] - b.hands[0])
                    // console.log("Winner is Player " + newDistribution[newDistribution.length - 1].name);
                    return newDistribution[newDistribution.length - 1].name
                }
            }
        }
    } else if (STRAIGHT.length !== 0 && THREEOFAKIND.length === 0) {
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
                let winner = newDistribution.find(value => value.hands[2] === theMax)
                return winner.name
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
    } else if (ONEPAIR.length !== 0 && THREEOFAKIND.length === 0 && STRAIGHT.length === 0) {
        if (ONEPAIR.length === 1) {
            return ONEPAIR[0];
        } else if (ONEPAIR.length > 1) {
            let pairCard = [];
            for (let o = 0; o < ONEPAIR.length; o++) {
                shuffledDistribution.map((value, index) => {
                    if (value.name === ONEPAIR[o]) {
                        newDistribution.push(shuffledDistribution[index])
                    }
                });
                // console.log(newDistribution)
                if (newDistribution[o].hands[0] === newDistribution[o].hands[1]) {
                    pairCard.push(newDistribution[o].hands[0])
                } else {
                    pairCard.push(newDistribution[o].hands[1])
                }
                // console.log(pairCard)
            }
            let highestPairCard;
            if (pairCard.includes(1)) {
                highestPairCard = Math.min(...pairCard)
            } else {
                highestPairCard = Math.max(...pairCard)
            }
            // console.log(ONEPAIR)
            let equalPair = []
            pairCard.map(value => {
                if (value === highestPairCard) {
                    equalPair.push(value)
                }
            })
            // console.log(equalPair)
            if (equalPair.length === 1) {
                // let winner = [];
                if (highestPairCard === 1) {
                    let winner = newDistribution.find(value => (value.hands[0] === value.hands[1] && value.hands[0] === 1))
                    return winner.name
                } else {
                    let winner = newDistribution.find(value => ((value.hands[0] === value.hands[1] || value.hands[1] === value.hands[2]) && value.hands[1] === highestPairCard))
                    return winner.name
                }
                // console.log(newDistribution)
            } else if (equalPair.length > 1) {
                if (highestPairCard === 1) {
                    let finalDistribution = [];
                    newDistribution.map((value, index) => {
                        if ((value.hands[0] === value.hands[1]) && (value.hands[1] === 1)) {
                            finalDistribution.push(newDistribution[index])
                        }
                    });

                    // get the max of third card on hands
                    let maxes = [];
                    for (let p = 0; p < finalDistribution.length; p++) {
                        maxes.push(Math.max(finalDistribution[p].hands[2]))
                    }
                    let theMax = Math.max(...maxes)
                    let multipleTheMax = []
                    maxes.map(value => {
                        if (value === theMax) {
                            multipleTheMax.push(value)
                        }
                    })
                    if (multipleTheMax.length === 1) {
                        let winner = finalDistribution.find(value => value.hands[2] === theMax)
                        return winner.name
                    } else if (multipleTheMax.length > 1) {
                        let endDistribution = [];
                        finalDistribution.map((value, index) => {
                            if (value.hands[2] === multipleTheMax[0]) {
                                endDistribution.push(finalDistribution[index])
                            }
                        });
                        return extraDealt(endDistribution);
                    }

                } else {
                    let finalDistribution = [];
                    newDistribution.map((value, index) => {
                        if ((value.hands[1] === value.hands[2] || value.hands[0] === value.hands[1]) && (value.hands[1] === highestPairCard)) {
                            finalDistribution.push(newDistribution[index])
                        }
                    });

                    // get the max of third card on hands
                    let maxes = [];
                    for (let q = 0; q < finalDistribution.length; q++) {
                        if (finalDistribution[q].hands[0] === finalDistribution[q].hands[1]) {
                            maxes.push(finalDistribution[q].hands[2])
                        } else {
                            maxes.push(finalDistribution[q].hands[0])
                        }
                    }
                    if (maxes[0] === maxes[1]) {
                        return extraDealt(finalDistribution);
                    } else if (maxes.includes(1)) {
                        let winner = finalDistribution.find(value => value.hands.includes(1))
                        // console.log(winner)
                        return winner.name
                    } else {
                        let theMax = Math.max(...maxes)
                        let winner = finalDistribution.find(value => value.hands.includes(theMax))
                        // console.log(winner)
                        return winner.name
                    }

                }
            }
        }
    } else {
        let maxes = [];
        for (let r = 0; r < shuffledDistribution.length; r++) {
            if (shuffledDistribution[r].hands.includes(1)) {
                maxes.push(1);
            } else {
                maxes.push(shuffledDistribution[r].hands[2])
            }
        }
        if (maxes.includes(1)) {
            let theMax = Math.min(...maxes)
            let multipleTheMax = []
            maxes.map(value => {
                if (value === theMax) {
                    multipleTheMax.push(value)
                }
            })
            if (multipleTheMax.length === 1) {
                let winner = shuffledDistribution.find(value => value.hands[0] === theMax)
                return winner.name
            } else if (multipleTheMax.length > 1) {

                let newDistribution = [];
                shuffledDistribution.map((value, index) => {
                    if (value.hands[0] === multipleTheMax[0]) {
                        newDistribution.push(shuffledDistribution[index])
                    }
                });

                //find second highest
                let secondMaxes = [];
                for (let s = 0; s < newDistribution.length; s++) {
                    secondMaxes.push(newDistribution[s].hands[2])
                }

                let secondTheMax = Math.max(...secondMaxes)
                let secondMultipleTheMax = []
                secondMaxes.map(value => {
                    if (value === secondTheMax) {
                        secondMultipleTheMax.push(value)
                    }
                })
                if (secondMultipleTheMax.length === 1) {
                    let winner = newDistribution.find(value => value.hands[2] === secondTheMax)
                    return winner.name
                } else if (secondMultipleTheMax.length > 1) {

                    let nextDistribution = [];
                    newDistribution.map((value, index) => {
                        if (value.hands[2] === secondMultipleTheMax[0]) {
                            nextDistribution.push(newDistribution[index])
                        }
                    });

                    //find third highest
                    let thirdMaxes = [];
                    for (let t = 0; t < nextDistribution.length; t++) {
                        thirdMaxes.push(nextDistribution[t].hands[1])
                    }

                    let thirdTheMax = Math.max(...thirdMaxes)
                    let thirdMultipleTheMax = []
                    thirdMaxes.map(value => {
                        if (value === thirdTheMax) {
                            thirdMultipleTheMax.push(value)
                        }
                    })
                    if (thirdMultipleTheMax.length === 1) {
                        let winner = nextDistribution.find(value => value.hands[1] === thirdTheMax)
                        return winner.name
                    } else if (thirdMultipleTheMax.length > 1) {

                        let endDistribution = [];
                        nextDistribution.map((value, index) => {
                            if (value.hands[1] === thirdMultipleTheMax[0]) {
                                endDistribution.push(nextDistribution[index])
                            }
                        });
                        return extraDealt(endDistribution);
                    }
                }
            }
        } else {
            let theMax = Math.max(...maxes)
            let multipleTheMax = []
            maxes.map(value => {
                if (value === theMax) {
                    multipleTheMax.push(value)
                }
            })
            if (multipleTheMax.length === 1) {
                let winner = shuffledDistribution.find(value => value.hands[2] === theMax)
                return winner.name
            } else if (multipleTheMax.length > 1) {
                let newDistribution = [];
                shuffledDistribution.map((value, index) => {
                    if (value.hands[2] === multipleTheMax[0]) {
                        newDistribution.push(shuffledDistribution[index])
                    }
                });

                //find second highest
                let secondMaxes = [];
                for (let u = 0; u < newDistribution.length; u++) {
                    secondMaxes.push(newDistribution[u].hands[1])
                }

                let secondTheMax = Math.max(...secondMaxes)
                let secondMultipleTheMax = []
                secondMaxes.map(value => {
                    if (value === secondTheMax) {
                        secondMultipleTheMax.push(value)
                    }
                })
                if (secondMultipleTheMax.length === 1) {
                    let winner = newDistribution.find(value => value.hands[1] === secondTheMax)
                    return winner.name
                } else if (secondMultipleTheMax.length > 1) {

                    let nextDistribution = [];
                    newDistribution.map((value, index) => {
                        if (value.hands[1] === secondMultipleTheMax[0]) {
                            nextDistribution.push(newDistribution[index])
                        }
                    });

                    //find third highest
                    let thirdMaxes = [];
                    for (let v = 0; v < nextDistribution.length; v++) {
                        thirdMaxes.push(nextDistribution[v].hands[0])
                    }

                    let thirdTheMax = Math.max(...thirdMaxes)
                    let thirdMultipleTheMax = []
                    thirdMaxes.map(value => {
                        if (value === thirdTheMax) {
                            thirdMultipleTheMax.push(value)
                        }
                    })
                    if (thirdMultipleTheMax.length === 1) {
                        let winner = nextDistribution.find(value => value.hands[0] === thirdTheMax)
                        return winner.name
                    } else if (thirdMultipleTheMax.length > 1) {

                        let endDistribution = [];
                        nextDistribution.map((value, index) => {
                            if (value.hands[0] === thirdMultipleTheMax[0]) {
                                endDistribution.push(nextDistribution[index])
                            }
                        });
                        return extraDealt(endDistribution);
                    }
                }
            }
        }
    }
}
// console.log(shuffledDistribution)

console.log("The winner is Player " + checkWin() + "!");

module.exports = { shuffleArray, isThreeOfAKind }