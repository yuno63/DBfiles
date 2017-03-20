function setSensors() {
    var category = $('input[name="seg-1"]:checked').val();
    if ($('input[name="pvss"]:checked').val()=="Yes") {
        var sens = sensorsPVSS[category];
    }else{
       var sens = sensorsDB[category];
    }
    $('#sensors').empty();
    $('#label-sens').text("Group: "+category+"("+sens.length+")");
    $('#lb_save_categ').text("Group: "+category+"("+sens.length+")");
    var txtFilter = document.getElementById("txt_filter").value;
    for (var i = 0; i < sens.length; i++){
        if (~sens[i].toLowerCase().indexOf(txtFilter.toLowerCase())) {
            $('#sensors').append("<option value="+sens[i]+" >"+sens[i]+"</option>")
        }
    }
}

function changePvssDb() {
    document.getElementById("txt_filter").value = '';
    setSensors();
    clearSelected();
    var lb_pvss = document.getElementById('lb_pvss');
    var lb_db = document.getElementById('lb_db');
    if ($('input[name="pvss"]:checked').val()=="Yes") {
        lb_pvss.style.fontWeight="bold";
        lb_db.style.fontWeight="normal";
    }else{
        lb_pvss.style.fontWeight="normal";
        lb_db.style.fontWeight="bold";
    }
}

function setupSubGroups(category) {
//     var category = $('input[name="seg-1"]:checked').val();
    var btn_Gr_Indiv = $('input[name="GrIndiv-1"]:checked').val();
    if ( (btn_Gr_Indiv=="Group") ) {
        var check_subgroup = document.getElementById('id_check_subgroup');
        var min_subgroup = document.getElementById('id_min_subgroup');
        var max_subgroup = document.getElementById('id_max_subgroup');
        var btn_pos_group = document.getElementById('btn_pos_group');
        var pos_group = document.getElementById('pos_group');
        
        btn_pos_group.innerHTML = '';
        pos_group.innerHTML = '';
        if (category=="All") {return};

        var container_list = document.getElementsByClassName('group_container');
        for (var cont=0; cont<container_list.length; cont++) {
            container_list[cont].style.display = 'none';
        }
        
        var name_child_list = document.getElementsByName('check_' + category);
//         alert("category: "+category+",  name_child_list.length: "+name_child_list.length);
        if (name_child_list.length>0) { // checkboxes for category - existed
            document.getElementById('div_check_' + category).style.display = 'block';
            document.getElementById('div_min_' + category).style.display = 'block';
            document.getElementById('div_max_' + category).style.display = 'block';
        } else {
            var subNames = subGrupNames[category];
            var subTitles = subGrupTitles[category];
            var subNumbTitles = subGrupNumbTitles[category];
            var nSubGr = subNames.length;
    
            // set new checkbox column
            var divEnd = '</div>';
//             check_subgroup.innerHTML = '';
            var cmd = '<div class="group_container"  id="div_check_' + category + '" >';
            for (var i=0; i<nSubGr; i++) {
                var iStr = i.toString();

                var divInit = '<div class="checkbox" name="check_' + category + '" style="padding-top:-7px; padding-bottom:0px;margin-top:-8px;margin-left:-5px;">';
                var labelPref = '<label class="checkbox" name="check_sub" style="font-size:12px;" id="check_lb_' + category + '_';
                var checkPref = '<input type="checkbox" name="check_sub" id="check_' + category + '_';
                var txtTooltip = ' data-toggle="tooltip" data-placement="bottom" title="' + subTitles[i] + '" data-trigger="hover" ';
                var cmdDiv = divInit + labelPref + iStr + '"' + txtTooltip + '>' + checkPref + iStr + '"' + txtTooltip + '" checked value="'+ iStr + '">'+ subNumbTitles[i] + '</label>' + divEnd;
                cmd = cmd+cmdDiv;
            }
            cmd = cmd+divEnd;
            check_subgroup.innerHTML = check_subgroup.innerHTML + cmd;
            
            // set new minVal column
//             min_subgroup.innerHTML = '';
//             max_subgroup.innerHTML = '';
            var minmax = ["min", "max"];
            for (var mnx=0; mnx<minmax.length; mnx++) {
                var mm = minmax[mnx];
                cmd = '<div class="group_container"  id="div_'+ mm + '_' + category + '" >';
                for (var i=0; i<nSubGr; i++) {
                    var iStr = i.toString();
                    var val = 0.;
                    var divInit = '<div class="form-group" style="padding-top:-5px; padding-bottom:0px;margin-top:-1px;margin-bottom:0px;">';
                    var txtTooltip = ' data-toggle="tooltip" data-placement="bottom" title="' + mm + ' val" data-trigger="hover" ';
                    var label = '<label for="id_' + mm + '_'+ iStr + '"' +  txtTooltip + ' style="font-size:15px;height:18px;">' + mm + ':</label>';
                    var input = '<input class="form-control-sm"' + txtTooltip + ' id="id_'  + category + '_'+ mm + '_'+ iStr + '" style="max-width:50%;font-size:12px;height:18px;" value="' + val.toString() +'">';
                    var cmdDiv = divInit + label + input + divEnd;
                    cmd = cmd+cmdDiv;
    //                 alert("cmdDiv: "+cmdDiv);
                }
                cmd = cmd+divEnd;
    //             window.alert("cmd: "+cmd);
                if (mm=="min") {min_subgroup.innerHTML = min_subgroup.innerHTML + cmd;}
                else if (mm=="max") {max_subgroup.innerHTML = max_subgroup.innerHTML + cmd;};
            }
        }
    }
}

function changeSaveGroup() {
    var lb_selected = document.getElementById('lb_save_selected');
    var lb_categ = document.getElementById('lb_save_categ');
    var lb_all = document.getElementById('lb_save_all');
    if ($('input[name="opt-sens-save"]:checked').val()=="selected") {
        lb_selected.style.fontWeight="bold";
        lb_categ.style.fontWeight="normal";
        lb_all.style.fontWeight="normal";
    }
    else if($('input[name="opt-sens-save"]:checked').val()=="categ"){
        lb_selected.style.fontWeight="normal";
        lb_categ.style.fontWeight="bold";
        lb_all.style.fontWeight="normal";
        $('#id_btn_save').prop("disabled", false);
    }
    else if($('input[name="opt-sens-save"]:checked').val()=="all"){
        lb_selected.style.fontWeight="normal";
        lb_categ.style.fontWeight="normal";
        lb_all.style.fontWeight="bold";
        $('#id_btn_save').prop("disabled", false);
    }
    check_btn_save();
}

$(function(){
    $('input[name=disp_tabs]').change(function(){
        window.alert("disp_tabs");
    });
    $('input[name=seg-1]').change(function(){
        var category = $('input[name="seg-1"]:checked').val();
        setupSubGroups(category);
        setSensors();
        setTable();
        setFig3D();
        setFileTab();
    });
//     $('input[name=check_sub]').change(function(){
//         window.alert("id:");
//     });
    $('input[name=GrIndiv-1]').change(function(){
        var btn_Gr_Indiv = $('input[name="GrIndiv-1"]:checked').val();
        var category = $('input[name="seg-1"]:checked').val();
        var name_child_list = document.getElementsByName('check_' + category);
//         window.alert("btn_Gr_Indiv:"+btn_Gr_Indiv ); 
        var pos_selected = document.getElementById('pos_selected');
//         var pos_group = $(".pos_group").html();
//         var pos_selected = document.querySelector('.pos_selected');
//         var pos_group = document.querySelector('.pos_group');
        if (btn_Gr_Indiv=="Selected") {
            document.getElementById('btn_pos_group').innerHTML = '';
            document.getElementById('pos_group').innerHTML = '';
            var selEl = document.getElementById("sensors-selected");
            if (selEl.length==0) {
                $('#id_btn_draw').prop("disabled", true);
                $('#id_btn_monit').prop("disabled", true);
            }
            else {
                $('#id_btn_draw').prop("disabled", false);
                $('#id_btn_monit').prop("disabled", false);
            }
            document.getElementById('filter_block').style.display = 'block';
            document.getElementById('sens_list_block').style.display = 'block';
            document.getElementById('object_draw').style.display = 'block';
            document.getElementById('object_draw_monit').style.display = 'block';
            document.getElementById('group_list_block').style.display = 'none';
            document.getElementById('div_pad_select').style.display = 'none';
            document.getElementById('div_pad_select_monitor').style.display = 'none';
            document.getElementById('div_scaled_check').style.display = 'block';
            document.getElementById('div_grid_check').style.display = 'block';
            document.getElementById('div_scaled_check_monit').style.display = 'block';
//             $(".pos_group").style.display = 'none';
//             $(".pos_selected").style.display = 'block';
            
//             document.getElementById('pos_group').style.display = 'none';
//             document.getElementById('pos_group').style.visibility = 'hidden';
            document.getElementById('pos_selected').style.display = 'block';

//             $('#main_block').detach().appendTo('#tab_link');
//             $('.pos_group').html();
//             $('.pos_selected').html(pos_group);

//             pos_selected.innerHTML = pos_group.innerHTML;//+pos_selected.innerHTML;
//             pos_group.innerHTML = '';
        }
        else { // Group
            if (name_child_list.length==0) { 
                // initially create check/min/max divs for all groups
                for (var igr=0; igr<categorie_names.length; igr++) {
                    setupSubGroups(categorie_names[igr]);
                }
            }
            setupSubGroups(category);
            $('#id_btn_draw').prop("disabled", false);
            $('#id_btn_monit').prop("disabled", false);
            document.getElementById('filter_block').style.display = 'none';
            document.getElementById('sens_list_block').style.display = 'none';
            document.getElementById('object_draw').style.display = 'none';
            document.getElementById('object_draw_monit').style.display = 'none';
            document.getElementById('group_list_block').style.display = 'block';
            document.getElementById('div_pad_select').style.display = 'block';
            document.getElementById('div_pad_select_monitor').style.display = 'block';
            document.getElementById('div_scaled_check').style.display = 'none';
            document.getElementById('div_grid_check').style.display = 'none';
            document.getElementById('div_scaled_check_monit').style.display = 'none';
//             $(".pos_group").style.display = 'block';
//             $(".pos_selected").style.display = 'none';
            if (pos_selected) {pos_selected.style.display = 'none';}
            document.getElementById('pos_group').style.display = 'block';
//             document.getElementById('pos_group').style.visibility = 'visible';

//             $('#tab_link').detach().appendTo('#main_block');
//             $('.pos_selected').html();
//             $('.pos_group').html(pos_selected);
//             $('.pos_group').html();

//             pos_group.innerHTML = pos_selected.innerHTML;//+pos_group.innerHTML;
//             pos_selected.innerHTML = '';
        }
    });
});

function setLenSaveSelected(){
    var selEl = document.getElementById("sensors-selected");
    if (selEl) {
        $('#lb_save_selected').text("Selected ("+selEl.length+")");
    }
}

function appendSelected(){
    // add new element to list
    var sens = $('select#sensors').val();
    var selEl = document.getElementById("sensors-selected");
    for (var isens=0; isens<sens.length; isens++) {
        var id_coinsided = false;
        for(var i=0; i<selEl.length; i++) {
            if (selEl.options[i].value == sens[isens]) 
                {id_coinsided = true};
        }
        if (!id_coinsided) {
            $('#sensors-selected').append("<option value="+sens[isens]+">"+sens[isens]+"</option>");
            $('#id_clear').prop("disabled", false);
            $('#id_btn_draw').prop("disabled", false);
            $('#id_btn_monit').prop("disabled", false);
            $('#id_btn_save').prop("disabled", false);
        }
    }
    setLenSaveSelected();
    check_btn_save();
//     deselect_all();
};

function select_all(){
    var selEl = document.getElementById("sensors-selected");
    if (selEl) {
        for(var i=0; i<selEl.length; i++) {
            selEl.options[i].selected = true;
        }
    }
}

function deselect_all(){
    var selEl = document.getElementById("sensors-selected");
    for(var i=0; i<selEl.length; i++) {
        selEl.options[i].selected = false;
    }
}

function check_btn_save() {
    setLenSaveSelected();
    var selEl = document.getElementById("sensors-selected");
    if ($('input[name="opt-sens-save"]:checked').val()=="selected") {
        if (selEl.length==0) {
            $('#id_btn_save').prop("disabled", true);
        }
    } 
//     var txt = document.getElementById('txt_file_name').val();
// //     window.alert("---- check_btn_save ------- txt:"+txt+"("+txt.length+")");
//     if (txt.type==undefined) {
//         $('#id_btn_save').prop("disabled", true);
//     }
}

function clearSelected(){
    select_all();
    $('#sensors-selected').empty();
//     $('#id_clear').prop("disabled", true);
    $('#id_btn_draw').prop("disabled", true);
    $('#id_btn_monit').prop("disabled", true);
    check_btn_save();
};

function  setFileTab(){
}

function SwitchTab(my_tab, my_content) {
    for(var i=0; i<tabNames.length; i++) {
        document.getElementById('content_'+tabNames[i]).style.display = 'none';
        document.getElementById('tb_'+tabNames[i]).style='background-color:white';
        document.getElementById('tb_'+tabNames[i]).className = '';
    }
    document.getElementById(my_content).style.display = 'block';  
    document.getElementById(my_tab).className = 'active';
    document.getElementById(my_tab).style='background-color:yellow';
    if (my_tab!="tb_monit") {
        var elem = document.getElementById("id_btn_monit");
        elem.style.background='blue';
        elem.textContent = "Start";
        clearInterval(window.timerID);
    }
    if (my_tab=="tb_3D") {
        setFig3D();
    }
    var bpg = document.getElementById('btn_pos_group');
    if (bpg!=null) {bpg.innerHTML='';}
    var pg = document.getElementById('pos_group');
    if (pg!=null) {pg.innerHTML='';}
};

$(function () {
    $("[data-toggle='tooltip']").tooltip();
});

function getInfoByName_PVSS_DB(nameSens,st_pvss_db) {
    var category = 'All';
    if (st_pvss_db=='pvss') {
        var sens_PVSS_DB = sensorsPVSS[category];
    } else {
        var sens_PVSS_DB = sensorsDB[category];
    }
    var info = {};
    for (var i = 0; i < sens_PVSS_DB.length; i++){
        if (nameSens==sens_PVSS_DB[i]) {
//             alert('i:'+i);
            info['namePVSS'] = sensorsPVSS[category][i];
            info['nameDB'] = sensorsDB[category][i];
            info['descript'] = sensorsDescript[category][i];
            info['exp'] = sensorsExp[category][i];
            info['status'] = sensorsStatus[category][i];
            info['id'] = sensorsID[category][i];
            info['unity'] = sensorsUnity[category][i];
        }
    }
//     alert('---getInfoByName_PVSS_DB--- nameSens:'+nameSens+'  nameDB:'+info['nameDB']+'  ID:'+info['id']+'  unity:'+info['unity']);
    return info;
}

function setTable() {
    var category = $('input[name="seg-1"]:checked').val();
    $('tbody').empty();

    var sensID = sensorsID[category];
    var sensUnity = sensorsUnity[category];
//     alert("sensID.length:" + sensID.length);
    var sensPVSS = sensorsPVSS[category];
    var sensDBraw = sensorsDBraw[category];
    var sensDescript = sensorsDescript[category];
    var sensStatus = sensorsStatus[category];

    for (var i = 0; i < sensPVSS.length; i++){
//         var listDB = [sensID[i], sensPVSS[i], sensDBraw[i], sensDescript[i], "N/A", sensUnity[i], sensStatus[i]];
        var sensVal = "--";
        indSens = nameTables.indexOf(sensPVSS[i]);
        if (indSens>-1) {
            sensVal = dbValue[sensPVSS[i]];
        }
        var sensUn = sensUnity[i];
        var row = $("<tr>").append($("<td>").html(sensID[i]))
                            .append($("<td>").html(sensPVSS[i]))
                            .append($("<td>").html(sensDBraw[i]))
                            .append($("<td>").html(sensDescript[i]))
                            .append($("<td>").html(sensVal))
                            .append($("<td>").html(sensUn))
                            .append($("<td>").html(sensStatus[i]));
        $("tbody").append(row);
    }
};

function setFig3D() {
//     alert("setFig3D");
    var category = $('input[name="seg-1"]:checked').val();
    $('#id_show_3D').empty();
    var figName = "";
    switch(category) {
        case 'All':
            var filename = "https://rawgit.com/yuno63/DBfiles/master/images/MyGeom.root";
            var itemname = "simple1;1";
            var opt = "all";
            JSROOT.OpenFile(filename, function(file) {
                file.ReadObject(itemname, function(obj) {
                    JSROOT.draw("id_show_3D", obj, opt);
                });
            });
            break;
        case 'CRP':
            figName = "LAPP.png";
            break;
        case 'Heater':
            figName = "Heater.png";
            break;
        case 'HighVoltage':
            figName = "CAEN_HighVoltage.png";
            break;
        case 'LAPP':
            figName = "LAPP.png";
            break;
        case 'Led':
            break;
        case 'Levelmeter':
            figName = "Levelmeter.png";
            break;
        case 'Pressure':
            figName = "Pressure.png";
            break;
        case 'Temperature':
            figName = "TE_ribbon_chain_1.png";
//             figName = "TE_CRP_ABCD.png";
            break;
        case 'Thermocouple':
            figName = "Thermocouple.png";
            break;
    }
    cmd = '<img src="https://cdn.rawgit.com/yuno63/DBfiles/master/images/' + 
            figName + '" style="height: 420px; width: 700px;">';
//     cmd = '<img src="media/images/' + figName + '" style="height: 420px; width: 700px;">';
    if (category!="All") 
        {$('#id_show_3D').append(cmd);};
};


function show_pos_select(ibtn) {
//     alert('show_pos_select  '+ibtn);
    var indGr = getIndGr();
    var numPads = indGr.length;
    var sizePad = getSizePad();
    var widthPad=sizePad[0], heightPad=sizePad[1];
    var numRows=sizePad[2];
    var numbShown = Math.ceil(numPads/numRows);
    var stNotCorrectVisibility = false;

    for (var ipad=0; ipad<numPads; ipad++) {
        var ip = (ipad+1).toString()
        var id_pad = document.getElementById("object_draw_"+ip);
        var stShown = Math.floor(ipad/numbShown) + 1 == ibtn;
        
        if (stShown) {
            id_pad.style.display = 'block';
            id_pad.style.visibility = 'visible';            
        } else {
            if (id_pad.childNodes.length>0) {
                id_pad.style.display = 'none';
            }
            id_pad.style.visibility = 'visible';   
        }
        if (id_pad.childNodes.length>0) {
            id_pad.childNodes[0].setAttribute("visibility","visible");
            id_pad.childNodes[0].draw_width = widthPad;
            id_pad.childNodes[0].draw_height = heightPad;
        }
        else {
            stNotCorrectVisibility = true;
        }
    }
    return stNotCorrectVisibility;
};

function setBtnGroup() {
    var sizePad = getSizePad();
    var numRows=sizePad[2];

    document.getElementById("btn_pos_group").innerHTML = '';
    if (numRows>1) {
        var cmdBtn = '<div class="btn-group btn-group-sm">';
        for (var ibtn=1; ibtn<=numRows; ibtn++) {
            var ib = ibtn.toString();
            cmdBtn = cmdBtn + '<button type="button" class="btn btn-info" name="btn_pos_select" ';
            if (ibtn==0) {cmdBtn = cmdBtn+' checked';} 
            cmdBtn = cmdBtn + ' onclick="show_pos_select('+ib+')" id="btn_pos_group_' + ib + '" value="' + ib + '">' + ib + '</button>';
        }
        cmdBtn = cmdBtn + '</div>';
        document.getElementById("btn_pos_group").innerHTML = cmdBtn;
    }
};


function drawGroup() {
    var indGr = getIndGr();
    var numPads = indGr.length;
//     window.alert("indGr: "+indGr);
    var sizePad = getSizePad();
    var widthPad=sizePad[0], heightPad=sizePad[1];
    
    var cmd = "";
    for (var ipad=0; ipad<numPads; ipad++) {
        var ip = (ipad+1).toString()
        var cmdDiv = '<div id="object_draw_' + ip + 
            '" class="draw_group" style="float:left; width:' + 
            widthPad + 'px; height:' + heightPad + 'px;"></div>';
        cmd = cmd+cmdDiv;
    }
    
    document.getElementById('pos_group').innerHTML = cmd;
    
    for (var ipad=0; ipad<numPads; ipad++) {
        requestAjax( indGr[ipad], ipad );
    }
//     if (fcn && typeof(fcn) === "function") {
//         fcn();
//     }
//     setBtnGroup();
};

function requestAjax(iGr, ipad) {
    var selected_group = $('input[name="GrIndiv-1"]:checked').val();
    var category = $('input[name="seg-1"]:checked').val();
    var subTitles = subGrupTitles[category];
    var minmax = getMinMaxGr();
    if (selected_group=="Selected") {
        select_all();
        indGr = [0];
    } else {
        indGr = [iGr];
    }
    var mode = document.getElementById("tb_monit").className =='active' ? "monitor" : "draw";
    var pvss_db = $('input[name="pvss"]:checked').val();
    var st_pvss_db = (pvss_db=="Yes") ? "pvss" : "db";
//     alert("requestAjax   mode:"+mode+"   pvss_db:"+pvss_db);
    
    $.ajax({
        type: 'POST',
        url: 'draw/',
        dataType: 'json',
        data: {
            mode: JSON.stringify( mode ),
            category: JSON.stringify( category ),
            names: JSON.stringify( $('#sensors-selected').val() ),
            npoints: $('#id_npoint').val(),
            ind_gr: JSON.stringify( indGr ),
            time_interval: $('#time_interval').val(),
            time_monitor_shift: JSON.stringify( $('#id_time_monitor_shift').val() ),
            time1: $('#time1_inp').val(),
            time2: $('#time2_inp').val(),
            pvss_db: JSON.stringify( st_pvss_db ),
            selected_group: JSON.stringify( $('input[name="GrIndiv-1"]:checked').val() ),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        // if success post request
        success : function(json) {
            idp=document.getElementById('pos_group');
            var txt='<div id="id_test" style="display:none;">BASE_DIR:' + json['BASE_DIR'] +';</div>';
//             idp.innerHTML=txt;
            var fields = ['xx', 'yy', 'num_gr', 'minY', 'maxY', 'minX', 'maxX', 'names', 'timeDB'];
            if (selected_group=="Selected") {
//                 var hWind = window.screen.availHeight;
//                 var wWind = window.screen.availWidth;
                var widthPad = window.screen.availWidth*0.97*9/12;
                var heightPad = window.screen.availHeight*0.75-100;
                var data = {"minGr": 0, "maxGr": 0};
                for (var i=0;i<fields.length;i++) {
                    data[fields[i]] = json[fields[i]];
                }
                data['title'] = 'Selected sensors';
                data['scale_status'] = $('#id_scaled_check').is(":checked");
                data['st_pvss_db'] = st_pvss_db;
                var id_draw = 'object_draw';
                if (mode=="monitor") {id_draw += "_monit";};
//                 window.alert("id_draw:"+id_draw);
                document.getElementById(id_draw).style.height = heightPad.toString() + 'px';
                document.getElementById(id_draw).style.width = widthPad.toString() + 'px';
                $("#"+id_draw).empty();
                updateGUI( id_draw, data );
            }
            else { // Group
                // variant to draw single group (not all gpoups)
                var data = {};
                for (var i=0;i<fields.length;i++) {
                    var val = json[fields[i]];
                    if (typeof(val) == "object") {
                        data[fields[i]] = val[0];
                    } else {
                        data[fields[i]] = val;
                    }
                }
                data['title'] = subTitles[ipad];
                data['minGr'] = minmax['minGr'][ipad];
                data['maxGr'] = minmax['maxGr'][ipad];
                data['scale_status'] = false;
                data['st_pvss_db'] = st_pvss_db;
                var id_draw = 'object_draw_'+(ipad+1).toString();
        //         window.alert("id_draw:"+id_draw);
                updateGUI( id_draw, data );
            }
        },
        // if unsuccess post request
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
    deselect_all();
};

function getSizePad() {
    var list_pad = document.getElementById("tb_monit").className =='active' ? 
            document.getElementById('id_grid_group_monitor') : 
            document.getElementById('id_grid_group');
    var indGr = getIndGr();
    var numPads = indGr.length;
    var hWind = window.screen.availHeight;
    var wWind = window.screen.availWidth;
    var numRows = 1;
    
//     var pad_selected = $('input[name="pad_show"]:checked').val();
    var pad_selected = "NaN";
    for(var i=0; i<list_pad.length; i++) {
//         alert(i+"  list_pad.options[i].selected:"+list_pad.options[i].selected);
        if (list_pad.options[i].selected) {
            pad_selected = $(list_pad[i]).val();
        }
    }
//     alert("hW,wW: ["+hWind+","+wWind+"];  list_pad.length:"+list_pad.length+"   pad:"+pad_selected);

    var widthPad = wWind/numPads*0.93;  // 1xN
    var heightPad = hWind*0.78-120;
    switch(pad_selected) {
        case '1xN':  
            break;
        case '2xN':  
            if (numPads>1) { 
                widthPad = wWind/Math.ceil(numPads/2)*0.93; 
                numRows = 2;
            } 
            break;
        case 'Nx1':  
            widthPad = wWind*0.93;             
            numRows = numPads;
            break;
        case 'Nx2':  
            if (numPads>1) { 
                widthPad = wWind/2.*0.93; 
                numRows = Math.ceil(numPads/2);
            }         
            break;
    }
    if (numRows>1) {heightPad -= 30;}
//     window.alert("getSizePad --- wWind,hWind: "+wWind+", "+hWind+"   w,h: "+widthPad+", "+heightPad+"   pad:"+pad_selected);
    return [widthPad, heightPad, numRows];
};

function getMinMaxGr() {
    var selected_group = $('input[name="GrIndiv-1"]:checked').val();
    var category = $('input[name="seg-1"]:checked').val();
    var minGr=[], maxGr=[];
    if (selected_group=="Group") {
        var nSubGr = subGrupNames[category].length;
        for (var i=0; i<nSubGr; i++) {
            var id = 'check_' + category + '_' + i.toString();
            if ($('#' + id).is(":checked")) {
                minGr.push( $( '#id_' + category + '_min_'+i.toString() ).val() );
                maxGr.push( $( '#id_' + category + '_max_'+i.toString() ).val() );
            }
        }
    } else { 
        minGr.push(0);
        maxGr.push(0);
    }
//     window.alert("minGr: "+minGr+";    maxGr: "+maxGr);
    var data = {"minGr": minGr, "maxGr": maxGr};
    return data;
};

function getIndGr() {
    var selected_group = $('input[name="GrIndiv-1"]:checked').val();
    var category = $('input[name="seg-1"]:checked').val();
    var indGr = [];
    if (selected_group=="Group") {
        var nSubGr = subGrupNames[category].length;
        for (var i=0; i<nSubGr; i++) {
            var id = 'check_' + category + '_'+i.toString();
            if ($('#' + id).is(":checked")) {indGr.push(i);}
        }
    } else { indGr.push(0);}
//     window.alert("indGr: "+indGr);
    return indGr;
}

function save() {
    select_all();
    $.ajax({
        type: 'POST',
        url: 'draw/',
        dataType: 'json',
        data: {
            mode: JSON.stringify( "save" ),
            category: JSON.stringify( $('input[name="seg-1"]:checked').val() ),
            opt_sens_save: JSON.stringify( $('input[name="opt-sens-save"]:checked').val() ),
            file_name: $('#txt_file_name').val(),
            names: JSON.stringify( $('#sensors-selected').val() ),
            time1: $('#time1-file').val(),
            time2: $('#time2-file').val(),
            pvss_db: JSON.stringify( $('input[name="pvss"]:checked').val()?"pvss":"db" ),
            selected_group: JSON.stringify( $('input[name="GrIndiv-1"]:checked').val() ),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        // if success post request
        success : function(json) {
            window.alert('---- save success ------- json["num_gr"]:'+json["num_gr"]);
            var filePath = json["fnSaved"];
//             $('<form></form>').attr('action', filePath).appendTo('body').submit().remove();
        },
        // if unsuccess post request
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
    deselect_all();
};

function table() {
    $('#id_btn_table_update').prop("disabled", true);
    $.ajax({
        type: 'POST',
        url: 'table/',
        data: {
            time_table_shift: JSON.stringify( $('#id_time_table_shift').val() ),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        success : function(json) {
            $("#id_time_table").text("Access time: "+json['time_table_access_str']);  
            dbValue = json['dbValue'];
            setTable();
            $('#id_btn_table_update').prop("disabled", false);
        },
        error : function(xhr,errmsg,err) {
            $('#id_btn_table_update').prop("disabled", false);
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
};

function cleanGraphs(mode){
//     var mode='';
    if ($('input[name="GrIndiv-1"]:checked').val()=="Selected") {
            document.getElementById('object_draw'+mode).innerHTML = '';
    } else {  // Group
        document.getElementById("btn_pos_group").innerHTML = '';
        document.getElementById('pos_group').innerHTML = '';
    }
};

function draw_grid(xy) {
    // xy: "x","y"
    var grid_on = $('#id_grid_check').is(":checked");
//     alert('grid_on:'+grid_on);

    var id_pad = document.getElementById("object_draw");
    var id_canvas = id_pad.childNodes[0];
    
    var root_frame = id_canvas.getElementsByClassName("root_frame")[0];
    var grid_layer = id_canvas.getElementsByClassName("grid_layer")[0];

    var xy_axis = id_canvas.getElementsByClassName(xy+"axis_container")[0];
    var xy_axis_labels = xy_axis.getElementsByClassName("axis_labels")[0];
    
    var xy_nticks = xy_axis_labels.childElementCount;
    
    var w = root_frame.draw_width;
    var h = root_frame.draw_height;
    
    var xy_d = "";
    for (i=0; i<xy_nticks; i++) {
        if (xy=="x") {
            var val = xy_axis_labels.childNodes[i].x.baseVal[0].valueAsString;
            xy_d += "M"+val+",0v"+h;
        } else {
            var val = xy_axis_labels.childNodes[i].y.baseVal[0].valueAsString;
            xy_d += "M0,"+val+"h"+w;
        }
    }
    
    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
    path.setAttribute("class", xy+"grid");
    path.setAttribute("d",xy_d);
    path.style.stroke = "black";
    path.style.strokeWidth = 1; 
    path.style.strokeDasharray = "1, 3"; 
    
    if (grid_on) {
        grid_layer.appendChild(path);
    } else {
        grid_layer.removeChild(path);
    }
}

function checkGraphPainted() {
    var stCorrectlyPainted = true;
    if ($('input[name="GrIndiv-1"]:checked').val()=="Selected") {
        var id_pad = document.getElementById("object_draw");
        if (id_pad.childNodes.length==0) stCorrectlyPainted = false;
    } else {  // Group
        var indGr = getIndGr();
        var numPads = indGr.length;
        for (var ipad=0; ipad<numPads; ipad++) {
            var ip = (ipad+1).toString()
            var id_pad = document.getElementById("object_draw_"+ip);
            if (id_pad.childNodes.length==0) stCorrectlyPainted = false;
        }
        if (stCorrectlyPainted) {
            show_pos_select(1);
        }
    }
    if (stCorrectlyPainted) {
        $("#GraphShowTimer").TimeCircles().stop();
        $('#modal_show').modal('hide');
        clearInterval(window.timerPainter);
        draw_grid("x");
        draw_grid("y");
    }
}

function drawGraphs(){
    if ( $('input[name="GrIndiv-1"]:checked').val()=="Selected" ) {
        requestAjax();
    } else {  // Group
        drawGroup();
        setBtnGroup();
    }
};

$(document).on('submit', '#draw_form', function(e){
    $("#GraphShowTimer").data('date','00:00').TimeCircles().start();
    $('#modal_show').modal('show');
    cleanGraphs('');
    e.preventDefault(); // cancell the browser actions
    drawGraphs();
    timerPainter = setInterval(checkGraphPainted, 500);
    
});

$(document).on('submit', '#draw_monit_form', function(e){
    e.preventDefault();
    // change Start-Stop
    var elem = document.getElementById("id_btn_monit");
    if (elem.textContent=="Start") {
        elem.style.background='red';
        elem.textContent = "Stop";
    
        drawGraphs();
        
        var repetition = $('#repetition_db_access').val();  // s
        timerID = setInterval(drawGraphs, 1000*repetition);
    }
    else {
        elem.style.background='blue';
        elem.textContent = "Start";
        clearInterval(window.timerID);
    }
});

$(document).on('submit', '#draw_save_form', function(e){
    e.preventDefault();
    save();
});

$(document).on('submit', '#show_table_form', function(e){
    e.preventDefault();
    table();
});

