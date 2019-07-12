
function activatePlacesSearch(){
    var options = {
        types: ['(cities)'],
        componentRestrictions: {country: ['us', 'can']}
       };
      

    var input = document.getElementById("city-search");
    var autocomplete = new google.maps.places.Autocomplete(input,options);
}

function listPageLoad(city, listType){
    console.log(city);
    console.log(listType);
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

$("#eatDiv").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-search").val();
    listPageLoad(city,"eat");
});
$("#sleepDiv").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-search").val();
    listPageLoad(city,"sleep");
});
$("#visitDiv").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-search").val();
    listPageLoad(city,"visit");
});