
//loadData();

var firstSentence = "In January 2009, history was made when the mysterious Satoshi Nakamoto released the first software program implementing Bitcoin."
var typed = new Typed('#top-text', {
    strings: [firstSentence, "Enter to learn more."],
    typeSpeed: 30
});

 $.ajax({
        url: 'https://coinmap.org/api/v1/venues/',
        dataType: 'jsonp',
        success: function(data) {
            console.log(data);
        }
    });


/*
$(document).ready(function() {
    $.ajax({
        url: "https://coinmap.org/api/v1/venues/"
    }).then(function(data) {
        console.log(data);
    });
});
*/
/*
function loadData() {
    // Proxy url
    var proxy = 'http://michaeloppermann.com/proxy.php?format=xml&url=';
    var url =  'https://coinmap.org/api/v1/venues/';

    $.getJSON(url, function (json) {

        // Set the variables from the results array
        console.log(json);
    });


}*/