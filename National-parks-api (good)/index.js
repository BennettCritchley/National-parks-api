"use strict";
// Formats my query params so that it comes out as a proper url
const searchURL = "https://developer.nps.gov/api/v1/parks"
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
};

// build state codes params)
function buildStateParams(states) {
  let stateParams = [];
  states.forEach((state) => {
    stateParams.push(`stateCode=${state}`)
  });
  return stateParams.join('&');
}

// tells my param formatter what the params are then takes those and fetches the url based off inputed data
function getParks(searchTerm, maxResults) {
 const stateParams = buildStateParams(searchTerm);
 console.log(stateParams);
  const params = {
    limit: maxResults,
    start: 0,
    "api_key": "PMlWBFc8TTbmAV8m4dkAxuhAEhGFcqr3AAHT6gaH"
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString + '&' + stateParams;
  console.log(url)

  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => displayParks(responseJson))
    .catch((err) => {
      $("#error-message").text(`Something went wrong: ${err.message}`);
    });
}


// displays selected data to the page then removes the hidden class
function displayParks(responseJson) {
  let array = responseJson.data;
  $("#results-list").empty();
  // using an array of data then iterating over that array w/ .map(), forEach(), .every(), .filter(), .reduce()
  array.map((info) => {
    $("#results-list").append(`
      <li class="results-list">
        <h3>${info.fullName}</h3>
        <p>${info.description}</p>
        <p>${info.states}</p>
        <h4>${info.url}</h4>
        <a href=${info.url} target="blank"> Click here</a>
      </li>`)
  })
  $("#results").removeClass("hidden");
}

// Watches the go button for a submit then changes the values to new names 
function watchForm() {
  console.log('App loaded.')
  $("form").submit((event) => {
    event.preventDefault();
    let searchTerm = $("#js-search-term").val().trim().toUpperCase().split(',');
    let maxResults = $("#js-max-results").val().trim();
    getParks(searchTerm, maxResults);
    console.log(searchTerm);
  });
}
$(watchForm);