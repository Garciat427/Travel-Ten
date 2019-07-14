
/* ******** FILE THAT WILL HOLD ALL THE TRIPOSO API WORK FOR VISIT AREAS ********* */
var hotelList = [];

// API KEYS
var apiKey = "80fivxux2uyah50aog41t7joiycujtas";
var apiAccountID = "MD9PFX96";

// FUNCTION THAT RETURNS THE URL QUERY BY LATITUDE AND LONGITUDE 
function getHotelURL() {
    var url = "";
    url = "https://www.triposo.com/api/20181213/poi.json?";
    url += "annotate=distance:" + coordinates[0] + "," + coordinates[1]; //latitude X longitude. Example toronto "43.6681852" X "-79.3950505"
    url += "&distance=<10000";
    url += "&tag_labels=hotel";
    url += "&count=10";
    url += "&account=" + apiAccountID;
    url += "&token=" + apiKey;
    return url;
}

function getHotelAjaxCall() {

    baseURL = getHotelURL();

    console.log("URL from HOTEL: " + baseURL);

    $.ajax({
        url: baseURL,
        method: "GET"
    }).then(function (response) {
    
        console.log("HOTEL response:");
        console.log(response);

        // loop through the API 
        for (var i = 0; i < 10; i++) {
        
            // for every item, get the individual records
            var name = response.results[i].name;
            var long = response.results[i].coordinates.longitude;
            var lat = response.results[i].coordinates.latitude;

            // create a new visit place and set the different parameters
            var hotelPlace = new place(name, long, lat);
            hotelPlace.setDescription(response.results[i].snippet);            
            hotelPlace.setRating(response.results[i].hotels_score);
            hotelPlace.setbookUrl(response.results[i].booking_info.vendor_object_url);
            hotelPlace.setImgUrl(response.results[i].images[0].source_url);

            // push to the global visitList array
            hotelList.push(hotelPlace);
        }
        return hotelList;
    });
}