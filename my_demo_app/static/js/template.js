function Post(URL, PARAMTERS) {
    //创建form表单
    let temp_form = document.createElement("form");
    temp_form.action = URL;
    //如需打开新窗口，form的target属性要设置为'_blank'
    temp_form.target = "_self";
    temp_form.method = "post";
    temp_form.style.display = "none";
    //添加参数
    let opt = document.createElement("textarea");
    opt.name = "file_path";
    opt.value = PARAMTERS.file_path;
    temp_form.appendChild(opt);
    let opt2 = document.createElement("textarea");
    opt2.name = "img_num";
    opt2.value = PARAMTERS.img_num;
    temp_form.appendChild(opt2);
    document.body.appendChild(temp_form);
    let opt3 = document.createElement("textarea");
    opt3.name = "text_list_json";
    opt3.value = PARAMTERS.text_list_json;
    temp_form.appendChild(opt3);
    //提交数据
    temp_form.submit();
}
function show_img_onclick(id){
    $.post("/my_demo_app/model_click", ''+id,function (data) {
        console.log("OK");
        Post("/my_demo_app/creat", data);
    })
}
$(document).ready(function () {
    $("#nav_upload").removeClass("am-active");
    $("#nav_model").addClass("am-active");
    $("#nav_other").removeClass("am-active");
});