"use strict";

var _ = require('underscore');
var Constant = require('./Constant');
var Dispatcher = require('../../../../util/dispatcher');

var Action = {
	getStatistics(projectId){
		$.ajax({
            url:'/project/get_statistics/',
            type:'get',
            data:{
                project_id: projectId
            },
            success:function(resp){
                if(resp.code == 200){
                    console.log(resp,"===========")
                    Dispatcher.dispatch({
						actionType: Constant.PROJECT_STATISTICS_GET_STATISTICS,
						data: {
							'statistics': resp.data.statistics
						}
					});
                }
            },
            error:function(){
                console.log('create_fail');
            }
        });
	}
};

module.exports = Action;