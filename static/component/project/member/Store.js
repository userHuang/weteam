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
		'handleAddSpecialPostage': Constant.POSTAGE_CONFIG_ADD_SPECIAL_POSTAGE,
		'handleUpdateSpecialValues': Constant.POSTAGE_CONFIG_UPDATE_SPECIAL_VALUES,
		'handleDeleteSpecialPostage': Constant.POSTAGE_CONFIG_DELETE_SPECIAL_POSTAGE
	},

	init() {
		this.data = {
			'members': []
		};

		var members = W.loadJSON('members');
		if(members){
			this.data['members'] = members;
		}
	},

	handleAddSpecialPostage() {
		var specialPostages = this.data.specialPostages;
		specialPostages.push({
			'firstWeight': '',
			'firstWeightPrice': '',
			'addedWeight': '',
			'addedWeightPrice': ''
		})
		this.data.specialPostages = specialPostages;
		this.__emitChange();
	},

	handleUpdateSpecialValues(action) {
		var index = action.data.index;
		var property = action.data.property;
		var value = action.data.value;
		var specialPostages = this.data.specialPostages;
		specialPostages[index][property] = value;
		this.data.specialPostages = specialPostages;
		this.__emitChange();
	},

	handleDeleteSpecialPostage(action) {
		var index = action.data.index; 
		var specialPostages = this.data.specialPostages;
		specialPostages.splice(index,1)
		this.data.specialPostages = specialPostages;
		this.__emitChange();
	},

	getData() {
		return this.data;
	}
});

module.exports = Store;