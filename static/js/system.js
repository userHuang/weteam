/*
Copyright (c) 2011-2012 Weizoom Inc
*/
W = {
	debug: {}
}


function ensureNS(ns) {
	var items = ns.split('.');
	var obj = window;
	for (var i = 0; i < items.length; ++i) {
		var item = items[i];
        if (!obj.hasOwnProperty(item)) {
            obj[item] = {}
        }
        obj = obj[item];
	}
}

W.loadJSON = function(id) {
	var selector = '#__json-'+id;
	var text = $.trim($(selector).html());
	return $.parseJSON(text);
}

W.getImgOriginalSize = function(path, callback) {
	var img = new Image();
	img.src = path;
	var width = 0;
	var height = 0;
	if(img.complete){
		width = img.width;
		height = img.height;
		callback(width, height);
    	img = null;
	}else{
    	img.onload = function(){
    	    width = img.width;
			height = img.height;
			callback(width, height);
        	img = null;
        }
    };
}

W.debug.logBaselineTime = new Date().getTime();
function xlog(msg) {
	if (window.console) {
		var delta = new Date().getTime() - W.debug.logBaselineTime;
		window.console.info(delta + '>. ');
		window.console.info(msg);
	}
}

function xwarn(msg) {
	if (window.console) {
		var delta = new Date().getTime() - W.debug.logBaselineTime;
		window.console.warn(delta + '>. ');
		window.console.warn(msg);
	}
}

function xerror(msg) {
	if (window.console) {
		var delta = new Date().getTime() - W.debug.logBaselineTime;
		window.console.error(delta + '>. ');
		window.console.error(msg);
	}
}