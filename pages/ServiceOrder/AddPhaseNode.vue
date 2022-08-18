<template>
	<view class="content">
		<view class="bg-white px-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex align-center" style="height: 120rpx;">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">节点名称</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" v-model="DataList.workingYears" style="font-size: 28rpx;color: #777;" placeholder="请输入节点名称" />
				</view>
			</view>
		</view>
		
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Time:"2010-10-01",
			show:false,
			DataList:''//Mock数据
		};
	},
	onShow() {
		
	},
	computed: {},
	onReady() {},
	methods: {
		
		Submit(){
			console.log("提交")
			
			
		}
	}
};
</script>

<style>
	.Selection {
		background-color: #ff9900;
		color: #ffffff;
	}
	.NoSelection {
		background-color: #f0f0f0;
		color: #444;
	}
</style>