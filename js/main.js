
//loadData();

var firstSentence = "On October 31st 2008, less than a year after the start of the 2007 financial crisis, an academic paper entitled “Bitcoin: A Peer-to-Peer Electronic Cash System” was published. The author credited was Satoshi Nakamoto, a fictitious name created by the true author, who’s identity has remained anonymous to this day. Although the software for Bitcoin's implementation was complex, the idea behind Bitcoin was simple."

var typed = new Typed('#top-text', {
strings: [firstSentence, "Scroll down to learn more about Bitcoin’s development."],
    typeSpeed: 30
});

// Variable for the visualization instance
var vendorMap, marketCap, priceChart;

var marketCapData = [];
var priceChartData = [];
var timelineData = [];

// Set ordinal color scale
var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

// convert Strings into date objects
var parseCapDate = d3.timeParse("%e-%b-%y");
var parseDate = d3.timeParse("%Y-%m-%d %I:%M:%S");

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
        d3.select("#mapText").text("While bitcoin’s price has continued to appreciate, it has yet to flourish as a widely accepted currency. That being said, bitcoin’s user base continues to grow, and today "+ resultData.venues.length + " vendors in the US accept bitcoin as a method of payment. Explore the map below to see which vendors throughout the world currently accept bitcoin. Click the points on the map to find the name of the vendor and a link to the vendor’s website.");
        vendorMap = new VendorMap("vendorMap", resultData,[40.7589, -73.9851]);



    },
    error : function(jqXHR, textStatus, errorThrown) {
    },

    timeout: 120000,
});

queue()
    .defer(d3.csv, "data/bitcoinPrice.csv")
    .defer(d3.csv,"data/BitcoinMarketCap.csv")
    .defer(d3.csv,"data/EthereumMarketCap.csv")
    .defer(d3.csv,"data/BitcoinCashMarketCap.csv")
    .defer(d3.csv,"data/RippleMarketCap.csv")
    .defer(d3.csv,"data/DashMarketCap.csv")
    .defer(d3.csv,"data/LitecoinMarketCap.csv")
    .await(loadCapData);

function loadCapData(error, bitcoinPrice, bitcoinCap, ethereumCap, bitcoinCashCap, rippleCap, dashCap, litecoinCap){

    // process data for bitcoin price graph
    bitcoinPrice.forEach(function(d){
            // Convert string to 'date object'
            d.Date = parseDate(d.Date);
            // Convert numeric values to 'numbers'
            d.Close_Price = +d.Close_Price;
        });

    priceChartData = bitcoinPrice;

    createPriceVis();

    for (var i = 0; i < bitcoinCap.length; i++){
        var layer = {};
        layer["Year"] = bitcoinCap[i].Date;
        layer["Bitcoin"] = bitcoinCap[i].marketCap;

        // check for ethereum
        var ethereum = ethereumCap.filter(function(d){
            return d.Date == bitcoinCap[i].Date;
        });

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
        });

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
        });

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
        });

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
        });

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

    marketCapData.forEach(function(d){
       var year = {}
       year["Year"] = d.Year;
       year["MarketCap"] = d.Bitcoin + d.BitcoinCash + d.Dash + d.Ethereum + d.Litecoin + d.Ripple;
       timelineData.push(year);
    });





    // Update color scale (all column headers except "Year")
    // We will use the color scale later for the stacked area chart
    colorScale.domain(d3.keys(marketCapData[0]).filter(function(d){ return d != "Year"; }));

    // check that correct keys are extracted
    createMarketVis();
}

function createMarketVis(){

    // create instance of StackedAreaChart
    marketCap = new StackedAreaChart("stacked-area", marketCapData);
    timeline = new Timeline("timeline", timelineData);

}

function createPriceVis(){
    priceChart = new PriceChart("priceChart", priceChartData);
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


function brushed() {

    // TO-DO: React to 'brushed' event

    // Get the extent of the current brush
    var selectionRange = d3.brushSelection(d3.select(".brush").node());

    // Convert the extent into the corresponding domain values
    marketCap.x.domain(selectionRange.map(timeline.xScale.invert));

    // Update focus chart (detailed information)
    marketCap.wrangleData();

}


function filterYears() {
    priceChart.wrangleData();
}