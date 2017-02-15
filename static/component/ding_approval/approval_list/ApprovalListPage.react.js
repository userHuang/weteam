"use strict";

const React = require('react');
const _ = require('underscore');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');
const AddApprovalDialog = require('./AddApprovalDialog.react');
require('./style.css');

import { Table, Input, Icon, Button, Popconfirm, message } from 'antd';

const ApprovalListPage = React.createClass({
	getInitialState() {
		Store.addListener(this.onChangeStore);
		return Store.getData();
	},

	onChangeStore() {
		this.setState(Store.getData());
	},

	componentWillMount() {
		// const projectId = window.projectId;
		Action.getAapproval();
	},

	onDelete(requireId) {
		Action.onDelete(requireId);
	},

	render() {
		const _this = this;
		const approvals = this.state.approvals;

		const columns = [{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		}, {
			title: '金额',
			dataIndex: 'money',
			key: 'money',
		}, {
			title: '内容',
			dataIndex: 'remark',
			key: 'remark',
		}, {
			title: '申请人',
			dataIndex: 'creator',
			key: 'creator',
		}, {
			title: '状态',
			dataIndex: 'statusName',
			key: 'statusName',
			render: (text, record) => {
				var status = record.status;
				var color = status == 1? {color: 'blue'}: status == 2? {color: 'red'}: {color: 'green'}
				return(
					<span style={color}>{text}</span>
				)
			}
		}, {
			title: '申请时间',
			dataIndex: 'created_at',
			key: 'created_at',
		}, {
			title: 'Action',
			key: 'action',
			width: 200,
			render: (text, record) => {
				var url = "/ding_approval/approval_detail?id="+record.id;
				return(
					<div>
						<Popconfirm placement="rightTop" title="确定删除么？" onConfirm={_this.onDelete.bind(null,record.id)} okText="Yes" cancelText="No">
							<Button>删除</Button>
						</Popconfirm>
						<Button className="ml5"><a href={url}>详情</a></Button>
					</div>
				)
			}
		}];

		return (
			<div>
				<AddApprovalDialog />
				<Table columns={columns} dataSource={approvals} pagination={{pageSize: 10}} className="mt10"/>
		  	</div>
		)
	}
})

module.exports = ApprovalListPage;