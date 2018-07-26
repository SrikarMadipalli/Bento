import { createRecommendedCard } from "./recommendedView";
import { retrieveCollections } from "../myCollections/myCollectionService";

export function recommendedService() {
  const url = 'https://developers.zomato.com/api/v2.1/collections?city_id=20&count=3';
  const myheaders = {
    'user-key': 'e5bd18917e2e3f1f05532cc37f8ad7a3',
  };
  fetch(url, {
    method: 'GET',
    headers: myheaders,
  })
    .then(resp => resp.json())
    .then((data) => {
      const restos = data.collections; // Get the results
      return restos.map((collection) => { // Map through the results and for each run the code below
        createRecommendedCard(collection);
        let a1 = document.getElementById(`${collection.collection.collection_id}`);
        console.log("hello");
        console.log(`${collection.collection.collection_id}`);
        a1.onclick = () => {
          retrieveCollections(a1.id);
        }
      });
    })
}

