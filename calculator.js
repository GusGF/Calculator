let inputArrStr_g = [];
let display_g = document.getElementById("value");

// Event listener picks up all key presses till it receives a '='
document.addEventListener("click", (event) => {
  // Clear display when user starts a new calculation i.e. when raw input array is empty!
  if (inputArrStr_g.length == 0) {
    clearDisplay();
  }
  // If user cancels input, reset back to '0' and clear raw input array
  if (event.target.getAttribute("data-key") == "C") {
    display_g.textContent = "0";
    inputArrStr_g = [];
  } else if (event.target.getAttribute("data-key") == "pwr") {
    display_g.textContent = "POWER OFF";
    inputArrStr_g = [];
  } else if (event.target.getAttribute("data-key") != null) {
    // Collect key presses in our array
    inputArrStr_g[inputArrStr_g.length] = event.target.getAttribute("data-key");
    // console.log(`Value is....: ${event.target.getAttribute("data-key")}`);
    // console.log(`Value is....: ${inputArrStr_g[inputArrStr_g.length]}`);
    // Echo to our calculator display
    echoToDisplay(event.target.getAttribute("data-key"));
    if (inputArrStr_g[inputArrStr_g.length - 1] == "=") {
      console.log(`Raw input: ${inputArrStr_g}`);
      createArrayEq();
    }
  }
});

function clearDisplay() {
  // let display = document.getElementById("value");
  display_g.textContent = "";
}

function echoToDisplay(character_p) {
  // console.log(character_p);
  // let lcd = document.getElementById("value");
  let numToAdd = document.createTextNode(character_p);
  display_g.appendChild(numToAdd);
}

// Return the answer to the equation received from evaluate()
function solveEq(operandOne, operandTwo, operator) {
  console.log(`Equation: ${operandOne}${operator}${operandTwo}`);
  let operand1 = parseFloat(operandOne);
  let operand2 = parseFloat(operandTwo);
  if (operator == "+") {
    return operand1 + operand2;
  } else if (operator == "x") {
    return operand1 * operand2;
  } else if (operator == "/") {
    return operand1 / operand2;
  } else if (operator == "-") {
    return operand1 - operand2;
  }
}

// display a value
function display(numToDisplay_p) {
  // let lcd = document.getElementById("value");
  display_g.innerHTML = numToDisplay_p;
  console.log(numToDisplay_p);
}

// Create values from the raw input array and store in array 'inputArrStr_g'
function createArrayEq() {
  let operator;
  let operand = "";
  let inputArrValues_v = [];
  console.log(`This should be empty: ${inputArrValues_v}`);
  inputArrStr_g.forEach((element) => {
    // is this a valid numeric value or a decimal point?
    if (!isNaN(parseFloat(element)) || element == ".") {
      operand = operand.concat(element);
    }
    // an operator has been found so save operator and above operand
    else {
      operator = element;
      inputArrValues_v[inputArrValues_v.length] = operand;
      inputArrValues_v[inputArrValues_v.length] = operator;
      // reset operand
      operand = "";
    }
  });
  // reset global raw input array
  inputArrStr_g = [];
  console.log(`Equation: ${inputArrValues_v}`);
  evaluate(inputArrValues_v);
}

// Look at each equation in array and send to solveEq()
function evaluate(p_inputArrV) {
  let valueOne = 0;
  let valueTwo = 0;
  let operator = "";
  let tally = 0;
  console.log("Hello");
  for (let i = 0; i < p_inputArrV.length - 1; i++) {
    // Get sub-equations
    // if (p_inputArrV[i] == "=") {
    //   break;
    // }
    if (valueOne == 0) {
      valueOne = p_inputArrV[i];
    } else if (isNaN(p_inputArrV[i])) {
      operator = p_inputArrV[i];
      valueTwo = "";
    } else {
      valueTwo = p_inputArrV[i];
    }
    // When we have an equation solve then move on to the next number
    if (valueOne && operator && valueTwo) {
      let answer = solveEq(valueOne, valueTwo, operator);
      // Have we reached the end of the equation? If not keep going and
      // assign the result of the previous calculation to valueOne
      if (p_inputArrV[i + 1] != "=") {
        valueOne = answer;
      } else {
        tally = answer;
        break;
      }
    }
  }
  console.log(`Answer is: ${tally}`);
  display(tally);
}
