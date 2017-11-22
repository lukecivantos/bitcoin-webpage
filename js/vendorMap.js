

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



    L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
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

            var el = document.createElement('div');
            el.classList.add("my-class");


            var url = 'https://coinmap.org/api/v1/venues/';
            var proxyurl = "https://cors-anywhere.herokuapp.com/";

            $.getJSON(proxyurl + url + d.id, function(data){
                el.innerHTML =
                    '<p class="mapTool">Name: ' + data.venue.name + '</p><p>City: '+ data.venue.city +
                    '</p><p><a href="' + data.venue.website + '">Website: ' + data.venue.website + '</a></p>';
            });
            return el;
        },
        {
            offset: new L.Point(10, 10)
        });
        //Add marker to layer group
        vis.stationMarkers.addLayer(vis.mark);
    });
};

