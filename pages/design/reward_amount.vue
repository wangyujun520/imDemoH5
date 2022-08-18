<template>
	<view class="content">
		<view class="bg-white m-3 flex flex-column">
			<view class="p-3 border-bottom">
				<view class="flex align-center justify-between">
					<text style="color: #5B5B5B;font-size: 26rpx;">悬赏金额</text>
					<view class="flex align-center" style="color: red;">
						<text style="font-size: 26rpx;">￥</text>
						<text style="font-size: 30rpx;font-weight: bold;">200.00</text>
					</view>
				</view>
				<view class="flex align-center justify-between mt-1" style="font-size: 24rpx;">
					<text style="color: #939393;">确定设计师后自动打入对应设计师账户</text>
					<text style="color: #FF9900;">待入账</text>
				</view>
			</view>
			<view class="px-3">
				<view class="flex flex-column border-bottom py-3">
					<text>订单号：202013322124563213</text>
					<text>订单时间：2020-01-01 08:08:20</text>
				</view>
			</view>
			<view class="px-3">
				<view class="flex flex-column py-3">
					<text>支付方式：支付宝支付</text>
					<text>支付时间：2020-01-01 14:28:40</text>
				</view>
			</view>
		</view>
		
		<view class="flex align-center justify-center mt-5">
			<view class="flex align-center justify-center" style="width: 240rpx;height: 80rpx;background-color: #02B1BE;">
				<text class="text-white">退款</text>
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

		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
</style>
