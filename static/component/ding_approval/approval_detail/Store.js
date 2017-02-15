"use strict";

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var StoreUtil = require('../../../../util/util');
var Dispatcher = require('../../../../util/dispatcher');
var Constant = require('./Constant');
var W = require('../../loadJSON');

var Store = StoreUtil.createStore(Dispatcher, {
	actions: {
		
	},

	init() {
		this.data = {
			'approvalDetails': []
		};

		var approvalDetails = W.loadJSON('approval_details');
		if(approvalDetails){
			this.data['approvalDetails'] = approvalDetails;
		}
	},

	getData() {
		return this.data;
	}
});

module.exports = Store;