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
    return function(keyword) {
        searchCount++;
        console.log(`Search #${searchCount} for: "${keyword}"`);
    };
}

const trackSearch = createSearchTracker();

// Search function using filter + map
const searchUsers = (keyword) => {
    trackSearch(keyword); // closure call
    return users
        .filter(user => user.name.toLowerCase().includes(keyword.toLowerCase()))
        .map(user => ({ name: user.name, age: user.age }));
};

// Example searches
console.log(searchUsers("alice"));  
console.log(searchUsers("smith"));  
console.log(searchUsers("o"));      // matches names containing 'o'

// JSON example
const jsonData = JSON.stringify(users);
console.log("JSON Data:", jsonData);

const parsedData = JSON.parse(jsonData);
console.log("Parsed:", parsedData);
