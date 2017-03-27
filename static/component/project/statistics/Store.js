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
		'handleGetStatistics': Constant.PROJECT_STATISTICS_GET_STATISTICS
	},

	init() {
		this.data = {
			'projectId': window.projectId
		};
	},

	handleGetStatistics(action) {
		var statistics = action.data.statistics;
		this.data['bugNumbers'] = statistics.bug_numbers;
		this.data['requireNumbers'] = statistics.require_numbers;
		this.data['users'] = statistics.users;
		this.__emitChange();
	},

	handleAddUser(action) {
		this.__emitChange();
	},

	getData() {
		return this.data;
	}
});

module.exports = Store;