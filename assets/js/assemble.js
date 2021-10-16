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
  const noResultsDiv = `<div class="alert alert-warning text-center" role="alert" id="no-results-container">
    No search results!!
  </div>`;

  searchResultsContainer.append(noResultsDiv);
};

const renderSuperheroCards = function (superheroes) {
  const superheroesContainer = $("<div>")
    .addClass("d-flex justify-content-evenly flex-wrap")
    .attr("id", "superheroes-container");

  const constructSuperheroCardAndAppend = function (superhero) {
    const superheroObject = getSuperheroObject(superhero);

    const superheroCard = `<div class="card my-3" style="width: 18rem">
      <img
        src=${superheroObject.imageUrl}
        class="card-img-top"
        alt=${superheroObject.name}
        height="360px"
      />
      <div class="card-body text-center">
        <h4 class="card-title">${superheroObject.name}</h4>
        <h6>${superheroObject.fullName}</h6>
        <div class="d-flex justify-content-evenly card-text my-3">
          <i class="fas fa-dumbbell"></i> ${superheroObject.strength}
          <i class="fas fa-lightbulb"></i> ${superheroObject.intelligence}
          <i class="fas fa-running"></i> ${superheroObject.speed}
        </div>
        <div class="text-center">
          <button class="btn btn-primary" id=${superheroObject.id} name="assemble-btn">Add to Assembly</button>
        </div>
      </div>
    </div>`;

    superheroesContainer.append(superheroCard);
    searchResultsContainer.append(superheroesContainer);
  };

  superheroesContainer.on("click", addToAssembly);

  if ($("#no-results-container").length) {
    $("#no-results-container").remove();
  }

  superheroes.forEach(constructSuperheroCardAndAppend);
};

const addToAssembly = async function (event) {
  const target = $(event.target);

  if (target.is('button[name="assemble-btn"]')) {
    const superheroId = target.attr("id");

    const url = `${CORS_ANYWHERE}/${BASE_URL}/api/${ACCESS_TOKEN}/${superheroId}`;

    const response = await fetch(url);
    const data = await response.json();

    const superheroObject = getSuperheroObject(data);
    console.log(superheroObject);

    // get teams from LS
    const myTeam = getFromLocalStorage("Team A", []);

    myTeam.push(superheroObject);

    console.log(myTeam);

    localStorage.setItem("Team A", JSON.stringify(myTeam));
  }
};

const getPowerStat = function (powerstats, powerstatKey) {
  if (powerstats[powerstatKey] !== "null") {
    return powerstats[powerstatKey];
  } else {
    return "N/A";
  }
};

const getSuperheroObject = function (superhero) {
  return {
    id: superhero.id,
    imageUrl: superhero.image.url,
    name: superhero.name,
    fullName: superhero.biography["full-name"],
    strength: getPowerStat(superhero.powerstats, "strength"),
    intelligence: getPowerStat(superhero.powerstats, "intelligence"),
    speed: getPowerStat(superhero.powerstats, "speed"),
  };
};

const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
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
      if ($("#superheroes-container").length) {
        $("#superheroes-container").remove();
      }
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
