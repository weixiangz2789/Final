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
  return dice1Roll + dice2Roll + dice3Roll;
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
      mode = diceArray[i];
    }
    counter = 1;
  }
  return mode;
};

const generateTable = () => {
  resetRolls();
  diceTable.innerHTML = "Dice Table";
  let selectedDice;
  const check1 = document.getElementById("1");
  check1.checked ? (selectedDice = 1) : undefined;
  const check2 = document.getElementById("2");
  check2.checked ? (selectedDice = 2) : undefined;
  const check3 = document.getElementById("3");
  check3.checked ? (selectedDice = 3) : undefined;

  let start;
  let end;
  check1.checked ? ((start = 1), (end = 7)) : undefined;
  check2.checked ? ((start = 2), (end = 13)) : undefined;
  check3.checked ? ((start = 3), (end = 19)) : undefined;
  let dictArr = [];
  for (let i = start; i < end; i++) {
    let dict = {
      frequency: i,
      value: 0,
    };
    dictArr.push(dict);
  }
  console.log(dictArr);
  for (let i = start; i < end; i++) {
    let rollSum = rollDice(selectedDice);
    console.log(rollSum);
    dictArr.forEach((x) => {
      if (rollSum == dictArr.frequency) {
        dictArr.value++;
      }
    });
    console.log(dictArr);
    const row = diceTable.insertRow();
    row.textContent = i;
    const cell = row.insertCell();
    cell.textContent = dictArr[i - start].value;
  }
  console.log(diceArray);
  const meanRow = diceTable.insertRow();
  const meanCell = meanRow.insertCell();
  meanRow.textContent = "Mean: ";
  meanCell.textContent = findMean();

  const medianRow = diceTable.insertRow();
  const medianCell = medianRow.insertCell();
  medianRow.textContent = "Median: ";
  medianCell.textContent = findMedian();

  const modeRow = diceTable.insertRow();
  const modeCell = modeRow.insertCell();
  modeRow.textContent = "Mode: ";
  modeCell.textContent = findMode();
};

const resetRolls = () => {
  dice1Roll = 0;
  dice2Roll = 0;
  dice3Roll = 0;
  sum = 0;
  diceArray = [];
};

// rollDice(1);
// rollDice(2);
// rollDice(3);
// console.log(dice1Roll);
// console.log(dice2Roll);
// console.log(dice3Roll);
// console.log(diceArray.sort());
// console.log("Double: " + doubleCounter);
// console.log("Triple: " + tripleCounter);
// console.log("Sum: " + findSum());
// console.log("Mean: " + findMean());
// console.log("Median: " + findMedian());
// console.log("Mode: " + findMode());
