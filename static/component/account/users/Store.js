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
		'handleAddUser': Constant.ACCOUNT_USERS_ADD_USER,
		'handleGetUsers': Constant.ACCOUNT_USERS_GET_USERS
	},

	init() {
		this.data = {
			'users': []
		};
	},

	handleGetUsers(action) {
		this.data['users'] = action.data.users;
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