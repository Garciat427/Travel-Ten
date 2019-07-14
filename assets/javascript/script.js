/* ******** FILE THAT WILL HOLD ALL JS CALLs ********* */

// CLASS DEFINITION THAT WILL HOLD ALL DATA REGARDING ONE PLACE
class place {

    // MANDATORY FIELDS
    name = "";
    longitude = "";
    latitude = "";

    // EXTRA FIELDS
    rating = 0;
    description = "";
    address = "";
    imgUrl = "";

    constructor(placeName, placeLong, placeLat) {
        this.name = placeName;
        this.longitude = placeLong;
        this.latitude = placeLat;
    }

    setName(placeName) {
        this.name = placeName;
    };

    getName() {
        return this.name;
    };

    setCoordinates(placeLong, placeLat) {
        this.longitude = placeLong;
        this.latitude = placeLat;
    };

    getLongitude() {
        return this.longitude;
    };

    getLatitude() {
        return this.latitude;
    };

    setRating(placeRate) {
        this.rating = placeRate;
    };

    getRating() {
        return this.ratinge;
    };

    setDescription(placeDesc) {
        this.description = placeDesc;
    };

    getDescription() {
        return this.description;
    };

    setAddress(placeAddr) {
        this.address = placeAddr;
    };

    getAddress() {
        return this.address;
    };

    setImgUrl(placeImg) {
        this.imgUrl = placeImg;
    };

    getImgUrl() {
        return this.imgUrl;
    };

    //to question
    setbookUrl(placeImg) {
        this.bookUrl = placeImg;
    };
    // to question
    getbookUrl() {
        return this.bookUrl;
    };

};

//to be reviewed/deleted
function prinstArray(array) {
    for (var i = 0; i < array.length; i++) {
        console.log(array[i].getName);
        console.log(array[i].getLongitude);
        console.log(array[i].getLatitude);
        console.log(array[i].getAddress);
    }
}

$(".cardDiv").on("click", function (event) {
    console.log("clicked");
    clickedCard = $(this).attr("data");
    event.preventDefault();
    var city = $("#city-search").val();
    console.log("City: " + city);
    listLoad(city, clickedCard);
});

$(".city-input").focusout(function () {

    if ($("#city-search").val() === "") {
        console.log("empty");
        $("#city-ipput-label").text("Please enter valid city");
    } else {
        $(".overlay").css("visibility", "visible");
        $(".cardDiv").css("visibility", "visible");
        $(".cardLbl").animate({ opacity: 1 });
        $("#city-ipput-label").text("Your City");
        $("#dynamicHeader").animate({ height: 0 });
        $(".searchBar").animate({ marginTop: 0 });
        $(".selCard").css("height", "100%");
        $(".selCard").animate({ opacity: 1 });
    }
});

function listLoad(city, list) {
    console.log("Load List: " + list + " for " + city);
    $("#initialPage").animate({ opacity: 0 }, 800, function () {
        $("#initialPage").empty();
        geocodeCity(city, list);
    });
}

$(".city-input").focus(function () {
    $("#dynamicHeader").animate({ height: 50 });
    $(".headerBox").slideDown();
    $("#city-ipput-label").text("Enter your city");
});

function startLists() {
    //Any api function calls below
    getFoodAjaxCall(); 
    getVisitAjaxCall(); 
    getHotelAjaxCall();
}