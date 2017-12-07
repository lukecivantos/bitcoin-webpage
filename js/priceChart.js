var formatDate = d3.timeFormat("%b, %Y");

PriceChart = function(_parentElement, _data, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.eventHandler = _eventHandler;
    this.currentBrushRegion = null;

    this.initVis();
};

PriceChart.prototype.initVis = function() {

    var slider = document.getElementById('slider');

    noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        range: {
            'min': 0,
            'max': 100
        }
    });


    var vis = this;

    vis.margin = { top: 20, right: 100, bottom: 60, left: 50 };

    vis.width = 1000 - vis.margin.left - vis.margin.right,
        vis.height = 500 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");
    /*
        // Define the clipping region (copied from lab)
        vis.svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height)
    */
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
        .selectAll("text")
        .attr("transform", "rotate(90)");


    vis.yG = vis.svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" + 0 + "," + 0 + ")");

    vis.pricePath = vis.svg.append("path")
        .attr("class","line")
        .attr("clip-path", "url(#clip)");

    vis.lineFunction = d3.line();

    vis.wrangleData();


};

/*
 * Data wrangling
 */

PriceChart.prototype.wrangleData = function(){
    var vis = this;

    var minYear = $('#minYear').val();
    var maxYear = $('#maxYear').val();
    var minMonth = $('#minMonth').val();
    var maxMonth = $('#maxMonth').val();

    var minDate = minMonth + " " + minYear;
    var maxDate = maxMonth + " " + maxYear;

    vis.filteredData = vis.data;

    var parseTime = d3.timeParse("%m %Y");

    if (minDate != " ") {
        minDate = parseTime(minDate);
        vis.filteredData = vis.filteredData.filter(function (d) {
            return d.Date > minDate;
        });
    }
    console.log(maxDate)

    if (maxDate != " ") {
        maxDate = parseTime(maxDate);
        vis.filteredData = vis.filteredData.filter(function (d) {
            return d.Date < maxDate;
        });
    }
    vis.displayData = vis.filteredData;



    // Update the visualization
    vis.updateVis();
};


/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

PriceChart.prototype.updateVis = function() {
    var vis = this;

    vis.x.domain([
        d3.min(vis.displayData, function (d) {
            return d.Date
        }),
        d3.max(vis.displayData, function (d) {
            return d.Date
        })
    ]);

    vis.y.domain([
        0,
        d3.max(vis.displayData, function (d) {
            return d.Close_Price
        })
    ]);

    vis.xAxis
        .scale(vis.x);
    vis.yAxis
        .scale(vis.y);

    vis.svg.select("g.x-axis")
        .transition()
        .duration(800)
        .call(vis.xAxis);

    vis.svg.select("g.y-axis")
        .transition()
        .duration(800)
        .call(vis.yAxis);

    vis.lineFunction.x(function (d) {
        return vis.x(d.Date);
    });
    vis.lineFunction.y(function (d) {
        return vis.y(d.Close_Price);
    });

    vis.svg.select(".line")
        .attr("class", "line")
        .transition()
        .duration(800)
        .attr("d", vis.lineFunction(vis.displayData))


    var monthYear = d3.timeFormat("%m/%d/%Y");

    /*  var focus = vis.svg.append("g")
          .attr("class", "focus")
          .style("display", "none");

      var bisectDate = d3.bisector(function(d) { return d.Date; }).left;

      focus.append("circle")
          .attr("r", 4.5);

      focus.append("text")
          .attr("x", 9)
          .attr("dy", ".35em");

      vis.svg.append("rect")
          .attr("class", "overlay")
          .attr("width", vis.width)
          .attr("height", vis.height)
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);

      function mousemove() {
          var x0 = vis.x.invert(d3.mouse(this)[0]),
              i = bisectDate(vis.data, x0, 1),
              d0 = vis.data[i - 1],
              d1 = vis.data[i],
              d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
          focus.attr("transform", "translate(" + vis.x(d.Date) + "," + vis.y(d.Close_Price) + ")");
          focus.select("text").text(d.Close_Price);
      }

  */

    var monthYear = d3.timeFormat("%m/%d/%Y");

    var focus = vis.svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("rect")
        .attr("class", "y")
        .style("fill", "white")
        .style("stroke", "none")
        .attr("width", 1)
        .attr("height", vis.height);

    // append the text at the intersection
    focus.append("text")
        .attr("class", "y-price")
        .style("fill", "white")
        .text("");

    // append the text at the intersection
    focus.append("text")
        .attr("class", "y-date")
        .style("fill", "white")
        .text("");


    // append the rectangle to capture mouse
    vis.svg.append("rect")
        .attr("width", vis.width)
        .attr("height", vis.height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function () {
            focus.style("display", null);
        })
        .on("mouseout", function () {
            focus.style("display", "none");
        })
        .on("mousemove", mousemove);

    var padding = 50;


    var bisectDate = d3.bisector(function (d) {
        return d.Date;
    }).left;

    function mousemove() {
        var x0 = vis.x.invert(d3.mouse(this)[0]),
            i = bisectDate(vis.data, x0, 1),
            d0 = vis.data[i - 1],
            d1 = vis.data[i],
            d = x0 - d0.Close_Price > d1.Close_Price - x0 ? d1 : d0;

        focus.select("rect.y")
            .style("stroke", "white")
            .attr("transform",
                "translate(" + vis.x(d.Date) + "," +
                0 + ")");

        focus.select("text.y-price")
            .text("Price: $" + (Math.round(d.Close_Price* 100) / 100))
            .attr("transform", function () {
                if (vis.x(d.Date) + 45 < vis.width - padding) {
                    return "translate(" + (vis.x(d.Date) + 5) + "," +
                        (13) + ")";
                } else {
                    return "translate(" + (vis.x(d.Date) - 100) + "," +
                        (13) + ")";
                }
            });
        focus.select("text.y-date")
            .text(monthYear(d.Date))
            .attr("transform", function () {
                if (vis.x(d.Date) + 45 < vis.width - padding) {
                    return "translate(" + (vis.x(d.Date) + 5) + "," +
                        (30) + ")";
                } else {
                    return "translate(" + (vis.x(d.Date) - 80) + "," +
                        (30) + ")";
                }
            });
    }
};
