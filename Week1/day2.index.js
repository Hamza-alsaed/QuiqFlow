"use strict"; // enforce strict mode

const readline = require("readline/promises"); 
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

const appName = "Simple CLI Calculator";
let running = true;
const version = 1.0;

console.log(`${appName} v${version}`);
console.log("----------------------");

async function mainMenu() {
    while (running) {
        console.log("\nMenu:");
        console.log("1. Addition");
        console.log("2. Subtraction");
        console.log("3. Multiplication");
        console.log("4. Division");
        console.log("5. Exit");

        let choice;
        while (true) {
            const inputChoice = await rl.question("Enter your choice (1-5): ");
            choice = Number(inputChoice);
            if (!Number.isNaN(choice) && choice >= 1 && choice <= 5) {
                break; // valid input
            }
            console.log("Invalid choice. Please enter a number between 1 and 5.");
        }

        if (choice === 5) {
            console.log("Exiting... Goodbye!");
            running = false;
            break;
        }

        let num1, num2;
        while (true) {
            num1 = Number(await rl.question("Enter first number: "));
            if (!Number.isNaN(num1)) break;
            console.log("Invalid input. Please enter a valid number.");
        }
        while (true) {
            num2 = Number(await rl.question("Enter second number: "));
            if (!Number.isNaN(num2)) break;
            console.log("Invalid input. Please enter a valid number.");
        }

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
    }
    rl.close();
}

mainMenu();
