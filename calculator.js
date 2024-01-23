let inputArrStr_g;
inputArrStr_g = [];

// Event listener picks up all key presses till it receives a '='
// then the expression which is stored in an array is evaluated
document.addEventListener("click", (event) => {
  inputArrStr_g[inputArrStr_g.length] = event.target.getAttribute("data-key");
  console.log(`The array length is: ${inputArrStr_g.length}`);
  // console.log(event.target.getAttribute("data-key"));
  if (inputArrStr_g[inputArrStr_g.length - 1] == "=") {
    console.log(`Raw input: ${inputArrStr_g}`);
    createArrayEq();
  }
});

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

function display(answer) {
  let lcd = document.getElementsByClassName("value");
  lcd[0].innerHTML = answer;
  console.log(answer);
}

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
    } else {
      valueTwo = p_inputArrV[i];
    }
    // When sub-equation is extracted fully, solve
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
