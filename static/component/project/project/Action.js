"use strict";

var _ = require('underscore');
var Constant = require('./Constant');
var Dispatcher = require('../../../../util/dispatcher');

var Action = {
	updateSpecialValues(index, property, value) {
		Dispatcher.dispatch({
			actionType: Constant.POSTAGE_CONFIG_UPDATE_SPECIAL_VALUES,
			data: {
				index: index,
				property: property,
				value: value
			}
		});
	},

	addSpecialPostage() {
		Dispatcher.dispatch({
			actionType: Constant.POSTAGE_CONFIG_ADD_SPECIAL_POSTAGE,
			data: {}
		});
	},

	deleteSpecialPostage(index) {
		Dispatcher.dispatch({
			actionType: Constant.POSTAGE_CONFIG_DELETE_SPECIAL_POSTAGE,
			data: {
				index: index
			}
		});
	}
};

module.exports = Action;