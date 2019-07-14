
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
    url += "&count=" + 10;
    url += "&fields=id,name,snippet,coordinates,images";
    url += "&account=" + apiAccountID + "&token=" + apiKey;
    return url;
}

function getHotelAjaxCall() {

    var baseURL = getHotelURL();
    
    console.log("URL from HOTEL: " + baseURL);

    $.ajax({
        url: baseURL,
        method: "GET"

    }).then(function (response) {
        console.log(response);
        
        var returnedResults = response.results;
        var compiledResults = [];
        
         // loop through the API 
        for (var i = 0; i < returnedResults.length; i++) {
        
            // for every item, get the individual records
            var name = returnedResults[i].name;
            var long = returnedResults[i].coordinates.longitude;
            var lat = returnedResults[i].coordinates.latitude;

            // create a new visit place and set the different parameters
            var hotelPlace = new place(name, long, lat);

            hotelPlace.setDescription(returnedResults[i].snippet);            
            hotelPlace.setRating(returnedResults[i].hotels_score);
            hotelPlace.setbookUrl(returnedResults[i].booking_info.vendor_object_url);
            hotelPlace.setImgUrl(returnedResults[i].images[0].source_url);

            // push to the global visitList array
            hotelList.push(hotelPlace);

        }
        return hotelList;
    });
}