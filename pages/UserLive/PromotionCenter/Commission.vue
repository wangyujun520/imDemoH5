<template>
	<view class="content">
		
		<view class="m-3 p-3" style="background-color: #4C71F9;border-radius: 20rpx;">
			<view class="flex flex-column py-3" style="border-bottom:2px solid rgba(255, 255, 255, 0.2);">
				<view class="flex justify-between">
					<text style="color: #ffffff;font-size: 34rpx;opacity: 0.8;">当前余额 (元)</text>
					<view class="flex align-center justify-center" style="background-color: #c2cffd;width: 200rpx;height: 60rpx;border-radius: 40rpx;">
						<text style="color: #4C71F9;">去钱包提现</text>
					</view>
				</view>
				<text style="color: #ffffff;font-size: 50rpx;">10234.21</text>
			</view>
			<view class="flex flex-column py-2">
				<text class="mt-1" style="color: #ffffff;font-size: 28rpx;opacity: 0.8;">累计金额(元)：21124.21</text>
				<text class="mt-1" style="color: #ffffff;font-size: 28rpx;opacity: 0.8;">支出金额(元)：5000.00</text>
				<text class="mt-1" style="color: #ffffff;font-size: 28rpx;opacity: 0.8;">提现金额(元)：5000.00</text>
			</view>
		</view>
		
		<view class="flex align-center m-3">
			<view class="flex align-center justify-center" :class="current==0?'yes':'no'" @tap="current=0">
				<text style="font-size: 24rpx;">收款记录</text>
			</view>
			<view class="flex align-center justify-center ml-3" :class="current==1?'yes':'no'" @tap="current=1">
				<text style="font-size: 24rpx;">退款记录</text>
			</view>
			<view class="flex align-center justify-center ml-3" :class="current==2?'yes':'no'" @tap="current=2">
				<text style="font-size: 24rpx;">提现记录</text>
			</view>
		</view>
		
		<view class="m-3 p-3 bg-white" style="border-radius: 20rpx;" v-for="i in 3">
			<view class="flex flex-column border-bottom pb-2">
				<view class="flex align-center">
					<text style="font-size: 50rpx;color: #000;font-weight: bold;">4</text>
					<text class="ml-1" style="font-size: 30rpx;color: #000;">月</text>
				</view>
				<view class="flex align-center" style="color: #101010;font-size: 28rpx;">
					<text>收入1122.23</text>
					<text class="ml-2">记录:3</text>
				</view>
			</view>
			<view class="flex flex-column ">
				<view class="flex pt-3" v-for="i in 3">
					<view class="" style="border:0px solid red;width: 105rpx;">
						<img src="https://img1.baidu.com/it/u=2029513305,2137933177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=472" style="width: 65rpx;height: 65rpx;border-radius: 50%;">
					</view>
					<view class="flex flex-column border-bottom pb-3" style="width: 100%;">
						<view class="flex align-center justify-between">
							<text style="color: #101010;font-size: 32rpx;">汇融广场</text>
							<text style="color: #32C175;font-size: 36rpx;">+40.00</text>
						</view>
						<text class="mt-2" style="color: #BBBBBB;font-size: 24rpx;">施工订单</text>
						<text class="mt-1" style="color: #BBBBBB;font-size: 24rpx;">2021-03-23 17:14</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="" style="height: 5rpx;"></view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current:0
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	.yes {
		background-color: #556CEA;
		color: #ffffff;
		width: 150rpx;
		height: 56rpx;
		border-radius: 40rpx;
	}
	
	.no {
		background-color: #f7f7f7;
		color: #444;
		width: 150rpx;
		height: 56rpx;
		border-radius: 40rpx;
	}
</style>