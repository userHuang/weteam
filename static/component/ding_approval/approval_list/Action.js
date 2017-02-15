"use strict";

var _ = require('underscore');
var Constant = require('./Constant');
var Dispatcher = require('../../../../util/dispatcher');

import { message } from 'antd';

var Action = {
	getAapproval() {
		$.ajax({
            url:'/ding_approval/get_approval/',
            type:'get',
            data:{},
            success:function(resp){
                if(resp.code == 200){
                    Dispatcher.dispatch({
						actionType: Constant.PROJECT_BUG_GET_BUGS,
						data: {
							'approvals': JSON.parse(resp.data.approvals)
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

	approval (money, remark) {
		$.ajax({
            url:'/ding_approval/add_approval/',
            type:'post',
            data:{
                'money': money,
                'remark': remark
            },
            success:function(resp){
                if(resp.code == 200){
					Action.getAapproval();
                }
            },
            error:function(){
                console.log('create_fail');
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
                    Action.getBug(projectId);
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
                    Action.getBug(projectId);
                }else{
                    message.success('删除失败', 1.5);
                }
            },
            error:function(){
                console.log('add_require_fail');
            }
        });
    }
};

module.exports = Action;