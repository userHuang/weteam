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
		'handleAddUser': Constant.PROJECT_MEMBER_ADD_USER,
		'handleGetUsers': Constant.PROJECT_MEMBER_GET_USERS
	},

	init() {
		this.data = {
			'users': [],
			'allUsers': [],
			'projectId': window.projectId
		};
	},

	handleGetUsers(action) {
		this.data['users'] = action.data.users;
		this.data['allUsers'] = action.data.allUsers;
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