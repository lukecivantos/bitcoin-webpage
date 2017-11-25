
//loadData();

var firstSentence = "In January 2009, history was made when the mysterious Satoshi Nakamoto released the first software program implementing Bitcoin."
var typed = new Typed('#top-text', {
    strings: [firstSentence, "Enter to learn more."],
    typeSpeed: 30
});

// Variable for the visualization instance
var vendorMap, marketCap;

var marketCapData = [];

// Set ordinal color scale
var colorScale = d3.scaleOrdinal(d3.schemeCategory20b);

// convert Strings into date objects
var parseCapDate = d3.timeParse("%e-%b-%y")

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
        d3.select("#mapText").text("As more and more people begin to adopt Bitcoin, its acceptance at various vendors grows as well. Currently, we know that "+ resultData.venues.length + " locations across the world accept the cryptocurrency. Below, you can search your area for physical locations that accept Bitcoin.")
        vendorMap = new VendorMap("vendorMap", resultData,[40.7589, -73.9851]);



    },
    error : function(jqXHR, textStatus, errorThrown) {
    },

    timeout: 120000,
});

queue()
    .defer(d3.csv,"data/BitcoinMarketCap.csv")
    .defer(d3.csv,"data/EthereumMarketCap.csv")
    .defer(d3.csv,"data/BitcoinCashMarketCap.csv")
    .defer(d3.csv,"data/RippleMarketCap.csv")
    .defer(d3.csv,"data/DashMarketCap.csv")
    .defer(d3.csv,"data/LitecoinMarketCap.csv")
    .await(loadCapData);

function loadCapData(error, bitcoinCap, ethereumCap, bitcoinCashCap, rippleCap, dashCap, litecoinCap){

    for (var i = 0; i < bitcoinCap.length; i++){
        var layer = {};
        layer["Year"] = bitcoinCap[i].Date;
        layer["Bitcoin"] = bitcoinCap[i].marketCap;

        // check for ethereum
        var ethereum = ethereumCap.filter(function(d){
            return d.Date == bitcoinCap[i].Date;
        })

        // add ethereum to layer
        if (ethereum[0] != undefined){
            layer["Ethereum"] = ethereum[0].marketCap;
        }
        else{
            layer["Ethereum"] = 0;
        }

        // check for bitcoinCash
        var cash = bitcoinCashCap.filter(function(d){
            return d.Date == bitcoinCap[i].Date;
        })

        // add bitcoinCash to layer
        if (cash[0] != undefined){
            layer["BitcoinCash"] =cash[0].marketCap;
        }
        else{
            layer["BitcoinCash"] = 0;
        }

        // check for ripple
        var ripple = rippleCap.filter(function(d){
            return d.Date == bitcoinCap[i].Date;
        })

        // add ripple to layer
        if (ripple[0] != undefined){
            layer["Ripple"] = ripple[0].marketCap;
        }
        else{
            layer["Ripple"] = 0;
        }

        // check for dash
        var dash = dashCap.filter(function(d){
            return d.Date == bitcoinCap[i].Date;
        })

        // add dash to layer
        if (dash[0] != undefined){
            layer["Dash"] = dash[0].marketCap;
        }
        else{
            layer["Dash"] = 0;
        }

        // check for litecoin
        var litecoin = litecoinCap.filter(function(d){
            return d.Date == bitcoinCap[i].Date;
        })

        // add ethereum to layer
        if (litecoin[0] != undefined){
            layer["Litecoin"] = litecoin[0].marketCap;
        }
        else{
            layer["Litecoin"] = 0;
        }

        marketCapData.push(layer);
    }

    // convert strings to numbers
    marketCapData.forEach(function(d){
        d.Bitcoin = parseFloat(d.Bitcoin.replace(/,/g, ''));

        if (d.BitcoinCash != 0){
            d.BitcoinCash = parseFloat(d.BitcoinCash.replace(/,/g, ''));
        }
        if (d.Dash != 0){
            d.Dash = parseFloat(d.Dash.replace(/,/g, ''));
        }
        if (d.Ethereum != 0){
            d.Ethereum = parseFloat(d.Ethereum.replace(/,/g, ''));
        }
        if (d.Litecoin != 0){
            d.Litecoin = parseFloat(d.Litecoin.replace(/,/g, ''));
        }
        if (d.Ripple != 0){
            d.Ripple = parseFloat(d.Ripple.replace(/,/g, ''));
        }
        d.Year = parseCapDate(d.Year);
    });



    // Update color scale (all column headers except "Year")
    // We will use the color scale later for the stacked area chart
    colorScale.domain(d3.keys(marketCapData[0]).filter(function(d){ return d != "Year"; }))

    // check that correct keys are extracted
    createStackedVis();
}

function createStackedVis(){

    // create instance of StackedAreaChart
    marketCap = new StackedAreaChart("stacked-area", marketCapData);
}



function adjustZip() {
    var bla = $('#txtSearch').val();

    d3.csv("data/zips.csv", function(data) {
        var newData = data.filter(function (d) {
            return (d.zip_code == bla);
        });
        var lat = newData[0].latitude;
        var long = newData[0].longitude;

        vendorMap.wrangleData([lat,long],null);
    });
}

function adjustCategory(v) {
    vendorMap.wrangleData(null,v);
}

