const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const quotes = [
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Start where you are. Use what you have. Do what you can. – Arthur Ashe",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis"
];

function showMenu(name) {
    console.log(`\nHello, ${name}! What would you like to do?`);
    console.log("1. Show today's date");
    console.log("2. Print a motivational quote");
    console.log("3. Exit");

    rl.question("Enter your choice (1-3): ", (choice) => {
        switch (choice.trim()) {
            case '1':
                console.log(`\n Today's date is: ${new Date().toLocaleDateString()}`);
                showMenu(name);
                break;
            case '2':
                const quote = quotes[Math.floor(Math.random() * quotes.length)];
                console.log(`\n ${quote}`);
                showMenu(name);
                break;
            case '3':
                console.log("\n Goodbye!");
                rl.close();
                break;
            default:
                console.log("\n Invalid choice. Please try again.");
                showMenu(name);
        }
    });
}

// Start the app
console.log("Welcome to the CLI App!");
rl.question("What's your name? ", (name) => {
    showMenu(name.trim());
});
