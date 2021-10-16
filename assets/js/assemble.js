const searchForm = $("#search-form");
const searchInput = $("#search-input");
const searchInputContainer = $("#search-input-container");
const searchResultsContainer = $("#search-results-container");
const ACCESS_TOKEN = "10166192522285724";
const BASE_URL = "https://superheroapi.com";
const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com";

const renderFormError = function () {
  const errorDiv = `<div id="search-input-error" class="form-text ms-1 text-danger">
    Please enter a superhero name.
  </div>`;

  searchInputContainer.append(errorDiv);
};

const renderNoResults = function () {
  const noResultsDiv = `<div class="alert alert-warning text-center" role="alert">
    No search results!!
  </div>`;

  searchResultsContainer.append(noResultsDiv);
};

const handleFormSubmit = async function (event) {
  event.preventDefault();

  // get user search value from input
  const searchValue = searchInput.val();

  // validate user input
  if (searchValue) {
    // if error is visible remove element
    if ($("#search-input-error").length) {
      $("#search-input-error").remove();
    }
    // make API request
    // construct my URL
    const url = `${CORS_ANYWHERE}/${BASE_URL}/api/${ACCESS_TOKEN}/search/${searchValue}`;

    // make the API request and get full response
    const response = await fetch(url);

    // get data from the response object
    const data = await response.json();
    console.log(data);

    // check if data is not empty for search
    if (data.response === "error") {
      // render no results component
      renderNoResults();
    } else {
      // render superhero cards
    }
  } else {
    // render error
    renderFormError();
  }
};

// add event listener for form
searchForm.on("submit", handleFormSubmit);
