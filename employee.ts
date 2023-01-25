interface ICommand {
    execute(): void;
    undo(): void;
}

class Calculator {
    currentValue: number;

    constructor() {
        this.currentValue = 0;
    }

    add(value: number): void {
        this.currentValue += value;
        console.log(`Current value: ${this.currentValue}`);
    }

    subtract(value: number): void {
        this.currentValue -= value;
        console.log(`Current value: ${this.currentValue}`);
    }
}

class AddCommand implements ICommand {
    private calculator: Calculator;
    private value: number;

    constructor(calculator: Calculator, value: number) {
        this.calculator = calculator;
        this.value = value;
    }

    execute(): void {
        this.calculator.add(this.value);
    }

    undo(): void {
        this.calculator.subtract(this.value);
    }
}

class SubtractCommand implements ICommand {
    private calculator: Calculator;
    private value: number;

    constructor(calculator: Calculator, value: number) {
        this.calculator = calculator;
        this.value = value;
    }

    execute(): void {
        this.calculator.subtract(this.value);
    }

    undo(): void {
        this.calculator.add(this.value);
    }
}

class CalculatorInvoker {
    private commands: ICommand[] = [];

    executeCommand(command: ICommand): void {
        command.execute();
        this.commands.push(command);
    }

    undo(): void {
        const command = this.commands.pop();
        if (command) {
            command.undo();
        }
    }
}

const calculator = new Calculator();
const addCommand = new AddCommand(calculator, 10);
const subtractCommand = new SubtractCommand(calculator, 5);

const invoker = new CalculatorInvoker();
invoker.executeCommand(addCommand);      // Current value: 10
invoker.executeCommand(subtractCommand); // Current value: 5
invoker.undo();                         // Current value: 10
invoker.undo();                         // Current value: 0
