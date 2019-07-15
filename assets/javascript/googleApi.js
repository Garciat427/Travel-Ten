
/* ******** FILE THAT WILL HOLD ALL THE GOOGLE API WORK ********* */

var googleApiKey = "AIzaSyDHgz_wG-Dmq9lS70RvyrgVnFdSiNh2m6c"

var cityName
var coordinates = ["", ""];
var listAddrArr = [];


function geocodeCity(city , list) {
    cityName = city;
    var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName.replace(" ", "+") + "&key=" + googleApiKey;
    $.ajax({
        url: geocodeUrl,
        dataType: 'json',
        success: function (data) {
            coordinates[0] = (data.results[0].geometry.location.lat);
            coordinates[1] = (data.results[0].geometry.location.lng);
            startLists(list);
        }
    });
    return coordinates;
};

function geocodeAddress() {
    var dataObj;
    var address
    
    console.log("Run Geocoder")
    console.log(loadedList[i]);
    for (var i = 0; i < loadedList.length; i++){
    
            var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + loadedList[i].latitude + ',' + loadedList[i].longitude + "&key=" + googleApiKey;
            $.ajax({
                url: geocodeUrl,
                dataType: 'json',
                }).then(function (data){
                    console.log(data);
                    if (data.results[0].formatted_address) {
                        listAddrArr.push(data.results[0].formatted_address);
                    } else{
                        listAddrArr.push("noAddr");
                    }
                })
        }
}


function activatePlacesSearch() {
    var options = {
        types: ['(cities)'],
        componentRestrictions: { country: ['us', 'can'] }
    };
    var input = document.getElementById("city-search");
    var autocomplete = new google.maps.places.Autocomplete(input, options);
}

function loadMap(listArr) {
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    console.log(listArr);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: new google.maps.LatLng(coordinates[0] , coordinates[1]),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < listArr.length; i++) {  
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(listArr[i].latitude, listArr[i].longitude),
        animation: google.maps.Animation.DROP,
        label: labels[labelIndex++ % labels.length],
        map: map
      });
      
      
      var contentString = 

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            var string = '<div jstcache="33" class="poi-info-window gm-style"> <div jstcache="2"> <div jstcache="3" class="title full-width" jsan="7.title,7.full-width">'+listArr[i].name+'</div> <div class="address"> <div jstcache="4" jsinstance="0" class="address-line full-width" jsan="7.address-line,7.full-width">'+listArr[i].address+'</div><div jstcache="4" jsinstance="1" class="address-line full-width" jsan="7.address-line,7.full-width">'+cityName+'</div></div> </div> <div jstcache="5" style="display:none"></div></div>'
          infowindow.setContent(string);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

   
}