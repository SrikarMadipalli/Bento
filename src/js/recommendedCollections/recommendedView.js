export function createHTMLElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}
export function createRecommendedCard(collection) {
  const recommendedCard = createHTMLElement(
    `<div class="col-lg-4 col-md-6 mb-5">
    <div class="card  narrower collection">
      <div class="view overlay zoom">
        <img src="${collection.collection.image_url}" class="card-img-top" alt="Card Image">
        <a>
          <div class="mask rgba-white-slight"></div>
        </a>
      </div>
      <div class="card-body">
        <h5 class="red-text card-title">${collection.collection.title}
        </h5>
        <p class="card-text grey-text">${collection.collection.description}</p>
        <button class="btn btn-danger" id="${ collection.collection.collection_id}" data-toggle="modal" data-target="#collectionModal">Add &#x2661</button>
      </div>
    </div>
  </div>`
  )
  document.getElementById('topRated').appendChild(recommendedCard);

}
