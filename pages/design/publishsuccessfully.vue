<template>
	<view class="content p-3">
		
		<view class="flex bg-white align-center justify-center flex-column" style="height: 400rpx;">
			<image src="/static/img/authentication.png" style="width: 100rpx;height: 100rpx;"></image>
			<text style="color: #777;font-size: 30rpx;color: #3E8EFF;" class="mt-3">发布成功</text>
			<text style="color: #777;font-size: 24rpx;color: #939393;" class="mt-3">请前往消息-需求中查看</text>
		</view>
		
		<button @click="ClosePage" style="margin-top: 50rpx;" type="primary">关闭</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	onLoad() {

	},
	computed: {
		
	},
	onReady() {
		
	},
	methods: {
		ClosePage(){
			// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
			uni.switchTab({
			   // url:'/pages/tabBar/message/NavMenu/demand'
			      url: '/pages/tabBar/message/message'
			});
		}
	}
};
</script>

<style>
</style>