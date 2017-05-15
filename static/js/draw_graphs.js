function cls() {alert("this class name: "+this.className);};

function getParent(el, parentTagName) {
    var obj = el;
    var i=0;
    alert("object class name: "+obj.className);
    while (obj.tagName != parentTagName) {
        i += 1;
        obj = obj.parentNode;
        alert(i+" parent: "+obj.className);
    }
    return obj;
    
}

function AxisCustom(obj_parent) {
    var minX = obj_parent.fXaxis.fXmin;
    var maxX = obj_parent.fXaxis.fXmax;
    var x1_axis = minX-0.08*(maxX-minX);
    var x2_axis = maxX-0.2*(maxX-minX);
    var obj = JSROOT.Create('TLine');
//     JSROOT.Create("TLine", obj);
//     JSROOT.extend(obj, { _typename: "AxisCustom", fName: "testAxis", fX1NDC: 0.2, fX2NDC: 0.2, fY1NDC: 0.1, fY2NDC: 0.9, fInit: 1 } );
    JSROOT.extend(obj, { fTitle: "testAxis", fLineColor: 3, fLineSyle: 1, fLineWidth: 2, fTextAngle: 0, fTextSize: 0.04, fTextAlign: 11, fTextColor: 3, fTextFont: 42 });
    JSROOT.extend(obj, {fX1: x1_axis, fX2: x1_axis, fY1: obj_parent.fMinimum, fY2: obj_parent.fMaximum });
//     return obj;

// alert('obj_parent.fMinimum:'+obj_parent.fMinimum+'   obj_parent.fMaximum:' + obj_parent.fMaximum);

    obj_parent.fFunctions.Add(obj,"");
    
//     JSROOT.extend(obj, { fNdivisions: 510, fAxisColor: 1, fLabelColor: 3, fLabelFont: 42, fLabelOffset: 0.005, fLabelSize: 0.035, fTickLength: 0.03, fTitleOffset: 1, fTitleSize: 0.035, fTitleColor: 3, fTitleFont : 42 });
    
    
    
//     pal.fAxis = JSROOT.Create('TGaxis');
// //          h1.AddFunction(pal, true);
//     
//     var axis = JSROOT.Create('TGaxis');
//     JSROOT.extend(axis, { fTitle: names[1], fX1: x1_axis, fX2: x1_axis, fY1: h1.fMinimum, fY2: h1.fMaximum, fLineColor: 3} );
// //     alert("fX1:"+axis.fX1+"  fX2:"+axis.fX2+ "  fY1:"+axis.fY1+ " fY2:"+axis.fY2);
//     
// //     mgraph.fFunctions.Add(axis,"");
// 
//     var testBox = JSROOT.Create('TBox');
//     JSROOT.extend(testBox, { fX1: x1_axis, fX2: x2_axis, fY1: h1.fMinimum, fY2: h1.fMaximum, fLineColor: 3 });
//     
}

function CreateLegend(num_gr,ncol,xLinit) {
   var obj = JSROOT.Create("TPave");
   JSROOT.Create("TAttText", obj);
   JSROOT.extend(obj, { fColumnSeparation: 0, fEntrySeparation: 0.05, fMargin: 0.2, fNColumns: ncol, fPrimitives: JSROOT.Create("TList") });
   obj._typename = 'TLegend';
   var xL = xLinit-ncol*0.04;
   var xR = 0.9;
   var yU = 0.9;
   var dy = 0.035;
   if (ncol>3) dy = 0.03;
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
    var selected_group = $('input[name="GrIndiv-1"]:checked').val();
    var category = $('input[name="seg-1"]:checked').val();
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
    var st_pvss_db = data['st_pvss_db'];
//     alert('st_pvss_db:'+st_pvss_db);
    
    var maxLegCol = 7;
    var xLinit = 0.35;
    if (num_gr>31) maxLegCol = 8;
    if (num_gr>44) maxLegCol = 10;
    var ncol = Math.ceil(num_gr/maxLegCol);
    if (category=="Insulator" && selected_group=="Group") {
        ncol = 3;
        xLinit = 0.25;
    }
    var leg = CreateLegend(num_gr,ncol,xLinit);
    var coefDown=0.3, coefUp=0.8, minDelta=0.1;

    var graphs_js = [];
    var mgraph = JSROOT.Create("TMultiGraph");
    for (var igr=0; igr<num_gr; igr++) {
        var nameSens = names[igr];
        if (category=="Insulator") {
            infoIns = getNameSensorInsulatorPos(nameSens,st_pvss_db);
        } 
        var info = getInfoByName_PVSS_DB(nameSens,st_pvss_db);
//         alert('--- updateGUI ---  namePVSS:'+info['namePVSS']+'  nameDB:'+info['nameDB']+'  ID:'+info['id']+'  unity:'+info['unity']);
        if (selected_group=="Group") {
            nameSens = info['nameDB'] + " / "+info['namePVSS'];
//             alert('getPadWidth():'+getPadWidth()+'  nameSens:'+nameSens);
            if ( (getPadWidth()<500) && (ncol>3) ) nameSens = info['nameDB'];
//             if (igr<2) alert('getPadWidth():'+getPadWidth()+'  nameSens:'+nameSens);
        } else {
            var unity = info['unity'];
            if (unity!='None') {nameSens += ',' + unity;}
        }
        if (category=="Insulator") {
            nameSens = infoIns["nameSensIns"];
        } 
        
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
        var iLineWidth = 1;
        var iLineStyle = 1;
        var iColor = igr+1;
        if (iColor==10) {iColor += 25;}
        if (category=="Insulator") {
            iColor = infoIns["iColor"];
            iLineWidth = infoIns["iLineWidth"];
            iLineStyle = infoIns["iLineStyle"];
        } 
        graphs_js[igr].fLineColor = iColor;
        graphs_js[igr].fLineWidth = iLineWidth;
        graphs_js[igr].fLineStyle = iLineStyle;
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
    if (typeof(data["minGr"])=='string') {data["minGr"] = parseFloat(data["minGr"])};
    if (typeof(data["maxGr"])=='string') {data["maxGr"] = parseFloat(data["maxGr"])};
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

    var h2 = JSROOT.CreateTH1();
    h2.fTitle = "";
    h2.fMinimum = mgraph.fMinimum;
    h2.fMaximum = mgraph.fMaximum;
    h2.fYaxis.fTitle = "test axis";
    h2.fXaxis.fXmin = 0;
    h2.fXaxis.fXmax = 0;
    h2.fFillColor = 4;

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
//     var frame = mgraph.svg_frame();
// alert('h1.fXaxis.fChopt:'+h1.fChopt+'  h1.fYaxis.fChopt:'+h1.fYaxis.fChopt)
//     h1.fXaxis.fChopt = ['-','+'];
    
     
    var axis = JSROOT.Create('TGaxis');
    var x1_axis = minX+0.2*(maxX-minX);
    var x2_axis = maxX-0.2*(maxX-minX);
    JSROOT.extend(axis, { fTitle: names[1], fX1: x1_axis, fX2: x1_axis, fY1: h1.fMinimum, fY2: h1.fMaximum, fLineColor: 3} );
//     alert("fX1:"+axis.fX1+"  fX2:"+axis.fX2+ "  fY1:"+axis.fY1+ " fY2:"+axis.fY2);
    
//     mgraph.fFunctions.Add(axis,"");
    
    var testBox = JSROOT.Create('TBox');
    JSROOT.extend(testBox, { fX1: x1_axis, fX2: x2_axis, fY1: h1.fMinimum, fY2: h1.fMaximum, fLineColor: 3 });
    
//     var canv = JSROOT.Create('TCanvas');
//     canv.fPrimitives.add(mgraph);
//     mgraph.fGridx = 1;

    
//     AxisCustom(h1);
         
    mgraph.fFunctions.Add(leg,"");
//     h1.fFunctions.Add(draw_grid,"");
//     h1.fFunctions.Add(axis,"");
    mgraph.fHistogram = h1;
         
    JSROOT.draw(id_obj, mgraph);
 
}
