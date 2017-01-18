"use strict";

var _ = require('underscore');
var Constant = require('./Constant');
var Dispatcher = require('../../../../util/dispatcher');

var Action = {
	getRequire(projectId) {
		console.log(projectId,"+++++++++++++");
		$.ajax({
            url:'/project/get_require_details/',
            type:'get',
            data:{
            	'project_id': projectId
            },
            success:function(resp){
                if(resp.code == 200){
                    // location.reload();
                    console.log(resp,"======SSSS=====")
                    Dispatcher.dispatch({
						actionType: Constant.PROJECT_MAIN_GET_REQUIRE,
						data: {
							'requirements': JSON.parse(resp.data.requirements)
						}
					});
                }
            },
            error:function(){
                console.log('create_fail');
            }
        });
	},

	changeStatus(projectId, requireId, status) {
		$.ajax({
            url:'/project/update_status/',
            type:'post',
            data:{
            	'require_id': requireId,
            	'status': status
            },
            success:function(resp){
                if(resp.code == 200){
                    // location.reload();
                    console.log(resp,"======SSSS=====")
                    Action.getRequire(projectId);
                }
            },
            error:function(){
                console.log('create_fail');
            }
        });
	}
};

module.exports = Action;