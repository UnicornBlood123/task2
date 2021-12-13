//интерфейс
function Command() {
    this.execute = function () {
    };
    this.undo = function () {
    };
};

//команда нажатия на цифру или точку
function PressButtonCommand(calculator, value) {
    const undoResult = calculator.getResult();
    this.execute = function () {
        calculator.pressButton(value);
    };

    this.undo = function () {
        calculator.setResult(undoResult);
    };
};
PressButtonCommand.prototype = new Command();
PressButtonCommand.prototype.constructor = PressButtonCommand;

//команда нажатия на знак операции
function PressSignCommand(calculator, value) {
    const undoResult = calculator.getResult();
    this.execute = function () {
        calculator.pressSign(value);
    };

    this.undo = function () {
        calculator.setResult(undoResult);
    };
};
PressSignCommand.prototype = new Command();
PressSignCommand.prototype.constructor = PressSignCommand;

//команда нажатия на смену цвета
function PressColorCommand (calculator, value) {
    this.execute = function () {
        calculator.setColor(value);
    };
};
PressColorCommand.prototype = new Command();
PressColorCommand.prototype.constructor = PressColorCommand;

export {Command,PressButtonCommand,PressSignCommand,PressColorCommand}