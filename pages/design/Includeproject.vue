<template>
	<view class="px-2 pb-2">
		<view class="flex align-center bg-white rounded mt-2" style="height: 110rpx;" v-for="(item, index) in DataList">
			<view class="flex justify-center align-center" style="width: 140rpx;height: 100%;">
				<text class="iconfont" style="color: #02B1BE;font-size: 60rpx;">&#xe657;</text>
			</view>
			<view class="" style="width: 480rpx;height: 100%;">
				<view class="flex align-end" style="height: 60rpx;"><text>{{item.title}}</text></view>
				<view style="height: 60rpx;"><text style="color: #777;font-size: 26rpx;">{{item.content}}</text></view>
			</view>
			<view class="flex align-center justify-center" style="height: 100%;width: 100rpx;">
				<u-checkbox
					:size="50"
					active-color="#02B1BE"
					shape="circle"
					@change="checkboxChange"
					v-model="item.checked"
					:key="index"
					:name="item.name"
				></u-checkbox>
			</view>
		</view>
	</view>
</template>
 
<script>
export default {
	onNavigationBarButtonTap: function(e) {
		if (e.float == 'right') {
			// console.log("右上角点击事件");
			// console.log(JSON.stringify(this.DataList))
			
			console.log(JSON.stringify(this.PageList))
		}
	},
	onLoad(option) {
		
		this.PageList = JSON.parse(option.list);
		
		// console.log(JSON.stringify(option))
	},
	data() {
		return {
			PageList:'',
			DataList: '', //Mock数据
			list: [
				{
					name: 'apple',
					checked: false,
					disabled: false
				}
			]
		};
	},
	onShow() {
		var DataLists = {
			code: 200,
			msg: 'ok',
			dataList: [
				{
					iconImg: '&#xe657;',
					title: '整装1',
					content: '全屋装修',
					checked: false
				},
				{
					iconImg: '&#xe657;',
					title: '整装2',
					content: '全屋装修',
					checked: false
				},
				{
					iconImg: '&#xe657;',
					title: '整装3',
					content: '全屋装修',
					checked: false
				},
				{
					iconImg: '&#xe657;',
					title: '整装4',
					content: '全屋装修',
					checked: true
				},
				{
					iconImg: '&#xe657;',
					title: '整装5',
					content: '全屋装修2',
					checked: false
				},
				{
					iconImg: '&#xe657;',
					title: '整装6',
					content: '全屋装修',
					checked: false
				}
			]
		};
		this.DataList = DataLists.dataList;
	},
	methods: {
		// 选中某个复选框时，由checkbox时触发
		checkboxChange(e) {
			//console.log(e);
		},
		// 选中任一checkbox时，由checkbox-group触发
		checkboxGroupChange(e) {
			// console.log(e);
		},
		// 全选
		checkedAll() {
			this.list.map(val => {
				val.checked = true;
			});
		}
	}
};
</script>

<style></style>
