var googleApiKey = "AIzaSyDHgz_wG-Dmq9lS70RvyrgVnFdSiNh2m6c"
var cityLat;
var cityLng;
var cityName

function geocodeCity (city, list) {
    cityName = city;
    var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName.replace(" ","+") + "&key=" + googleApiKey;

    $.ajax({
        url: geocodeUrl,
        dataType: 'json',
        success: function (data) {
            cityLat = (data.results[0].geometry.location.lat);
            cityLng = (data.results[0].geometry.location.lng);
            console.log(cityLat + "," + cityLng);

            startLists(); //Load lists after geocoding is complete
        }  
    });
};

function startLists() {
    //Any api function calls below
    getFoodResponse(); //Call from script.js
    getVistsAjaxCallFromTripso(); //Call from tripsoapp.js
    hotelCall() //Call from hotel.js

    //List loaded after this point
    console.log("Loading lists Below");
    console.log(foodArray);
    console.log(visitList);
    console.log(hotelArray);
}
