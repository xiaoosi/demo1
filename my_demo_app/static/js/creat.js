//全局变量
// let file_path = "9lzdba6pgvtuk17ahdzp5b9jjyfpe6lu"; //图片文件夹路径
// let img_num = 31;    //切割图片的数量
let text_list = new Array(0);   //text_list由多个text_item组成
let id = 0;

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
            '<span id="text_item_id_'+ this.id +
            '" class="test_item">' +
            this.st_time + ' ' +
            this.en_time + ' ' +
            this.text + ' ' +
            this.top + ' ' +
            this.left +
            ' <button id="text_item_bid_' + this.id +
            '" class="text_item_b" onclick="delete_text_item('
            + this.id + ')">删除</button>'
            + '<br></span> '
        );
    };
    this.updata = function () {
        $("#text_item_id_" + this.id).html(
            '<div id="text_item_id_'+ this.id +
            '" class="test_item">' +
            this.st_time + ' ' +
            this.en_time + ' ' +
            this.text + ' ' +
            this.top + ' ' +
            this.left +
            ' <button id="text_item_bid_' + this.id +
            '" class="text_item_b" onclick="delete_text_item('
            + this.id + ')">删除</button>'
            + '<br></div>');
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

function creat_text_item() {
    for(let i=0; i<text_list.length; i++){
        $("#img_box").append('<span class="show_text" id="show_text_id_'
            + text_list[i].id + '">'
            + text_list[i].text +'</span>');
    }
    $("div.show_text").draggable({
        containment: "#img_box"
    });
    $("div.show_text").hide();
    // $("p.show_text").css("top", "100px");
    // $("p.show_text").css("left", "100px");
}



//相当于主函数
$(document).ready(function () {

    //初始化img_slider
    // language=JQuery-CSS
    $("#img_slider").slider({
        orientation: "horizontal", //水平方向
        min: 0,
        max: img_num,
        value: 0,   //初始值
        animate: true,
        slide: function (event, ui) {
            let f_num = ui.value;
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
        max: img_num,
        values: [1, 10],
        animate: true,
        slide: function (event, ui) {

        },
    });

    $("#bu_creat").click(function () {
        $.post("http://127.0.0.1:8000/my_demo_app/", JSON.stringify(text_list), function (data) {
            $("#img_box").css("background-image","url('../static/image_file/" + file_path
                + "/out.gif?t="+Math.random()+")");
        });
        // alert($("#text_item_slider").slider("option", values));
    });

    $("#bu_add").click(function () {
        let text_item = new TextItem(id++);
        text_item.text = $("#in_text").val();
        let time = $("#text_item_slider").slider("option", "values");
        text_item.st_time = time[0];
        text_item.en_time = time[1];
        text_item.top = 250;
        text_item.left = 100;
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
    creat_text_item();
});