"use strict";

// Sample data
const users = [
    { id: 1, name: "Alice Johnson", age: 25 },
    { id: 2, name: "Bob Smith", age: 30 },
    { id: 3, name: "Charlie Brown", age: 35 },
    { id: 4, name: "David Wilson", age: 28 }
];

// Closure to track searches
function createSearchTracker() {
    let searchCount = 0;
    return function() {
        searchCount++;
        return searchCount; // return count instead of logging
    };
}

const trackSearch = createSearchTracker();

// Search function using filter + map
const searchUsers = (keyword) => {
    const searchNumber = trackSearch(); // get search count
    const lowerKeyword = keyword.toLowerCase(); // save lowercase once

    const results = users
        .filter(user => {
            const lowerName = user.name.toLowerCase(); // save lowercase once
            return lowerName.includes(lowerKeyword);
        })
        .map(user => ({ name: user.name, age: user.age }));

    console.log(`Search #${searchNumber} for: "${keyword}"`);
    return {
        keyword,
        count: results.length,
        results
    };
};

// Example searches
console.log(searchUsers("alice"));
console.log(searchUsers("smith"));
console.log(searchUsers("o"));

// JSON example
const jsonData = JSON.stringify(users);
console.log("JSON Data:", jsonData);

const parsedData = JSON.parse(jsonData);
console.log("Parsed:", parsedData);
