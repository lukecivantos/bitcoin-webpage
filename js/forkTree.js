// --> CREATE SVG DRAWING AREA

// set the dimensions and margins of the diagram


var margin = {top: 20, right: 350, bottom: 60, left: 250},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


queue()
    .defer(d3.json, "data/forks.json")
    .await(function(error, malariaParasitesJson) {

        // --> PROCESS DATA

        // declares a tree layout and assigns the size
        var treemap = d3.tree()
            .size([height, width]);

        //  assigns the data to a hierarchy using parent-child relationships
        var nodes = d3.hierarchy(malariaParasitesJson, function(d) {
            return d.children;
        });

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        var svg = d3.select("#tree-area").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom),
            g = svg.append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // adds the links between the nodes
        var link = g.selectAll(".link")
            .data( nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d) {
                return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            });

        // adds each node as a group
        var node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", function(d) {
                return "node" +
                    (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")"; });

        // adds the circle to the node
        node.append("circle")
            .attr("r", 10);

        // adds the text to the node
        node.append("text")
            .attr("class", "node-text")
            .attr("dy", ".35em")
            .attr("x", function(d) { return d.children ? -13 : 13; })
            .style("text-anchor", function(d) {
                return d.children ? "end" : "start"; })
            .text(function(d) { return d.data.name; });


    });