async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); 
    return data;       
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;       
  }
}

fetchPosts();
