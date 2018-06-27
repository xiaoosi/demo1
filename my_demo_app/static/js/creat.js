//全局变量
// let file_path = "9lzdba6pgvtuk17ahdzp5b9jjyfpe6lu"; //图片文件夹路径
// let img_num = 31;    //切割图片的数量
let text_list = new Array(0);   //text_list由多个text_item组成
let id = 0;
let ex_num = 10;
let correct_text_id_;

//TextItem类定义
function TextItem(id) {
    this.id = id;
    this.st_time = 0;
    this.en_time = 0;
    this.text = 0;
    this.top = 0;
    this.left = 0;
    this.creat = function () {
        //生成方法
        //alert(this.id);
        $("#text_list").append(
            '<tr id="text_item_id_'+ this.id +
            '" class="test_item" onclick="correct_text_item('+this.id+')">' +
            '<td>'+this.st_time + '</td>' +
            '<td>'+this.en_time + '</td>' +
            '<td>'+this.text + '</td>' +
            '<td>'+this.top + '</td>' +
            '<td>'+this.left + '</td>' +
            '<td><button id="text_item_bid_' + this.id +
            '" class="text_item_b am-btn am-btn-danger am-radius" onclick="delete_text_item('
            + this.id + ')">删除</button></td>'
            + '</tr>'
        );
    };
    this.updata = function () {
        $("#text_item_id_" + this.id).html(
            '<td>'+this.st_time + '</td>' +
            '<td>'+this.en_time + '</td>' +
            '<td>'+this.text + '</td>' +
            '<td>'+this.top + '</td>' +
            '<td>'+this.left + '</td>' +
            '<td><button id="text_item_bid_' + this.id +
            '" class="text_item_b am-btn am-btn-danger am-radius" onclick="delete_text_item('
            + this.id + ')">删除</button></td>'
        );
    }
}

//text_item销毁方法
function delete_text_item(id) {
    let text_item_name = "#text_item_id_" + id;
    let show_text_name = "#show_text_id_" + id;
    $(text_item_name).remove();
    $(show_text_name).remove();
    let num = 0;
    for(let i=0; i<text_list.length; i++)
        if(text_list[i].id == id){
            num = i;
            break;
        }
    text_list.splice(num,1);
    for(let i=0; i<text_list.length; i++)
        text_list[i].updata();
}

//text_item创建方法
function creat_text_item() {
    for(let i=0; i<text_list.length; i++){
        $("#img_box").append('<b><div class="show_text" id="show_text_id_'
            + text_list[i].id + '">'
            + text_list[i].text +'</div></b>');
        id++;
        $("#show_text_id_" + text_list[i].id)
            .css("top", 0).css("left", 0)
            .draggable({
            containment: "#img_box",
            iframeFix: true,
            drag: function (event, ui) {
                let top = ui.position[0];
                let left = ui.position[1];
                let needui;
                for(let j = 0; j<text_list.length; j++){
                    if(text_list[j].id == text_list[i].id){
                        needui = text_list[j];
                        break;
                    }
                }
                // alert(ui.position.left);
                needui.top = ui.position.top;
                needui.left = ui.position.left;
                needui.updata();
            }
        });
        if(text_list[i].st_time !== 0){
            $("#show_text_id_" + text_list[i].id).hide();
        }
    }
}

//选中方法
function correct_text_item(id) {
    let stime=0,etime=0;
    for (let i=0;i<text_list.length;++i)
    {
        if (text_list[i].id==id)
        {
            correct_text_id_=id;
            stime = text_list[i].st_time;
            etime = text_list[i].en_time;
            $("#text_item_slider").slider("values",[stime*ex_num,etime*ex_num]);
            $("#in_text").val(text_list[i].text);
            alert("#text_item_id_"+id);
            break;
        }
    }
    //alert("ok");
}


//json转text_item对象
function trans(text_list_str){
    let text_list_json;
    if(text_list_str !== ''){
        text_list_str = text_list_str.replace(/&quot;/g, '"');
        text_list_json = eval('(' + text_list_str + ')');
    }else
        return;
    for(let i=0; i<text_list_json.length; i++){
        let text_item = new TextItem(id++);
        text_item.text = text_list_json[i].text;
        text_item.st_time = text_list_json[i].st_time;
        text_item.en_time = text_list_json[i].en_time;
        text_item.top = text_list_json[i].top;
        text_item.left = text_list_json[i].left;
        text_item.creat();
        text_list.push(text_item);
    }
}

function download(){
    window.location="../static/image_file/"+file_path+"/out.gif";
}

//相当于主函数
$(document).ready(function () {
    //初始化
    $("#nav_upload").addClass("am-active");
    $("#nav_model").removeClass("am-active");
    $("#nav_other").removeClass("am-active");
    $("#img_box").css("background-image","url('../static/image_file/"+file_path+"/patch/0.jpg')");

    //初始化img_slider
    // language=JQuery-CSS
    $("#img_slider").slider({
        orientation: "horizontal", //水平方向
        min: 0,
        max: img_num*ex_num,
        value: 0,   //初始值
        animate: true,
        slide: function (event, ui) {
            let f_num = parseInt(ui.value/ex_num);
            for(let i=0; i<text_list.length; i++){
                let show_text_name = "#show_text_id_"+text_list[i].id;
                if(f_num >= text_list[i].st_time && f_num <= text_list[i].en_time)
                    $(show_text_name).show();
                else
                    $(show_text_name).hide();
            }
            $("#img_box").css("background-image","url('../static/image_file/"+file_path+"/patch/"+f_num+".jpg')");
        },
    });

    //初始化text_iem_slider
    $("#text_item_slider").slider({
        orientation: "horizontal",
        range: true,
        min: 0,
        max: img_num*ex_num,
        values: [1, 10],
        animate: true,
        slide: function (event, ui) {

        },
    });

    $("#bu_creat").click(function () {
        $("#bu_creat").html("<i class=\"am-icon-spinner am-icon-spin\"></i>\n" +
            "制作中");
        $("#fail").html("<i class=\"am-icon-spinner am-icon-spin\"></i>\n" +
            "<p>制作中</p>");
        $.post("/my_demo_app/", JSON.stringify(text_list), function (data) {
            // $("#img_box").css("background-image","url('../static/image_file/" + file_path
            //     + "/out.gif?t="+Math.random()+")");
            $("#bu_creat").html("开始制作");
            $("#fail").html("<img id='fail_img' src='../static/image_file/"+file_path+"/out.gif?t="+Math.random()+"'>"+
                            "<br><button class='am-btn am-btn-primary am-radius'  onclick='download()'>下载图片</button>");
        });
        //alert(JSON.stringify(text_list));
    });

    $("#bu_add").click(function () {
        let text_item = new TextItem(id++);
        text_item.text = $("#in_text").val();
        let time = $("#text_item_slider").slider("option", "values");
        text_item.st_time = parseInt(time[0]/ex_num);
        text_item.en_time = parseInt(time[1]/ex_num);
        text_item.top = 0;
        text_item.left = 0;
        text_list.push(text_item);

        text_item.creat();
        $("#img_box").append('<b><div class="show_text" id="show_text_id_'
            + text_item.id + '">'
            + text_item.text +'</div></b>');
        $("#show_text_id_" + text_item.id)
            .css("top", 0).css("left", 0)
            .draggable({
            containment: "#img_box",
            iframeFix: true,
            drag: function (event, ui) {
                let top = ui.position[0];
                let left = ui.position[1];
                let needui;
                for(let i = 0; i<text_list.length; i++){
                    if(text_list[i].id == text_item.id){
                        needui = text_list[i];
                        break;
                    }
                }
                // alert(ui.position.left);
                needui.top = ui.position.top;
                needui.left = ui.position.left;
                needui.updata();
            }
        });
    });

    $("#bu_alter").click(function () {
        let i;
       for (i=0;i<text_list.length;++i)
       {
           if (text_list[i].id==correct_text_id_)
           {
                text_list[i].text = $("#in_text").val();
                let d_time = $("#text_item_slider").slider("option", "values");
                text_list[i].st_time = parseInt(d_time[0]/ex_num);
                text_list[i].en_time = parseInt(d_time[1]/ex_num);
                break;
           }
       }
       text_list[i].updata();
       $("#img_box div[id='show_text_id_"+correct_text_id_+"']").replaceWith('<b><div class="show_text" id="show_text_id_'
            + text_list[i].id + '">'
            + text_list[i].text +'</div></b>');
       $("#show_text_id_" + text_list[i].id)
            .css("top", text_list[i].top).css("left", text_list[i].left)
            .draggable({
            containment: "#img_box",
            iframeFix: true,
            drag: function (event, ui) {
                let top = ui.position[0];
                let left = ui.position[1];
                let needui;
                for(let j = 0; j<text_list.length; j++){
                    if(text_list[j].id == text_list[i].id){
                        needui = text_list[j];
                        break;
                    }
                }
                needui.top = ui.position.top;
                needui.left = ui.position.left;
                needui.updata();
            }
        });
       //alert("修改成功！");
    });
    // let a = new TextItem(0);
    // a.st_time = 0;
    // a.en_time = 10;
    // a.text = "我王敬泽";
    // a.creat();
    // text_list.push(a);
    // let b = new TextItem(1);
    // b.st_time = 5;
    // b.en_time = 20;
    // b.text = "就是死";
    // b.creat();
    // text_list.push(b);
    trans(text_list_str);
    creat_text_item();
    for(let i = 10; i<img_num; i++)
        $.get("../static/image_file/"+file_path+"/patch/"+i+".jpg");

});