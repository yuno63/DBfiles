function CreateLegend(num_gr,ncol) {
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
    var minY1 = Math.min.apply(null,yy[0]);
    var maxY1 = Math.max.apply(null,yy[0]);
    var dY1 = ( maxY1-minY1)<0.1? 0.1:( maxY1-minY1);
    var minX = data['minX'];
    var maxX = data['maxX'];
    var names = data['names'];
    var title = data['title'];
    var timeDB = Math.round(data['timeDB']*1000)/1000;
    var scale_status = data['scale_status']; 
    
    var maxLegCol = 8;
    var ncol = Math.ceil(num_gr/maxLegCol);
    var leg = CreateLegend(num_gr,ncol);
    var coefDown=0.3, coefUp=0.8, minDelta=0.1;

    var graphs_js = [];
    var mgraph = JSROOT.Create("TMultiGraph");
    for (var igr=0; igr<num_gr; igr++) {
        var nameSens = names[igr];
        if (igr>0 && scale_status) {
            var minYi = Math.min.apply(null,yy[igr]);
            var maxYi = Math.max.apply(null,yy[igr]);
            var dYi = (maxYi-minYi)<minDelta? minDelta:( maxYi-minYi);
            for (var i=0; i<yy[igr].length; i++) {
                yy[igr][i] = minY1 + dY1/dYi*(yy[igr][i]-minYi);
            }
            var limDown = Math.round((minYi-coefDown*dYi)*1000)/1000;
            var limUp = Math.round((minYi+coefUp*dYi)*1000)/1000;
            nameSens += " (" + limDown.toString() + "-" + limUp.toString() + ")";
        }
        graphs_js[igr] = JSROOT.CreateTGraph(xx[igr].length, xx[igr], yy[igr]);
        var iColor = igr+1;
        if (iColor==10) {iColor += 25;}
        graphs_js[igr].fLineColor = iColor;
        graphs_js[igr].fMarkerColor = iColor;
        graphs_js[igr].fMarkerStyle = 20;
        graphs_js[igr].fMarkerSize = 0.2;
        if (num_gr>8) {  graphs_js[igr].fMarkerSize /= 2.0; }
        if (xx[igr].length>50) {  graphs_js[igr].fMarkerSize /= 2.0; }
        graphs_js[igr].fName = nameSens;
//         graphs_js[igr].GetXaxis().SetTimeDisplay(1);
//         graphs_js[igr].GetXaxis().SetTimeFormat('%Y%m%d');
//         graphs_js[igr].GetXaxis().SetTimeOffset(0, 'gmt');
        mgraph.fGraphs.Add(graphs_js[igr], "lp");
        leg.fPrimitives.Add( CreateLegendEntry(graphs_js[igr], nameSens) );
    }

    //set fixed Y-range
    if (scale_status) {
        mgraph.fMinimum = minY1 - coefDown*dY1;
        mgraph.fMaximum = maxY1 + coefUp*dY1;
    } else {
        if ( data["minGr"]>=data["maxGr"] ) {
            var delta = maxY-minY;
            if (delta<minDelta) {delta=minDelta};
            mgraph.fMinimum = minY - coefDown*delta;
            mgraph.fMaximum = maxY + coefUp*delta;
        } else {
            mgraph.fMinimum = data["minGr"];
            mgraph.fMaximum = data["maxGr"];
        }
    }
//     window.alert("fMinimum: "+mgraph.fMinimum+",  fMaximum: "+mgraph.fMaximum);
    
    var h1 = JSROOT.CreateTH1(maxX-minX);
    h1.fTitle = title;// + '  ( DB query: ' + timeDB.toString() + ' s )';
    h1.fTitleSize = 1.035;
    h1.fMinimum = mgraph.fMinimum;
    h1.fMaximum = mgraph.fMaximum;
    
    h1.fXaxis.fTimeDisplay = true;
    h1.fXaxis.fXmin = minX;//0;
    h1.fXaxis.fXmax = maxX;
    h1.fXaxis.fLabelSize = 0.03;
    h1.fYaxis.fLabelSize = 0.03;
    if (scale_status) {
        h1.fYaxis.fTitle = names[0];
    }
    mgraph.fHistogram = h1;
    mgraph.fFunctions.Add(leg,"");

    JSROOT.redraw(id_obj, mgraph);
}
