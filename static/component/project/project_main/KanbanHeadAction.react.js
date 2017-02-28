"use strict";

const React = require('react');
const Action = require('./Action');
const DialogStore = require('./DialogStore');
// const AddBugStore = require('./AddBugStore');

import { Modal, Button } from 'antd';
import { Input, Select } from 'antd';

require('./style.css');

const KanbanHeadAction = React.createClass({
	getInitialState() {
		DialogStore.addListener(this.onChangeStore);
		return DialogStore.getData();
	},

	onChangeStore() {
		this.setState(DialogStore.getData());
	},

	showModal() {
		Action.showModal();
	},

	handleOk() {
		console.log(this.state,"=====");
        const name = this.state.name;
        const remark = this.state.remark;
        const relationId = this.state.relationId;
        const projectId = window.projectId;
        console.log(name, remark, relationId, projectId);
        Action.addRelationBug(name, remark, relationId, projectId);
		this.setState({
			visible: false,
		});
	},

	onChangeValue(event){
		const name = event.target.getAttribute('name');
		const value = event.target.value;
		console.log(name,value,'=========');
		Action.updateValues(name, value);
	},

	selectChange(value,option){
		const name = 'relationId';
		const requireId = option.props.requireId;
		console.log(name,requireId,"==sss===");
		Action.updateValues(name, requireId);
	},

	handleCancel(e) {
		this.setState({
			visible: false,
		});
	},

	render() {
		const Option = Select.Option;
		const relationRequires = this.props.relationRequires;
		var options = [];
		if(relationRequires){
			options = relationRequires.map((require, i) => {  
				var name = require.name;
				var requireId = require.id;
				return(
					<Option value={name} key={i} requireId={requireId}>{name}</Option>
				)
			})
		}
		
		return (
			<div className="xui-requireDetail-div mr10" style={{display: 'inline-block'}}>
				<Button className="ml10" onClick={this.showModal}>创建BUG</Button>
				<Modal title="添加bug"
					onOk={this.handleOk} onCancel={this.handleCancel} visible={this.state.visible}
				>
					<div className="xi-addBug-content">
						<Input addonBefore="bug标题" placeholder="请输入标题" size="large" name="name" value={this.state.name} onChange={this.onChangeValue} />
						<div className="mb20">
							<label className="xi-relation-title">关联需求</label>
							<Select
								showSearch
								style={{ width: 600, display:"table-cell"}}
								placeholder="Select a person"
								optionFilterProp="children"
								onSelect={this.selectChange}
								filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								{options}
							</Select>
						</div>
						<Input addonBefore="bug详情"  type="textarea" placeholder="请输入bug详情" autosize={{ minRows: 4, maxRows: 10 }} name="remark" value={this.state.remark} onChange={this.onChangeValue}/>
					</div>
				</Modal>
			</div>
		);
	}
});
	
module.exports = KanbanHeadAction;