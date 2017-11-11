var margin = {top: 20, right: 350, bottom: 60, left: 250},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg3 = d3.select("#line-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Date parser
var formatDate = d3.timeFormat("%Y");
var parseDate = d3.timeParse("%Y-%m-%d %I:%M:%S");

loadData();

//Scales

var data;

var x = d3.scaleLinear()
    .range([0, width]);


var y = d3.scaleLinear()
    .range([height, 0]);

//Axis
var xAxis = d3.axisBottom()
    .tickFormat(formatDate);

var yAxis = d3.axisLeft();


svg3.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(" + 0 + "," + height + ")")


svg3.append("g")
    .attr("class", "axis y-axis")
    .attr("transform", "translate(" + 0 + "," + 0 + ")")

svg3.append("path")
    .attr("class","line");

var lineFunction = d3.line()


//taken from lab to call updateVisualisation when data is set using =
// Initialize data


// Load CSV file
function loadData() {
    d3.csv("data/bitcoinPrice.csv", function(error, csv) {

        csv.forEach(function(d){
            // Convert string to 'date object'
            d.Date = parseDate(d.Date);
            // Convert numeric values to 'numbers'
            d.Close_Price = +d.Close_Price;
        });

        // Store csv data in global variable
        data = csv;


        x.domain([
            d3.min(data,function (d) {return d.Date}),
            d3.max(data,function (d) {return d.Date})
        ]);
        y.domain ([
            0,
            d3.max(data,function (d) {return d.Close_Price})
        ]);

        xAxis
            .scale(x);
        yAxis
            .scale(y);

        svg3.select("g.x-axis")
            .call(xAxis);

        svg3.select("g.y-axis")
            .call(yAxis);

        lineFunction.x(function(d) { return x(d.Date); })
        lineFunction.y(function(d) { return y(d.Close_Price); });

        svg3.select(".line")
            .attr("class", "line")
            .attr("d", lineFunction(data));

        //  updateVisualization();

    });

    //  updateVisualization();
}


// Render visualization
function updateVisualization() {



}

