<template>
	<view class="px-2 pb-2">
		<view class="flex align-center justify-between bg-white rounded mt-2 px-2" style="height: 110rpx;" v-for="(item, index) in DataList">
			<view class="flex align-end">
				<text>{{item.name}}</text>
			</view>
			<u-radio-group width="40rpx" size="38" v-model="value" @change="radioGroupChange">
				<u-radio 
					@change="radioChange" 
					:name="item.name"
					:disabled="item.disabled"
					active-color="#ff9900"
					:icon-size="20"
				>
				</u-radio>
			</u-radio-group>
			
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	onLoad: function (option) {
		console.log(option.mode)
		this.value = option.mode;
	},
	data() {
		return {
			DataList: '', //Mock数据
			value: ''
		};
	},
	onShow() {
		var DataLists = {
			code: 200,
			msg: 'ok',
			dataList: [
				{
					name: '半包',
					checked: false
				},
				{
					name: '全包',
					checked: false
				}
			]
		};
		this.DataList = DataLists.dataList;
	},
	methods: {
		Submit(){
			// 非空验证
			if(this.value == ""){
				this.$refs.uToast.show({
					title: '请选择方式',
					type: 'warning'
				})
				return;
			}
			let pages = getCurrentPages();  //获取所有页面栈实例列表
			let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
			if(this.value=='全包')
			{
				prevPage.$vm.DataList.mode = 0;  
			}else
			{
				prevPage.$vm.DataList.mode = 1;  
			}
			 //修改上一页data里面的searchVal参数值为1211
			prevPage.$vm.DataList.modename = this.value; 
			uni.navigateBack({
				delta:1
			})
		},
		// 选中某个单选框时，由radio时触发
		radioChange(e) {
			// console.log(e);
		},
		// 选中任一radio时，由radio-group触发
		radioGroupChange(e) {
			// console.log(e);
		}
	}
};
</script>

<style></style>
