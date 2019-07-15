/* ******** FILE THAT WILL HOLD ALL JS CALLs ********* */

// CLASS DEFINITION THAT WILL HOLD ALL DATA REGARDING ONE PLACE

var loadedList = [];
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

/* ******** Initial Page JS ********* */
//When User leaves the city search bar

$(".city-input").focus(function () {
    $("#dynamicHeader").animate({ height: 50 });
    $(".headerBox").slideDown();
    $("#city-ipput-label").text("Enter your city");
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

//On cardSel click
$(".cardDiv").on("click", function (event) {
    event.preventDefault();
    list = $(this).attr("data");
    var city = $("#city-search").val();
    listLoad(city , list); //Sends city name to be Geocode
});

//Sel Item Btn


function listLoad(city, list) {
    console.log("Load List: " + list + " for " + city);
    geocodeCity(city);
    $("#initialPage").animate({ opacity: 0 }, 800, function () {
        $("#initialPage").empty();
        loadingPage(list);
    });
}

function startLists() {
    //Any api function calls below
    getFoodAjaxCall(); 
    getVisitAjaxCall(); 
    getHotelAjaxCall();
}



//Loading Page
function loadingPage(list) {
    $("#loadingPage").css("visibility","visible");
    $("#loadingPage").css("height", "100%");
    $("#loadingPage").animate({opacity: 1});
    console.log(list);
    if (list === "visit"){
        var loadedArr = visitList;
    } else if (list === "food"){
        var loadedArr = foodList;
    } else {
        var loadedArr = hotelList;
    }
    console.log (loadedArr)
    setTimeout(startAddressLookup(loadedArr), 9000); 
}

function startAddressLookup (loadedArr){
    for (var i = 0; i < loadedArr.length; i++){
        loadedList.push(JSON.parse(loadedArr[i]))
    }
    geocodeAddress();
    setTimeout(function(){
        $("#loadingPage").animate({opacity: 0} , 800 , function(){
            $("#loadingPage").css("visibility","hidden");
            $("#loadingPage").css("height", "0");
            displayResults();
        });
    }, 800);
}

function displayResults() {
    listAddrArr.forEach(function(item, index){
            loadedList[index].address = item;
    })

    var sideLeft = false;
    
    setTimeout(function(){
        loadedList.forEach(function(item, index){

        

            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            
    
            var name = $("<p>");
            name.addClass("itemName")
            name.text(item.name);
    
            var address = $("<p>");
            address.addClass("itemDes")
            address.text(item.address);
    
            
            
    
            var button = $("<button>");
            button.attr("type","button");
            button.attr("data",index);
            button.addClass("selItemBtn btn peach btn-secondary btn-lg btn-block ");
            button.text("Select " + labels[index]);
    
            var itemCard = $("<div>");
            itemCard.addClass("card text-white bg-dark border-warning m-2");
    
            var row1 = $("<div>");
            row1.addClass("row m-2");
            var col1 = $("<div>");
            col1.addClass("col-lg-12");
            col1.prepend(address);
            col1.prepend(name);
            row1.prepend(col1);
            itemCard.prepend(row1);
    
            var row2 = $("<div>");
            row2.addClass("row m-2 idclass");
            var col2 = $("<div>");
            col2.addClass("col-lg-12");
            col2.prepend(button);
            row2.prepend(col2);
            itemCard.prepend(row2);
    
            if (sideLeft==true){
                console.log("left");
                $("#results-right").append(itemCard);
                sideLeft=false;
            } else{
                console.log("right");
                $("#results-left").append(itemCard);
                sideLeft=true;
            }
            
        });
        loadMap(loadedList);
       
    
    });
}
$(document).ready(function() {


    $("#results-right").on("click",'.selItemBtn' ,function (event) {
        event.preventDefault();
        console.log("clicked");
        
        var item = loadedList[$(this).attr("data")];
        
        loadItemMap(item);
    });
});