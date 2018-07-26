import { createCollection, addToCollection, showCollections } from './myCollectionService';

const createCollectionButton = document.getElementById("createCollectionButton");
const selectCollectionButton = document.getElementById("selectCollectionButton");

createCollectionButton.onclick = () => {
  createCollection();
}

selectCollectionButton.onclick = () => {
  let selectedCollection = document.getElementById("selectedCollection");
  let value = selectedCollection.value;
  let id = selectedCollection.nextElementSibling.id;
  addToCollection(id, value);
}

showCollections();