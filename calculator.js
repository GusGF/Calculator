let inputArr;
inputArr = [];

// Event listener picks up all key presses till it receives a '='
// then the expression which is stored in an array is evaluated
document.addEventListener("click", (event) => {
  inputArr[inputArr.length] = event.target.getAttribute("data-key");
  console.log(`The array length is: ${inputArr.length}`);
  // console.log(event.target.getAttribute("data-key"));
  if (inputArr[inputArr.length - 1] == "=") {
    console.log(inputArr);
    evaluate();
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

function evaluate() {
  let operandOne = null,
    operandTwo = null,
    operator = null;
  let genOperand = "";
  inputArr.forEach((element) => {});
}
