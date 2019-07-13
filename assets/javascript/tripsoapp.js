
/* ******** THIS IS WILL HOLD ALL THE VISITS AREAS********* */
var visitList = [];

//tripso keys
var apiKey = "qeikjf3vvlb9139c1lwysu7ipty98hul";
var apiAccountID = "I068BX6Y";


// get the URL based on the type and city. Type is either "hotel", "sightseeing", "food"
function getURL(cityLat, cityLong) {
    var url = "";
    url = "https://www.triposo.com/api/20181213/poi.json?";
    url += "annotate=distance:" + cityLat + "," + cityLong; //latitude X longitude. Example toronto "43.6681852" X "-79.3950505"
    url += "&distance=<10000";
    url += "&tag_labels=sightseeing";
    url += "&count=" + 10;
    url += "&fields=id,name,snippet,coordinates,images";
    url += "&account=" + apiAccountID + "&token=" + apiKey;
    return url;
}

function getVistsAjaxCallFromTripso(cityLat, cityLong) {

   // var city = tripsoFormatString(city_input);
    var baseURL = getURL(cityLat, cityLong);

    console.log(baseURL);

    $.ajax({
        url: baseURL,
        method: "GET"

    }).then(function (response) {
        //console.log(response);

        var returnedResults = response.results;
        var compiledResults = [];

        // loop through the API 
        for (var i = 0; i < returnedResults.length; i++) {
            // for every item, get the individual records
            var name = returnedResults[i].name;
            var description = returnedResults[i].snippet;
            var imageURL = null;
            if (returnedResults[i].images.length != 0) {
                imageURL = returnedResults[i].images[0].sizes.original.url;
            }
            var rating = returnedResults[i].sightseeing_score;
            var latitude = returnedResults[i].coordinates.latitude;
            var longitude = returnedResults[i].coordinates.longitude;

            // create a new visit place and set the different parameters
            var visitPlace = new place(name, longitude, latitude);
            visitPlace.setRating(rating);
            visitPlace.setDescription(description);

            if (imageURL != null) {
                visitPlace.setImgUrl(imageURL);
            }

            // push to the global visitList array
            visitList.push(visitPlace);
        }

    });
}

/* ******** THIS IS AN EXAMPLE ON HOW TO MAKE A CALL TO TRIPSO TO GET VISITS********* */
// getVistsAjaxCallFromTripso("43.6681852", "-79.3950505");

// console.log("visit List call start");
// console.log(visitList);
// console.log("visit List call end");