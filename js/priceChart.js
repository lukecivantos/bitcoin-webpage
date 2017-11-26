var formatDate = d3.timeFormat("%Y");

PriceChart = function(_parentElement, _data, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.eventHandler = _eventHandler;
    this.currentBrushRegion = null;

    this.initVis();
}

PriceChart.prototype.initVis = function() {

    var vis = this;

    vis.margin = { top: 20, right: 350, bottom: 60, left: 50 };

    vis.width = 850 - vis.margin.left - vis.margin.right,
        vis.height = 500 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    // Define the clipping region (copied from lab)
    vis.svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", vis.width)
        .attr("height", vis.height);


    vis.x = d3.scaleLinear()
        .range([0, vis.width]);


    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);

    //Axis
    vis.xAxis = d3.axisBottom()
        .tickFormat(formatDate);

    vis.yAxis = d3.axisLeft();


    vis.xG = vis.svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(" + 0 + "," + vis.height + ")")


    vis.yG = vis.svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")

    vis.svg.append("path")
        .attr("class","line")
        .attr("clip-path", "url(#clip)")

    vis.lineFunction = d3.line()

    // vis.zoom = d3.zoom()
    //     .scaleExtent([1, 5])
    //     .on("zoom", function(){
    //         vis.svg.selectAll(".line")
    //             .attr("transform", d3.event.transform);
    //         d3.selectAll('.line').style("stroke-width", 2/d3.event.transform.k);
    //         vis.xG.call(vis.xAxis.scale(d3.event.transform.rescaleX(vis.x)));
    //         vis.yG.call(vis.yAxis.scale(d3.event.transform.rescaleY(vis.y)));
    //     });
    //
    // vis.svg.call(vis.zoom);

    vis.wrangleData();


}

/*
 * Data wrangling
 */

PriceChart.prototype.wrangleData = function(){
    var vis = this;

    this.displayData = this.data;

    // Update the visualization
    vis.updateVis();
}


/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

PriceChart.prototype.updateVis = function() {
    var vis = this;

    console.log(vis.displayData);
    vis.x.domain([
        d3.min(vis.displayData,function (d) {return d.Date}),
        d3.max(vis.displayData,function (d) {return d.Date})
    ]);

    vis.y.domain ([
        0,
        d3.max(vis.displayData,function (d) {return d.Close_Price})
    ]);

    vis.xAxis
        .scale(vis.x);
    vis.yAxis
        .scale(vis.y);

    vis.svg.select("g.x-axis")
        .call(vis.xAxis);

    vis.svg.select("g.y-axis")
        .call(vis.yAxis);

    vis.lineFunction.x(function(d) { return vis.x(d.Date); });
    vis.lineFunction.y(function(d) { return vis.y(d.Close_Price); });

    vis.svg.select(".line")
        .attr("class", "line")
        .attr("d", vis.lineFunction(vis.displayData))
        .attr("clip-path", "url(#clip)")

    var monthYear = d3.timeFormat("%m/%d/%Y");


    vis.textPop = vis.svg.append("text")
        .attr("class","tracerText")
        .attr("text-anchor", "start")
        .attr("y", 15)
        .attr("x", 0)
        .attr("opacity",0)
        .style('fill', 'white')
        .attr("font-size","14px")
        .attr("font-weight","bold")
        .text("");

    vis.textDate = vis.svg.append("text")
        .attr("class","tracerText")
        .attr("text-anchor", "start")
        .attr("y", 35)
        .attr("x", 0)
        .attr("opacity",0)
        .style("fill", "white")
        .text("");

    vis.tracerLine = vis.svg.append("rect")
        .attr("class","tracer")
        .attr("height",vis.height)
        .attr("width",0.5)
        .attr("fill", "white")
        .attr("x",0)
        .attr("y",0)
        .attr("opacity",0);


    vis.svg.selectAll("mouse-catcher.rect")
        .data(vis.displayData)
        .enter()
        .append("rect")
        .attr("class","mouse-catcher")
        .attr("height",vis.height)
        .attr("width",50)
        .attr("x",function (d) {
            return vis.x(d.Date);
        })
        .style("opacity",0)
        .on("mouseover", function(d) {
            vis.tracerLine.attr("x",vis.x(d.Date));
            vis.tracerLine.attr("opacity",1);
            vis.textPop.attr("x",vis.x(d.Date) + 5);
            vis.textPop.attr("opacity",1);
            vis.textPop.text("Price: $" + d.Close_Price);
            vis.textDate.attr("x",vis.x(d.Date) + 5);
            vis.textDate.attr("opacity",1);
            vis.textDate.text(monthYear(d.Date));
        })
        .on("mouseout", function() {
            vis.tracerLine.attr("opacity",0);
            vis.textPop.attr("opacity",0);
            vis.textDate.attr("opacity",0);
        });
}