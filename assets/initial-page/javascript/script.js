
function activatePlacesSearch(){
    var options = {
        types: ['(cities)'],
        componentRestrictions: {country: ['us', 'can']}
       };
    var input = document.getElementById("city-search");
    var autocomplete = new google.maps.places.Autocomplete(input,options);
}

function listLoad (city, list){
    console.log("Load List: " + list + " For " + city);
}

 $(".city-input").focus(function(){
    $("#dynamicHeader").animate({height: 50});
    $(".headerBox").slideDown();
 });
 $(".city-input").focusout(function(){
    $("#dynamicHeader").animate({height: 0});
    $(".searchBar").animate({marginTop: 0});
    $(".selCard").css("height", "100%");
    $(".selCard").animate({opacity: 1});
});

$(".cardDiv").on("click", function(event) {
    console.log("clicked");
    clickedCard = $(this).attr("data");
    event.preventDefault();
    var city = $("#city-search").val();
    listLoad(city,clickedCard);
});
