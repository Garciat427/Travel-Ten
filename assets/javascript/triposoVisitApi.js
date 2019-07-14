
/* ******** FILE THAT WILL HOLD ALL THE TRIPOSO API WORK FOR VISIT AREAS ********* */
var visitList = [];

// API KEYS
var apiKey = "qeikjf3vvlb9139c1lwysu7ipty98hul";
var apiAccountID = "I068BX6Y";

// FUNCTION THAT RETURNS THE URL QUERY BY LATITUDE AND LONGITUDE 
function getVisitURL() {
    var url = "";
    url = "https://www.triposo.com/api/20181213/poi.json?";
    url += "annotate=distance:" + coordinates[0] + "," + coordinates[1]; //latitude X longitude. Example toronto "43.6681852" X "-79.3950505"
    url += "&distance=<10000";
    url += "&tag_labels=sightseeing";
    url += "&count=" + 10;
    url += "&fields=id,name,snippet,coordinates,images";
    url += "&account=" + apiAccountID + "&token=" + apiKey;
    return url;
}

function getVisitAjaxCall() {

    var baseURL = getVisitURL();

    console.log("URL from VISIT: " + baseURL);

    $.ajax({
        url: baseURL,
        method: "GET"

    }).then(function (response) {

        var returnedResults = response.results;
        var compiledResults = [];
        console.log(returnedResults);

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
        return visitList;
    });
}