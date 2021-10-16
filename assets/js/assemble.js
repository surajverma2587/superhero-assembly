const searchForm = $("#search-form");
const searchInput = $("#search-input");
const searchInputContainer = $("#search-input-container");
const ACCESS_TOKEN = "10166192522285724";
const BASE_URL = "https://superheroapi.com";

const renderFormError = function () {
  const errorDiv = `<div id="search-input-error" class="form-text ms-1 text-danger">
    Please enter a superhero name.
  </div>`;

  searchInputContainer.append(errorDiv);
};

const handleResponse = function (response) {
  return response.json();
};

const renderSuperheroCards = function (data) {
  console.log(data);
};

const handleFormSubmit = function (event) {
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
    const url = `${BASE_URL}/api/${ACCESS_TOKEN}/search/${searchValue}`;

    fetch(url).then(handleResponse).then(renderSuperheroCards);
  } else {
    // render error
    renderFormError();
  }
};

// add event listener for form
searchForm.on("submit", handleFormSubmit);
