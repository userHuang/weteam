"use strict";

const React = require('react');
const _ = require('underscore');

const echarts = require('echarts');

const Store = require('./Store');
const Constant = require('./Constant');
const Action = require('./Action');

require('./style.css');

import { Card, Col, Row, Button } from 'antd';

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import ECharts from 'react-echarts';

const StatisticsPage = React.createClass({
	getInitialState() {
		Store.addListener(this.onChangeStore);
		return Store.getData();
	},

	onChangeStore() {
		this.setState(Store.getData());
	},

	componentWillMount() {
		Action.getStatistics(this.state.projectId);
	},

	getRequireOtion() {
		const bugNumbers = this.state.bugNumbers;
		const requireNumbers = this.state.requireNumbers;
		const users = this.state.users;
		console.log(bugNumbers,requireNumbers,"+++++++++");
		const option = {
			title : {
				text: '需求统计',
				subtext: '',
				x:'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: users
			},
			series : [
				{
					name: '需求数',
					type: 'pie',
					radius : '55%',
					center: ['50%', '60%'],
					data: requireNumbers,
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
		return option;
	},

	getBugOtion() {
		const bugNumbers = this.state.bugNumbers;
		const users = this.state.users;

		const option = {
			title : {
				text: 'BUG统计',
				subtext: '',
				x:'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: users
			},
			series : [
				{
					name: 'bug数',
					type: 'pie',
					radius : '55%',
					center: ['50%', '60%'],
					data: bugNumbers,
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
		return option;
	},

	render() {
		var getRequireOtion = this.getRequireOtion();
		var getBugOtion = this.getBugOtion();
		return (
			<div style={{ background: '#ECECEC', padding: '30px', margin: '0 auto', width:'90%' }}>
				<ECharts
					option={getRequireOtion}
					notMerge
					style={{ width: '400px', height: '300px', display: 'inline-block', marginRight: '200px' }}/>

				<ECharts
					option={getBugOtion}
					notMerge
					style={{ width: '400px', height: '300px', display: 'inline-block' }}/>
			</div>
		)
	}
})

module.exports = StatisticsPage;