<template>
	<view class="px-2 pb-2">
		<view class="flex align-center bg-white rounded mt-2" style="height: 110rpx;" v-for="i in 20">
			<view class="flex justify-center align-center" style="width: 140rpx;height: 100%;">
				<text class="iconfont" style="color: #02B1BE;font-size: 60rpx;">&#xe657;</text>
			</view>
			<view class="" style="width: 480rpx;height: 100%;">
				<view class="flex align-end" style="height: 60rpx;">
					<text>整装</text>
				</view>
				<view style="height: 60rpx;">
					<text style="color: #777;font-size: 26rpx;">全屋装修，全屋装修。</text>
				</view>
			</view>
			<view class="flex align-center justify-center" style="height: 100%;width: 100rpx;">
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #999;"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	methods: {
		
	}
};
</script>

<style>
	
</style>