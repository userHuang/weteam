"use strict";

var _ = require('underscore');
var Constant = require('./Constant');
var Dispatcher = require('../../../../util/dispatcher');

var Action = {
	getBug(projectId) {
        console.log("======---------ss--------");
		$.ajax({
            url:'/project/get_bug/',
            type:'get',
            data:{
            	'project_id': projectId
            },
            success:function(resp){
                if(resp.code == 200){
                    Dispatcher.dispatch({
						actionType: Constant.PROJECT_BUG_GET_BUGS,
						data: {
							'requireBugs': JSON.parse(resp.data.require_bugs)
						}
					});
                }
            },
            error:function(){
                console.log('get_fail');
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

	addBug (name, remark, projectId) {
		$.ajax({
            url:'/project/add_bug/',
            type:'post',
            data:{
                'name': name,
                'remark': remark,
                'project_id': projectId
            },
            success:function(resp){
                if(resp.code == 200){
					Action.getBug(projectId);
                }
            },
            error:function(){
                console.log('create_fail');
            }
        });
	}
};

module.exports = Action;