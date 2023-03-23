//Answer for Question Number 1
function stringFormatter(string) {
    let newString = "";
    for(let i = 0; i < string.length; i++) {
        if (string[i].match(/[\w\d]/) ) {
            const lowerCase = string[i].toLowerCase();
            newString += lowerCase;
        } 

        if (string[i] == " ") {
            newString += "-";
        }
    }

    return newString;
}

//Answer for Question Number 2
function characterCounter(string) {
  let counter = 0;
  let characterArr = string.split("");
  characterArr.forEach((char) => {
    if (char !== " " && char !== "\n") {
      counter++;
    }
  });

  return counter;
}

//Answer for Question Number 3
function numberPatterns(totalNum) {
  return `Pattern 1: ${firstPattern(0, totalNum)}\nPattern 2: ${firstPattern(1,totalNum)}\nPattern 3: ${secondPattern(0, totalNum)}\nPattern 4: ${thirdPattern(0,totalNum)}`;
}

function firstPattern(firstNum, totalNum) {
  let counter = firstNum;
  let pattern = [firstNum];

  for (let i = 0; i < totalNum - 1; i++) {
    counter += 1 + i * 2;
    pattern.push(counter);
  }

  return pattern;
}

function secondPattern(firstNum, totalNum) {
  let counter = firstNum;
  let pattern = [firstNum];

  for (let i = 0; i < totalNum; i++) {
    i == 0 ? (counter += 1) : (counter += pattern[i - 1]);
    pattern.push(counter);
  }

  return pattern;
}

function thirdPattern(firstNum, totalNum) {
  let counter = firstNum;
  let diff = secondPattern(firstNum, totalNum);
  let pattern = [firstNum];

  for (let i = 0; i < totalNum; i++) {
    counter += diff[i];
    pattern.push(counter);
  }

  return pattern;
}

//Answer for Question Number 4
function countNumber(stringOfNumber) {
  const arr = stringOfNumber.split(",");
  const numbers = [];
  arr.forEach((element) => {
    const number = parseInt(element);
    numbers.push(number);
  });

  return `Total: ${sum(numbers)}\nMax: ${max(numbers)}\nMin: ${min(numbers)}\nAverage: ${average(numbers)}`;
}

function sum(numbers) {
  let sum = 0;
  numbers.forEach((num) => (sum += num));
  return sum;
}

function average(numbers) {
  return sum(numbers) / numbers.length;
}

function max(numbers) {
  let maxNumber = numbers[0];
  numbers.forEach((num) => {
    if (num > maxNumber) {
      maxNumber = num;
    }
  });

  return maxNumber;
}

function min(numbers) {
  let maxNumber = numbers[0];
  numbers.forEach((num) => {
    if (num < maxNumber) {
      maxNumber = num;
    }
  });

  return maxNumber;
}


//Print into Terminal
const paragraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`;

console.log("====Answer Number 1====")
console.log(stringFormatter("SELamAt PaGi Dunia!"));

console.log("\n====Answer Number 2====")
console.log("Characters count: " + characterCounter(paragraph));

console.log("\n====Answer Number 3====")
console.log(countNumber("20,56,69,7,81,10"));

console.log("\n====Answer Number 4====")
console.log(numberPatterns(11));
