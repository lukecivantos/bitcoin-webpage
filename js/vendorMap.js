

/*
 *  VendorMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 *  @param _mapPosition     -- Coordinates to set the map
 */

VendorMap = function(_parentElement, _data, _mapPosition) {

    this.parentElement = _parentElement;
    this.data = _data;
    this.mapPosition = _mapPosition;


    this.initVis();
};


/*
 *  Initialize Vendor Map
 */

VendorMap.prototype.initVis = function() {
    var vis = this;

    // Instantiate Map
    vis.map = L.map('vendorMap', {
        preferCanvas: true
    }).setView(vis.mapPosition, 13);
    d3.select("#numMap").text(vis.data.venues.length);

    L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(vis.map);



    vis.displayData = vis.data;


    // Add empty layer groups for the markers / map objects
    vis.atmMarkers = L.layerGroup().addTo(vis.map);
    vis.shoppingMarkers = L.layerGroup().addTo(vis.map);
    vis.foodMarkers = L.layerGroup().addTo(vis.map);
    vis.groceryMarkers = L.layerGroup().addTo(vis.map);
    vis.lodgingMarkers = L.layerGroup().addTo(vis.map);
    vis.nightlifeMarkers = L.layerGroup().addTo(vis.map);
    vis.attractionMarkers = L.layerGroup().addTo(vis.map);
    vis.cafeMarkers = L.layerGroup().addTo(vis.map);
    vis.transportMarkers = L.layerGroup().addTo(vis.map);
    vis.sportsMarkers = L.layerGroup().addTo(vis.map);
    vis.defaultMarkers = L.layerGroup().addTo(vis.map);


    function styleColor(feature) {
        switch(feature) {
            case 'atm':
                return "red";
                break;
            case 'shopping':
                return "green";
                break;
            case 'food':
                return "orange";
                break;
            case 'grocery':
                return "yellow";
                break;
            case 'lodging':
                return "purple";
                break;
            case 'nightlife':
                return "lime";
                break;
            case 'attraction':
                return "aqua";
                break;
            case 'cafe':
                return "fuchsia";
                break;
            case 'transport':
                return "silver";
                break;
            case 'sports':
                return "LightSkyBlue";
                break;
            case 'default':
                return "blue";
                break;
            default:
                return "blue"
        }
    }

    var col = {0:"blue",1:"yellow",2:"red",3:"orange",4:"green",5:"purple",6:"lime",7:"aqua",8:"fuchsia",9:"silver",10:"LightSkyBlue"};
    var n =  d3.selectAll('.checkmark')
        .each(function (d,i) {
           d3.select(this).style("background-color", col[i]);
        });

    /*
    while (i1 < 11) {
        console.log(n._groups[0][i1]);
        n._groups[0][i1].style("background-color", styleColor());
        i1 += 1;
    }*/

    vis.displayData.venues.forEach(function (d) {
        // Create marker
        //d.name + "<br>" + "Category: " + d.category
        vis.mark = L.circleMarker([d.lat,d.lon],
            {
                color: styleColor(d.category),
                fillColor: styleColor(d.category)
            }
        ).bindPopup(function () {

            var el = document.createElement('div');
            el.classList.add("my-class");


            var url = 'https://coinmap.org/api/v1/venues/';
            var proxyurl = "https://cors-anywhere.herokuapp.com/";

            $.getJSON(proxyurl + url + d.id, function(data){
                el.innerHTML =
                    '<div class="mapTool"><b>' + data.venue.name + '</b></div><div class="mapTool">Category: '+ data.venue.category +'</div><div class="mapTool">City: '+ data.venue.city +
                    '</div><div class="mapTool">Website: <a target="_blank" href="' + data.venue.website + '">' + data.venue.website + '</a></div>';
            });
            return el;
        });

        try {
            //Add marker to layer group
            vis[d.category + "Markers"].addLayer(vis.mark);
        }
        catch (e) {
            // statements to handle any exceptions
            vis.defaultMarkers.addLayer(vis.mark);

        }




    });



    vis.wrangleData();
};


/*
 *  Data wrangling
 */

VendorMap.prototype.wrangleData = function(coords,key) {
    var vis = this;

    // Currently no data wrangling/filtering needed
    vis.displayData = vis.data;

    if (coords != null) {
        vis.map.setView(new L.LatLng(coords[0], coords[1]), 14);
    }

    // Update the visualization
    vis.updateVis(key);


};


/*
 *  The drawing function
 */

VendorMap.prototype.updateVis = function(key) {
    var vis = this;

    if (key != null) {

        if (document.getElementById(key).checked) {
            vis.map.addLayer(vis[key + "Markers"]);
        } else {
            vis.map.removeLayer(vis[key + "Markers"]);
        }
    }
};
