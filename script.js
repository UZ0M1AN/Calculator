console.log('UZOMIAN!!!');

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////   FUNCTIONS   /////////////////////////////////////////////

///////////////// Calculator Functions //////////////////////////////////
function add (u, v) {return u + v}
function subtract (u, v) {return u - v}
function multiply (u, v) {return u * v}
function divide (u, v) {return u / v}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case 'x':
        case 'X': return multiply(num1, num2);
        case '/':
        case '\u00f7': return divide(num1, num2);
    }
}

///////////////////// Event Handlers ////////////////////////////////////
function displayContent(e) {
    const number = e.target.classList.length ? e.target.querySelector('span') : e.target;

    if (/[ca=]/i.test(number.textContent)) return;
    calculation += number.textContent;
    display.value = calculation;
}

function displayResult() {
    const formula = showFormula(calculation);
    display.value = calculation = operate(formula.operator, +formula.num[0], +formula.num[1]);
}

function clearOneChar() {
    display.value = calculation = String(calculation).slice(0, -1);
}

function clearDisplay() {
    display.value = calculation = '';
}

///////////////////// Helpers ////////////////////////////////////////////
function showFormula (str) {
    return {
        num: str.split(/[^0-9.]/i), 
        operator: str.replace(/[0-9.]/g, ''),
    };
}

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
///////////////   VARIABLES   ///////////////////////////////////////////////////////////

// DOM
const display = document.querySelector('input[type="text"]');
const keys = document.querySelector('.keys');
const answer = document.querySelector('.answer');
const clearOne = document.querySelector('.clear-one-char');
const clearAll = document.querySelector('.clear-all');

// Other
let calculation = '';

// Event Listeners
keys.addEventListener('click', displayContent);
answer.addEventListener('click', displayResult);
clearOne.addEventListener('click', clearOneChar);
clearAll.addEventListener('click', clearDisplay);
