"use strict";

var _ = require('underscore');
var Constant = require('./Constant');
var Dispatcher = require('../../../../util/dispatcher');

var Action = {
	updateValues (property, value) {
		Dispatcher.dispatch({
			actionType: Constant.ACCOUNT_USERS_UPDATE_VALUES,
			data: {
				property: property,
				value: value
			}
		});
	},

	resetValues () {
		Dispatcher.dispatch({
			actionType: Constant.ACCOUNT_USERS_RESET_VALUES,
			data: {}
		});
	},

	showModal() {
		Dispatcher.dispatch({
			actionType: Constant.ACCOUNT_USERS_SHOW_MODAL,
			data: {}
		});
	},

	getUsers(){
		$.ajax({
            url:'/account/getUsers/',
            type:'get',
            data:{},
            success:function(resp){
                if(resp.code == 200){
                    // location.reload();
                    console.log(resp,"===========")
                    Dispatcher.dispatch({
						actionType: Constant.ACCOUNT_USERS_GET_USERS,
						data: {
							'users': JSON.parse(resp.data.users)
						}
					});
                }
            },
            error:function(){
                console.log('create_fail');
            }
        });
	},

	addUser (userName, account) {
		$.ajax({
            url:'/account/addUser/',
            type:'post',
            data:{
                'user_name': userName,
                'account': account
            },
            success:function(resp){
                if(resp.code == 200){
                    // location.reload();
     //                Dispatcher.dispatch({
					// 	actionType: Constant.ACCOUNT_USERS_ADD_USER,
					// 	data: {}
					// });
					Action.getUsers();
                }
            },
            error:function(){
                console.log('create_fail');
            }
        });
	}
};

module.exports = Action;