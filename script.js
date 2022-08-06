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
        case '*':
        case 'x':
        case 'X': return multiply(num1, num2);
        case '/':
        case '\u00f7': return divide(num1, num2);
    }
}

///////////////////// Event Handlers ////////////////////////////////////
function displayContent(e) {
    const number = e.target.classList.length ? e.target.querySelector('span').textContent : e.target.textContent;

    if (['+', '-', 'x', 'X', '/', '\u00f7'].includes(number) && showFormula(calculation).num.length == 2) displayResult();

    if (/[ca=]/i.test(number) || calculation.length >= DISPLAY_MAXLENGTH) return;
    display.value = calculation += number;
}

function displayKeyboardContent(e) {
    const number = e.key;

    switch(e.key) {
        case 'Backspace': 
            clearOneChar();
            return;
        case 'Delete':
            clearDisplay();
            return;
        case 'Enter':
        case '=':
            displayResult();
            return;
    }

    if (/[^0-9.+/*x-]/i.test(e.key) || calculation.length >= DISPLAY_MAXLENGTH) return;
    display.value = calculation += number;
}

function displayResult() {
    const formula = showFormula(calculation);

    if (formula.num.filter(Boolean).length < 2) return;

    let result = operate(formula.operator, +formula.num[0], +formula.num[1]);
    result = String(result).length > DISPLAY_MAXLENGTH ? result.toPrecision(DISPLAY_MAXLENGTH - 1) : result.toPrecision();
    display.value = calculation = (result == 'NaN' ? 'error :(' : result);
}

function clearOneChar() {
    display.value = calculation = calculation.slice(0, -1);
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
const DISPLAY_MAXLENGTH = 15;

// Event Listeners
keys.addEventListener('click', displayContent);
answer.addEventListener('click', displayResult);
clearOne.addEventListener('click', clearOneChar);
clearAll.addEventListener('click', clearDisplay);
window.addEventListener('keydown', displayKeyboardContent);