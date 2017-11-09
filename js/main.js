
loadData();

var firstSentence = "In January 2009, history was made when the mysterious Satoshi Nakamoto released the first software program implementing Bitcoin."
var typed = new Typed('#top-text', {
    strings: [firstSentence, "We can add more if we want"],
    typeSpeed: 30
});


function loadData() {


    // Proxy url
    var proxy = 'http://michaeloppermann.com/proxy.php?format=xml&url=';

    // Hubway XML station feed
    var url = 'https://coinmap.org/api/v1/venues/';
    // TO-DO: LOAD DATA
    $.getJSON(proxy + url, function(jsonData) {
        // Work with data
        console.log("hello");
        console.log(jsonData);

    });
}