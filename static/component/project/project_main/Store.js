"use strict";

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var StoreUtil = require('../../../../util/util');
var Dispatcher = require('../../../../util/dispatcher');
var Constant = require('./Constant');
var W = require('../../loadJSON');

var SpecialPostageStore = StoreUtil.createStore(Dispatcher, {
	actions: {
		'handleGetRequires': Constant.PROJECT_MAIN_GET_REQUIRE,
	},

	init() {
		this.data = {
			'requirements': []
		}
	},

	handleGetRequires(action) {
		this.data['requirements'] = action.data.requirements;
		this.__emitChange();
	},

	getData() {
		return this.data;
	}
});

module.exports = SpecialPostageStore;