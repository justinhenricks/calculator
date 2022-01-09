class Calculator {
    constructor(previousOperand, currentOperand, currentOperation){
        this.currentOperand = currentOperand;
        this.previousOperand = previousOperand;
        this.currentOperation = currentOperation;
        this.forceReset = false;
        this.initListeners();
    }

    clear(){
        this.currentOperand = 0;
        this.previousOperand = null;
        this.currentOperation = null;
    }

    appendNumber(curNum) {
        if(this.currentOperand == 0 || this.forceReset){
            this.currentOperand = curNum;
        }
        else{
            this.currentOperand = `${this.currentOperand}${curNum}`
        }
        this.forceReset = false;
    }

    setCurrentOperation(curOperation){
        this.currentOperation = curOperation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = 0;
    }

    compute(){
        let _this = this;
        const operators = {
            add(x,y){ return x+y },
            subtract(x,y){ return x-y },
            multiply(x,y){ return x*y },
            divide(x,y){ 
                if(y == 0){
                    _this.forceReset = true;
                    return 'AY, WATCH IT!';
                }
                else{
                    return x/y;
                }
            },
            percentage(x,y){ return (x/100) },
            positive_negative(x,y){ return (x >= 0 ? -Math.abs(x) : Math.abs(x)) }
        }
        let result = operators[this.currentOperation](parseFloat(this.previousOperand),parseFloat(this.currentOperand));
        
        this.currentOperand = result;
    }


    updateDisplay() {
        display.innerText = this.currentOperand;
    }

    initListeners(){
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
            })
        });
        
        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
            calculator.updateDisplay();
            calculator.setCurrentOperation(button.value);
            })
        });
        
        equalsButton.addEventListener('click', button => {
            calculator.compute();
            calculator.updateDisplay();
        });
        
        immediateOperationButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.setCurrentOperation(button.value);
                calculator.compute();
                calculator.updateDisplay();
            });
        })
        
        allClearButton.addEventListener('click', button => {
            calculator.clear();
            calculator.updateDisplay();
        });
    }
}

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const immediateOperationButtons = document.querySelectorAll('[data-immediate-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
let previousOperand = null;
let currentOperand = 0;
let currentOperation = null;

const calculator = new Calculator(previousOperand, currentOperand, currentOperation);

