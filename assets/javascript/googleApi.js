
/* ******** FILE THAT WILL HOLD ALL THE GOOGLE API WORK ********* */
//Global Vars
var cityName
var coordinates = ["", ""];
var labelIndex = 0;

var googleApiKey = "AIzaSyBL7Zb4UOIfJTANNFWQowVLSd9NG40agcQ"

//Function to allow for Autocomplete within the city search field
function activatePlacesSearch() {
  var options = {
      types: ['(cities)'],
      componentRestrictions: { country: ['us', 'can'] }
  };
  var input = document.getElementById("city-search");
  var autocomplete = new google.maps.places.Autocomplete(input, options);
}

//Function used to Convert City into cordinates
function geocodeStart(city) {
    cityName = city;
    var geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName.replace(" ", "+") + "&key=" + googleApiKey;
    $.ajax({
        url: geocodeUrl,
        dataType: 'json',
        success: function (data) {
            coordinates[0] = (data.results[0].geometry.location.lat);
            coordinates[1] = (data.results[0].geometry.location.lng);
            startListsAndTransition(); //Once completed, Start list compilation
        }
    });
};

//Function to create addresses from cordsinates for all items within selected array
function geocodeCordToAddr() {
  var listAddrArr = [];
  //Loop to create addr For all elements in array
  for (var i = 0; i < loadedList.length; i++){
    var geocodeCordToAddrUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + loadedList[i].latitude + ',' + loadedList[i].longitude + "&key=" + googleApiKey;
    //Ajax Call to call for address and place it into listAddArr
    $.ajax({
      url: geocodeCordToAddrUrl,
      dataType: 'json',
      success: function(data){
        if (data.results[0].formatted_address) {
          listAddrArr.push(data.results[0].formatted_address);
        } else{
            listAddrArr.push("noAddr");
        }
      }
    });
  }
  //Delay 1000ms to grab all objs and then populate the item.address
  setTimeout(function(){
    listAddrArr.forEach(function(item, index){
      loadedList[index].address = item;
    });
    displayResults(); //Call to Display Results on completion
  },3000);
}

//Function used to load full map with entire list
function loadMap(listArr) {

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
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
      
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            var string = '<div jstcache="33" class="poi-info-window gm-style"> <div jstcache="2"> <div jstcache="3" class="title full-width" jsan="7.title,7.full-width">'+listArr[i].name+'</div> <div class="address"> <div jstcache="4" jsinstance="0" class="address-line full-width" jsan="7.address-line,7.full-width">'+listArr[i].address+'</div></div> </div> <div jstcache="5" style="display:none"></div></div>'
          infowindow.setContent(string);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}

function loadItemMap(item) {
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: new google.maps.LatLng(item.latitude, item.longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.latitude, item.longitude),
            animation: google.maps.Animation.DROP,
            
            map: map
        });


      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            var string = '<div jstcache="33" class="poi-info-window gm-style"> <div jstcache="2"> <div jstcache="3" class="title full-width" jsan="7.title,7.full-width">'+item.name+'</div> <div class="address"> <div jstcache="4" jsinstance="0" class="address-line full-width" jsan="7.address-line,7.full-width">'+item.address+'</div></div> </div> <div jstcache="5" style="display:none"></div></div>'
          infowindow.setContent(string);
          infowindow.open(map, marker);
        }
      })(marker, i));
      
      

    }
