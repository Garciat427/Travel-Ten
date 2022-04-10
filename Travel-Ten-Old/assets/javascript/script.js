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

//Global Vars
var loadedList = [];
var list;
/* ******** Initial Page JS ********* */

/* * Event Handelers * */
//When user Clicks city bar
$(".city-input").focus(function () {
    $("#dynamicHeader").animate({ height: 50 });
    $(".headerBox").slideDown();
    $("#city-ipput-label").text("Enter your city");
});
//When user leaves city bar
$(".city-input").focusout(function () {
    //Check to see if not empty
    if ($("#city-search").val() === "") {
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
//On List selector click
$(".cardDiv").on("click", function (event) {
    event.preventDefault();
    list = $(this).attr("data");
    var city = $("#city-search").val();
    geocodeStart(city); //Sends City to be Geocoded and starts Results Process
});


/* ******** Loading State Page JS ********* */

//Start API Calls to retrieve City information
function startListsAndTransition() {
    //Start Lists
    getFoodAjaxCall(); 
    getVisitAjaxCall(); 
    getHotelAjaxCall();
    //Start Transition
    $("#initialPage").animate({ opacity: 0 }, 800, function () {
        //Then After page fade, Remove initial Page and start LoadPage
        $("#initialPage").empty();
        loadingPage();
    });
}

//Loading Page
function loadingPage() {
    
    //Set Loading page to visible
    $("#loadingPage").css("visibility","visible");
    $("#loadingPage").css("height", "100%");
    
    //Animate Loading list then run List Selector (Delay to allow more time for data call)
    $("#loadingPage").animate({opacity: 1} , 500 , function(){
        setTimeout(selList,3000);
    });
}

function selList(){
    
    var loadedArr;
    //Set the list based on btn Selection
    if (list === "visit"){      //If Sel List is Visit
        $("#listTitle").text("City Visits");

        $("#btnList1").text("City Eats");
        $("#btnList1").val("food");

        $("#btnList2").text("City Sleeps");
        $("#btnList2").val("food");
        loadedArr = visitList;
    } else if (list === "food"){ //If Sel List is Food
        $("#listTitle").text("City Eats");

        $("#btnList1").text("City Visits");
        $("#btnList1").val("visit");
        
        $("#btnList2").text("City Sleeps");
        $("#btnList2").val("sleep");
        loadedArr = foodList;
    } else {                    //If Sel List is Sleep
        $("#listTitle").text("City Sleeps");
        $("#btnList1").text("City Visits");
        $("#btnList1").val("visit");

        $("#btnList2").text("City Eats");
        $("#btnList2").val("food");
        loadedArr = hotelList;
    }
    //Once Selected List is populated, Convert stringified array back to JSON Obj
    for (var i = 0; i < loadedArr.length; i++){
        loadedList.push(JSON.parse(loadedArr[i]))
    }
    //Call For Addresses of Venues
    geocodeCordToAddr();
};


function displayResults() {
    var sideLeft = false;

    //Hide Loading Page Html then make results card visible
    $("#loadingPage").animate({opacity: 0} , 2000 , function(){
        $("#loadingPage").css("visibility","hidden");
        $("#loadingPage").css("height", "0");
        $("#resultsCard").animate({opacity: 1} , 800);

        //forEach loop to dynamically create Item cards
        loadedList.forEach(function(item, index){
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
            
            //Div creations to create Item Cards
            //Item Card
            var itemCard = $("<div>");
            itemCard.addClass("card text-white bg-dark border-warning m-2");
            
            //Item Name
            var name = $("<p>");
            name.addClass("itemName")
            name.text(item.name);

            //Item Address
            var address = $("<p>");
            address.addClass("itemDes")
            address.text(item.address);
            
            //Item Button
            var button = $("<button>");
            button.attr("type","button");
            button.attr("data",index);
            button.addClass("selItemBtn btn peach btn-secondary btn-lg btn-block ");
            button.text("Select " + labels[index]);            
            
            //Creation of other divs for formating purposes
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
            
            //Placement of card selection
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
        loadMap(loadedList)
        $("#map").animate({opacity: 1} , 800)
    });
}

//Function to reset response page when lists change
function resetReponse() {
    $("#resultsCard").animate({opacity: 0} , 800 , function(){
        $("#results-right").empty();
        $("#results-left").empty();
        loadedList = [];
        labelIndex = 0;
        loadingPage();

    });
}
    
//Event for any Item Btn Clicks (Focused State)
$("#resetView").on("click", function(event){
    $("#map").css('opacity' ,  0);
    loadMap(loadedList)
    $("#map").animate({opacity: 1} , 800)
});

$("#results").on("click",'.selItemBtn' ,function (event) {
    event.preventDefault();
    var item = loadedList[$(this).attr("data")];
    $("#map").css('opacity' ,  0);
    loadItemMap(item)
    $("#map").animate({opacity: 1} , 500)
});

//Event for any changeList btn
$(".btnList").on("click",function (event) {  
    btnClicked = $(this);
    list = btnClicked.val();
    resetReponse();
    
});

    