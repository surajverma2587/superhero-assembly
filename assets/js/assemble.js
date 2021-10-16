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

const renderSuperheroCards = function (superheroes) {
  const superheroesContainer = $("<div>")
    .addClass("d-flex justify-content-evenly flex-wrap")
    .attr("id", "superheroes-container");

  const constructSuperheroCardAndAppend = function (superhero) {
    const superheroCard = `<div class="card my-3" style="width: 18rem">
      <img
        src=${superhero.image.url}
        class="card-img-top"
        alt=${superhero.name}
        height="360px"
      />
      <div class="card-body text-center">
        <h4 class="card-title">${superhero.name}</h4>
        <h6>${superhero.biography["full-name"]}</h6>
        <div class="d-flex justify-content-evenly card-text my-3">
          <i class="fas fa-dumbbell"></i> ${getPowerStat(
            superhero.powerstats,
            "strength"
          )}
          <i class="fas fa-lightbulb"></i> ${getPowerStat(
            superhero.powerstats,
            "intelligence"
          )}
          <i class="fas fa-running"></i> ${getPowerStat(
            superhero.powerstats,
            "speed"
          )}
        </div>
        <div class="text-center">
          <button class="btn btn-primary" id=${
            superhero.id
          }>Add to Assembly</button>
        </div>
      </div>
    </div>`;

    superheroesContainer.append(superheroCard);
    searchResultsContainer.append(superheroesContainer);
  };

  superheroes.forEach(constructSuperheroCardAndAppend);

  // append superheroesContainer to DOM
};

const getPowerStat = function (powerstats, powerstatKey) {
  if (powerstats[powerstatKey] !== "null") {
    return powerstats[powerstatKey];
  } else {
    return "N/A";
  }
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

    // check if data is not empty for search
    if (data.response === "error") {
      // render no results component
      renderNoResults();
    } else {
      // render superhero cards
      renderSuperheroCards(data.results);
    }
  } else {
    // render error
    renderFormError();
  }
};

// add event listener for form
searchForm.on("submit", handleFormSubmit);
