


// this the making of the object
class place {
    name = "";
    longitude = "";
    latitude = "";
    rating = 0;
    description = "";
    address = "";
    imgUrl = " ";
    bookUrl = ""

    constructor(placeName, placeLong, placeLat) {
        this.name = placeName;
        this.longitude = placeLong;
        this.latitude = placeLat;
    };

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
        return this.rating;
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

    setbookUrl(placeImg) {
        this.bookUrl = placeImg;
    };

    getbookUrl() {
        return this.bookUrl;
    };

};

var hotelArray = [];

function hotelCall() {
    console.log("Starting API Call");
    var apiKey = "80fivxux2uyah50aog41t7joiycujtas";
    var apiAccountID = "MD9PFX96";
    var city = "Cape_Town";
    //var myurl = "https://www.triposo.com/api/20181213/poi.json?location_id=Paris&tag_labels=hotels&count=10" + "&account=" + apiAccountID + "&token=" + apiKey;
    var myurl = "https://www.triposo.com/api/20181213/poi.json?location_id=" + city + "&tag_labels=hotels&count=10" + "&account=" + apiAccountID + "&token=" + apiKey;

    //useful additions
    // &fields=id,name,score,intro,tag_labels&order_by=-score
    console.log(myurl);

    console.log("start ajax call");
    $.ajax({
        url: myurl,
        method: "GET"
    }).then(function (response) {
        
        console.log(response);
        $(".hotel").append("<h2> City : " + city + "</h2>");
        for (var i = 0; i < 10; i++) {
            var hotelNumber = i + 1;
            $(".hotel").append(
                "<h3> hotel " + hotelNumber + "</h3>" +
                "<p> Hotel Name " + response.results[i].name + "</p>" +
                "<p> latitude " + response.results[i].coordinates.latitude + "</p>" +
                "<p> longtitude " + response.results[i].coordinates.longitude + "</p>" +
                "<p> rating " + response.results[i].hotels_score + "</p>" +
                "<p> book here " + response.results[i].booking_info.vendor_object_url + "</p>" +
                "<p> description " + response.results[i].snippet + "</p>" +
                "<p> images " + response.results[i].images[0].source_url + "</p>"



            );
            var name = response.results[i].name;
            var long = response.results[i].coordinates.longitude;
            var lat = response.results[i].coordinates.latitude;
            var plc = new place(name, long, lat);

            //plc.setAddress(venues[i].location.address);
            plc.setDescription(response.results[i].snippet);            
            plc.setRating(response.results[i].hotels_score);
            plc.setbookUrl(response.results[i].booking_info.vendor_object_url);
            plc.setImgUrl(response.results[i].images[0].source_url);


            hotelArray.push(plc);

        }
        //console.log ("hotel array "+ hotelArray[1].name);
        printArray(hotelArray);

    });
    console.log("end ajax call");

}

function printArray(array) {
    for (var i = 0; i < array.length; i++) {
        console.log("hotel" + (i+1))
        console.log("name using class" + array[i].getName());
        console.log("longitude using class" + array[i].getLongitude());
        console.log("latitue using class" + array[i].getLatitude());
        console.log("description using class" + array[i].getDescription());
        console.log("rating using class" + array[i].getRating());
        console.log("image using class" + array[i].getImgUrl());
        console.log("book using class" + array[i].getbookUrl());

    }
}

hotelCall();
