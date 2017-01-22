"use strict";

const React = require('react');
const Action = require('./Action');
const DialogStore = require('./DialogStore');

import { Modal, Button } from 'antd';
import { Input } from 'antd';

require('./style.css');

const AddRequireDialog = React.createClass({
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
        const name = this.state.name;
        const remark = this.state.remark;
        const projectId = window.projectId;
        Action.addBug(name, remark, projectId);
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
                <Button className="editable-add-btn mb10" type="primary" icon="plus" onClick={this.showModal}>添加bug</Button>
                <Modal title="添加bug" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <div className="xui-addUser-input">
                        <Input addonBefore="bug标题" placeholder="请输入bug标题" size="large" name="name" value={this.state.name} onChange={this.onChangeValue} />
                        <Input addonBefore="bug详情"  type="textarea" placeholder="请输入bug详情" autosize={{ minRows: 4, maxRows: 10 }} name="remark" value={this.state.remark} onChange={this.onChangeValue}/>
                    </div>
                </Modal>
            </div>
        );
    }
});

module.exports = AddRequireDialog;