/**
 * 初始化上传组件
 * @param eleId input file的id
 * @param type 业务类型，目前是order和bill
 * @param buttonText 上传按钮的文字
 * @param uploadScript 提交url路径
 */
    function initUploadFive(eleId, type, buttonText, uploadScript, onUploadComplete){
        $(".edit_download").show();

        var $queue = $('#uploadifive-' + eleId + '-queue'),
            $el = $("#"+eleId);
        if($queue.length > 0) $queue.html('');
        $('#uploadfilepath_'+type).val('');
        $el.data('uploadifive') || $el.uploadifive({
            'overrideEvents': ['onError','onSelect','onUploadComplete'],
            'removeCompleted' : false,
            'fileObjName' : 'file',
            'height'      : 40,
            'buttonText'  : buttonText,
            'buttonClass' : 'upload_logo uploadBtn',
            'fileSizeLimit': '20MB',
            'width'       : 75,
            'uploadScript': uploadScript,
            'onUploadComplete' : onUploadComplete,
            'onError' : function(errorType,file) {
                $queue = $('#uploadifive-' + eleId + '-queue');
                if(errorType == 'FILE_SIZE_LIMIT_EXCEEDED'){
                    toast('文件大小不能超过20M','error');
                }else{
                    toast(file.name + ' 上传出错，请重试','danger');
                }
                $queue.html('');
                $('#uploadfilepath_'+type).val('');
            },
            'onSelect' : function(file) {
                $queue = $('#uploadifive-' + eleId + '-queue');
                if($queue.children().length > 1){
                    $queue.children().eq(0).remove();
                }
            }
        });
    }