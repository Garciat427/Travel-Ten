

//tripso keys
var apiKey = "qeikjf3vvlb9139c1lwysu7ipty98hul";
var apiAccountID = "I068BX6Y";


// get the URL based on the type and city. Type is either "hotel", "sightseeing", "food"
function getURL(city, type) {

    var url = "";

    if (type === "hotel") {
        return "";

    } else if (type === "food") {
        return "";

    } else if (type === "sightseeing") {
        url = "https://www.triposo.com/api/20181213/poi.json?location_id=" + city;
        url += "&tag_labels=sightseeing";
        url += "&count=" + 10;
        url += "&fields=id,name,snippet,coordinates,images";
        url += "&account=" + apiAccountID + "&token=" + apiKey;

    }
    return url;
}

function runAjaxCall(city, type) {
    console.log("Starting API Call");
    var baseURL = getURL(city, type);


    console.log(baseURL);

    $.ajax({
        url: baseURL,
        method: "GET"

    }).then(function (response) {
        console.log(response);

        var returnedResults = response.results;
        var compiledResults = [];

        for (var i = 0; i < returnedResults.length; i++) {
            var name = returnedResults[i].name;
            var description = returnedResults[i].snippet;

            var imageURL = "";
            if (returnedResults[i].images.length != 0) {
                imageURL = returnedResults[i].images[0].sizes.original.url;
            }
            var rating = returnedResults[i].sightseeing_score;
            var latitude = returnedResults[i].coordinates.latitude;
            var longitude = returnedResults[i].coordinates.longitude;

            // create the object here
            // add the items from the object
            // add to compiled results

        }

    });
}

runAjaxCall("Toronto", "sightseeing");

