"use strict"; // Enforces stricter JavaScript rules to avoid common bugs

const readline = require("readline"); // Import Node.js readline module for CLI input/output
const fetch = require("node-fetch"); // Import fetch for Node.js

// Async function to fetch data from JSONPlaceholder API
async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // GET request to API

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`); // Throw error if request fails

    return await response.json(); // Parse and return JSON data
  } catch (error) {
    console.error("Error fetching data:", error.message); // Log error
    return []; // Return empty array if fetch fails
  }
}

// Function to search posts based on keyword
function searchPosts(posts, keyword) {
  const lowerKeyword = keyword.toLowerCase(); // Convert keyword once to avoid multiple .toLowerCase() calls
  return posts
    .filter(post => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();
      return title.includes(lowerKeyword) || body.includes(lowerKeyword);
    })
    .map(post => ({
      id: post.id,   // Return only id
      title: post.title // and title to keep output clean
    }));
}

// Helper function to ask a question and return a Promise
function askQuestion(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

// Main CLI program
async function main() {
  const posts = await fetchData(); // Fetch all posts from API

  if (posts.length === 0) {
    console.log("No data available. Exiting.");
    process.exit(1); // Exit if no data
  }

  // Setup readline interface for CLI
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("Welcome to the JSONPlaceholder CLI Search!");

  let exit = false;

  // Loop to repeatedly ask for user input until "exit"
  while (!exit) {
    const input = await askQuestion(rl, "\nEnter a search keyword (or type 'exit' to quit): ");

    if (input.toLowerCase() === "exit") {
      exit = true; // Set exit flag to true to break the loop
      console.log("Goodbye!");
      rl.close(); // Close readline interface
      break;
    }

    const results = searchPosts(posts, input);

    if (results.length === 0) {
      console.log("No matches found.");
    } else {
      console.log(`\nFound ${results.length} result(s):`);
      results.forEach(r => console.log(`ID: ${r.id} | Title: ${r.title}`));
    }
  }
}

// Run the program
main();
