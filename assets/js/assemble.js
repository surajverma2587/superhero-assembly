const searchForm = $("#search-form");
const searchInput = $("#search-input");
const searchInputContainer = $("#search-input-container");

const renderFormError = function () {
  const errorDiv = `<div id="search-input-error" class="form-text ms-1 text-danger">
    Please enter a superhero name.
  </div>`;

  searchInputContainer.append(errorDiv);
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
  } else {
    // render error
    renderFormError();
  }
};

// add event listener for form
searchForm.on("submit", handleFormSubmit);
