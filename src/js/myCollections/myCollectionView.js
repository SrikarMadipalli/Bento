import { createHTMLElement } from "../recommendedCollections/recommendedView";
import { deleteCollection, showFromCollection, deleteFromCollection } from './myCollectionService';


export function myCreateButton() {
  const createButton = createHTMLElement(
    `<button type="button" class="btn btn-danger">&#x1f44e;</button>`
  )
  return createButton;
}

export function myCollectModalView(myCollection, collectModal, id) {
  const selectCollection = createHTMLElement(
    `<form id = "collectionForm">
    <div class="form-group" >
    <select class="form-control" id="selectedCollection">
      <option value="select">SELECT HERE</option>
    </select>
      <input type="text" class="form-control-plaintext" id="${id}" type ="hidden">

  </div>
  </form>`)
  collectModal.appendChild(selectCollection);

  myCollection.map(function (collection) {
    let opt = document.createElement("option");
    opt.value = collection.id;
    opt.innerHTML = collection.id;
    selectedCollection.appendChild(opt);
  })
}

export function myCollectionsView(collection, myCollections) {
  const divBody = createHTMLElement(
    `<div class="text-center" id ="div">
    <div class=".myCollection card indigo lighten-3 hoverable" data-toggle="modal" data-target="#myModal">
        ${collection.id}
    </div>
    <button type="button" id="${collection.id}" class="btn btn-danger">Remove &#x2717</button>
</div>`
  )
  myCollections.appendChild(divBody);
  const button = document.getElementById(`${collection.id}`)
  button.onclick = function () {
    deleteCollection(button.id);
  }
  const div = document.getElementById("div");
  div.onclick = function () {
    showFromCollection(collection.id);
  }
}

export function myCollectionModalView(id, collection, collectionName) {

  const myCollectionCreate = createHTMLElement(
    `<div class="col-lg-4 col-md-6 mb-5">
    <div class="card  narrower restaurants">
    <div class="view overlay zoom">
      <img src="${collection.img}" class="card-img-top" alt="Card Image">
      <a>
        <div class="mask rgba-white-slight"></div>
      </a>
    </div>
    <div class="card-body">
    <h5 class="red-text card-title">${collection.name}
    </h5>
      <p class="card-text grey-text"> ${collection.text}</p>
      <button class="btn btn-danger" id="${id}">Remove</button>
    </div>
  </div>
</div>`)
  const myCollectionModal = document.getElementById("myCollectionModal");
  myCollectionModal.appendChild(myCollectionCreate);
  const button = document.getElementById(`${id}`);
  button.onclick = () => {
    deleteFromCollection(id, collectionName);
  }
}