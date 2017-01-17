"use strict";

var _ = require('underscore');
var Constant = require('./Constant');
var Dispatcher = require('../../../../util/dispatcher');

var Action = {
	getRequire(projectId) {
		$.ajax({
            url:'/project/get_require/',
            type:'get',
            data:{
            	'project_id': projectId
            },
            success:function(resp){
                if(resp.code == 200){
                    // location.reload();
                    console.log(resp,"===========")
                    Dispatcher.dispatch({
						actionType: Constant.PROJECT_REQUIREMENT_GET_USERS,
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

	showModal() {
		Dispatcher.dispatch({
			actionType: Constant.PROJECT_REQUIREMENT_SHOW_MODAL,
			data: {}
		});
	},

	updateValues (property, value) {
		Dispatcher.dispatch({
			actionType: Constant.PROJECT_REQUIREMENT_UPDATE_VALUES,
			data: {
				property: property,
				value: value
			}
		});
	},

	resetValues () {
		Dispatcher.dispatch({
			actionType: Constant.PROJECT_REQUIREMENT_RESET_VALUES,
			data: {}
		});
	},

	addRequire (name, remark, projectId) {
		console.log(name, remark,projectId,"======");
		$.ajax({
            url:'/project/add_require/',
            type:'post',
            data:{
                'name': name,
                'remark': remark,
                'project_id': projectId
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
	}
};

module.exports = Action;