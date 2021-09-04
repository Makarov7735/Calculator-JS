
class Calculator {
    
    constructor() {
        this.x = '';
        this.y = '';
        this.action = '';
        this.display = document.querySelector('#display');
        this.afterSetAction = true;
    }

    clearAll() {
        this.display.innerHTML = '';
        this.x = '';
        this.y = '';
        this.action = '';
        this.afterSetAction = true;
    }

    clearDisplay() {
        this.display.innerHTML = '';
    }

    showChar(data) {
        this.display.innerHTML += data;
    }

    deleteLastChar() {
        if (!this.x) {
            this.display.innerHTML = this.display.innerHTML.slice(0, -1);
        } else if (!this.afterSetAction&& this.display.innerHTML) {
            this.display.innerHTML = this.display.innerHTML.slice(0, -1);
        }
    }

    setNumber(number) {
        if (this.x && this.action && this.afterSetAction) {
            this.clearDisplay();
            this.showChar(number);
            this.afterSetAction = false;

        } else {
            this.showChar(number);
        }
    }

    setAction(action) {
        if (this.display.innerHTML && !this.x) {
            this.action = action;
            this.x = this.display.innerHTML;

        } else if (this.display.innerHTML && this.x) {
            this.action = action;

        }
    }

    getResult() {
        if (this.x && this.action) {
            this.y = this.display.innerHTML;
            let result;

            if (this.action === '+') {
                result = Number(this.x) + Number(this.y);
            } else if (this.action === '-') {
                result = Number(this.x) - Number(this.y);
            } else if (this.action === '*') {
                result = Number(this.x) * Number(this.y);
            } else {
                result = Number(this.x) / Number(this.y);
            }
            this.clearAll();
            this.showChar(result);
        }
    }
}   


function main() {

    if (this.getAttribute('value') === 'c') {
        // if user clicked clear button
        calc.clearAll();

    } else if (this.getAttribute('class').includes('action')) {
        // if user clicked + - * / 
        calc.setAction(this.getAttribute('value'));

    } else if (this.getAttribute('class').includes('number')) {
        // if user clicked on number
        calc.setNumber(this.getAttribute('value'));

    } else if (this.getAttribute('value') === '=') {
        // if user clicked =
        calc.getResult();

    } else if (this.getAttribute('class').includes('delete-char')) {
        // if user clicked delete button
        calc.deleteLastChar();
    
    }
}


let buttons = document.querySelectorAll('.button');
let deleteChar = document.querySelector('.delete-char');
let calc = new Calculator;

for (let btn of buttons) {
    btn.onclick = main;
}
deleteChar.onclick = main;
