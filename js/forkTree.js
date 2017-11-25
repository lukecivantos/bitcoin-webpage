// --> CREATE SVG DRAWING AREA

// set the dimensions and margins of the diagram


var marginFork = {top: 0, right: 150, bottom: 60, left: 100};
var widthFork = 550 - marginFork.left - marginFork.right;
var heightFork = 500 - marginFork.top - marginFork.bottom;


queue()
    .defer(d3.json, "data/forks.json")
    .await(function(error, malariaParasitesJson) {

        // --> PROCESS DATA

        // declares a tree layout and assigns the size
        var treemap = d3.tree()
            .size([heightFork, widthFork]);

        //  assigns the data to a hierarchy using parent-child relationships
        var nodes = d3.hierarchy(malariaParasitesJson, function(d) {
            return d.children;
        });

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        var svg = d3.select("#tree-area").append("svg")
                .attr("width", widthFork + marginFork.left + marginFork.right)
                .attr("height", heightFork + marginFork.top + marginFork.bottom),
            g = svg.append("g")
                .attr("transform",
                    "translate(" + marginFork.left + "," + marginFork.top + ")");

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

        console.log(nodes.descendants());
        // adds each node as a group
        var node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", function(d) {
                return "node" +
                    (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")"; })
            .on("click", function (d) {
                d3.select("#forkName").text(d.data.name);
                d3.select("#forkBlurb").text(d.data.blurb);
                d3.select("#forkResult").text(d.data.result);
                if (d.parent.data.name == null) {
                    d3.select("#forkParent").text("Parent: None");
                } else {
                    d3.select("#forkParent").text(d.data.name + " was a result of Fork number " + d.depth + ".");
                }
            });

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