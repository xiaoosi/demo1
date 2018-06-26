function Post(URL, PARAMTERS) {
    //创建form表单
    var temp_form = document.createElement("form");
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
    //提交数据
    temp_form.submit();
}


function FileUpload() {
    var form_data = new FormData();
    var file_info = $('#file_upload')[0].files[0];
    form_data.append('file', file_info);
    //if(file_info==undefined)暂且不许要判断是否有附件
    //alert('你没有选择任何文件');
    //return false
    $.ajax({
        url: 'http://127.0.0.1:8000/my_demo_app/upload_ajax',
        type: 'POST',
        data: form_data,
        processData: false,  // tell jquery not to process the data
        contentType: false,  // tell jquery not to set contentType
        success: function (data) {
            alert(data.img_num);
            Post("http://127.0.0.1:8000/my_demo_app/creat", data);
            // $.StandardPost("http://127.0.0.1:8000/my_demo_app/creat", data)
        }
    });
}
