
function CreateLegend(num_gr,ncol) {
   // var obj = JSROOT.Create("TLegend"); // only with dev version

   var obj = JSROOT.Create("TPave");
   JSROOT.Create("TAttText", obj);
   JSROOT.extend(obj, { fColumnSeparation: 0, fEntrySeparation: 0.1, fMargin: 0.25, fNColumns: ncol, fPrimitives: JSROOT.Create("TList") });
   obj._typename = 'TLegend';
   var xL = 0.4-ncol*0.04;
   var xR = 0.9;
   var yU = 0.9;
   var dy = 0.035;
   var yD = yU-dy*num_gr/ncol;
   JSROOT.extend(obj, { fX1NDC: xL, fY1NDC: yD, fX2NDC: xR, fY2NDC: yU });

   return obj;
}

function CreateLegendEntry(obj, lbl) {
//         var entry = JSROOT.Create("TLegendEntry"); // only with dev version

   var entry = JSROOT.Create("TObject");
   JSROOT.Create("TAttText", entry);
   JSROOT.Create("TAttLine", entry);
   JSROOT.Create("TAttFill", entry);
   JSROOT.Create("TAttMarker", entry);
   JSROOT.extend(entry, { fLabel: "", fObject: null, fOption: "" });
   entry._typename = 'TLegendEntry';

   entry.fObject = obj;
   entry.fLabel = lbl;
   entry.fOption = "lp";
   return entry;
}

function updateGUI( id_obj, data ) {
    // this is just generation of graph
//     window.alert("---- updateGUI ------");
    var xx = data['xx'];
    var yy = data['yy'];
    var num_gr = data['num_gr'];
    var minY = data['minY'];
    var maxY = data['maxY'];
    var minX = data['minX'];
    var maxX = data['maxX'];
    var names = data['names'];
    var title = data['title'];
// alert("names: "+names);
    var maxLegCol = 8;
    var ncol = Math.ceil(num_gr/maxLegCol);
    var leg = CreateLegend(num_gr,ncol);

    var graphs_js = [];
    var mgraph = JSROOT.Create("TMultiGraph");
    for (var igr=0; igr<num_gr; igr++) {
        graphs_js[igr] = JSROOT.CreateTGraph(xx[igr].length, xx[igr], yy[igr]);
        var iColor = igr+1;
        var nameSens = names[igr];// "xxx"+igr.toString();// 
//         if (igr<3) {window.alert("xxx"+igr.toString());}
        if (iColor==10) {iColor += 25;}
        graphs_js[igr].fLineColor = iColor;
        graphs_js[igr].fMarkerColor = iColor;
        graphs_js[igr].fMarkerStyle = 20;
        graphs_js[igr].fMarkerSize = 0.4;
        if (num_gr>8) {  graphs_js[igr].fMarkerSize /= 2.0; }
        graphs_js[igr].fName = nameSens;
//         graphs_js[igr].GetXaxis().SetTimeDisplay(1);
//         graphs_js[igr].GetXaxis().SetTimeFormat('%Y%m%d');
//         graphs_js[igr].GetXaxis().SetTimeOffset(0, 'gmt');
        mgraph.fGraphs.Add(graphs_js[igr], "lp");
        leg.fPrimitives.Add( CreateLegendEntry(graphs_js[igr], nameSens) );
    }

//     mgraph.fTitle = "";

    //set fixed Y-range
    if ( data["minGr"]>=data["maxGr"] ) {
        var delta = maxY-minY;
        if (delta<0.01) {delta=0.01};
        mgraph.fMinimum = minY - 0.3*delta;
        mgraph.fMaximum = maxY + 0.8*delta;
    } else {
        mgraph.fMinimum = data["minGr"];
        mgraph.fMaximum = data["maxGr"];
    }
//     window.alert("fMinimum: "+mgraph.fMinimum+",  fMaximum: "+mgraph.fMaximum);
    
    var h1 = JSROOT.CreateTH1(maxX-minX);
//     JSROOT.extend(h1.fXaxis, { fXmin: minX, fXmax: maxX });
//     h1.fName = "axis_draw";
    h1.fTitle = title;
    h1.fMinimum = mgraph.fMinimum;
    h1.fMaximum = mgraph.fMaximum;
    
    h1.fXaxis.fTimeDisplay = true;
    h1.fXaxis.fXmin = minX;//0;
    h1.fXaxis.fXmax = maxX;
    h1.fXaxis.fLabelSize = 0.03;
    h1.fYaxis.fLabelSize = 0.03;
//     h1.fYaxis.fNdiv = 4;
//     h1.fXaxis.fNdiv = 4;
//     h1.fXaxis.fNdivisions = 505;
//     h1.fYaxis.fNdivisions = 505;
    mgraph.fHistogram = h1;
    mgraph.fFunctions.Add(leg,"");
    
    var divTab = document.getElementById("idTabContent");
    var widthTab = 300;//divTab.offsetWidth;

    var hWind = window.screen.availHeight;
    var wWind = window.screen.availWidth;
//     window.alert("---- hWind,wWind:"+hWind+","+wWind);

    var divDraw = document.getElementById("object_draw");
    var divDrawMonit = document.getElementById("object_draw_monit");
    // window.alert("---- widthTab:"+widthTab);

//     divDraw.style.width = divDrawMonit.style.width = widthTab+"px";
//     divDraw.style.height = divDrawMonit.style.height = hWind-280+"px";

    JSROOT.redraw(id_obj, mgraph);
}
