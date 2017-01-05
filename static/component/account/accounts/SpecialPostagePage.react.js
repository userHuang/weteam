"use strict";

var React = require('react');
var _ = require('underscore');

var Store = require('./Store');
var Constant = require('./Constant');
var Action = require('./Action');
require('./style.css');

var SpecialPostagePage = React.createClass({
	getInitialState: function() {
		Store.addListener(this.onChangeStore);
		return Store.getData();
	},

	onChangeStore: function(){
		this.setState(Store.getData());
	},

	onChangeValue: function(index, event){
		var property = event.target.getAttribute('name');
		var value = event.target.value;
		Action.updateSpecialValues(index, property, value);
	},

	addSpecialPostage: function() {
		Action.addSpecialPostage();
	},

	deleteSpecialPostage: function(index) {
		Action.deleteSpecialPostage(index);
	},

	render:function(){
		var _this = this;
		var specialPostages = this.state.specialPostages;

		var postagesTr = specialPostages.map(function(postages, index){
			return(
				<tr key={index} className="xui-special-postage-tr">
					<td>
						<input type="text" name="area" value={postages.area} onChange={_this.onChangeValue.bind(_this,index)} />
					</td>
					<td>
						<input type="text" name="firstWeight" value={postages.firstWeight} onChange={_this.onChangeValue.bind(_this,index)} />
					</td>
					<td>
						<input type="text" name="firstWeightPrice" value={postages.firstWeightPrice} onChange={_this.onChangeValue.bind(_this,index)} />
					</td>
					<td>
						<input type="text" name="addedWeight" value={postages.addedWeight} onChange={_this.onChangeValue.bind(_this,index)} />
					</td>
					<td>
						<input type="text" name="addedWeightPrice" value={postages.addedWeightPrice} onChange={_this.onChangeValue.bind(_this,index)}/>
					</td>
					<td>
						<a href="javascript:void(0);" onClick={_this.deleteSpecialPostage.bind(_this, index)}>删除</a>
					</td>
				</tr>
			)
		});

		return (
			<div className="form-horizontal mt15 pt20">
				<table className="table table-bordered" style={{width:'80%', margin:'0 auto'}}>
					<thead>
						<tr>
							<th>地区</th>
							<th>首重(kg)</th>
							<th>运费(元)</th>
							<th>续重(kg)</th>
							<th>续费(元)</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{postagesTr}
					</tbody>
				</table>
				<div className="xui-special-postage-add-btn">
					<a href="javascript:void(0);" onClick={this.addSpecialPostage}>继续添加</a>
				</div>
			</div>
		)
	}
})

module.exports = SpecialPostagePage;