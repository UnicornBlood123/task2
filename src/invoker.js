import Calculator from "./сalculator.js";
import {PressButtonCommand,PressSignCommand,PressColorCommand} from './commands.js'

//отправитель
export default function  User() {
    let calculator = new Calculator();
    let commands = [],
        command = null;

    this.pressButton = function (value) {
        command = new PressButtonCommand(calculator, value);
        commands.push(command);
        command.execute();
    };

    this.pressSign = function (value) {
        command = new PressSignCommand(calculator, value);
        commands.push(command);
        command.execute();
    };

    this.pressColor = function (value) {
        command = new PressColorCommand(calculator, value);
        command.execute();
    };

    this.undo = function () {
        if (commands.length === 0) {
            console.log("Command stack is empty");
        } else {
            command = commands.pop();
            command.undo();
        }
    };

    this.getCount = function () {
        return calculator.getResult();
    };
}