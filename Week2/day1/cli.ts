import readline from "readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Create readline interface
const rl = readline.createInterface({ input, output });

// App metadata
const appName: string = "Simple CLI Calculator";
let running: boolean = true;
const version: number = 1.0;

console.log(`${appName} v${version}`);
console.log("----------------------");

// ---- Type Definitions ----

// Simulating AI-like inputs
interface NumberInput {
  prompt: string;   // message shown to user/AI
  value?: number;   // parsed numeric value
}

interface TextInput {
  prompt: string;   // message shown to user/AI
  text?: string;    // user or AI string response
}

// Output of calculator operation
interface CalculationResult {
  operation: "addition" | "subtraction" | "multiplication" | "division";
  input1: number;
  input2: number;
  result?: number;  // optional in case of error (e.g., division by zero)
  error?: string;   // explanation if no result
}

// Menu choices
enum MenuChoice {
  Addition = 1,
  Subtraction,
  Multiplication,
  Division,
  Exit
}

// ---- Main Program ----

async function mainMenu(): Promise<void> {
  while (running) {
    console.log("\nMenu:");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication");
    console.log("4. Division");
    console.log("5. Exit");

    const choice = await askMenuChoice();

    if (choice === MenuChoice.Exit) {
      console.log("Exiting... Goodbye!");
      running = false;
      break;
    }

    const num1 = await askNumber({ prompt: "Enter first number: " });
    const num2 = await askNumber({ prompt: "Enter second number: " });

    const result = performCalculation(choice, num1, num2);

    // Output in a structured, AI-style JSON-like format
    console.log("Calculation Result:");
    console.log(JSON.stringify(result, null, 2));
  }
  rl.close();
}

// ---- Helper Functions ----

// Menu choice
async function askMenuChoice(): Promise<MenuChoice> {
  while (true) {
    const inputChoice: TextInput = { prompt: "Enter your choice (1-5): " };
    inputChoice.text = await rl.question(inputChoice.prompt);

    const parsed = Number(inputChoice.text);

    if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= 5) {
      return parsed as MenuChoice;
    }
    console.log("Invalid choice. Please enter a number between 1 and 5.");
  }
}

// Ask for numbers with type safety
async function askNumber(inputData: NumberInput): Promise<number> {
  while (true) {
    const answer = await rl.question(inputData.prompt);
    const parsed = Number(answer);
    if (!Number.isNaN(parsed)) {
      inputData.value = parsed;
      return parsed;
    }
    console.log("Invalid input. Please enter a valid number.");
  }
}

// Perform the actual calculation
function performCalculation(choice: MenuChoice, num1: number, num2: number): CalculationResult {
  switch (choice) {
    case MenuChoice.Addition:
      return { operation: "addition", input1: num1, input2: num2, result: num1 + num2 };

    case MenuChoice.Subtraction:
      return { operation: "subtraction", input1: num1, input2: num2, result: num1 - num2 };

    case MenuChoice.Multiplication:
      return { operation: "multiplication", input1: num1, input2: num2, result: num1 * num2 };

    case MenuChoice.Division:
      if (num2 === 0) {
        return { operation: "division", input1: num1, input2: num2, error: "Division by zero" };
      }
      return { operation: "division", input1: num1, input2: num2, result: num1 / num2 };

    default:
      return { operation: "addition", input1: num1, input2: num2, error: "Unknown operation" };
  }
}

mainMenu();
