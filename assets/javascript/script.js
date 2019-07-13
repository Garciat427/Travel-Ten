
class place {
    name = "";
    longitude = "";
    latitude = "";
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
    }

    setCoordinates(placeLong, placeLat) {
        this.longitude = placeLong;
        this.latitude = placeLat;
    };

    getLongitude() {
        return this.longitude;
    }

    getLatitude() {
        return this.latitude;
    }

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

};

var foodArray = [];

function getFoodResponse() {
    var url = "https://api.foursquare.com/v2/venues/search?v=20161016&ll=43.66%2C%20-79.39&query=food&intent=browse&radius=2000&client_id=O3VAAPG2MY5H2QERHNM2G03DOKVHN1L1ESUD31251FVEMUXY&client_secret=40B2KAJFL2F5UFSP1WXSBYAM3UPDFI3GAMTBRGC20KIN53YJ";
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            var venues = data.response.venues;
            console.log(venues);

            for (var i = 0; i < 10; i++) {

                var name = venues[i].name;
                var long = venues[i].location.lng;
                var lat = venues[i].location.lat;
                var plc = new place(name, long, lat);

                plc.setAddress(venues[i].location.address);
                
                foodArray.push(JSON.stringify(plc));
                
            }
            return foodArray;

        }
    });
   
};



function printArray(array) {
    for (var i = 0; i < array.length; i++) {
        console.log(array[i].getName);
        console.log(array[i].getLongitude);
        console.log(array[i].getLatitude);
        console.log(array[i].getAddress);
    }
}

getFoodResponse();
printArray(foodArray);