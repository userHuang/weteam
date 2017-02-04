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
        'handleUpdateValues': Constant.PROJECT_MEMBER_UPDATE_VALUES,
        'handleResetValues': Constant.PROJECT_MEMBER_RESET_VALUES,
        'handleShowModal': Constant.PROJECT_MEMBER_SHOW_MODAL
    },

    init() {
        this.data = {
            visible: false,
            userId: -1
        };
    },

    handleShowModal() {
        this.data = {
            visible: true
        };
        this.__emitChange();
    },

    handleUpdateValues(action) {
        this.data['userId'] = action.data.userId;
        this.__emitChange();
    },

    handleResetValues(action) {
        this.data = {
            visible: false,
            userId: -1
        };
        this.__emitChange();
    },

    getData() {
        return this.data;
    }
});

module.exports = DialogStore;