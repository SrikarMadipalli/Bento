import { createHTMLElement } from "../recommendedCollections/recommendedView";

export function showSearchResults(restaurants) {
  console.log(restaurants);
  const searchResults = createHTMLElement(
    `<div class="col-lg-3 col-md-6 mb-5">
    <div class="card  narrower restaurants">
      <div class="view overlay zoom">
        <img src="${restaurants.restaurant.featured_image}" class="card-img-top" alt="Card Image">
        <a>
          <div class="mask rgba-white-slight"></div>
        </a>
      </div>
      <div class="card-body">
      <h5 class="red-text card-title">${restaurants.restaurant.name}
      </h5>
        <p class="card-text grey-text"> average cost for two:Rs.${restaurants.restaurant.average_cost_for_two}</p>
        <button class="btn btn-danger" id="${restaurants.restaurant.R.res_id}" data-toggle="modal" data-target="#collectionModal">&#x2661</button>
      </div>
    </div>
  </div>`
  )
  document.getElementById('searchResults').appendChild(searchResults);
}