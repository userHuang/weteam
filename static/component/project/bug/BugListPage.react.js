"use strict";

const React = require('react');
const _ = require('underscore');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');
const AddRequireDialog = require('./AddRequireDialog.react');
require('./style.css');

import { Table, Input, Icon, Button, Popconfirm, message } from 'antd';

const BugListPage = React.createClass({
	getInitialState() {
		Store.addListener(this.onChangeStore);
		return Store.getData();
	},

	onChangeStore() {
		this.setState(Store.getData());
	},

	componentWillMount() {
		const projectId = window.projectId;
		Action.getBug(projectId);
	},

	enterMain(requireId) {
		const projectId = this.state.projectId;
		Action.enterMain(requireId,projectId);
	},

	onDelete(requireId) {
		const projectId = this.state.projectId;
		Action.onDelete(requireId,projectId);
	},

	render() {
		const _this = this;
		const requireBugs = this.state.requireBugs;

		const columns = [{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},{
			title: 'bug',
			dataIndex: 'name',
			key: 'name',
			width: 300,
			render: (text, record) => {
				var requireNameClass = record.status==5? 'xa-require-complete': 'xa-require-unComplete';
				return(
					<span className={requireNameClass}>
						{text}
					</span>
				)
			}
		}, {
			title: '创建人',
			dataIndex: 'creator',
			key: 'creator',
		}, {
			title: '参与人',
			dataIndex: 'participant_name',
			key: 'participant_name',
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
			render: (text, record) => {
				if(record.status == -1){
					return(
						<div>
							<Popconfirm placement="rightTop" title="确定进入看板？" onConfirm={_this.enterMain.bind(null,record.id)} okText="Yes" cancelText="No">
								<Button className="mr5">进入看板</Button>
							</Popconfirm>
							<Popconfirm placement="rightTop" title="确定删除么？" onConfirm={_this.onDelete.bind(null,record.id)} okText="Yes" cancelText="No">
								<Button>删除</Button>
							</Popconfirm>
						</div>
					)
				}else{
					return(
						<div>
							<Popconfirm placement="rightTop" title="确定删除么？" onConfirm={_this.onDelete.bind(null,record.id)} okText="Yes" cancelText="No">
								<Button>删除</Button>
							</Popconfirm>
						</div>
					)
				}
				
			}
		}];

		return (
			<div>
				<AddRequireDialog />
				<Table columns={columns} dataSource={requireBugs} pagination={{pageSize: 10}} className="mt10"/>
		  	</div>
		)
	}
})

module.exports = BugListPage;