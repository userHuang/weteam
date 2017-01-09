"use strict";

const React = require('react');
const _ = require('underscore');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');
require('./style.css');

import {  Card, Col, Row } from 'antd';

const ProjectListPage = React.createClass({
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

	render() {
		var projectRow = [];
		var projectInfos = this.state.projectInfos;
		
		if(projectInfos.length>0){
			projectRow = projectInfos.map((project, index) => {
				const url = "/project/main/?project_id="+ project.id;
				return(
					<Row className="mt20" key={index} >
						<Col>
					        <Card title={project.name} bordered={true} extra={<a href={url}>More</a>}>
					        	<span className="xui-project-description">{project.description}</span>
					        	<span className="xui-project-createTime">创建日期：{project.create_time}</span>
					        </Card>
				      	</Col>
			      	</Row>
				)
			});
		}else{
			projectRow = <Row><Col><h1>暂无项目</h1></Col></Row>;
		}

		return (
			<div style={{ background: '#ECECEC', padding: '30px' }}>
			    {projectRow}
		  	</div>
		)
	}
})

module.exports = ProjectListPage;