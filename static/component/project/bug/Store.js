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
		'handleGetBugs': Constant.PROJECT_BUG_GET_BUGS
	},

	init() {
		this.data = {
			'requireBugs' : [{
				id: 1,
				name: 'ceshi',
				creator: 'qw',
				participant: 'ere',
				created_at: '2019-01-10 11:11',
				end_at: '2019-01-10 11:11'
			}]
		};
	},

	handleGetBugs(action) {
		this.data['requireBugs'] = action.data.requireBugs;
		this.__emitChange();
	},

	getData() {
		return this.data;
	}
});

module.exports = SpecialPostageStore;