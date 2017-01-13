"use strict";

const React = require('react');
const Action = require('./Action');
var DialogStore = require('./DialogStore');

import { Modal, Button } from 'antd';
import { Input } from 'antd';

require('./style.css');

const AddUsrDialog = React.createClass({
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
        const userName = this.state.userName;
        const account = this.state.account;
        Action.addUser(userName, account);
        Action.resetValues();
    },

    onChangeValue(event){
        const name = event.target.getAttribute('name');
        const value = event.target.value;
        Action.updateValues(name, value);
    },

    handleCancel(e) {
        this.setState({
            visible: false,
        });
    },

    render() {
        return (
            <div>
                <Button className="mt20" onClick={this.showModal}>添加成员</Button>
                <Modal title="添加成员" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <div className="xui-addUser-input">
                        <Input addonBefore="姓名" placeholder="请输入姓名" size="large" name="userName" value={this.state.userName} onChange={this.onChangeValue} />
                        <Input addonBefore="登录账户" placeholder="请输入登录账户" size="large" name="account" value={this.state.account} onChange={this.onChangeValue} />
                    </div>
                </Modal>
            </div>
        );
    }
});

module.exports = AddUsrDialog;