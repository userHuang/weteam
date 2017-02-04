'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var dynamicRequire = require('dynamicRequire');

$(document).ready(function() {
	var $page = $('.xa-pageContainer').eq(0);
	var pageNode = $page.get(0);
	var pageComponent = window.pageContentComponent;
	console.log(window.pageContentComponent,"=========");

    var Page = React.createClass({
        render: function(){
            var pageContent = '';

			if (this.props.pageContentComponent) {
				var pageContentComponent = dynamicRequire(this.props.pageContentComponent);
				var pageContent = React.createElement(pageContentComponent, {});
			}

            return (
                <div id="main-panel">
					<div className="xui-contentPanel mt50">
						<div className="xui-container pt10 pb40 pl15 pr15" style={{overflowX:'hidden',margin:'0px'}}>
							{pageContent}
						</div>
					</div>
				</div>
			)
		}
	});

	ReactDOM.render(
		<Page pageContentComponent={pageComponent}/>, 
		pageNode
	);
});
