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
  console.log("dice1: " + dice1Roll);
  if (dices > 1) {
    dice2Roll = Math.floor(Math.random() * 6 + 1);
    diceArray.push(dice2Roll);
    console.log("dice2: " + dice2Roll);
    if (dice1Roll == dice2Roll && dices == 2) {
      doubleCounter++;
    }
  }
  if (dices > 2) {
    dice3Roll = Math.floor(Math.random() * 6 + 1);
    diceArray.push(dice3Roll);
    console.log("dice3: " + dice3Roll);
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

const check = (num) => {
  for (let i = 1; i < 4; i++) {
    num == i ? undefined : (document.getElementById(i).checked = false);
  }
};
const generateTable = () => {
  resetRolls();
  diceTable.innerHTML = "";
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

  let rollAmount = parseInt(document.getElementById("Rolls").value);
  for (let i = 0; i < rollAmount; i++) {
    let rollSum = rollDice(selectedDice);
    console.log("Roll Sum: " + rollSum);
    dictArr.forEach((x) => {
      if (rollSum == x.frequency) {
        x.value++;
      }
    });
  }
  for (let i = start; i < end; i++) {
    const row = diceTable.insertRow();
    const cell1 = row.insertCell();
    cell1.textContent = `# of ${i}s`;
    const cell2 = row.insertCell();
    cell2.textContent = dictArr[i - start].value;
  }

  if (selectedDice === 2 || selectedDice === 3) {
    const doublesRow = diceTable.insertRow();
    const doublesCell1 = doublesRow.insertCell();
    doublesCell1.textContent = "Doubles: ";
    const doublesCell2 = doublesRow.insertCell();
    doublesCell2.textContent = doubleCounter;

    if (selectedDice === 3) {
      const triplesRow = diceTable.insertRow();
      const triplesCell1 = triplesRow.insertCell();
      triplesCell1.textContent = "Triples: ";
      const triplesCell2 = triplesRow.insertCell();
      triplesCell2.textContent = tripleCounter;
    }
  }

  const meanRow = diceTable.insertRow();
  const meanCell1 = meanRow.insertCell();
  meanCell1.textContent = "Mean: ";
  const meanCell2 = meanRow.insertCell();
  meanCell2.textContent = findMean().toFixed(2);

  const medianRow = diceTable.insertRow();
  const medianCell1 = medianRow.insertCell();
  medianCell1.textContent = "Median: ";
  const medianCell2 = medianRow.insertCell();
  medianCell2.textContent = findMedian();

  const modeRow = diceTable.insertRow();
  const modeCell1 = modeRow.insertCell();
  modeCell1.textContent = "Mode: ";
  const modeCell2 = modeRow.insertCell();
  modeCell2.textContent = findMode();
};

const resetRolls = () => {
  dice1Roll = 0;
  dice2Roll = 0;
  dice3Roll = 0;
  sum = 0;
  diceArray = [];
  console.clear();
};
