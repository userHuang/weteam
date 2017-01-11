"use strict";

const React = require('react');
const _ = require('underscore');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');
require('./style.css');

import {  Card, Col, Row } from 'antd';

const MemberPage = React.createClass({
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
		var memberLi = [];
		var members = this.state.members;
		console.log(members,"===========");
		if(members.length>0){
			memberLi = members.map((member, index) => {
				return(
					<li className="xui-member-li" key={index}>
						<Card style={{ width: 200 }}>
							<p>Card content</p>
							<p>Card content</p>
							<p>Card content</p>
						</Card>
					</li>
				)
			});
		}else{
			memberLi = <Row><Col><h1>暂无成员</h1></Col></Row>;
		}

		return (
			<div style={{ background: '#ECECEC', padding: '30px' }}>
				<ul>
					{memberLi}
				</ul>
		  	</div>
		)
	}
})

module.exports = MemberPage;