async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();  // Convert response to JSON
    console.log(data);                   // Log data to console
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchPosts();
