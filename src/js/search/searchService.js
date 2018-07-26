import { showSearchResults } from "./searchView";
import { retrieveCollections } from "../myCollections/myCollectionService";
export function searchResultsService() {
  const searchApi = document.getElementById('searchApi').value;
  const searchResults = document.getElementById('searchResults');
  const searchheaders = {
    'user-key': 'e5bd18917e2e3f1f05532cc37f8ad7a3',
  };

  const searchUrl = `https://developers.zomato.com/api/v2.1/search?q=${searchApi}&count=8`;

  searchResults.innerHTML = '';
  fetch(searchUrl, {
    method: 'GET',
    headers: searchheaders,
  })
    .then(resp => resp.json())
    .then((data) => {
      const restos = data.restaurants; // Get the results
      console.log('Test');
      return restos.map((restaurants) => { // Map through the results and for each run the code below
        showSearchResults(restaurants);
        let a1 = document.getElementById(`${restaurants.restaurant.R.res_id}`);
        a1.onclick = () => {
          retrieveCollections(a1.id);
        }
      });
    });
}