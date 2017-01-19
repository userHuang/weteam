"use strict";

const React = require('react');
const Action = require('./Action');
const DialogStore = require('./DialogStore');

import { Modal, Button } from 'antd';
import { Input } from 'antd';

require('./style.css');

const RequireDetailDialog = React.createClass({
    getInitialState() {
        return {
            requireDetail: this.props.requireDetail,
            // visible: false
        }
    },

    onChangeStore() {
        this.setState(DialogStore.getData());
    },

    showModal() {
        this.setState({
            visible: true
        })
    },

    handleOk() {
        this.setState({
            visible: false,
        });
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
        console.log(this.state.requireDetail,"========");
        return (
            <div className="xui-requireDetail-div mr10" style={{display: 'inline-block'}}>
                <a className="glyphicon glyphicon-pencil" onClick={this.showModal} title="详情"></a>
                <Modal title={this.state.requireDetail.name} 
                    onOk={this.handleOk} onCancel={this.handleCancel} visible={this.state.visible}
                >
                    <div className="xi-requireDetail-content">
                        <h4 className="mb10">创建人：{this.state.requireDetail.creator}/{this.state.requireDetail.created_at}</h4>
                        <hr/>
                        <div className="f16">备注：{this.state.requireDetail.remark}</div>
                    </div>
                </Modal>
            </div>
        );
    }
});

module.exports = RequireDetailDialog;