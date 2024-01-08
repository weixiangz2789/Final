let dice1Roll;
let dice2Roll;
let dice3Roll;
let diceArray = [];
let doubleCounter = 0;
let tripleCounter = 0;
let sum = 0;

const rollDice = (dices) => {
  dice1Roll = Math.floor(Math.random() * 6 + 1);
  diceArray.push(dice1Roll);
  if (dices > 1) {
    dice2Roll = Math.floor(Math.random() * 6 + 1);
    diceArray.push(dice2Roll);
    if (dice1Roll == dice2Roll && dices == 2) {
      doubleCounter++;
    }
  }
  if (dices > 2) {
    dice3Roll = Math.floor(Math.random() * 6 + 1);
    diceArray.push(dice3Roll);
    if (dice1Roll == dice2Roll && dice2Roll == dice3Roll) {
      tripleCounter++;
    }
    if (
      dice1Roll == dice3Roll ||
      dice1Roll == dice2Roll ||
      dice2Roll == dice3Roll
    ) {
      doubleCounter++;
    }
  }
};

const findSum = () => {
  diceArray.forEach((x) => (sum += x));
  return sum;
};
const findMean = () => {
  return findSum() / diceArray.length;
};
const findMedian = () => {
  diceArray.sort();
  if (diceArray.length % 2 == 0) {
    return (
      (diceArray[diceArray.length / 2] + diceArray[diceArray.length / 2 - 1]) /
      2
    );
  } else {
    return diceArray[Math.floor(diceArray.length / 2)];
  }
};
const findMode = () => {
  diceArray.sort();
  let counter = 1;
  let maxCounter = 0;
  let mode = 0;
  for (let i = 0; i < diceArray.length; i++) {
    if (diceArray[i] == diceArray[i + 1]) {
      counter++;
    } else if (counter > maxCounter) {
      maxCounter = counter;
      counter = 1;
      mode = diceArray[i];
    }
  }
  return mode;
};

const resetRolls = () => {
  dice1Roll = 0;
  dice2Roll = 0;
  dice3Roll = 0;
  sum = 0;
  let diceArray = [];
};

resetRolls();
rollDice(1);
rollDice(2);
rollDice(3);
console.log(dice1Roll);
console.log(dice2Roll);
console.log(dice3Roll);
console.log(diceArray.sort());
console.log("Double: " + doubleCounter);
console.log("Triple: " + tripleCounter);
console.log("Sum: " + findSum());
console.log("Mean: " + findMean());
console.log("Median: " + findMedian());
console.log("Mode: " + findMode());
