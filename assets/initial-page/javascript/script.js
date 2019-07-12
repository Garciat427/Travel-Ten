var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-chloe&location=boston";

$.ajax({
    url: myurl,
    headers: {
        "Authorization":"Bearer TX_Msat5ZgN55sxNe0gri6yNsfxnx_1UeIdyPfvvGy-6YIrE2Vo3hxcwPln6qhrhYjnxfkp8fQ42PN6_STVLMVzZ_YM2a3CLUhhplGHuTS6YFF4BiBm3QHkaYyElXXY",
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
        console.log('success: '+data);
    }
});      
