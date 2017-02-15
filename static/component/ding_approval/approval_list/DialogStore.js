"use strict";

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var StoreUtil = require('../../../../util/util');
var Dispatcher = require('../../../../util/dispatcher');
var Constant = require('./Constant');
var W = require('../../loadJSON');

var DialogStore = StoreUtil.createStore(Dispatcher, {
    actions: {
        'handleUpdateValues': Constant.PROJECT_REQUIREMENT_UPDATE_VALUES,
        'handleResetValues': Constant.PROJECT_REQUIREMENT_RESET_VALUES,
        'handleShowModal': Constant.PROJECT_REQUIREMENT_SHOW_MODAL
    },

    init() {
        this.data = {
            visible: false
        };
    },

    handleShowModal() {
        this.data = {
            visible: true
        };
        this.__emitChange();
    },

    handleUpdateValues(action) {
        var property = action.data.property;
        var value = action.data.value;
        this.data[property] = value;
        this.__emitChange();
    },

    handleResetValues(action) {
        this.data = {
            visible: false,
            money: '',
            remark: ''
        };
        this.__emitChange();
    },

    getData() {
        return this.data;
    }
});

module.exports = DialogStore;