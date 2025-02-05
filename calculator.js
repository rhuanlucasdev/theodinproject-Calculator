let currentInput = '';
let firstNum = null;
let secondNum = null;
let operator = null;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".digit, .operator");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const decimalButton = document.getElementById("decimal");
const backspaceButton = document.getElementById("backspace");

buttons.forEach(button => {
  button.addEventListener("click", function() {
    currentInput += this.textContent;
    display.textContent = currentInput;
  });
});

clearButton.addEventListener("click", function() {
  currentInput = '';
  firstNum = null;
  secondNum = null;
  operator = null;
  display.textContent = '0';
});

decimalButton.addEventListener("click", function() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    display.textContent = currentInput;
  }
});

backspaceButton.addEventListener("click", function() {
  currentInput = currentInput.slice(0, -1);
  display.textContent = currentInput || '0';
});

equalsButton.addEventListener("click", function() {
  if (firstNum !== null && operator !== null && currentInput !== '') {
    secondNum = parseFloat(currentInput);
    const result = operate(operator, firstNum, secondNum);
    display.textContent = result;
    firstNum = result; 
    currentInput = '';
    operator = null;
  }
});


document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', function() {
    if (firstNum === null) {
      firstNum = parseFloat(currentInput);
      operator = this.textContent;
      currentInput = '';
    } else {
      if (currentInput !== '') {
        secondNum = parseFloat(currentInput);
        firstNum = operate(operator, firstNum, secondNum);
        display.textContent = firstNum;
        operator = this.textContent;
        currentInput = '';
      } else {
        operator = this.textContent; 
      }
    }
  });
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by 0";
  }
  return Math.round((a / b) * 1000) / 1000; 
}

function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
    default:
      return "Invalid operation";
  }
}


document.addEventListener("keydown", function(event) {

  if (event.key >= 0 && event.key <= 9) {
    currentInput += event.key;
    display.textContent = currentInput;
  }


  if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
    if (firstNum === null) {
      firstNum = parseFloat(currentInput);
      operator = event.key;
      currentInput = '';
    } else {
      if (currentInput !== '') {
        secondNum = parseFloat(currentInput);
        firstNum = operate(operator, firstNum, secondNum);
        display.textContent = firstNum;
        operator = event.key;
        currentInput = '';
      } else {
        operator = event.key;
      }
    }
  }


  if (event.key === "." && !currentInput.includes('.')) {
    currentInput += '.';
    display.textContent = currentInput;
  }


  if (event.key === "Enter") {
    if (firstNum !== null && operator !== null && currentInput !== '') {
      secondNum = parseFloat(currentInput);
      const result = operate(operator, firstNum, secondNum);
      display.textContent = result;
      firstNum = result;
      currentInput = '';
      operator = null;
    }
  }


  if (event.key === "Escape") {
    currentInput = '';
    firstNum = null;
    secondNum = null;
    operator = null;
    display.textContent = '0';
  }

  if (event.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
  }
});
