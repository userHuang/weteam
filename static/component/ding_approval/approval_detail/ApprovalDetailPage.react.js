"use strict";

const React = require('react');
const _ = require('underscore');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');
require('./style.css');

import {  Card, Col, Row, Popconfirm, Button } from 'antd';

const ApprovalDetailPage = React.createClass({
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

	onAdopt(approvalId) {
		Action.onAdopt(approvalId);
	},

	onReject(approvalId) {
		Action.onReject(approvalId);
	},

	render() {
		var approvalId = -1;
		var approvalStatus = 0;
		var approvalRow = [];
		var approvalDetails = this.state.approvalDetails;
		
		if(approvalDetails.length>0){
			approvalRow = approvalDetails.map((approval, index) => {
				approvalId = approval.id;
				approvalStatus = approval.status;
				return(
					<li key={index}>
				        <Card title={approval.statusName} bordered={true}>
			       		 	<div className="">金额(元)：{approval.money}</div>
				        	<div className="">申请人：{approval.creator}</div>
				        	<div className="">内 容：{approval.remark}</div>
				        	<div className="">时 间：{approval.created_at}</div>
				        </Card>
			      	</li>
				)
			});
		}

		var isApproval = approvalStatus != 0? {display: 'none'}: {}

		return (
			<div style={{ background: '#ECECEC', padding: '30px' }}>
			    <ul className="mb5">
					{approvalRow}
				</ul>
				<Popconfirm placement="rightTop" title="确定通过么？" onConfirm={this.onAdopt.bind(null,approvalId)} okText="Yes" cancelText="No" >
					<Button className="xi-approval-btn" style={isApproval}>通过</Button>
				</Popconfirm>
				<Popconfirm placement="rightTop" title="确定驳回么？" onConfirm={this.onReject.bind(null,approvalId)} okText="Yes" cancelText="No" >
					<Button className="ml10 xi-approval-btn" style={isApproval}>驳回</Button>
				</Popconfirm>
		  	</div>
		)
	}
})

module.exports = ApprovalDetailPage;