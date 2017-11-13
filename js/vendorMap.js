

/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

VendorMap = function(_parentElement, _data, _mapPosition) {

    this.parentElement = _parentElement;
    this.data = _data;
    this.mapPosition = _mapPosition;


    this.initVis();
};


/*
 *  Initialize station map
 */

VendorMap.prototype.initVis = function() {
    var vis = this;

    // Instantiate Map
    vis.map = L.map('vendorMap', {
        preferCanvas: true
    }).setView(vis.mapPosition, 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(vis.map);

    vis.wrangleData();
};


/*
 *  Data wrangling
 */

VendorMap.prototype.wrangleData = function() {
    var vis = this;

    // Currently no data wrangling/filtering needed
    vis.displayData = vis.data;
    console.log(vis.displayData);

    // Update the visualization
    vis.updateVis();

};


/*
 *  The drawing function
 */

VendorMap.prototype.updateVis = function() {
    var vis = this;

    // Add empty layer groups for the markers / map objects
    vis.stationMarkers = L.layerGroup().addTo(vis.map);
    vis.subwayStations = L.layerGroup().addTo(vis.map);
    vis.displayData.venues.forEach(function (d) {
        // Create marker
        //d.name + "<br>" + "Category: " + d.category
        vis.mark = L.circleMarker([d.lat,d.lon]).bindPopup(function () {
            var url =  'https://coinmap.org/api/v1/venues/';
            var proxyurl = "https://cors-anywhere.herokuapp.com/";
            var proxy = 'http://michaeloppermann.com/proxy.php?format=xml&url=';

            jQuery.ajax({
                url: proxyurl + url + d.id,
                type: "GET",

                contentType: 'application/json; charset=utf-8',
                success: function(resultData) {
                    //here is your json.
                    // process it
                    return resultData.city;


                },
                error : function(jqXHR, textStatus, errorThrown) {
                },

                timeout: 120000,
            });
        });
        //Add marker to layer group
        vis.stationMarkers.addLayer(vis.mark);
    });
/*
    // Decide Features
    function styleMBTA(feature) {
        return {color: feature.properties.LINE};
    }

    // Set Style to Function
    L.geoJson(vis.MBTAData, {
            style: styleMBTA
        }
    ).addTo(vis.map);
*/
};