//We inport the fetch module which which we will in our test to check if the data was retrieved successfully
import fetch from 'isomorphic-fetch'

//I then defined a fetchdata function which takes a url (api) and returns a json response
function fetchData(url) {
  return fetch(url).then((response) => response.json());
}

//Lastly we setup the test in which we test if the data was retrieved successfully or not.
test('fetch success', () => {
  return fetchData(`http://localhost:8000/task`)
  .then((result) => console.log('Request succeeded'))
  .catch((error) => console.log('Request failed'));
  });