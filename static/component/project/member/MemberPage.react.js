"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
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

	deleteMember(userId) {
		console.log(userId,"+++++++++userId++++++");
		Action.deleteMember(userId, this.state.projectId);
	},

	onMouseOver(refName) {
		var divClose = this.refs[refName];
		ReactDOM.findDOMNode(divClose).style.display = "block";
	},

	onMouseOut(refName) {
		var divClose = this.refs[refName];
		ReactDOM.findDOMNode(divClose).style.display = "none";
	},

	render() {
		var _this = this;
		var memberLi = [];
		var btnStyle = {};
		var users = this.state.users;
		var role = this.state.role;
		if(role==1){
			btnStyle = {
				display: 'none'
			}
		}

		if(users.length>0){
			memberLi = users.map((user, index) => {
				console.log(user);
				var refName = 'xa_user_' + user.user_id;
				return(
					<li className="xui-member-li" key={index}  
					onMouseOver = {_this.onMouseOver.bind(null,refName)} 
					onMouseOut={_this.onMouseOut.bind(null,refName)} >
						<Card style={{ width: 180 }}>
							<p><img src={user.img_url} className="xui-account-img"/> </p>
							<p>姓名：{user.name}</p>
							<p>账号：{user.account}</p>
							<a ref={refName} title="移除" onClick={_this.deleteMember.bind(null, user.user_id)} className="xa-delete-tag">x</a>
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