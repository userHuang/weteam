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
        'handleUpdateValues': Constant.ACCOUNT_USERS_UPDATE_VALUES,
        'handleResetValues': Constant.ACCOUNT_USERS_RESET_VALUES,
        'handleShowModal': Constant.ACCOUNT_USERS_SHOW_MODAL
    },

    init() {
        this.data = {
            visible: false,
            role: 1
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
            userName: '',
            account: ''
        };
        this.__emitChange();
    },

    getData() {
        return this.data;
    }
});

module.exports = DialogStore;