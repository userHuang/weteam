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
							'requirements': JSON.parse(resp.data.requirements),
                            'relationRequires': JSON.parse(resp.data.relation_requires)
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
	},

    addRelationBug(name, remark, relationId, projectId) {
        console.log(name, remark, relationId, projectId,'name, remark, relationId, projectId');
        $.ajax({
            url:'/project/add_bug/',
            type:'post',
            data:{
                'name': name,
                'remark': remark,
                'project_id': projectId,
                'relation_id': relationId
            },
            success:function(resp){
                if(resp.code == 200){
                    Action.getRequire(projectId);
                }
            },
            error:function(){
                console.log('create_fail');
            }
        });
    },

    showModal() {
        Dispatcher.dispatch({
            actionType: Constant.PROJECT_MAIN_SHOW_MODAL,
            data: {}
        });
    },

    updateValues (property, value) {
        Dispatcher.dispatch({
            actionType: Constant.PROJECT_MAIN_UPDATE_VALUES,
            data: {
                property: property,
                value: value
            }
        });
    }
};

module.exports = Action;