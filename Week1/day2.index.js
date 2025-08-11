"use strict"; // enforce strict mode

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var appName = "Simple CLI Calculator";
let running = true;
const version = 1.0;

console.log(`${appName} v${version}`);
console.log("----------------------");

// Ask a question and return a Promise
function ask(question) {
    return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

async function mainMenu() {
    while (running) {
        console.log("\nMenu:");
        console.log("1. Addition");
        console.log("2. Subtraction");
        console.log("3. Multiplication");
        console.log("4. Division");
        console.log("5. Exit");

        let choice = Number(await ask("Enter your choice (1-5): "));

        switch (choice) {
            case 1:
            case 2:
            case 3:
            case 4:
                let num1 = Number(await ask("Enter first number: "));
                let num2 = Number(await ask("Enter second number: "));

                // Nullish coalescing example
                num1 = num1 ?? 0;
                num2 = num2 ?? 0;

                if (choice === 1) {
                    console.log(`Result: ${num1 + num2}`);
                } else if (choice === 2) {
                    console.log(`Result: ${num1 - num2}`);
                } else if (choice === 3) {
                    console.log(`Result: ${num1 * num2}`);
                } else if (choice === 4) {
                    if (num2 === 0) {
                        console.log("Division by zero is not allowed.");
                    } else {
                        console.log(`Result: ${num1 / num2}`);
                    }
                }
                break;

            case 5:
                console.log("Exiting... Goodbye!");
                running = false;
                break;

            default:
                console.log("Invalid choice, please try again.");
                break;
        }
    }
    rl.close();
}

mainMenu();
