
    
    
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
        $("#initialPage").animate({opacity: 0},800, function(){
            $("#initialPage").empty();
            startLists(city,list);
        });
    }

    $(".city-input").focus(function(){
        $("#dynamicHeader").animate({height: 50});
        $(".headerBox").slideDown();
        $("#city-ipput-label").text("Enter your city");
    });

    $(".city-input").focusout(function(){

        if ($("#city-search").val() === ""){
            console.log("empty");
            $("#city-ipput-label").text("Please enter valid city");
        }
        else{
            $(".overlay").css("visibility","visible");
            $(".cardDiv").css("visibility","visible");
            $(".cardLbl").animate({opacity: 1});
            $("#city-ipput-label").text("Your City");
            $("#dynamicHeader").animate({height: 0});
            $(".searchBar").animate({marginTop: 0});
            $(".selCard").css("height", "100%");
            $(".selCard").animate({opacity: 1});
        }
    });

    $(".cardDiv").on("click", function(event) {
        console.log("clicked");
        clickedCard = $(this).attr("data");
        event.preventDefault();
        var city = $("#city-search").val();
        listLoad(city,clickedCard);
    });
