var apiKey = 'd89681d01b91040ec62000543fb31e40';
var cityWeather = {};
var button = document.getElementById('searchButton');
var cityName = document.getElementById('cityName');
var temp = document.getElementById('temp');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed');
var uvIndex = document.getElementById('uvIndex');
var searchHistory = [];

// Clears previous city when new city is searched
function clearOneDayForecastSection() {
    $("#cityName").html("");
    $("#temp").html("");
    $("#humidity").html("");
    $("#windSpeed").html("");
    $("#uvIndex").html("");
}

// Fetches the weather information from the openweather api
function grabWeather(city) {
    clearOneDayForecastSection();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=d89681d01b91040ec62000543fb31e40`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            cityName.append(data.name);
            temp.append("Temperature: " + data.main.temp + "ºF");
            humidity.append("Humidity: " + data.main.humidity);
            windSpeed.append("Wind Speed: " + data.wind.speed + "MPH");
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=d89681d01b91040ec62000543fb31e40`).then(response => response.json())
                .then(uvInfo => {
                    console.log(uvInfo)
                    uvIndex.append("UV Index: " + uvInfo.current.uvi);
                })
        });
    var cityVal = $("#searchBar").val()

    fiveDayForecast()

    //makeNewCityBttn(cityVal)
    $("#searchBar").val("");

    console.log(city)
};

// Saves new city entry into local storage, second part creates one new for each search
function makeNewCityBttn(cityInfo) {
    if (searchHistory === null) {
        searchHistory = []
    }
    console.log(cityInfo)
    searchHistory.push(cityInfo)
    localStorage.setItem("cityVal", JSON.stringify(searchHistory))
    //createCitiesOnFirstVisit()
    let newCityBttn = document.createElement("input")
    newCityBttn.setAttribute("class", "btn btn-secondary btn-sm")
    newCityBttn.setAttribute("value", cityInfo)
    newCityBttn.setAttribute("readonly", true)
    // Giving each button click functionality
    newCityBttn.addEventListener("click", function (event) {
        event.preventDefault();
        clearOneDayForecastSection();
        grabWeather(newCityBttn.value)
        fiveDayForecast(newCityBttn.value);
    })
    $("#history").append(newCityBttn);
    
}

// The first function that gets called
function createCitiesOnFirstVisit() {
    // Clears anything inside history html element
    $("#history").html("")
    // Stores array to search history variable
    searchHistory = JSON.parse(localStorage.getItem("cityVal"))
    // If search history had something saved, we pass the conditional into the for loop
    if (searchHistory != null) {
        // For loop creating a button for items saved within search history
        for (let i = 0; i < searchHistory.length; i++) {
            const storedCity = document.createElement("input")
            storedCity.setAttribute("class", "btn btn-secondary btn-sm")
            storedCity.setAttribute("value", searchHistory[i])
            storedCity.setAttribute("readonly", true)
            // Giving each button click functionality
            storedCity.addEventListener("click", function (event) {
                event.preventDefault();
                clearOneDayForecastSection();
                grabWeather(storedCity.value)
                fiveDayForecast(storedCity.value)
            })
            $("#history").append(storedCity)
        }
        clearOneDayForecastSection();
    }
}

function fiveDayForecast(city) {
        fetchFiveDayForecast(city)
        .then(data => {
            console.log(data)
            $("#dayOne").text(`${dayjs.unix(data.daily[1].dt).format('(MM/DD/YYYY)')}`);
            $("#dayOneTemp").text(`Temperature: ${data.daily[1].temp.day}°F`);
            $("#dayOneHumidity").text(`Humidity: ${data.daily[1].humidity}%`);
            $("#dayOneWind").text(`Wind Speed:  ${data.daily[1].wind_speed} MPH`);

            $("#dayTwo").text(`${dayjs.unix(data.daily[2].dt).format('(MM/DD/YYYY)')}`);
            $("#dayTwoTemp").text(`Temperature: ${data.daily[2].temp.day}°F`);
            $("#dayTwoHumidity").text(`Humidity: ${data.daily[2].humidity}%`);
            $("#dayTwoWind").text(`Wind Speed:  ${data.daily[2].wind_speed} MPH`);

            $("#dayThree").text(`${dayjs.unix(data.daily[3].dt).format('(MM/DD/YYYY)')}`);
            $("#dayThreeTemp").text(`Temperature: ${data.daily[3].temp.day}°F`);
            $("#dayThreeHumidity").text(`Humidity: ${data.daily[3].humidity}%`);
            $("#dayThreeWind").text(`Wind Speed: ${data.daily[3].wind_speed} MPH`);

            $("#dayFour").text(`${dayjs.unix(data.daily[4].dt).format('(MM/DD/YYYY)')}`);
            $("#dayFourTemp").text(`Temperature: ${data.daily[4].temp.day}°F`);
            $("#dayFourHumidity").text(`Humidity: ${data.daily[4].humidity}%`);
            $("#dayFourWind").text(`Wind Speed:  ${data.daily[4].wind_speed} MPH`);

            $("#dayFive").text(`${dayjs.unix(data.daily[5].dt).format('(MM/DD/YYYY)')}`);
            $("#dayFiveTemp").text(`Temperature: ${data.daily[5].temp.day}°F`);
            $("#dayFiveHumidity").text(`Humidity: ${data.daily[5].humidity}%`);
            $("#dayFiveWind").text(`Wind Speed:  ${data.daily[5].wind_speed} MPH`);
        })

}



// When the user uses the input box to search for a new city, it clears the previous search
$(".searchCity").on("submit", function (event) {
    event.preventDefault();
    let city = $("#searchBar").val()
    clearOneDayForecastSection();
    console.log(city);
    grabWeather(city);
    makeNewCityBttn(city);
    fiveDayForecast(city);
})
createCitiesOnFirstVisit()

function fetchFiveDayForecast(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=d89681d01b91040ec62000543fb31e40`)
        .then(response => response.json())
        .then(data => fetchFiveDayForecastCoord(data.coord.lat, data.coord.lon));
}

function fetchFiveDayForecastCoord(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=d89681d01b91040ec62000543fb31e40`)
        .then(response => response.json());
}

// function clear() {
//     $("#temp")
// }

//Set up dom element references

//Set up function to display search history
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