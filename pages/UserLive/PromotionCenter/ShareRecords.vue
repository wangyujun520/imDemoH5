<template>
	<view class="content">
		<view class="m-3 p-3 bg-white" style="border-radius: 20rpx;" v-for="i in 3">
			<view class="flex flex-column border-bottom pb-2">
				<view class="flex align-center">
					<text style="font-size: 50rpx;color: #000;font-weight: bold;">4</text>
					<text class="ml-1" style="font-size: 30rpx;color: #000;">月/2021</text>
				</view>
				<view class="flex align-center" style="color: #101010;font-size: 28rpx;">
					<text>分享次数:1122</text>
					<text class="ml-2">记录:3</text>
				</view>
			</view>
			<view class="flex flex-column ">
				<view class="flex pt-3" v-for="i in 3">
					<view class="" style="border:0px solid red;width: 105rpx;">
						<!-- <img src="https://img1.baidu.com/it/u=2029513305,2137933177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=472" style="width: 65rpx;height: 65rpx;border-radius: 50%;"> -->
					</view>
					<view class="flex flex-column border-bottom pb-3" style="width: 100%;">
						<view class="flex align-center justify-between">
							<text style="color: #101010;font-size: 32rpx;">2022-04-08</text>
							<text style="color: #32C175;font-size: 36rpx;">21</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="" style="height: 5rpx;"></view>
	</view>
</template>

<script>
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>