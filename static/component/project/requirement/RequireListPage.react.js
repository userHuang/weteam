"use strict";

const React = require('react');
const _ = require('underscore');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');
const AddRequireDialog = require('./AddRequireDialog.react');
require('./style.css');

import { Table, Input, Icon, Button, Popconfirm } from 'antd';

const RequireListPage = React.createClass({
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

	render() {
		const requirements = this.state.requirements;
		const columns = [{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},{
			title: '需求',
			dataIndex: 'name',
			key: 'name',
			width: 300,
			render: text => <a href="#">{text}</a>,
		}, {
			title: '创建人',
			dataIndex: 'creator',
			key: 'creator',
		}, {
			title: '参与人',
			dataIndex: 'participant',
			key: 'participant',
		},  {
			title: '创建时间',
			dataIndex: 'created_at',
			key: 'created_at',
		},  {
			title: '结束时间',
			dataIndex: 'end_at',
			key: 'end_at',
		}, {
			title: 'Action',
			key: 'action',
			width: 200,
			render: (text, record) => (
				<span>
					<a href="#">Action 一 {record.name}</a>
					<span className="ant-divider" />
					<a href="#" className="ant-dropdown-link">
						More actions <Icon type="down" />
					</a>
				</span>
			),
		}];

		return (
			<div>
				<AddRequireDialog />
				<Table columns={columns} dataSource={requirements} pagination={{pageSize: 4}} className="mt10"/>
		  	</div>
		)
	}
})

module.exports = RequireListPage;