const URL = 'http://localhost:3000';

export const getResults = (searchInput = '') =>
  console.log(`${URL}/posts?author=${searchInput}`) ||
  fetch(`${URL}/posts?author=${searchInput}`).then(response => response.json());
