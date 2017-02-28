var id_pad = document.getElementById("object_draw");

var id_canvas=id_pad.childNodes[0];
var x_axis = id_canvas.getElementsByClassName("xaxis_container");
var x_path=x_axis[0].childNodes[0];
var x_d = x_path.getAttribute('d');

var x_grid_layer = id_canvas.getElementsByClassName("grid_layer");

if (x_d.length > 0)
    layer.append("svg:path")
        .attr("class", "xgrid")
        .attr("d", x_d)
        .style("stroke", "black")
        .style("stroke-width", 1)
        .style("stroke-dasharray", JSROOT.Painter.root_line_styles[11]);

        
function draw_grid() {
    var id_pad = document.getElementById("object_draw");
    var id_canvas = id_pad.childNodes[0];
    
    var root_frame = id_canvas.getElementsByClassName("root_frame")[0];
    var grid_layer = id_canvas.getElementsByClassName("grid_layer")[0];

    var x_axis = id_canvas.getElementsByClassName("xaxis_container")[0];
    var y_axis = id_canvas.getElementsByClassName("yaxis_container")[0];
    
    var x_path = x_axis.childNodes[0];

    var x_d = "M0,39v366";
    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
    path.setAttribute("class", "xgrid");
    path.setAttribute("d",x_d);
    path.style.stroke = "black";
    path.style.strokeWidth = "1px"; 
//     path.style.strokeDasharray = "[1, 3]"; 
    grid_layer.appendChild(path);
}

    
    var cmd1 = '<path class="xgrid" d="';
    var cmd2 = '" style="stroke: black; stroke-width: 1; stroke-dasharray: 1, 3;"></path>';
    var cmdTot = cmd1 + x_d + cmd2;

alert('cmdTot:'+cmdTot);
grid_layer.innerHTML = cmdTot;
// alert();
//     if (x_d.length > 0) {
        grid_layer.append("svg:path")
            .attr("class", "xgrid")
            .attr("d", x_d)
            .style("stroke", "black")
            .style("stroke-width", 1)
            .style("stroke-dasharray", [1, 3]);
//     }


<path class="xgrid" d="M0,0v382M143,0v382M287,0v382M430,0v382M573,0v382M717,0v382M860,0v382M1003,0v382M1147,0v382" style="stroke: black; stroke-width: 1; stroke-dasharray: 1, 3;"></path> 

