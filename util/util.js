/*
Copyright (c) 2011-2012 Weizoom Inc
*/
// enhance flux store
var FluxStore = require('flux/utils').Store;
var assign = require('object-assign');
var _ = require('underscore');

var onDispatch = function(action) {
    if (!this.action2handler) {
        return;
    }

    var actionHandlerName = this.action2handler[action.actionType];
    if (!actionHandlerName) {
        return;
    }

    var actionHandler = this[actionHandlerName];
    if (!actionHandler) {
        return;
    }

    actionHandler.call(this, action);
}

var createStore = function(dispatcher, options) {
    var store = new FluxStore(dispatcher);

    assign(store, options);

    store.__onDispatch = onDispatch
    store.storeName = options.name || 'unknown';

    //将<handler, action>映射转换为<action, handler>映射
    store.action2handler = {};
    if (store.actions) {
        _.each(store.actions, function(value, key) {
            store.action2handler[value] = key;
        });
    }

    if (!store.init) {
        return;
    }

    store.init();
    return store;
}

module.exports = {
    createStore: createStore
};