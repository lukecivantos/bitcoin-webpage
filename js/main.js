
loadData();


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