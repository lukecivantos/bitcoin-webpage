
//loadData();

var firstSentence = "In January 2009, history was made when the mysterious Satoshi Nakamoto released the first software program implementing Bitcoin."
var typed = new Typed('#top-text', {
    strings: [firstSentence, "Enter to learn more."],
    typeSpeed: 30
});

// Variable for the visualization instance
var vendorMap;

var url =  'https://coinmap.org/api/v1/venues/';
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var proxy = 'http://michaeloppermann.com/proxy.php?format=xml&url=';


jQuery.ajax({
    url: proxyurl +url,
    type: "GET",

    contentType: 'application/json; charset=utf-8',
    success: function(resultData) {
        //here is your json.
        // process it
        vendorMap = new VendorMap("vendorMap", resultData,[42.360082, -71.058880]);




    },
    error : function(jqXHR, textStatus, errorThrown) {
    },

    timeout: 120000,
});
