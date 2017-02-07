"use strict";

const React = require('react');
const _ = require('underscore');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');

const AddUsrDialog =  require('./AddUsrDialog.react');
require('./style.css');

import { Card, Col, Row, Button } from 'antd';

const MemberPage = React.createClass({
	getInitialState() {
		Store.addListener(this.onChangeStore);
		return Store.getData();
	},

	onChangeStore() {
		this.setState(Store.getData());
	},

	componentWillMount() {
		Action.getMembers(this.state.projectId);
	},

	render() {
		var memberLi = [];
		var btnStyle = {};
		var users = this.state.users;
		var role = this.state.role;
		console.log(role,"+++++===++++");
		if(role==1){
			btnStyle = {
				display: 'none'
			}
		}

		if(users.length>0){
			memberLi = users.map((user, index) => {
				return(
					<li className="xui-member-li" key={index}>
						<Card style={{ width: 180 }}>
							<p><img src={user.img_url} className="xui-account-img"/> </p>
							<p>姓名：{user.name}</p>
							<p>账号：{user.account}</p>
						</Card>
					</li>
				)
			});
		}else{
			memberLi.push(<Row key="no-user"><Col><h1>暂无成员</h1></Col></Row>);
		}

		return (
			<div style={{ background: '#ECECEC', padding: '30px', margin: '0 auto', width:'90%' }}>
				<ul>{memberLi}</ul>
				<div style={btnStyle}><AddUsrDialog allUsers={this.state.allUsers} projectId={this.state.projectId}/></div>
		  	</div>
		)
	}
})

module.exports = MemberPage;