const listOfNums = document.querySelectorAll('.number');
const listOfSigns = document.querySelectorAll('.sign');
const input = document.querySelector('#field');
const calcBtn = document.querySelector('.calculate-btn');
const clearBtn = document.querySelector('.clear-btn');

let firstNum = 0, secondNum = null;
let typedFirstNum = "", typedSecondNum = "";
let operator, calcResult;

const add = (n1, n2) => (n1 + n2).toFixed(2);
const subst = (n1, n2) => (n1 - n2).toFixed(2);
const power = (n1, n2) => (n1 * n2).toFixed(2);
const divide = (n1, n2) => {
  if (n2 == 0) return "Error";
  return (n1 / n2).toFixed(2);
}

function result(n1, n2, operator) {
  switch (operator) {
    case "+": return add(n1, n2);
    case "-": return subst(n1, n2);
    case "*": return power(n1, n2);
    case "/": return divide(n1, n2);
  }
}
