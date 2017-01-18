"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('underscore');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');
require('./style.css');
require('./weteam.css');

import {  Card, Col, Row } from 'antd';

const ProjectMainListPage = React.createClass({
	getInitialState() {
		Store.addListener(this.onChangeStore);
		return Store.getData();
	},

	onChangeStore() {
		this.setState(Store.getData());
	},

	onChangeValue(index, event) {
		const property = event.target.getAttribute('name');
		const value = event.target.value;
		Action.updateSpecialValues(index, property, value);
	},

	componentWillMount() {
		const projectId = window.projectId;
		Action.getRequire(projectId);
	},

	onMouseOver(refName) {
		console.log("======");
		var divClose = this.refs[refName];
		console.log(divClose,"++++++++++++");
		console.log(ReactDOM.findDOMNode(divClose),"-------");
		ReactDOM.findDOMNode(divClose).style.display = "block";
	},

	onMouseOut(refName) {
		var divClose = this.refs[refName];
		ReactDOM.findDOMNode(divClose).style.display = "none";
	},

	changeStatus(status, requireId) {
		console.log(requireId,"=======");
		const projectId = window.projectId;
		Action.changeStatus(projectId, requireId, status);
	},

	render() {
		var _this = this;
		var requirements = this.state.requirements;
		console.log(requirements,"=========");
		var todoRequires = requirements['todo_requires'];
		var willRequires = requirements['will_requires'];
		var hasRequires = requirements['has_requires'];
		var willTests = requirements['will_tests'];
		var hasTests = requirements['has_tests'];
		var completeRequires = requirements['complete_requires'];
		console.log(requirements,"=========");
		var todoRequiresRow = [];
		var willRequiresRow = [];
		var hasRequiresRow = [];
		var willTestsRow = [];
		var hasTestsRow = [];
		var completeRequiresRow = [];
		if(todoRequires){
			todoRequiresRow = todoRequires.map((require, index) => {
				const title = '需求 '+ require.id;
				const refName = 'require_' + require.id;

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			        			<a className="glyphicon glyphicon-arrow-right" title="前进" onClick={_this.changeStatus.bind(null,require.status,require.id)}></a>
			        		</span>
			        </Card>
				)
			});
		}

		if(willRequires){
			willRequiresRow = willRequires.map((require, index) => {
				const title = '需求 '+ require.id;
				const refName = 'require_' + require.id;

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			        			<a className="glyphicon glyphicon-arrow-right" title="前进" onClick={_this.changeStatus.bind(null,require.status,require.id)}></a>
			        		</span>
			        </Card>
				)
			});
		}

		if(hasRequires){
			hasRequiresRow = hasRequires.map((require, index) => {
				const title = '需求 '+ require.id;
				const refName = 'require_' + require.id;

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			        			<a className="glyphicon glyphicon-arrow-right" title="前进" onClick={_this.changeStatus.bind(null,require.status,require.id)}></a>
			        		</span>
			        </Card>
				)
			});
		}

		if(willTests){
			willTestsRow = willTests.map((require, index) => {
				const title = '需求 '+ require.id;
				const refName = 'require_' + require.id;

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			        			<a className="glyphicon glyphicon-arrow-right" title="前进" onClick={_this.changeStatus.bind(null,require.status,require.id)}></a>
			        		</span>
			        </Card>
				)
			});
		}

		if(hasTests){
			hasTestsRow = hasTests.map((require, index) => {
				const title = '需求 '+ require.id;
				const refName = 'require_' + require.id;

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			        			<a className="glyphicon glyphicon-arrow-right" title="前进" onClick={_this.changeStatus.bind(null,require.status,require.id)}></a>
			        		</span>
			        </Card>
				)
			});
		}

		if(completeRequires){
			completeRequiresRow = completeRequires.map((require, index) => {
				const title = '需求 '+ require.id;
				const refName = 'require_' + require.id;

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        </Card>
				)
			});
		}

		return (
			<div className="xui-kanbanPanel">
				<div className="xui-kanbanContainer">
					<div className="xui-kanban xa-kanban clearfix" style={{ width: '1600px', height: '584px' }}>
					    <div className="xui-kanban-column xa-kanban-column" data-id="434" data-isbuffer="false" style={{height: '580px', overflowY: 'auto'}}>  
						    <div className="xui-inner-header clearfix">   
						        <div className="fl">
						            <span className="xa-columnTitle">TODO</span> · (<span className="xa-taskCount">{todoRequiresRow.length}</span>/<span className="xa-wipCount">{todoRequiresRow.length}</span>)
						        </div>     
						    </div>  
						    <div className="xui-kanban-taskContainer " style={{height: '517px'}}> 
					         	{todoRequiresRow} 
						    </div>
						</div>
						<div className="xui-kanban-column xa-kanban-column" data-id="434" data-isbuffer="false" style={{height: '580px', overflowY: 'auto'}}>  
						    <div className="xui-inner-header clearfix">   
						        <div className="fl">
						            <span className="xa-columnTitle">待开发</span> · (<span className="xa-taskCount">{willRequiresRow.length}</span>/<span className="xa-wipCount">5</span>)
						        </div>     
						    </div>  
						    <div className="xui-kanban-taskContainer " style={{height: '517px'}}> 
					         	{willRequiresRow}
						    </div>
						</div>
						<div className="xui-kanban-column xa-kanban-column" data-id="434" data-isbuffer="false" style={{height: '580px', overflowY: 'auto'}}>  
						    <div className="xui-inner-header clearfix">   
						        <div className="fl">
						            <span className="xa-columnTitle">开发</span> · (<span className="xa-taskCount">{hasRequiresRow.length}</span>/<span className="xa-wipCount">5</span>)
						        </div>     
						    </div>  
						    <div className="xui-kanban-taskContainer " style={{height: '517px'}}> 
					         	{hasRequiresRow}
						    </div>
						</div>  
						<div className="xui-kanban-column xa-kanban-column" data-id="434" data-isbuffer="false" style={{height: '580px', overflowY: 'auto'}}>  
						    <div className="xui-inner-header clearfix">   
						        <div className="fl">
						            <span className="xa-columnTitle">待测试 </span> · (<span className="xa-taskCount">{willTestsRow.length}</span>/<span className="xa-wipCount">5</span>)
						        </div>     
						    </div>  
						    <div className="xui-kanban-taskContainer " style={{height: '517px'}}> 
						    	{willTestsRow}
						    </div>
						</div>
						<div className="xui-kanban-column xa-kanban-column" data-id="434" data-isbuffer="false" style={{height: '580px', overflowY: 'auto'}}>  
						    <div className="xui-inner-header clearfix">   
						        <div className="fl">
						            <span className="xa-columnTitle">测试  </span> · (<span className="xa-taskCount">{hasTestsRow.length}</span>/<span className="xa-wipCount">已完成</span>)
						        </div>     
						    </div>  
						    <div className="xui-kanban-taskContainer " style={{height: '517px'}}> 
					         	{hasTestsRow}
						    </div>
						</div>
						<div className="xui-kanban-column xa-kanban-column" data-id="434" data-isbuffer="false" style={{height: '580px', overflowY: 'auto'}}>  
						    <div className="xui-inner-header clearfix">   
						        <div className="fl">
						            <span className="xa-columnTitle">已完成  </span> · (<span className="xa-taskCount">1</span>/<span className="xa-wipCount">10</span>)
						        </div>     
						    </div>  
						    <div className="xui-kanban-taskContainer " style={{height: '517px'}}> 
					         	{completeRequiresRow}
						    </div>
						</div>
				  	</div>
			  	</div>
		  	</div>
		)
	}
})

module.exports = ProjectMainListPage;