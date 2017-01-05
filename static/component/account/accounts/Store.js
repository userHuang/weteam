"use strict";

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var StoreUtil = require('../../../../util/util');
var Dispatcher = require('../../../../util/dispatcher');
var Constant = require('./Constant');

var SpecialPostageStore = StoreUtil.createStore(Dispatcher, {
	actions: {
		'handleAddSpecialPostage': Constant.POSTAGE_CONFIG_ADD_SPECIAL_POSTAGE,
		'handleUpdateSpecialValues': Constant.POSTAGE_CONFIG_UPDATE_SPECIAL_VALUES,
		'handleDeleteSpecialPostage': Constant.POSTAGE_CONFIG_DELETE_SPECIAL_POSTAGE
	},

	init: function() {
		this.data = {
			'specialPostages': [{
				'area': '南京',
				'firstWeight': '10',
				'firstWeightPrice': '1',
				'addedWeight': '1',
				'addedWeightPrice': '1'
			}]
		};
	},

	handleAddSpecialPostage: function() {
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

	handleUpdateSpecialValues: function(action) {
		var index = action.data.index;
		var property = action.data.property;
		var value = action.data.value;
		var specialPostages = this.data.specialPostages;
		specialPostages[index][property] = value;
		this.data.specialPostages = specialPostages;
		this.__emitChange();
	},

	handleDeleteSpecialPostage: function(action){
		var index = action.data.index;
		var specialPostages = this.data.specialPostages;
		specialPostages.splice(index,1)
		this.data.specialPostages = specialPostages;
		this.__emitChange();
	},

	getData: function() {
		return this.data;
	}
});

module.exports = SpecialPostageStore;