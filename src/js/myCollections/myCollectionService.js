import { myCollectionsView, myCollectionModalView, myCollectModalView } from "./myCollectionView";

const collectModal = document.getElementById("collectModal");
const myCollections = document.getElementById("myCollections");
const myCollectionModal = document.getElementById("myCollectionModal");

export function createCollection() {
  const createCollectionName = document.getElementById("createCollectionName");
  const jsonString = {
    "id": createCollectionName.value
  };
  let fetchData = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(jsonString) // body data type must match "Content-Type" header
  }

  let addUrl = "http://localhost:3000/myCollections";

  fetch(addUrl, fetchData)
    .then(data => {
      console.log(data);
      showCollections();
    });
}

export function retrieveCollections(id) {
  collectModal.innerHTML = "";
  let getUrl = "http://localhost:3000/myCollections";
  fetch(getUrl)
    .then((resp) => resp.json())
    .then(data => {
      let myCollection = data;
      myCollectModalView(myCollection, collectModal, id);
    })
}

export function showCollections() {
  myCollections.innerHTML = "";

  let getUrl = "http://localhost:3000/myCollections";
  fetch(getUrl)
    .then((resp) => resp.json())
    .then(data => {
      let myCollection = data;
      myCollection.map(collection => {
        myCollectionsView(collection, myCollections);
      })
    })
}
console.log("hper");
export function addToCollection(id, collectionName) {
  console.log(id);
  const div1 = document.getElementById(id).parentElement.parentElement;
  console.log(div1);
  const cardImage = div1.firstChild.nextSibling.firstChild.nextElementSibling;
  console.log(cardImage);
  const cardBody = div1.firstChild.nextSibling.nextSibling.nextSibling;
  const title = cardBody.firstChild.nextSibling;
  const about = title.nextSibling.nextSibling;
  const jsonString = {
    "id": id,
    "collection": collectionName,
    "img": cardImage.src,
    "name": title.innerHTML,
    "text": about.innerHTML
  };
  let fetchData = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(jsonString)
  }

  let addUrl = "http://localhost:3000/collections";
  fetch(addUrl, fetchData)
    .then(showFromCollection(collectionName));

}

export function showFromCollection(collectionName) {
  let getUrl = `http://localhost:3000/collections/?collection=${collectionName}`;
  myCollectionModal.innerHTML = "";
  fetch(getUrl)
    .then((resp) => resp.json())
    .then(data => {
      let collections = data;
      return collections.map(collection => {
        myCollectionModalView(collection, collectionName);
      })
    })
}

export function deleteFromCollection(id, collectionName) {
  let fetchData = {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrer: "no-referrer",
  }
  let deleteUrl = "http://localhost:3000/collections/" + id;

  fetch(deleteUrl, fetchData)
    .then(data => {
      showFromCollection(collectionName)
    });
}

export function deleteCollection(id) {
  let fetchData = {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrer: "no-referrer",
  }
  let deleteUrl = `http://localhost:3000/myCollections/${id}`;
  let getUrl = `http://localhost:3000/collections?collection=${id}`;
  fetch(deleteUrl, fetchData)
    .then(data => {
      showCollections();
    });
  fetch(getUrl).
    then((resp) => resp.json())
    .then(data => data.map(collection => {
      let dlt = `http://localhost:3000/collections/${collection.id}`;
      fetch(dlt, fetchData);
    }));
}