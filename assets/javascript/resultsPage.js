var googleApiKey = "AIzaSyDHgz_wG-Dmq9lS70RvyrgVnFdSiNh2m6c"
var cityLat;
var cityLng;
var cityName

function startLists (city, list) {
    cityName = city;
    var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName.replace(" ","+") + "&key=" + googleApiKey;

    $.ajax({
        url: geocodeUrl,
        dataType: 'json',
        success: function (data) {
            cityLat = (data.results[0].geometry.location.lat);
            cityLng = (data.results[0].geometry.location.lng);
            console.log(cityLat + "," + cityLng);
        }  
    });
};