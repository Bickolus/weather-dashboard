let apiKey = "7b1ba3a9818619c3079e45f400752294";
let historyButtonClasses = "btn btn-secondary border text-left text-light px-3 py-2";
let dataCityAttr = "data-city";

// Load history list from local storage
let cityHistory = JSON.parse(localStorage.getItem("city_history"));
if (!cityHistory) {
    cityHistory = [];
}

function renderCityWeather(city) {
    let requestUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=" + city + "&appid=" + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Fetch Response \n-------------');
            console.log(data);
            let oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=minutely,hourly&lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey;
            fetch(oneCallURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (oneCallData) {
                    console.log('One Call API Fetch Response \n-------------');
                    console.log(oneCallData);

                    $("#current-weather-icon").attr("src", getIcon(oneCallData.current.weather[0].icon))
                    $("#temp-today").text(oneCallData.current.temp.toString());
                    $("#humid-today").text(oneCallData.current.humidity);
                    $("#wind-today").text(oneCallData.current.wind_speed);
                    $("#uv-today").text(oneCallData.current.uvi);

                    $("#uv-today").attr("style", uviElementStyle(oneCallData.current.uvi));


                    for (let i = 1; i <= 5; i++) {
                        let forecastCard = $("#day-" + i)

                        // get the days
                        forecastCard.find("h5").text(moment(oneCallData.daily[i].dt * 1000).format("l"));
                        forecastCard.find("img").attr("src", getIcon(oneCallData.daily[i].weather[0].icon));
                        forecastCard.find(".card-temp").text(oneCallData.daily[i].temp.day.toString());
                        forecastCard.find(".card-wind").text(oneCallData.daily[i].wind_speed);
                        forecastCard.find(".card-humid").text(oneCallData.daily[i].humidity);
                    }
                })
            $("#current-city").text(data.name + " (" + moment().format("l") + ")")
        });
}

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

function getIcon(code) {
    return "https://openweathermap.org/img/w/" + code + ".png";
}

renderCityWeather("Toronto");