const topRated = document.getElementById('topRated');
const myCollections = document.getElementById('myCollections');
const collectModal = document.getElementById("collectModal");
const myCollectionModal = document.getElementById("myCollectionModal");
const createCollectionButton = document.getElementById("createCollectionButton");
const selectCollectionButton = document.getElementById("selectCollectionButton");
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
      const div = document.createElement('div');
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const cardImage = document.createElement('img');
      const a = document.createElement('a');
      const div3 = document.createElement('div');
      const cardBody = document.createElement('div');
      const title = document.createElement('h5');
      const about = document.createElement('p');
      const a1 = document.createElement('button');

      div.className = 'col-lg-4 col-md-6 mb-5';
      div1.className = 'card  narrower collection';
      div2.className = 'view overlay zoom';
      cardImage.className = 'card-img-top';
      div3.className = 'mask rgba-white-slight';
      cardBody.className = 'card-body';
      title.className = 'red-text';
      about.className = 'card-text grey-text';
      a1.className = 'btn btn-danger';
      a1.innerHTML = 'Add &#x2661';
      a1.id = collection.collection.collection_id;
      a1.setAttribute("data-toggle", "modal");
      a1.setAttribute("data-target", "#collectionModal");

      cardImage.src = collection.collection.image_url;
      title.innerHTML = `${collection.collection.title}`;
      about.innerHTML = `${collection.collection.description}`;

      a.appendChild(div3);
      div2.appendChild(a);
      div2.appendChild(cardImage);
      div1.appendChild(div2);
      cardBody.appendChild(title);
      cardBody.appendChild(about);
      cardBody.appendChild(a1);
      div1.appendChild(cardBody);
      div.appendChild(div1);
      topRated.appendChild(div);
      const id = a1.id;
      a1.onclick = () => {
        retrieveCollections(a1.id);
      }
    });
  })

console.log('heel');
const searchApi = document.getElementById('searchApi');
searchApi.addEventListener('keyup', (event) => {
  console.log('heelpp');
  event.preventDefault();
  if (event.keyCode === 13) {
    console.log('heel');
    const searchApi = document.getElementById('searchApi').value;
    const searchResults = document.getElementById('searchResults');
    const searchheaders = {
      'user-key': 'e5bd18917e2e3f1f05532cc37f8ad7a3',
    };
    const searchUrl = `https://developers.zomato.com/api/v2.1/search?q=${searchApi}&count=8`;
    console.log('Ladies');
    console.log(searchApi);
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
          const div = document.createElement('div');
          const div1 = document.createElement('div');
          const div2 = document.createElement('div');
          const cardImage = document.createElement('img');
          const a = document.createElement('a');
          const div3 = document.createElement('div');
          const cardBody = document.createElement('div');
          const title = document.createElement('h5');
          const about = document.createElement('p');
          const location = document.createElement('p');
          const a1 = document.createElement('button');

          div.className = 'col-lg-3 col-md-6 mb-5';
          div1.className = 'card  narrower restaurants';
          div2.className = 'view overlay zoom';
          cardImage.className = 'card-img-top';
          div3.className = 'mask rgba-white-slight';
          cardBody.className = 'card-body text-center';
          title.className = 'red-text';
          about.className = 'card-text grey-text';
          location.className = 'card-text grey-text';
          a1.className = 'btn btn-danger btn-md';
          a1.innerHTML = '&#x2661';
          a1.id = restaurants.restaurant.R.res_id;
          a1.setAttribute("data-toggle", "modal");
          a1.setAttribute("data-target", "#collectionModal");

          title.innerHTML = `${restaurants.restaurant.name}`;
          about.innerHTML = `average cost for two:Rs.${`${restaurants.restaurant.average_cost_for_two}`}`;
          cardImage.src = restaurants.restaurant.featured_image;
          location.innerHTML = `Nav:${`${restaurants.restaurant.location.locality}`}`;
          a.appendChild(div3);
          div2.appendChild(a);
          div2.appendChild(cardImage);
          div1.appendChild(div2);
          cardBody.appendChild(title);
          cardBody.appendChild(about);
          cardBody.appendChild(location);
          cardBody.appendChild(a1);
          div1.appendChild(cardBody);
          div.appendChild(div1);
          searchResults.appendChild(div);

          a1.onclick = () => {
            retrieveCollections(a1.id);
          }
        });
      });
  }
});

$(document).ready(() => {
  $(window).scroll(() => {
    const scroll = $(window).scrollTop();
    if (scroll > 700) {
      $(".navbar").css("background", "pink");
    }
    if (scroll < 700) {
      $(".navbar").css("background", "transparent");
    }
  })
})

const createButton = html => {
  const button = document.createElement('button');
  button.type = "button";
  button.className = "btn btn-danger add ";
  button.innerHTML = html;
  return button;
};              // function to create a button

createCollectionButton.onclick = () => {
  createCollection();
}

function createCollection() {
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
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(jsonString)
  }
  let addUrl = "http://localhost:3000/myCollections";

  fetch(addUrl, fetchData)
    .then(data => {
      console.log(data);
      showCollections();
    });

}

function retrieveCollections(id) {
  collectModal.innerHTML = "";
  const getUrl = "http://localhost:3000/myCollections";
  fetch(getUrl)
    .then((resp) => resp.json())
    .then(data => {
      console.log(data);
      let myCollection = data;
      const form = document.createElement("form");
      const select = document.createElement("select");
      const option = document.createElement("option");
      const input = document.createElement("input");
      input.type = "hidden";
      input.id = id;
      form.id = "collectionForm";
      form.className = "form-group";
      select.id = "selectedCollection";
      option.value = "select";
      option.innerHTML = "--SELECT--";
      select.appendChild(option);

      myCollection.map(collection => {
        const opt = document.createElement("option");
        opt.value = collection.id;
        opt.innerHTML = collection.id;
        select.appendChild(opt);
      })
      form.appendChild(select);
      form.appendChild(input);
      collectModal.appendChild(form);
    })
}

selectCollectionButton.onclick = () => {
  const selectedCollection = document.getElementById("selectedCollection");
  const value = selectedCollection.value;
  const id = selectedCollection.nextSibling.id;
  addToCollection(id, value);
}

function showCollections() {
  myCollections.innerHTML = "";

  const getUrl = "http://localhost:3000/myCollections";
  fetch(getUrl)
    .then((resp) => resp.json())
    .then(data => {
      console.log(data);
      let myCollection = data;
      myCollection.map(collection => {
        const outerDiv = document.createElement('div');
        const div = document.createElement('div');
        const button = createButton("&#x1f44e;");
        outerDiv.className = "text-center";
        button.id = collection.id;
        button.classList.remove("add");
        button.classList.add("delete");
        div.className = "myCollection   card indigo lighten-3 hoverable";
        div.setAttribute("data-toggle", "modal");
        div.setAttribute("data-target", "#myModal")
        div.innerHTML = collection.id;
        outerDiv.appendChild(div);
        outerDiv.appendChild(button);
        myCollections.appendChild(outerDiv);
        button.onclick = () => {
          deleteCollection(button.id);
        }
        div.onclick = () => {
          showFromCollection(collection.id);
        }
      })
    })
}
function addToCollection(id, collectionName) {
  const div1 = document.getElementById(id).parentElement.parentElement;
  const cardImage = div1.firstChild.firstChild.nextSibling;
  const cardBody = div1.firstChild.nextSibling;
  const title = cardBody.firstChild;
  const about = title.nextSibling;
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
  let addUrl = "http://localhost:3000/collections";

  fetch(addUrl, fetchData)
    .then(showFromCollection(collectionName));        //Adding to json-server and calling reload function
  console.log(div1);
}

showCollections();

function showFromCollection(collectionName) {
  const getUrl = `http://localhost:3000/collections/?collection=${collectionName}`;
  myCollectionModal.innerHTML = "";
  fetch(getUrl)
    .then((resp) => resp.json())
    .then(data => {
      let collections = data; // Get the results
      return collections.map(collection => {
        // Map through the results and for each run the code below
        const div = document.createElement('div'); //  Create the elements we need

        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const cardImage = document.createElement('img');
        const a = document.createElement('a');
        const div3 = document.createElement('div');
        const cardBody = document.createElement('div');
        const title = document.createElement('h5');
        const about = document.createElement('p');
        const location = document.createElement('p');
        const a1 = document.createElement('a');

        div.className = 'col-lg-4 col-md-6 mb-5';
        div1.className = 'card  narrower collection';
        div2.className = 'view overlay zoom';
        cardImage.className = 'card-img-top';
        div3.className = 'mask rgba-white-slight';
        cardBody.className = 'card-body';
        title.className = 'red-text';
        about.className = 'card-text grey-text';
        a1.className = 'btn btn-danger';
        a1.innerHTML = 'Remove &#x2717';
        a1.id = collection.id;
        const id = a1.id;

        cardImage.src = `${collection.img}`;  // Add the source of the image to be the src of the img element
        title.innerHTML = `${collection.name}`;
        about.innerHTML = `${collection.text}`; // Make the HTML of our span to be the first and last name of our author

        a.appendChild(div3);
        div2.appendChild(a);
        div2.appendChild(cardImage);
        div1.appendChild(div2);
        cardBody.appendChild(title);
        cardBody.appendChild(about);
        cardBody.appendChild(location);
        cardBody.appendChild(a1);
        div1.appendChild(cardBody);
        div.appendChild(div1);
        myCollectionModal.appendChild(div);

        a1.onclick = () => {
          deleteFromCollection(id);
        }
      })
    })
}

function deleteFromCollection(id, collectionName) {
  let fetchData = {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  }
  let deleteUrl = `http://localhost:3000/collections/${id}`;

  fetch(deleteUrl, fetchData)
    .then(data => {
      showFromCollection(collectionName)
    });
}

function deleteCollection(id) {
  let fetchData = {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  }
  let deleteUrl = `http://localhost:3000/myCollections/${id}`;

  fetch(deleteUrl, fetchData)
    .then(data => {
      console.log(data);
      showCollections();
    });
}
