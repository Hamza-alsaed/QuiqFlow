"use strict"; // Enforces stricter rules in JavaScript (helps avoid bugs)

// Import readline module for CLI input/output
const readline = require("readline");

// Fetch data from API
async function fetchData() {
  try {
    // Make GET request to JSONPlaceholder posts endpoint
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    // If response is not OK (status not 200-299), throw an error
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    // Parse and return JSON data
    return await response.json();
  } catch (error) {
    // If there’s any error (network/API), log it and return empty array
    console.error("Error fetching data:", error.message);
    return [];
  }
}


// Search and filter posts
function searchPosts(posts, keyword) {
  return posts
    // Filter: check if title OR body contains the keyword (case-insensitive)
    .filter(post =>
      post.title.toLowerCase().includes(keyword.toLowerCase()) ||
      post.body.toLowerCase().includes(keyword.toLowerCase())
    )
    // Map: return only post ID and title to keep output clean
    .map(post => ({
      id: post.id,
      title: post.title
    }));
}

// Main CLI program
async function main() {
  // Fetch all posts from API
  const posts = await fetchData();

  // Exit if no data available
  if (posts.length === 0) {
    console.log("No data available. Exiting.");
    process.exit(1);
  }

  // Create readline interface for CLI input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Function to repeatedly ask the user for search keywords
  function askQuestion() {
    rl.question("\nEnter a search keyword (or type 'exit' to quit): ", (input) => {
      // If user types "exit", close the CLI
      if (input.toLowerCase() === "exit") {
        console.log("Goodbye!");
        rl.close();
        return;
      }

      // Search posts based on user input
      const results = searchPosts(posts, input);

      // If no matches found, tell the user
      if (results.length === 0) {
        console.log("No matches found.");
      } else {
        // Otherwise, display the results
        console.log(`\nFound ${results.length} result(s):`);
        results.forEach(r => console.log(`ID: ${r.id} | Title: ${r.title}`));
      }

      // Ask for another search keyword
      askQuestion();
    });
  }

  // Welcome message
  console.log("Welcome to the JSONPlaceholder CLI Search!");
  
  // Start first question
  askQuestion();
}

// Run the program
main();
