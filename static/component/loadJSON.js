"use strict";

var W = {
    loadJSON: function(id) {
        var selector = '#__json-'+id;
        var text = $.trim($(selector).text());
        if (text) {
            return $.parseJSON(text);   
        } else {
            return null;
        }
    }
};
module.exports = W;