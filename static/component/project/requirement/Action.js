"use strict";

var _ = require('underscore');
var Constant = require('./Constant');
var Dispatcher = require('../../../../util/dispatcher');
import { message } from 'antd';

var Action = {
    //获取需求
	getRequire(projectId) {
		$.ajax({
            url:'/project/get_require/',
            type:'get',
            data:{
            	'project_id': projectId
            },
            success:function(resp){
                if(resp.code == 200){
                    Dispatcher.dispatch({
						actionType: Constant.PROJECT_REQUIREMENT_GET_USERS,
						data: {
							'requirements': JSON.parse(resp.data.requirements)
						}
					});
                }
            },
            error:function(){
                console.log('get_require_fail');
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

    //添加需求
	addRequire (name, remark, projectId) {
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
                console.log('add_require_fail');
            }
        });
	},

    //进入看板
    enterMain(requireId, projectId) {
        $.ajax({
            url:'/project/enter_main/',
            type:'post',
            data:{
                'require_id': requireId
            },
            success:function(resp){
                if(resp.code == 200){
                    message.success('进入看板成功', 1.5);
                    Action.getRequire(projectId);
                }else{
                    message.error('进入看板失败', 1.5);
                }
            },
            error:function(){
                console.log('add_require_fail');
            }
        });
    },

    //删除
    onDelete(requireId, projectId) {
        $.ajax({
            url:'/project/delete_require/',
            type:'post',
            data:{
                'require_id': requireId
            },
            success:function(resp){
                if(resp.code == 200){
                    message.success('删除成功', 1.5);
                    Action.getRequire(projectId);
                }else{
                    message.error('删除失败', 1.5);
                }
            },
            error:function(){
                console.log('add_require_fail');
            }
        });
    }
};

module.exports = Action;