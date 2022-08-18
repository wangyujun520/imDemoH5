<template>
	<view class="content">
		<view class="flex flex-column align-center justify-center py-3">
			<view class="flex align-center">
				<image src="/static/img/wallet.png" style="width: 50rpx;height: 50rpx;"></image>
				<text class="ml-1" style="color: #6C6B6B;font-size: 30rpx;">钱包余额</text>
			</view>
			<text class="mt-2" style="font-size: 60rpx;color: #32C175;font-weight: bold;">+240.00</text>
		</view>
		
		<view class="flex flex-column bg-white p-3">
			<view class="flex justify-between">
				<text>平台手续费</text>
				<text>¥100</text>
			</view>
			<view class="flex justify-between">
				<text>苹果支付手续费</text>
				<text>¥160</text>
			</view>
		</view>
		
		<view class="flex flex-column bg-white px-3">
			<view class="flex justify-between border-bottom pb-3">
				<text style="font-size: 30rpx;color: #101010;">订单详情</text>
			</view>
		</view>
		
		<view class="flex flex-column bg-white mt-2 p-3">
			<view class="flex justify-between">
				<text>类型</text>
				<text>收入</text>
			</view>
			<view class="flex justify-between">
				<text>付款方</text>
				<text>用户昵称</text>
			</view>
			<view class="flex justify-between">
				<text>时间</text>
				<text>2021-03-11 12:23:33</text>
			</view>
			<view class="flex justify-between">
				<text>交易单号</text>
				<text>11111566556554454</text>
			</view>
			<view class="flex justify-between">
				<text>收款方</text>
				<text>俱乐部名称</text>
			</view>
			<view class="flex justify-between">
				<text>支付方式</text>
				<text>平台币</text>
			</view>
			<view class="flex justify-between">
				<text>交易状态</text>
				<text>结算中</text>
			</view>
			<view class="flex justify-between">
				<text style="width: 200rpx;border: 0px solid red;">备注</text>
				<text style="border: 0px solid;width: 500rpx;">收到用户昵称的费用240元，平台收取100元，苹果支付手续费160元</text>
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
		background-color: #FFFFFF;
	}
</style>