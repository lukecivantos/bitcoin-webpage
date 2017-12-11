

/*
 * StackedAreaChart - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the
 */

StackedAreaChart = function(_parentElement, _data){
    this.parentElement = _parentElement;
    this.data = _data;
    this.displayData = []; // see data wrangling

    // DEBUG RAW DATA

    this.initVis();
};



/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

StackedAreaChart.prototype.initVis = function(){
    var vis = this;

    vis.margin = { top: 50, right: 10, bottom: 50, left: 100 };

    vis.width = 825 - vis.margin.left - vis.margin.right,
        vis.height = 480 - vis.margin.top - vis.margin.bottom;


    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")")
        .attr("overflow", "visible");

    // TO-DO: Overlay with path clipping
    vis.svg.append("defs").append("clipPath")
        .attr("id", "clip2")
        .append("rect")
        .attr("width", vis.width)
        .attr("height", vis.height);


    vis.svg.append("text")
        .attr("id", "legend1")
        .text("Bitcoin")
        .attr("fill", "#2678B2")
        .attr("x", 80)
        .attr("y",-20);
    vis.svg.append("text")
        .attr("id", "legend2")
        .text("Ethereum")
        .attr("fill", "#AFC8E7")
        .attr("x", 160)
        .attr("y",-20);
    vis.svg.append("text")
        .attr("id", "legend3")
        .text("BitcoinCash")
        .attr("fill", "#FD7F28")
        .attr("x", 260)
        .attr("y",-20);
    vis.svg.append("text")
        .attr("id", "legend4")
        .text("Ripple")
        .attr("fill", "#FDBB7D")
        .attr("x", 370)
        .attr("y",-20);
    vis.svg.append("text")
        .attr("id", "legend5")
        .text("Dash")
        .attr("fill", "#339E34")
        .attr("x", 450)
        .attr("y",-20);
    vis.svg.append("text")
        .attr("id", "legend6")
        .text("Litecoin")
        .attr("fill", "#9ADE8D")
        .attr("x", 530)
        .attr("y",-20);







    // Scales and axes
    vis.x = d3.scaleTime()
        .range([0, vis.width])
        .domain(d3.extent(vis.data, function(d) { return d.Year; }));

    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x)
        .ticks(6);


    var formatNumber = d3.format(".0f"),
        formatBillion = function(x) { return formatNumber(x / 1e9) + "B"; },
        formatMillion = function(x) { return formatNumber(x / 1e6) + "M"; },
        formatThousand = function(x) { return formatNumber(x / 1e3) + "k"; };

    function formatAbbreviation(x) {
        var v = Math.abs(x);
        return (v >= .9995e9 ? formatBillion
            : v >= .9995e6 ? formatMillion
                : formatThousand)(x);
    }

    vis.yAxis = d3.axisLeft()
        .scale(vis.y)
        .tickFormat (function (d) { return formatAbbreviation(d).replace('G', 'B'); });


    vis.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.height + ")");

    vis.svg.append("g")
        .attr("class", "y-axis axis");

    // TO-DO: Initialize stack layout
    var dataCategories = colorScale.domain();
    vis.stack = d3.stack()
        .keys(dataCategories);

    console.log(vis.data);

    vis.stackedData = vis.stack(vis.data);

    // check to see stack data worked correctly

    // TO-DO: Rearrange data

    // TO-DO: Stacked area layout
    // vis.area = d3.area()
    //	...
    vis.area = d3.area()
        .curve(d3.curveLinear)
        .x(function(d){return vis.x(d.data.Year); })
        .y0(function(d){return vis.y(d[0]); })
        .y1(function(d){return vis.y(d[1]); });

    vis.area2 = d3.area()
        .curve(d3.curveLinear)
        .x(function(d) { return vis.x(d.data.Year); })
        .y0(vis.height)
        .y1(function(d){return vis.y(d.data[vis.filter]); });

    // TO-DO: Tooltip placeholder

    // TO-DO: (Filter, aggregate, modify data)
    vis.wrangleData();
};



/*
 * Data wrangling
 */

StackedAreaChart.prototype.wrangleData = function(){
    var vis = this;

    // In the first step no data wrangling/filtering neede
    if (vis.filter) {
        vis.displayData = [vis.stackedData[vis.indexOfFilteredCategory]]
        vis.domainMax = d3.max(vis.data, function(d){
            return d[vis.filter];
        })
        console.log(vis.domainMax);
    }
    else {
        vis.displayData = vis.stackedData
    }



    // Update the visualization
    vis.updateVis();
};



/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

StackedAreaChart.prototype.updateVis = function(){
    var vis = this;



    // Update domain
    // Get the maximum of the multi-dimensional array or in other words, get the highest peak of the uppermost layer
    vis.y.domain([0, d3.max(vis.displayData, function(d) {
        return d3.max(d, function(e) {
            if (vis.filter) {
                return vis.domainMax;
            } else {
                return e[1];
            }
        });
    })
    ]);

    vis.dataCategories = colorScale.domain();

// Draw the layers
    var categories = vis.svg.selectAll(".area")
        .data(vis.displayData)


    categories.enter().append("path")

        .attr("class", "area")
        .on("click", function(d,i) {
            vis.filter = (vis.filter) ? "" : vis.dataCategories[i];
            vis.indexOfFilteredCategory = i;
            console.log(vis.filter);
            vis.wrangleData();
        })
        .merge(categories)
        .style("fill", function(d,i) {
            if (vis.filter) {
                return colorScale(vis.dataCategories[vis.indexOfFilteredCategory]);
            } else {
                return colorScale(vis.dataCategories[i]);
            }
        })
        .attr("d", function(d) {
            if (vis.filter) {
                return vis.area2(d);
            }
            else {
                return vis.area(d);
            }
        });



    // TO-DO: Update tooltip text

    categories.exit().remove();


    // Call axis functions with the new domain
    vis.svg.select(".x-axis").call(vis.xAxis);
    vis.svg.select(".y-axis")
        .transition()
        .call(vis.yAxis);
};


