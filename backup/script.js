var apiKey = 'd89681d01b91040ec62000543fb31e40';
var cityWeather = {};
// var city = document.getElementById('searchBar');
var button = document.getElementById('searchButton');
var cityName = document.getElementById('cityName');
var temp = document.getElementById('temp');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed');
var uvIndex = document.getElementById('uvIndex');
var searchHistory = [];


function grabWeather(city) {
    $("#cityName").html("");
    $("#temp").html("");
    $("#humidity").html("");
    $("#windSpeed").html("");
    $("#uvIndex").html("");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=d89681d01b91040ec62000543fb31e40`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            cityName.append(data.name);
            temp.append("Temperature: " + data.main.temp);
            humidity.append("Humidity: " + data.main.humidity);
            windSpeed.append("Wind Speed: " + data.wind.speed);
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=d89681d01b91040ec62000543fb31e40`).then(response => response.json())
                .then(uvInfo => {
                    console.log(uvInfo)
                    uvIndex.append("UV Index: " + uvInfo.current.uvi);
                })
            var cityVal = $("#searchBar").val();

            saveCities(cityVal)
            $("#searchBar").val("");
        });


    console.log(city.value)
};





function saveCities(cityVal) {
    if (searchHistory === null) {
        searchHistory = []
    }
    console.log(cityVal)
    searchHistory.push(cityVal)
    localStorage.setItem("cityVal", JSON.stringify(searchHistory))
    displayCities()
}

function displayCities() {
    $("#history").html("")
    searchHistory = JSON.parse(localStorage.getItem("cityVal"))
    if (searchHistory != null) {
        for (let i = 0; i < searchHistory.length; i++) {
            const storedCity = document.createElement("input")
            storedCity.setAttribute("class", "btn btn-secondary btn-sm")
            storedCity.setAttribute("value", searchHistory[i])
            storedCity.setAttribute("readonly", true)
            storedCity.addEventListener("click", function () {
                event.preventDefault();
                $("#cityName").html("");
                $("#temp").html("");
                $("#humidity").html("");
                $("#windSpeed").html("");
                $("#uvIndex").html("");
                grabWeather(storedCity.value)
            })
            $("#history").append(storedCity)
        }
        $("#cityName").html("");
        $("#temp").html("");
        $("#humidity").html("");
        $("#windSpeed").html("");
        $("#uvIndex").html("");
    }
}
$(".searchCity").on("submit", function (event) {
    event.preventDefault();
    let city = $("#searchBar").val()
    $("#cityName").html("");
    $("#temp").html("");
    $("#humidity").html("");
    $("#windSpeed").html("");
    $("#uvIndex").html("");
    console.log(city)
    grabWeather(city);
})
displayCities()
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