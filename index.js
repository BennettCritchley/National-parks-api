

async function getParks(searchTerm, maxResults) {
  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${searchTerm}&limit=${maxResults}&api_key=PMlWBFc8TTbmAV8m4dkAxuhAEhGFcqr3AAHT6gaH`;

  try {
    let response = await fetch(url)
    if (!response.ok) throw new Error('Data not fetched!');
    let responseJson = await response.json()
    return displayParks(responseJson);
  } catch(e){
      console.warn(err);
  }
}
// function getParks(searchTerm, maxResults) {
  // const url = `https://developer.nps.gov/api/v1/parks?stateCode=${searchTerm}&limit=${maxResults}&api_key=PMlWBFc8TTbmAV8m4dkAxuhAEhGFcqr3AAHT6gaH`;

  // fetch(url)
  //   .then((response) => response.json())
  //   .then((responseJson) => displayParks(responseJson))
  //   .catch((err) => {
  //     $("#error-message").text(`Something went wrong: ${err.message}`);
  //   });
// }

function displayParks(responseJson, parks) {
  let array = responseJson.data;
  $("#results-list").empty();
  
  // using an array of data then iterating over that array w/ .map(), forEach(), .every(), .filter(), .reduce()
  array.map((info) => {
    $("#results-list").append(`
      <li class="results-list">
        <h3>${info.fullName}</h3>
        <p>${info.description}</p>
        <h4>${info.url}</h4>
        <a href=${info.url} target="blank"> Click here</a>
      </li>`)
  })

  // using an object of data then iterating over that object w/ for-in or Object.entries(responseJson).forEach()
  // for (const p in responseJson) {
  //   $("#results-list").append(`
  //     ${property.fullName}: ${responseJson[property].fullName}`
  //   )
  // }

  //   Object.entries(responseJson).forEach(
  //     ([key, value]) => console.log(key, value)
  //     $("#results-list").append(`
  //       <li class="results-list">
  //         <h3>${responseJson.data[0].fullName}</h3>
  //         <p>${responseJson.data[0].description}</p>
  //         <p>${responseJson.data[0].url}</p>
  //       </li>`
  //     )
  // );
  $("#results").removeClass("hidden");
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    let searchTerm = $("#js-search-term").val();
    let maxResults = $("#js-max-results").val();
    getParks(searchTerm, maxResults);
  });
}
$(watchForm);