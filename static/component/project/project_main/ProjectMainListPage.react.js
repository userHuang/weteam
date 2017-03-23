"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('underscore');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');
const RequireDetailDialog = require('./RequireDetailDialog.react');
const KanbanHeadAction = require('./KanbanHeadAction.react');
require('./style.css');
require('./weteam.css');

import {  Card, Col, Row } from 'antd';
import { Popover, Button } from 'antd';
import { message } from 'antd';

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

	changeStatus(status, requireId, relation_id, require_type) {
		console.log(relation_id,"----relation_id-----");
		if(require_type == 0 && status == 4 && relation_id !=-1 ){
			message.error('该需求有关联的bug未完成，请先关闭bug！', 3);
			return;
		}
		const projectId = window.projectId;
		Action.changeStatus(projectId, requireId, status);
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
		var relationRequires = this.state.relationRequires;
		var requireDatas = [];

		if(requirements.length>0){
			requireDatas = requirements.map((requirement, i)=>{
				var requires = [];
				var requiresRow = [];
				var requireTitle = '';
				var requireClassName = '';
				var maxHasDo = 0;

				if(i == 0){
					requires = requirement['todo_requires'];
					requireTitle = 'TODO';
					maxHasDo = 10;
				}else if(i == 1){
					requires = requirement['will_requires'];
					requireTitle = '待开发';
					maxHasDo = 5;
				}else if(i == 2){
					requires = requirement['has_requires'];
					requireTitle = '开发';
					maxHasDo = 5;
				}else if(i == 3){
					requires = requirement['will_tests'];
					requireTitle = '待测试';
					maxHasDo = 10;
				}else if(i == 4){
					requires = requirement['has_tests'];
					requireTitle = '测试';
					maxHasDo = 10;
				}else if(i == 5){
					requires = requirement['complete_requires'];
					requireTitle = '已完成';
					maxHasDo = '已完成';
				}

				if(requires){
					requiresRow = requires.map((require, index) => {
						const require_type = require.require_type;
						const relation_id = require.relation_id;
						const title = require_type === 0? '需求 '+ require.id: 'BUG '+ require.id;
						requireClassName = require_type === 0?'mt20 xui-require': 'mt20 xui-bug';
						const relation = (require_type === 1 && relation_id != -1)? <span style={{color: "red"}} >关联需求: {require.relation_id}</span>: '';
						const refName = 'require_' + require.id;
						const status = require.status
						const requireId = require.id
						const content = (
					  		<div>
						    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, -1, requireId)}>TODO</a>
						    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 0, requireId)}>待开发</a>
						    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 1, requireId)}>开发</a>
						    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 2, requireId)}>待测试</a>
						    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 3, requireId, relation_id, require_type)}>测试</a>
						    	<a className="xui-tiaozhuan-btn" onClick={_this.changeStatus.bind(null, 4, requireId)}>已完成</a>
							</div>
						);

						const participantName = require.participant_name.map((name,index)=>{
							return(
								<span className="xi-participant-name" key={index}>{name}</span>
							)
						})

						if(i == 5){
							//已完成
							return(
			                    <Card 
			                        className={requireClassName} title={title} bordered={true} 
			                        style={{width: '95%',margin: '0 auto'}}
			                        onMouseOver = {_this.onMouseOver.bind(null,refName)} 
			                        onMouseOut={_this.onMouseOut.bind(null,refName)} 
			                        key={index}>
			                        	{relation}
			                            <span className="xui-project-description" style={{textDecoration: 'line-through'}}>{require.name}</span>
			                            <div className="xui-project-participant">
			                                {participantName}
			                            </div>
			                            <span ref={refName} className="xui-require-title" style={{display: 'none'}}>
			                                <RequireDetailDialog requireDetail={require}/>
			                            </span>
			                    </Card>
			                )
						}else{
							return(
								<Card 
									className={requireClassName} title={title} bordered={true} 
									style={{width: '95%',margin: '0 auto'}}
									onMouseOver = {_this.onMouseOver.bind(null,refName)} 
									onMouseOut={_this.onMouseOut.bind(null,refName)} 
									key={index}>
										{relation}
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
						        			<a className="glyphicon glyphicon-arrow-right" title="前进" onClick={_this.changeStatus.bind(null,require.status,require.id,relation_id,require_type)}></a>
						        		</span>
						        </Card>
							)
						}
					});
				}
				
				return(
					<div className="xui-kanban-column xa-kanban-column" data-id="434" data-isbuffer="false" style={{height: '580px', overflowY: 'auto'}} key={i}>  
					    <div className="xui-inner-header clearfix">   
					        <div className="fl">
					            <span className="xa-columnTitle">{requireTitle}</span> · (<span className="xa-taskCount">{requiresRow.length}</span>/<span className="xa-wipCount">{maxHasDo}</span>)
					        </div>     
					    </div>  
					    <div className='xui-kanban-taskContainer' style={{height: '517px'}}> 
				         	{requiresRow} 
					    </div>
					</div>
				)
			})
		}else{
			requireDatas.push(
				<Card key='noData'><p>暂无需求</p></Card>
			)
		}

		return (
			<div className="xui-kanbanPanel">
				<KanbanHeadAction relationRequires={relationRequires}/>
				<div className="xui-kanbanContainer">
					<div className="xui-kanban xa-kanban clearfix" style={{ width: '1600px', height: '584px' }}>
					    {requireDatas}
				  	</div>
			  	</div>
		  	</div>
		)
	}
})

module.exports = ProjectMainListPage;