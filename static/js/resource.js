/*
Copyright (c) 2011-2012 Weizoom Inc
*/


(function() {

'use strict';
var debug = window.Debug('mall:Resource');

var urlTemplate = _.template("/<%=app%>/api/<%=resource%>/?<%=args%>");

var defaultArgs = {
	version: 1
};

var buildArgs = function(args) {
	var mergedArgs = _.extend({}, defaultArgs, args);
	var argList = [];

	if (mergedArgs) {
		$.each(mergedArgs, function(key, value) {
			argList.push(key+'='+value);
		});
	}

	return encodeURI(argList.join('&'));
};

var reportError = function(url, error) {
	if (!url) {
		debug('logapi: no url');
		return;
	}

	$.post('/account/logapi/log_api_error/', {
		api: url,
		error: error
	});
};

var getUrl = function(app, resource, args) {
	return urlTemplate({app:app, resource:resource, args:buildArgs(args)});
};

var emptyFn = function() {};

var __call = function(options) {
	var app = options.app;
	var resource = options.resource;
	var method = options.method || 'get';
	var args = options.args || {};

	//hack method
	if (method === 'put') {
		method = 'post'
		args['_method'] = 'put'
	} else if (method === 'delete') {
		method = 'post'
		args['_method'] = 'delete'
	}

	var onSuccess = options.success || emptyFn;
	var onError = options.error || emptyFn;
	var scope = options.scope || window;
	var disableCache = true;
	if (options.hasOwnProperty('disableCache')) {
		disableCache = options.disableCache;
	}
	var url = 'unknown';

	if (disableCache) {
		args['timestamp'] = new Date().getTime();
	}

	var showLoading = true;
	if (options.hasOwnProperty('showLoading')) {
		showLoading = options.showLoading;
	}

	var options = {
		type: method,
		cache: false,
		success: function(resp) {
			if (showLoading) {
				W.getLoadingView().hide();
			}
			if (resp.code !== 200) {
				_this.reportError(url, resp.innerErrMsg);
				if (onError) {
					onError.call(scope, resp);
				}
			}
			else {
				if (resp.sqls) {
					if(__W_DBG_parseSqls) {
						__W_DBG_parseSqls(resp.sqls, resp.apiSource);
					}
				}
				onSuccess.call(scope, resp.data || {});
			}
		},
		error: function(xhr, resp) {
			if (showLoading) {
				W.getLoadingView().hide();
			}
			reportError(url, xhr.responseText);
			onError.call(scope, resp);
		}
	}

	if (method === 'get') {
		options.url = getUrl(app, resource, args);
		debug('GET url %s', options.url);
		if (showLoading) {
			W.getLoadingView().show();
		}
		$.ajax(options);
	}
	else if (method === 'post') {
		var qs = {};
		if (args['_method']) {
			qs['_method'] = args['_method'];
		}
		options.url = getUrl(app, resource, qs);
		debug('POST url %s', options.url);
		options.data = args;
		if (showLoading) {
			W.getLoadingView().show();
		}
		$.ajax(options);
	}
	else {
		debug('[ERROR]: unsupported method ' + method);
	}
}

function __parseResource(options) {
	var app = options.app;
	var resource = options.resource;
	if (!app) {
		var pos = resource.indexOf('.');
		app = resource.substring(0, pos);
		resource = resource.substring(pos+1);
	}

	return {
		app: app,
		resource: resource
	}
}

var __callApi = function(method, options) {
	var args = options.data || {};
	__call({
		method: method,
		app: options.app,
		scope: options.scope || window,
		resource: options.resource,
		args: args,
		success: options.success,
		error: options.error
	});
}

W.Resource = {
	get: function(options) {
		options = options || {};
		var resourceInfo = __parseResource(options);
		options.app = resourceInfo.app;
		options.resource = resourceInfo.resource;
		return __callApi('get', options);
	},

	put: function(options) {
		options = options || {};
		var resourceInfo = __parseResource(options);
		options.app = resourceInfo.app;
		options.resource = resourceInfo.resource;
		return __callApi('put', options);
	},

	post: function(options) {
		options = options || {};
		var resourceInfo = __parseResource(options);
		options.app = resourceInfo.app;
		options.resource = resourceInfo.resource;
		return __callApi('post', options);
	},

	'delete': function(options) {
		options = options || {};
		var resourceInfo = __parseResource(options);
		options.app = resourceInfo.app;
		options.resource = resourceInfo.resource;
		return __callApi('delete', options);
	}
}

})()
