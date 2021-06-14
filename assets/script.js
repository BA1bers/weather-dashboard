var apiKey = 'd89681d01b91040ec62000543fb31e40';
var cityWeather = {};
var city = document.getElementById('searchBar');
var button = document.getElementById('searchButton');


button.addEventListener('click', function(event) {
    event.preventDefault();

    fetchForecastByCity(city.value)
        .then(data => {
            console.log(data);
            document.getElementById('cityName').textContent = `${city.value} ${dayjs.unix(data.daily[0].dt).format('(MM/DD/YYYY)')}`;
            //document.getElementById('iconToday').src = `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;
            document.getElementById('temp').textContent = `Temp: ${data.daily[0].temp.day}°F`;
            document.getElementById('windSpeed').textContent = `Wind: ${data.daily[0].wind_speed} MPH`;
            document.getElementById('humidity').textContent = `Humidity: ${data.daily[0].humidity} %`;
            document.getElementById('uvIndex').textContent = `UV Index: ${data.daily[0].uvi}`

        });

});

function fetchForecastByCity(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => fetchForecastByCoord(data.coord.lat, data.coord.lon));
}

function fetchForecastByCoord(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`)
        .then(response => response.json());
}

//Set up dom element references

//Set up function to. display search history
//Within function, loop through search history array


//create a function to update history within local storage

//create a function that gets info from local storage

//create a function that displays the current weather that I am fetching from open weather api
//Put all variables created at the top within this function
//create dom elements & set class attributes, include conditional flow using if else statements
//append everything to the correct things

//create a function that displays the daily forecast
//set local variables, create dom elements, add content elements

//create a function for a five day forecast
//create local variables, create dom references

//create a function that renders everything (location, data, currrent weather)

//create a function that fetches the weather location from weather geo location
//calls other functions to display current weather and five day forecast
//set local variables
//use fetch api to get data and render it using render function above

//create a function that fetches the quordinates
//use fetch api

//create a function that handles the search form submission
//use event.prevent default

//create final function that handles the search history button
//use a bit of conditional flow within final two functions

//call the function that gets the search history from local storage
//add event listener to search form including the handle search form submission function within it
//add event listener to the search history element container (this will call the function that handles the search history click event)