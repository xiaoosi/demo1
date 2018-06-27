function img_click() {
    $('#file_upload').click();
    $('#bu_upload').val("开始制作");
}

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
function sleep(n) { //n表示的毫秒数
    let start = new Date().getTime();
    while (true) if (new Date().getTime() - start > n) break;
}

function FileUpload() {
    let show_massage = $('#show_massage');
    let progress = $.AMUI.progress;
    let form_data = new FormData();
    let file_info = $('#file_upload')[0].files[0];
    form_data.append('file', file_info);
    if(file_info == undefined){
        alert('你没有选择任何文件');
    }else{
        progress.start();
        $.post({
        url: '/my_demo_app/upload_ajax',
        type: 'POST',
        data: form_data,
        processData: false,  // tell jquery not to process the data
        contentType: false,  // tell jquery not to set contentType
        success: function (data) {
            //alert(data.img_num);
            show_massage.html("完成");
            progress.done();
            Post("/my_demo_app/creat", data);
        },
        });
        show_massage.text("正在上传...");
    }
}
$(document).ready(function () {
    $("#nav_upload").addClass("am-active");
    $("#nav_model").removeClass("am-active");
    $("#nav_other").removeClass("am-active");
});