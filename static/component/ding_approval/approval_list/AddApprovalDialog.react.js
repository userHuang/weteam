"use strict";

const React = require('react');
const Action = require('./Action');
const DialogStore = require('./DialogStore');

import { Modal, Button } from 'antd';
import { Input } from 'antd';

require('./style.css');

const AddApprovalDialog = React.createClass({
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
        const money = this.state.money;
        const remark = this.state.remark;
        Action.approval(money, remark);
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
                <Button className="editable-add-btn mb10" type="primary" icon="plus" onClick={this.showModal}>发起申请</Button>
                <Modal title="申请详情" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <div className="xui-addUser-input">
                        <Input addonBefore="金额" placeholder="请输入金额" size="large" name="money" value={this.state.money} onChange={this.onChangeValue} />
                        <Input addonBefore="内容"  type="textarea" placeholder="请输入内容" autosize={{ minRows: 4, maxRows: 10 }} name="remark" value={this.state.remark} onChange={this.onChangeValue}/>
                    </div>
                </Modal>
            </div>
        );
    }
});

module.exports = AddApprovalDialog;