// Declarations (api key is free and therefore I don't care if it's publicly visible)
let apiKey = "7b1ba3a9818619c3079e45f400752294";
let historyButtonClasses = "btn btn-secondary border text-left text-light px-3 py-2";
let dataCityAttr = "data-cityName";

// Load history list from local storage
let cityHistory = JSON.parse(localStorage.getItem("city_history"));
if (!cityHistory) {
    cityHistory = [];
}

// This function rendors the history list
function renderCityHistory() {
    // First, the function empties out the previous search history
    let searchHistory = $("#search-history").empty();
  
    // For each city in the city history array...
    cityHistory.forEach(function(cityName) {
      // The function creates a button and add bootstrap classes to it
      let buttonEle = $("<button>").addClass(historyButtonClasses);
      buttonEle.attr(dataCityAttr, cityName);
      buttonEle.text(cityName);
      // Then appends the buttons to the search history container
      searchHistory.append(buttonEle);
    });
  }

// This function adds a city to the history section
function addCitytoHistory(cityName) {
    // The function only adds to history if the city isn't already in history
    if (!cityHistory.includes(cityName)) {
        cityHistory.push(cityName);
        localStorage.setItem("city_history", JSON.stringify(cityHistory));
        renderCityHistory();
    }
}

// This function handles the search after the necessary event occurs
function handleSubmitSearch(event) {
    // To prevent the page from reloading...
    event.preventDefault();

    // Get city's name from the search bar
    let cityName = $("#input-search").val().trim();

    // Turns search box empty after submitting
    $("#input-search").val("");
    // Add the city to our search history
    addCitytoHistory(cityName);
    // Render the city's weather
    renderCityWeather(cityName);
}

// This function renders button to display weather data depending on what city name is stored in the button
function handleHistoryBtnClick(event) {
    if (event.target.matches("button")) {
      renderCityWeather($(event.target).attr(dataCityAttr));
    }
  }

// This function gives the image location of the icon used in the OpenWeather API
function getIcon(code) {
    return "https://openweathermap.org/img/w/" + code + ".png";
}

// This function changes the styling of the UV index element in the HTML
function uviElementStyle(uvi) {
    if (uvi <= 2) {
        return "background-color: seagreen; color: white;";
    } else if (uvi <= 5) {
        return "background-color: yellow; color: black";
    } else if (uvi <= 7) {
        return "background-color: darkorange; color: black;";
    } else if (uvi <= 10) {
        return "background-color: red; color: white;";
    } else {
        return "background-color: orchid; color: black;";
    }
}

// This function renders the weather data for the city that the user inputs
function renderCityWeather(cityName) {
    // Hide info divs on the page since they display nothing yet
    $("#todays-weather").attr("style", "display: none;");
    $("#uv-today-element").attr("style", "display: none;");
    $("#next-weather").attr("style", "display: none;");

    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + cityName + "&appid=" + apiKey;

    // First we fetch data from the Current Weather Data API
    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Current Weather Data Fetch Response \n-------------');
            console.log(data);

            let oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=minutely,hourly&lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey;

            // Next we use the coordinates from Current Weather API Data to get the One Call API data for all the other info
            // This is because the One Call API requires coordinates (longitude and latitude values) in order to retrieve the data
            fetch(oneCallURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (oneCallData) {
                    console.log('One Call API Fetch Response \n-------------');
                    console.log(oneCallData);

                    // Now display the necessary data onto the page, the dt represents the date, given in unix, UTC format
                    // We use Moment.js * 1000 to convert the date to a readable format 
                    $("#date-today").text("(" + moment(oneCallData.daily[0].dt * 1000).format("l") + ")");
                    $("#icon").attr("src", getIcon(oneCallData.daily[0].weather[0].icon))
                    $("#temp-today").text(oneCallData.daily[0].temp.day.toString());
                    $("#humid-today").text(oneCallData.daily[0].humidity);
                    $("#wind-today").text(oneCallData.daily[0].wind_speed);
                    $("#uv-today").text(oneCallData.daily[0].uvi);

                    // Change style of UV Index element using the function uviElementStyle that we declared earlier
                    $("#uv-today").attr("style", uviElementStyle(oneCallData.daily[0].uvi));

                    // Make a for loop for each of the five weather forecast cards
                    for (let i = 1; i <= 5; i++) {
                        let forecastCard = $("#day-" + i);

                        // Display data for each forecasted day
                        forecastCard.find("h5").text(moment(oneCallData.daily[i].dt * 1000).format("l"));
                        forecastCard.find("img").attr("src", getIcon(oneCallData.daily[i].weather[0].icon));
                        forecastCard.find(".card-temp").text(oneCallData.daily[i].temp.day.toString());
                        forecastCard.find(".card-wind").text(oneCallData.daily[i].wind_speed);
                        forecastCard.find(".card-humid").text(oneCallData.daily[i].humidity);
                    }
                })
            // We use the Current Weather API Data to display the city name, since the One Call Data API lacks this information
            $("#current-city").text(data.name);

            // Finally show the data since it is fully retrieved
            $("#todays-weather").attr("style", "display: block;");
            $("#uv-today-element").attr("style", "display: block;");
            $("#next-weather").attr("style", "display: block;");
        });
}

// Initialize functions and event handlers
renderCityHistory();
$("#search-form").on("submit", handleSubmitSearch);
$("#search-history").on("click", handleHistoryBtnClick);