
/* ******** FILE THAT WILL HOLD ALL THE FOURSQUARE API WORK FOR FOOD AREAS ********* */
var foodList = [];

// API KEYS
var client_id = "O3VAAPG2MY5H2QERHNM2G03DOKVHN1L1ESUD31251FVEMUXY";
var client_secret = "40B2KAJFL2F5UFSP1WXSBYAM3UPDFI3GAMTBRGC20KIN53YJ";

// FUNCTION THAT RETURNS THE URL QUERY BY LATITUDE AND LONGITUDE 
function getFoodURL() {
   
    var url = "";
    url = "https://api.foursquare.com/v2/venues/search?v=20190101";
    url += "&ll=" + coordinates[0] + "%2C%20" + coordinates[1]; //latitude X longitude. Example toronto "43.6681852" X "-79.3950505"
    url += "&query=food";
    url += "&intent=browse";
    url += "&limit=10";
    url += "&radius=2000";
    url += "&client_id=" + client_id + "&client_secret=" + client_secret;

    return url;
}

function getFoodAjaxCall() {

    var baseURL = getFoodURL();

    console.log("URL from FOOD: " + baseURL);

    $.ajax({
        url: baseURL,
        dataType: 'json',

        success: function (data) {
            var venues = data.response.venues;
            console.log(venues);

            // loop through the API
            for (var i = 0; i < 10; i++) {

                // for every item, get the individual records
                var name = venues[i].name;
                var long = venues[i].location.lng;
                var lat = venues[i].location.lat;

                // create a new food place and set the different parameters
                var foodPlace = new place(name, long, lat);

                foodPlace.setAddress(venues[i].location.address);
                
                // push to the global visitList array
                foodList.push(JSON.stringify(foodPlace));
                
            }
            return foodList;
        }
    });
   
}