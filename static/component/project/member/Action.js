"use strict";

var _ = require('underscore');
var Constant = require('./Constant');
var Dispatcher = require('../../../../util/dispatcher');
import { message } from 'antd';

var Action = {
	updateSelectValues (userId) {
		Dispatcher.dispatch({
			actionType: Constant.PROJECT_MEMBER_UPDATE_VALUES,
			data: {
				userId: userId
			}
		});
	},

	resetValues () {
		Dispatcher.dispatch({
			actionType: Constant.PROJECT_MEMBER_RESET_VALUES,
			data: {}
		});
	},

	showModal() {
		Dispatcher.dispatch({
			actionType: Constant.PROJECT_MEMBER_SHOW_MODAL,
			data: {}
		});
	},
	//获取成员
	getMembers(projectId){
		$.ajax({
			url:'/project/get_members/',
			type:'get',
			data:{
				project_id: projectId
			},
			success:function(resp){
				if(resp.code == 200){
					// location.reload();
					console.log(resp,"===========")
					Dispatcher.dispatch({
						actionType: Constant.PROJECT_MEMBER_GET_USERS,
						data: {
							'users': JSON.parse(resp.data.users),
							'allUsers': JSON.parse(resp.data.all_users),
							'role': resp.data.role
						}
					});
				}
			},
			error:function(){
				console.log('create_fail');
			}
		});
	},
	//添加成员
	addMember (userId, projectId) {
		$.ajax({
			url:'/project/add_member/',
			type:'post',
			data:{
				'user_id': userId,
				'project_id': projectId
			},
			success:function(resp){
				if(resp.code == 200){
					Action.getMembers(projectId);
				}
			},
			error:function(){
				console.log('create_fail');
			}
		});
	},
	//删除成员
	deleteMember (userId, projectId) {
		console.log(userId,"==========");
		$.ajax({
			url:'/project/delete_member/',
			type:'post',
			data:{
				'user_id': userId,
				'project_id': projectId
			},
			success:function(resp){
				if(resp.code == 200){
					message.success('移除成功', 1.5);
					Action.getMembers(projectId);
				}
			},
			error:function(){
				console.log('create_fail');
			}
		});
	}
};

module.exports = Action;