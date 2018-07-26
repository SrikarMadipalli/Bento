import { searchResultsService } from "./searchService";

const searchApi = document.getElementById('searchApi');
searchApi.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    searchResultsService();
  }
});
