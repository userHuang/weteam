"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('underscore');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');
const RequireDetailDialog = require('./RequireDetailDialog.react');
require('./style.css');
require('./weteam.css');

import {  Card, Col, Row } from 'antd';
import { Popover, Button } from 'antd';

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
		var divClose = this.refs[refName];
		ReactDOM.findDOMNode(divClose).style.display = "block";
	},

	onMouseOut(refName) {
		var divClose = this.refs[refName];
		ReactDOM.findDOMNode(divClose).style.display = "none";
	},

	changeStatus(status, requireId) {
		const projectId = window.projectId;
		// console.log(status,requireId,projectId,"=======");
		Action.changeStatus(projectId, requireId, status);
		console.log(ReactDOM.findDOMNode(this.refs.popver),"=========")
		this.setState({
	    	visible: false,
	    });
	},

	handleVisibleChange(visible) {
	    this.setState({ visible });
  	},

	render() {
		var _this = this;
		var requirements = this.state.requirements;
		var todoRequires = requirements['todo_requires'];
		var willRequires = requirements['will_requires'];
		var hasRequires = requirements['has_requires'];
		var willTests = requirements['will_tests'];
		var hasTests = requirements['has_tests'];
		var completeRequires = requirements['complete_requires'];
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
				const status = require.status
				const requireId = require.id
				const content = (
			  		<div>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, -1, requireId)}>TODO</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 0, requireId)}>待开发</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 1, requireId)}>开发</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 2, requireId)}>待测试</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 3, requireId)}>测试</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 4, requireId)}>已完成</a>
					</div>
				);

				const participantName = require.participant_name.map((name,index)=>{
					console.log(name,index,"=======");
					return(
						<span className="xi-participant-name" key={index}>{name}</span>
					)
				})

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<div className="xui-project-participant">
			        			{participantName}
			        		</div>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
				        		<RequireDetailDialog requireDetail={require}/>
				        		<Popover 
			        				ref="popver" className="mr10" placement="rightTop" 
			        				content={content} trigger="click" 
			        			>
							        <a className="glyphicon glyphicon-fast-forward mr10" title="跳转"></a>
						      	</Popover>
			        			<a className="glyphicon glyphicon-arrow-right" title="前进" onClick={_this.changeStatus.bind(null,require.status,require.id)}></a>
			        		</span>
			        </Card>
				)
			});
		}
		console.log(_this.state.visible,"---------")
		if(willRequires){
			willRequiresRow = willRequires.map((require, index) => {
				const title = '需求 '+ require.id;
				const refName = 'require_' + require.id;
				const status = require.status
				const requireId = require.id
				const content = (
			  		<div>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, -1, requireId)}>TODO</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 0, requireId)}>待开发</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 1, requireId)}>开发</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 2, requireId)}>待测试</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 3, requireId)}>测试</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 4, requireId)}>已完成</a>
					</div>
				);

				const participantName = require.participant_name.map((name,index)=>{
					return(
						<span className="xi-participant-name" key={index}>{name}</span>
					)
				})

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<div className="xui-project-participant">
			        			{participantName}
			        		</div>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			        			<RequireDetailDialog requireDetail={require}/>
			        			<Popover 
			        				ref="popver" className="mr10" placement="rightTop" 
			        				content={content} trigger="click" 
			        			>
							        <a className="glyphicon glyphicon-fast-forward mr10" title="跳转"></a>
						      	</Popover>
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
				const status = require.status
				const requireId = require.id
				const content = (
			  		<div>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, -1, requireId)}>TODO</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 0, requireId)}>待开发</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 1, requireId)}>开发</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 2, requireId)}>待测试</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 3, requireId)}>测试</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 4, requireId)}>已完成</a>
					</div>
				);

				const participantName = require.participant_name.map((name,index)=>{
					console.log(name,index,"=======");
					return(
						<span className="xi-participant-name" key={index}>{name}</span>
					)
				})

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<div className="xui-project-participant">
			        			{participantName}
			        		</div>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			        			<RequireDetailDialog requireDetail={require}/>
			        			<Popover 
			        				ref="popver" className="mr10" placement="rightTop" 
			        				content={content} trigger="click" 
			        			>
							        <a className="glyphicon glyphicon-fast-forward mr10" title="跳转"></a>
						      	</Popover>
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
				const status = require.status
				const requireId = require.id
				const content = (
			  		<div>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, -1, requireId)}>TODO</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 0, requireId)}>待开发</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 1, requireId)}>开发</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 2, requireId)}>待测试</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 3, requireId)}>测试</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 4, requireId)}>已完成</a>
					</div>
				);

				const participantName = require.participant_name.map((name,index)=>{
					console.log(name,index,"=======");
					return(
						<span className="xi-participant-name" key={index}>{name}</span>
					)
				})

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<div className="xui-project-participant">
			        			{participantName}
			        		</div>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			        			<RequireDetailDialog requireDetail={require}/>
			        			<Popover 
			        				ref="popver" className="mr10" placement="rightTop" 
			        				content={content} trigger="click" 
			        			>
							        <a className="glyphicon glyphicon-fast-forward mr10" title="跳转"></a>
						      	</Popover>
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
				const status = require.status
				const requireId = require.id
				const content = (
			  		<div>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, -1, requireId)}>TODO</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 0, requireId)}>待开发</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 1, requireId)}>开发</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 2, requireId)}>待测试</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 3, requireId)}>测试</a>
				    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 4, requireId)}>已完成</a>
					</div>
				);

				const participantName = require.participant_name.map((name,index)=>{
					console.log(name,index,"=======");
					return(
						<span className="xi-participant-name" key={index}>{name}</span>
					)
				})

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<div className="xui-project-participant">
			        			{participantName}
			        		</div>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			        			<RequireDetailDialog requireDetail={require}/>
			        			<Popover 
			        				ref="popver" className="mr10" placement="rightTop" 
			        				content={content} trigger="click" 
			        			>
							        <a className="glyphicon glyphicon-fast-forward mr10" title="跳转"></a>
						      	</Popover>
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
				const status = require.status
				const requireId = require.id

				const participantName = require.participant_name.map((name,index)=>{
					console.log(name,index,"=======");
					return(
						<span className="xi-participant-name" key={index}>{name}</span>
					)
				})

				return(
					<Card 
						className="mt20" title={title} bordered={true} 
						style={{width: '95%',margin: '0 auto'}}
						onMouseOver = {_this.onMouseOver.bind(null,refName)} 
						onMouseOut={_this.onMouseOut.bind(null,refName)} 
						key={index}>
			        		<span className="xui-project-description">{require.name}</span>
			        		<div className="xui-project-participant">
			        			{participantName}
			        		</div>
			        		<span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			        			<RequireDetailDialog requireDetail={require}/>
			        		</span>
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
						            <span className="xa-columnTitle">测试  </span> · (<span className="xa-taskCount">{hasTestsRow.length}</span>/<span className="xa-wipCount">10</span>)
						        </div>     
						    </div>  
						    <div className="xui-kanban-taskContainer " style={{height: '517px'}}> 
					         	{hasTestsRow}
						    </div>
						</div>
						<div className="xui-kanban-column xa-kanban-column" data-id="434" data-isbuffer="false" style={{height: '580px', overflowY: 'auto'}}>  
						    <div className="xui-inner-header clearfix">   
						        <div className="fl">
						            <span className="xa-columnTitle">已完成  </span> · (<span className="xa-taskCount">{completeRequiresRow.length}</span>/<span className="xa-wipCount">已完成</span>)
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