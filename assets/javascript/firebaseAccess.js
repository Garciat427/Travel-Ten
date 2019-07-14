/********************************** Initialize Firebase  ***********************************/

const config = {
  apiKey: "AIzaSyC0BACfTZM9US1Sww5a41j6ZAhRTimQLzQ",
  authDomain: "travel10.firebaseapp.com",
  databaseURL: "https://travel10.firebaseio.com",
  projectId: "travel10",
  storageBucket: "",
  messagingSenderId: "1091366205935",
  appId: "1:1091366205935:web:6ea69cc52cb6277d"
};
// init FireBase
firebase.initializeApp(config);
// set database
var database = firebase.database();


/********************************** Saving to Firebase ***********************************/

// Save the details of the search ensuring that all data is loaded from the APIs
function saveAsyncResults(cityName, cityLong, cityLat, cityVisits, cityFoods, cityHotels, dateEntered) {
  var citySearch = {
    city: cityName,
    longitude: cityLong + "",
    latitude: cityLat + "",
    visits: cityVisits,
    foods: cityFoods,
    hotels: cityHotels,
    dateCreated: dateEntered
  };

  // Timer to save data only once all data is loaded 
  var intvl = setInterval(function () {

    // Check that the data is loaded for visits, hotels, and foods. If any of them are not loaded then wait 1/2 sec.
    // Otherwise everything is loaded and so can be saved to firebase
    if (cityVisits.length === 0 || cityFoods.length === 0 || cityHotels === 0) {
      console.log("Waiting for data to finish loading from API");

    } else {
      console.log("All data loaded, saving to the firebase database");
      database.ref().push(citySearch);
      clearInterval(intvl);
    }
  }, 500);
}


/********************************** reading from Firebase ***********************************/
/**
 * IMPORTANT: Look at the test funtion below (Scroll down to testingReadingFromDB) to see how to retrive information from the database and use it. 
 * There is a delay factor that needs to be considred
 * When data is read, it will be stored in citySearchFormDB
 * 
 * IMPORTANT: When you look at the citySearchFromDB object, look at "foundRecord". if true, then use the data in here. otherwise make the standard API calls.
 */

var citySearchFromDB = {
  city: "",
  longitude: "",
  latitude: "",
  visits: "",
  foods: "",
  hotels: "",
  dateCreated: "",
  foundRecord: false,
  searchComplete: false
};

// save the content of the db, if found, into citySearchFromDB
function getDBResults(longitude, latitude) {

  database.ref().once("value", function (snapshot) {

    // Did I find the Latitude and Longtitude
    snapshot.forEach(function (childSnapshot) {

      // found the same lat and long, get it
      if (childSnapshot.val().latitude.trim() == latitude.trim() && childSnapshot.val().longitude.trim() == longitude.trim()) {
        citySearchFromDB.city = childSnapshot.val().city;
        citySearchFromDB.longitude = childSnapshot.val().longitude;
        citySearchFromDB.latitude = childSnapshot.val().latitude;
        citySearchFromDB.visits = childSnapshot.val().visits;
        citySearchFromDB.foods = childSnapshot.val().foods;
        citySearchFromDB.hotels = childSnapshot.val().hotels;
        citySearchFromDB.dateCreated = childSnapshot.val().dateCreated;
        citySearchFromDB.foundRecord = true;
      }
    });
    citySearchFromDB.searchComplete = true;
    console.log(citySearchFromDB);
  });

}

/********************************** TEST Global Var BELOW ***********************************/
var myTestlong = "43.6681852";
var myTestLat = "-79.3950505";


/********************************** TEST testWritingToDB BELOW ***********************************/


function testWritingToDB() {
  console.log("Testing Saving to FireBase");
  getVistsAjaxCallFromTripso(myTestlong, myTestLat);
  // THS IS AN EXAMPLE ON HOW TO SAVE. 
  saveAsyncResults("Toronto2", myTestlong, myTestLat, visitList, visitList, visitList, Date.now());

}

/********************************** TEST reading from DB BELOW ***********************************/

function testingReadingFromDB() {

  console.log("Testing Reading from Firebase database");
  // get the results from firebase. Note that by the time you go to the next line, the data might still be in the process of being set in the object
  var x = getDBResults(myTestlong, myTestLat);

  // Timer to get and use the data only once all is loaded 
  var intvl = setInterval(function () {
    
    // check if the data is loaded. if not, wait .5 seconds
    if (!citySearchFromDB.searchComplete) {
      console.log("Waiting for data to finish loading from DB");

    } else {
      // Data loaded from DB, now use it as you see fit here
      console.log("All data loaded fromDB, now do whatever you want");
      console.log(citySearchFromDB);
      clearInterval(intvl);
    }
  }, 500);

}

//testWritingToDB();
// testingReadingFromDB();
