"use strict";

var _ = require('underscore');
var Constant = require('./Constant');
var Dispatcher = require('../../../../util/dispatcher');

import { message } from 'antd';

var Action = {
	//通过
    onAdopt(approvalId) {
        $.ajax({
            url:'/ding_approval/adopt/',
            type:'post',
            data:{
                'approval_id': approvalId
            },
            success:function(resp){
                if(resp.code == 200){
                    message.success('通过成功', 1.5);
                    _.delay(function(){
                    	window.location.href = "/ding_approval/";
                	},500)
                }else{
                    message.success('通过失败', 1.5);
                }
            },
            error:function(){
                console.log('add_require_fail');
            }
        });
    },

    //驳回
    onReject(approvalId) {
        $.ajax({
            url:'/ding_approval/reject/',
            type:'post',
            data:{
                'approval_id': approvalId
            },
            success:function(resp){
                if(resp.code == 200){
                    message.success('驳回成功', 1.5);
                    _.delay(function(){
                    	window.location.href = "/ding_approval/";
                	},500)
                }else{
                    message.success('驳回失败', 1.5);
                }
            },
            error:function(){
                console.log('add_require_fail');
            }
        });
    }
};

module.exports = Action;