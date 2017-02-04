"use strict";

const React = require('react');
const Action = require('./Action');
var DialogStore = require('./DialogStore');

import { Modal, Button } from 'antd';
import { Input,Select } from 'antd';

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
        const userId = this.state.userId;
        const projectId = this.props.projectId;
        console.log(userId,projectId,"============")
        Action.addMember(userId, projectId);
        Action.resetValues();
    },

    handChange(value,option){
        // const name = event.target.getAttribute('name');
        // const value = eventtarget.value;
        const userId = option.props.userId
        console.log(userId,"====");
        Action.updateSelectValues(userId);
    },

    handleCancel(e) {
        this.setState({
            visible: false,
        });
    },

    render() {
        const Option = Select.Option;
        const allUsers = this.props.allUsers;
        var options = [];
        if(allUsers){
            options = allUsers.map((user, index) => {
                return(
                    <Option value={user.first_name} key={user.username} userId={user.user_id}>{user.first_name}</Option>
                )
            })
        }
        
        return (
            <div>
                <Button className="mt20" onClick={this.showModal}>添加成员</Button>
                <Modal title="添加成员" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <div className="xui-addUser-input">
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onSelect={this.handChange}
                            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            {options}
                        </Select>
                    </div>
                </Modal>
            </div>
        );
    }
});

module.exports = AddUsrDialog;