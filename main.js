// select the "Send Request" button
const sendRequestBtn = document.querySelector("#sendRequestBtn");

// create a variable to hold the HTML template for the results
let resultsHTML = "";

// define a function to handle the API request and display the results
async function handleRequest() {
  // select the user's input for the city
  const cityInput = document.querySelector("#cityInput").value;
     
  try {
    // send a request to the API with the user's input
    const response = await fetch(`https://api.api-ninjas.com/v1/worldtime?city=${cityInput}`, {
      headers: {
        "x-api-key": "6LSQhXixhNrKtoSskVSj4WRu4ErPd6H6OiB64d4k"
      }
    });

    // parse the response as JSON
    const data = await response.json();

    // if the API returned an error message, display it on the page
    if (data.error) {
      document.querySelector(".results-container").innerHTML = 
      `<p class="error">${data.error}</p>`;
    } else {
      // otherwise, generate an HTML template with the results
      resultsHTML = `
        <div class="time">
          <span>${data.hour} h</span>
          <span>${data.minute} m</span>
          <span>${data.second} s</span>
        </div>

        <div class="zone-results">
          <div class="timezone card">
            <h5>timezone :</h5>
            <p>${data.timezone}</p>
          </div>
          <div class="date card">
            <h5>date :</h5>
            <p>${data.date}</p>
          </div>
          <div class="day-of-week card">
            <h5>day of week :</h5>
            <p>${data.day_of_week}</p>
          </div>
        </div>
      `;
      
      // insert the HTML template into the results container
      document.querySelector(".results-container").innerHTML = resultsHTML;
    }

  } catch (error) {
    // log any errors to the console
    console.log(error);
  }
}

// attach the handleRequest function to the "Send Request" button
sendRequestBtn.onclick = handleRequest;
