//全局变量
let file_path = "9lzdba6pgvtuk17ahdzp5b9jjyfpe6lu"; //图片文件夹路径
let img_num = 31;    //切割图片的数量
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
        $("#text_list").append('<span id="text_item_id_'+ this.id +
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
}

//text_item销毁方法
function delete_text_item(id) {
    let text_item_name = "#text_item_id_" + id;
    let show_text_name = "#show_text_id_" + id;
    $(text_item_name).remove();
    $(show_text_name).remove();
    text_list.splice(id,1);
}

function creat_text_item() {
    for(let i=0; i<text_list.length; i++){
        $("#img_box").append('<p class="show_text" id="show_text_id_'
            + text_list[i].id + '">'
            + text_list[i].text +'</p>')
    }
    $("p.show_text").draggable({
        containment: "#img_box"
    });
    $("p.show_text").hide();
    $("p.show_text").css("top", "100px");
    $("p.show_text").css("left", "100px");
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
        // $.post("http://192.168.3.1:8000/my_demo_app/", JSON.stringify(text_list), function (data) {
        //     $("#img_box").css("background-image","url('../static/image_file/" + file_path + "/out.gif')");
        // });
        alert($("#text_item_slider").slider("option", values));
    });
    $("#bu_add").click(function () {
       alert("hello");
       let values = $("#text_item_slider").slider("option", "values", [12, 100]);
        alert(values);
    });





    let a = new TextItem(0);
    a.st_time = 0;
    a.en_time = 10;
    a.text = "我王敬泽";
    a.creat();
    text_list.push(a);
    let b = new TextItem(1);
    b.st_time = 5;
    b.en_time = 20;
    b.text = "就是死";
    b.creat();
    text_list.push(b);
    creat_text_item();
});