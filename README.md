# Assignment 06: Weather Dashboard

## My Task

The task was to successfully build an application that displays relevent weather data of any 
city the user enters. The assignment should:

1. Have a form where the user can enter a search
2. When the user searches for a city, the city's weather info is displayed
3. The weather info must display data for today and the next five days
4. The data should include city name, date, temperature, humidity, wind speed, and the UV index for the current date
5. There should be weather icons for each day
6. The UV index color should change depending on how high the value is (low, moderate, high, dangerous)
7. The searched city is locally stored and displayed in a list below the search box
8. The list increases with more cities searched
9. When user clicks on a city in the search history list, they are presented with that city's data

The main challenge, of course, was being able to code in JavaScript the retrieval and parsing of the weather data. Having
to make it so that the searched cities were locally stored also proved to be bothersome. I used minimal styling for the website since
that was not the point of this assignment. 

Some improvements that could be made (not part of the acceptance criteria):
1. Adding a delete button to clear the list of searched cities.
2. Making the date displayed in the user's timezone and not the city's.
3. Adding more custom CSS to make the site look more unique. 

## APIs used:

* OpenWeather API (https://openweathermap.org/api) for grabbing the necessary data.
* jQuery (https://jquery.com/) for making our lives easier and being able to make Bootstrap work.
* Bootstrap (https://getbootstrap.com/) for styling the website.
* Moment.js (https://momentjs.com/) for assistance in displaying the dates.
* Font Awesome (https://fontawesome.com/) for the awesome icons.

## Links
> Repository Link: https://github.com/Bickolus/weather-dashboard/
>
> Deployed Site Link: https://bickolus.github.io/weather-dashboard/

## How the Weather Dashboard Looks 
![Image of the Weather Dashboard showing Toronto's weather data for 1/30/2022](https://github.com/Bickolus/weather-dashboard/blob/main/images/weather-dashboard1.png?raw=true)