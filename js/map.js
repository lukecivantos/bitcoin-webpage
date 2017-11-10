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
        console.log(resultData);




    },
    error : function(jqXHR, textStatus, errorThrown) {
    },

    timeout: 120000,
});
