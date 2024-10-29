const listOfNums = document.querySelectorAll('.number');
const listOfSigns = document.querySelectorAll('.sign');
const input = document.querySelector('#field');
const calcBtn = document.querySelector('.calculate-btn');
const clearBtn = document.querySelector('.clear-btn');

let firstNum = 0,
  secondNum = null;
let typedFirstNum = '',
  typedSecondNum = '';
let operator, calcResult;

const add = (n1, n2) => (n1 + n2).toFixed(2);
const subst = (n1, n2) => (n1 - n2).toFixed(2);
const power = (n1, n2) => (n1 * n2).toFixed(2);
const divide = (n1, n2) => {
  if (n2 == 0) return 'Error';
  else return (n1 / n2).toFixed(2);
};

function result(n1, n2, operator) {
  switch (operator) {
    case '+':
      return add(n1, n2);
    case '-':
      return subst(n1, n2);
    case '*':
      return power(n1, n2);
    case '/':
      return divide(n1, n2);
  }
}

function operatorClickedHandler(el) {
  if (operator === el.textContent && !secondNum) {
    if (secondNum === 0) return; //ocb
    colorSign.classList.remove('sign-color');
    operator = null;
    return;
  }

  if (operator) return;

  if (clearBtn.classList.contains('error-color')) {
    clearBtn.classList.remove('error-color');
  }

  operator = el.textContent;
  colorSign = el;
  colorSign.classList.add('sign-color');
}

function numClickedHandler(el) {
  if (operator) {
    if (input.classList.contains('input-big-numbers')) {
      input.classList.remove('input-big-numbers');
    }
    colorSign.classList.remove('sign-color');
    typedSecondNum += el.textContent;
    const typedSecondNumWithSpaces = numberWithSpaces(typedSecondNum);
    input.value = typedSecondNumWithSpaces;
    secondNum = parseInt(typedSecondNum);
    // console.log(`sec num - ${secondNum}`);
    calcBtn.disabled = false;
    return;
  }

  if (clearBtn.classList.contains('error-color')) {
    clearBtn.classList.remove('error-color');
  }

  typedFirstNum += el.textContent;
  const typedFirstNumWithSpaces = numberWithSpaces(typedFirstNum);
  input.value = typedFirstNumWithSpaces;
  firstNum = parseInt(typedFirstNum);
  calcBtn.disabled = true;

  if (firstNum.toString().length < 15) {
    input.classList.remove('input-big-numbers');
  }
}

function numberWithSpaces(num) {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}

for (const el of listOfNums) {
  el.addEventListener('click', numClickedHandler.bind(null, el));
}

for (const el of listOfSigns) {
  el.addEventListener('click', operatorClickedHandler.bind(null, el));
}

function clearNumbers(calcResult = 0) {
  firstNum = calcResult;
  secondNum = null;
  operator = null;
  typedFirstNum = '';
  typedSecondNum = '';
  calcBtn.disabled = true;
  if (colorSign) colorSign.classList.remove('sign-color');
}

calcBtn.addEventListener('click', () => {
  if (!operator) return;

  if (secondNum == 0 && operator == '/') {
    input.value = result(firstNum, secondNum, operator);
    clearBtn.classList.add('error-color');
    calcBtn.disabled = true;
    clearNumbers(secondNum);
    return;
  }

  const numResult = Number(result(firstNum, secondNum, operator));

  if (numResult.toString().length > 13) {
    input.classList.add('input-big-numbers');
  }

  input.value = numberWithSpaces(numResult);
  calcResult = numResult;
  clearNumbers(calcResult);
  calcBtn.disabled = true;
});

clearBtn.addEventListener('click', () => {
  input.value = 0;
  clearNumbers(input.value);
  if (clearBtn.classList.contains('error-color')) {
    clearBtn.classList.remove('error-color');
  }
  if (input.classList.contains('input-big-numbers')) {
    input.classList.remove('input-big-numbers');
  }
});
