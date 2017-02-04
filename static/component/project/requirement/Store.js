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
		'handleGetRequire': Constant.PROJECT_REQUIREMENT_GET_USERS
	},

	init() {
		const projectId = window.projectId;
		this.data = {
			'projectId' : projectId
		};
	},

	handleGetRequire(action) {
		this.data['requirements'] = action.data.requirements;
		this.__emitChange();
	},

	getData() {
		return this.data;
	}
});

module.exports = Store;