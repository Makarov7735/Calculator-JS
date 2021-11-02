
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
        if (this.display.innerHTML.includes('-') && this.display.innerHTML.length <= 2) {
            this.clearDisplay();
        }

        if (!this.x) {
            this.display.innerHTML = this.display.innerHTML.slice(0, -1);
        } else if (!this.afterSetAction && this.display.innerHTML) {
            this.display.innerHTML = this.display.innerHTML.slice(0, -1);
        }
    }

    setNumber(number) {
        if (this.display.innerHTML == 'Error') {
            this.clearDisplay();
        }
        
        if (this.x && this.action && this.afterSetAction) {
            if (number != '.' && number != '+/-') {
                this.clearDisplay();
                this.showChar(number);
                this.afterSetAction = false;
            }
        // setting +/-
        } else if (number == '+/-' && this.display.innerHTML) {
            if (!this.display.innerHTML.includes('-')) {
                this.display.innerHTML = '-' + this.display.innerHTML;
            } else {
                this.display.innerHTML = this.display.innerHTML.slice(1);
            }
        // setting dot
        } else if (number == '.' && this.display.innerHTML && !this.display.innerHTML.includes('.')) {
            this.showChar(number);
        // setting numbers
        } else if (number != '.' && number != '+/-') {
            this.showChar(number);
        }
    }

    setAction(action) {
        // set action and X
        if (this.display.innerHTML && !this.x) {
            this.action = action;
            this.x = this.display.innerHTML;
        // change action
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
            if (!isNaN(result) && isFinite(result)) {
                this.showChar(result);
            } else {
                this.showChar('Error');
            }
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


let buttons = document.querySelectorAll('.button , .delete-char');
let calc = new Calculator;

buttons.forEach(item => {
    item.addEventListener('click', main);
});
