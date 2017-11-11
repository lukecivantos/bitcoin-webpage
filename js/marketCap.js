

// Variable for the visualization instance
var vendorMap;

var url =  'https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=10';
var url2 = 'https://api.lionshare.capital/api/markets';
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var proxy = 'http://michaeloppermann.com/proxy.php?format=xml&url=';
var url3 = "http://coincap.io/history/365day/BTC";

jQuery.ajax({
    url: proxyurl +url3,
    type: "GET",

    contentType: 'application/json; charset=utf-8',
    success: function(resultData) {
        //here is your json.
        // process it
        console.log(resultData);



    },
    error : function(jqXHR, textStatus, errorThrown) {
    },

    timeout: 120000,
});
