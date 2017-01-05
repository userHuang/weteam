
/*商家入驻、入驻类目/特殊资质提交*/
//一级分类
var first_catalog = [];
var second_catalog = [];
var expressC, areaCont;
var uploadCont = '';
var arrow = '_';

$.ajax({
    url:'/business/api/customer_apply/',
    type:'get',
    success:function(resp){
		first_catalog = resp['data']['first_catalog'];
		second_catalog = resp['data']['second_catalog'];
		second_catalog_ids = resp['data']['second_catalog_ids'];
		catalog_qualifications = resp['data']['catalog_qualifications'];
		/*初始化一级目录*/
		function initFirstCatalog() {
			areaCont = "";
			expressC = '';
			for (var i=0; i<first_catalog.length; i++) {
				areaCont += '<li onClick="selectA(' + i + ');"><a href="javascript:void(0)">' + first_catalog[i] + '</a></li>';
				for (var j=0; j<second_catalog[i].length; j++) {
					expressC += '<li class="selectB_'+i+' hide selectB_' + i + '_' + j + '" onClick="selectB(' + i + ',' + j + ');"><a href="javascript:void(0)">' + second_catalog[i][j] + '</a></li>';
				}
				$("#sort2").html(expressC)
			}
			$("#sort1").html(areaCont);
		}
		initFirstCatalog();
    },
    error:function(){
    }
});
/*选择一级目录*/
function selectA(p) {
	$("#sort2 li").addClass("hide")
	$('.selectB_'+p+'').removeClass("hide");//暴露出二级分类
	
	if($("#sort1 li").eq(p).hasClass("active")){
		if(!$('.selectB_'+p+'').hasClass("active")){ //没有二级分类被选中时，不选择一级分类
			$("#sort1 li").eq(p).removeClass("active");
		}
	}
}

/*选择二级目录*/
function selectB(p,c) {
	uploadCont = '';
	var catalog_id = second_catalog_ids[p][c];
	if($('.selectB_' + p + '_' + c + '').hasClass("active")){
		$('.selectB_' + p + '_' + c + '').removeClass("active");
		$('.selectedSort #'+catalog_id+'').remove();

		//如果有特殊资质
		if($('.qualification-for-catalog-'+ catalog_id +'').attr("class")){
			var class_names  = $('.qualification-for-catalog-'+ catalog_id +'').attr("class").split(' ');
			if(class_names.length >2){ //有重叠的特殊资质,只移除classname
				$('.qualification-for-catalog-'+ catalog_id +'').removeClass('qualification-for-catalog-'+catalog_id+'');
			}else{
				$('.qualification-for-catalog-'+ catalog_id +'').remove();
			}
		}

		if(!$('.selectB_' + p +'').hasClass("active")){
			$("#sort1 li").eq(p).removeClass("active");//二级类目全部取消了选择，就把一级类目也取消选择
		}
	}else{
		$('.selectB_' + p + '_' + c + '').addClass("active");
		$("#sort1 li").eq(p).addClass("active");
		$('.selectedSort').append('<span class="selectedSortSpan" id='+catalog_id+'>'+second_catalog[p][c]+'</span>');
		//渲染所需特殊资质
		if(catalog_qualifications[catalog_id].length > 0){
			var need_upload_len = $('#apply_page_3_upload_field .form-group').length;
			var already_has_title = [];
			for( i = 0 ; i < need_upload_len ; i++){
				already_has_title.push($('#apply_page_3_upload_field .form-group label').eq(i).text());
			}
			for(var i=0; i<catalog_qualifications[catalog_id].length; i++ ){
				var catalog_qualification = catalog_qualifications[catalog_id][i];
				var is_repeat = false;
				for(var i in already_has_title){
					if(catalog_qualification['qualification_name'] == already_has_title[i]){   //资质是否重复了
						is_repeat = true;
					}
				}
				if(!is_repeat){
					uploadCont +='<div class="form-group qualification-for-catalog-'+catalog_id+'">'+
			            '<img class="wui-upload-img wa-upload-img-catalog_qualification_'+catalog_qualification['qualification_id']+'" src="/static/img/no_pic.png" style="display:block">'+
			            '<label for="catalog_qualification_'+catalog_qualification['qualification_id']+'">'+catalog_qualification['qualification_name']+'</label>'+
			            '<span class="btn btn-primary fileinput-button">'+
			                '<span>上传</span>'+
			                '<input id="catalog_qualification_'+catalog_qualification['qualification_id']+'" type="file" name="image" class="xa-uploader" />'+
			            '</span>'+
			            '<div class="progress mt5 xa-progress xui-hide">'+
			                '<div class="progress-bar progress-bar-success xa-bar"></div>'+
			            '</div>'+
			            '<input class="form-control xui-datePicker xa-datePicker" type="text" value="到期时间" id="datetimepicker-catalog_qualification_'+catalog_qualification['qualification_id']+'" data-date-format="yyyy-mm-dd hh:ii">'+
			        '</div>'
				}else{
					$('#apply_page_3_upload_field .form-group label').parent().addClass('qualification-for-catalog-'+catalog_id+'');
					$('#apply_page_3_upload_field .form-group label').parent().find('img').addClass('wa-upload-img-catalog_qualification_'+catalog_qualification['qualification_id']+'');
				}
				
			}
			$("#apply_page_3_upload_field").append(uploadCont);

			$('.xa-uploader').on("click",function(event){
				uploadImg(event);
			});
			$(".xa-datePicker").datetimepicker(options);
		}
	}
}


//时间控件
var min = 'now';
var max = null;
var useMaxTime = false;
var date = new Date();
var dateStr = date.getFullYear() +'-' + (date.getMonth()+1) + '-' + date.getDate() +' ';
var time = "00:00";
if (useMaxTime){
    time = "23:59";
}
var options = {
	defaultValue: dateStr + time,
	buttonText: '选择日期',
	currentText: '当前时间',
	hourText: "小时",
	minuteText: "分钟",
	numberOfMonths: 1,
	dateFormat: "yy-mm-dd",
	timeFormat: 'HH:mm',
	closeText: '确定',
	prevText: '&#x3c;上月',
	nextText: '下月&#x3e;',
	monthNames: ['一月','二月','三月','四月','五月','六月',
	    '七月','八月','九月','十月','十一月','十二月'],
	monthNamesShort: ['一','二','三','四','五','六',
	    '七','八','九','十','十一','十二'],
	dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
	dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
	dayNamesMin: ['日','一','二','三','四','五','六'],
	beforeShow: function(input) {
	    if(min === 'now') {
	        $(this).datetimepicker('option', 'minDate', new Date());
	    }else if (min){
	        $(this).datetimepicker('option', 'minDate', min);
	    }
	    if(max === 'now') {
	        $(this).datetimepicker('option', 'maxDate', new Date());
	    }else if(max){
	        $(this).datetimepicker('option', 'maxDate', max);
	    }
	},
	onSelect: function(dateText, inst) {
	    var event = {target:$(".xa-datePicker").get(0)};
	},
	onClose: function(dateText, inst) {
	    var event = {target:$(".xa-datePicker").get(0)};
	}
};