<template>
	<view class="content">
		<view class="flex flex-column align-center justify-center bg-white" style="height: 400rpx;">
			<!-- <text class="iconfont" style="font-size: 120rpx;color: #28A745;">&#xe631;</text>
			<text style="color: #EA3131;font-size: 40rpx;">提现成功</text> -->
			<!-- <text class="iconfont" style="font-size: 120rpx;color: #FF9900;">&#xe816;</text>
			<text style="color: #EA3131;font-size: 40rpx;">审核中</text> -->
			
			<u-icon name="close-circle" style="font-size: 120rpx;color: #EA3131;"></u-icon>
			<text style="color: #EA3131;font-size: 40rpx;">提现失败</text>
			<text style="font-size: 30rpx;color: #101010;">-188元</text>
		</view>
		<view class="flex flex-column bg-white mt-2 p-3">
			<view class="flex justify-between">
				<text>交易收费</text>
				<text>38.00</text>
			</view>
			<view class="flex justify-between">
				<text>手续费</text>
				<text>38.00</text>
			</view>
		</view>
		
		<view class="flex flex-column bg-white mt-2 p-3">
			<view class="flex justify-between">
				<text>交易时间</text>
				<text>2021-03-11 12:23:33</text>
			</view>
			<view class="flex justify-between">
				<text>交易类型</text>
				<text>钱包提现</text>
			</view>
			<view class="flex justify-between">
				<text>交易状态</text>
				<text>交易成功</text>
			</view>
			<view class="flex justify-between">
				<text>交易账户</text>
				<text>四川某某某有限科技公司</text>
			</view>
			<view class="flex justify-between">
				<text>交易账号</text>
				<text>622848000000000000</text>
			</view>
			<view class="flex justify-between">
				<text>交易账户</text>
				<text>中国工商银行</text>
			</view>
			<view class="flex justify-between">
				<text>交易流水</text>
				<text>20210012233211</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F7F7F7;
	}
</style>