

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
}



/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

StackedAreaChart.prototype.initVis = function(){
    var vis = this;

    vis.margin = { top: 25, right: 0, bottom: 50, left: 100 };

    vis.width = 825 - vis.margin.left - vis.margin.right,
        vis.height = 525 - vis.margin.top - vis.margin.bottom;


    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")")
        .attr("overflow", "visible")

    // TO-DO: Overlay with path clipping
    vis.svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", vis.width)
        .attr("height", vis.height);

    //append text label to be updated by tooltip
    vis.svg.append("text")
        .attr("id", "category-label")
        .attr("x", -10)
        .attr("y",-10)

    // Scales and axes
    vis.x = d3.scaleTime()
        .range([0, vis.width])
        .domain(d3.extent(vis.data, function(d) { return d.Year; }));

    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    vis.xAxis = d3.axisBottom()
        .scale(vis.x)
        .ticks(6)

    vis.yAxis = d3.axisLeft()
        .scale(vis.y);

    vis.svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + vis.height + ")");

    vis.svg.append("g")
        .attr("class", "y-axis axis");

    // TO-DO: Initialize stack layout
    var dataCategories = colorScale.domain();
    vis.stack = d3.stack()
        .keys(dataCategories);

    vis.stackedData = vis.stack(vis.data);

    // check to see stack data worked correctly

    // TO-DO: Rearrange data

    // TO-DO: Stacked area layout
    // vis.area = d3.area()
    //	...
    vis.area = d3.area()
        .curve(d3.curveCardinal)
        .x(function(d){return vis.x(d.data.Year); })
        .y0(function(d){return vis.y(d[0]); })
        .y1(function(d){return vis.y(d[1]); })

    // TO-DO: Tooltip placeholder


    // TO-DO: (Filter, aggregate, modify data)
    vis.wrangleData();
}



/*
 * Data wrangling
 */

StackedAreaChart.prototype.wrangleData = function(){
    var vis = this;

    // In the first step no data wrangling/filtering needed
    vis.displayData = vis.stackedData;

    // Update the visualization
    vis.updateVis();
}



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
            return e[1];
        });
    })
    ]);

    var dataCategories = colorScale.domain();

// Draw the layers
    var categories = vis.svg.selectAll(".area")
        .data(vis.displayData);

    categories.enter().append("path")
        .attr("class", "area")
        .on("mouseover", function(d){
            d3.select("#category-label").text(d.key);
        })
        .merge(categories)
        .style("fill", function(d,i) {
            return colorScale(dataCategories[i]);
        })
        .attr("d", function(d) {
            return vis.area(d);
        })


    // TO-DO: Update tooltip text

    categories.exit().remove();


    // Call axis functions with the new domain
    vis.svg.select(".x-axis").call(vis.xAxis);
    vis.svg.select(".y-axis").call(vis.yAxis);
}
