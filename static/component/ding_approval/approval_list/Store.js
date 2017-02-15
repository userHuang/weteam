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
		'handleGetBugs': Constant.PROJECT_BUG_GET_BUGS
	},

	init() {
		this.data = {

		};
	},

	handleGetBugs(action) {
		this.data['approvals'] = action.data.approvals;
		this.__emitChange();
	},

	getData() {
		return this.data;
	}
});

module.exports = Store;