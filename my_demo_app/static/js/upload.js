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
        success: function (callback) {
            console.log('ok')
        }
    });
}
