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
		'handleGetRequires': Constant.PROJECT_MAIN_GET_REQUIRE,
	},

	init() {
		this.data = {
			'requirements': [],
			'relationRequires': [],
			'visible': false
		}
	},

	handleGetRequires(action) {
		this.data['requirements'] = action.data.requirements;
		this.data['relationRequires'] = action.data.relationRequires;
		this.__emitChange();
	},

	getData() {
		return this.data;
	}
});

module.exports = Store;