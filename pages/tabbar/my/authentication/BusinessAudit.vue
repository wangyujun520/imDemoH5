<template>
	<view class="content p-3">
		<view class="flex bg-white align-center justify-center flex-column" style="height: 400rpx;">
			<image src="/static/img/toBeReviewed.png" style="width: 100rpx;height: 100rpx;"></image>
			<text style="font-size: 30rpx;color: #FF9900;" class="mt-3">申请成功，等待商家审核</text>
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="CloseMenu" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">关闭</u-button>
		</view>
	</view>
</template>

<script>
export default {
	
	data() {
		return {
			DataList:''
		};
	},
	onShow() {
		

	},
	computed: {},
	onReady() {},
	methods: {
		CloseMenu(){
			//返回上一个界面
			uni.navigateBack({
				delta:1
			})
			
		}
	}
};
</script>

<style>
</style>
