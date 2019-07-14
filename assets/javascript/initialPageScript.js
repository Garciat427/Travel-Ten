
/* ******** FILE THAT WILL HOLD ALL THE GOOGLE API WORK ********* */

var googleApiKey = "AIzaSyDHgz_wG-Dmq9lS70RvyrgVnFdSiNh2m6c"

var cityName
var coordinates = ["", ""];

function geocodeCity(city, list) {
    cityName = city;
    console.log("city" + cityName);
    var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName.replace(" ", "+") + "&key=" + googleApiKey;

    $.ajax({
        url: geocodeUrl,
        dataType: 'json',
        success: function (data) {
            
            coordinates[0] = (data.results[0].geometry.location.lat);
            coordinates[1] = (data.results[0].geometry.location.lng);
            
            console.log("Coordinates: " + coordinates);
            startLists(); //Load lists after geocoding is complete
        }
    });
    return coordinates;
};

function activatePlacesSearch() {
    var options = {
        types: ['(cities)'],
        componentRestrictions: { country: ['us', 'can'] }
    };
    var input = document.getElementById("city-search");
    var autocomplete = new google.maps.places.Autocomplete(input, options);
}