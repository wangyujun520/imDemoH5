<template>
	<view class="content">
		
		
		<view class="flex flex-column bg-white m-3 p-3 rounded" v-for="(item,index) in DataList" :key="index">
			<view class="flex align-center justify-between">
				<view class="flex align-center">
					<text v-if="item.catalog == 0" class="iconfont mr-1" style="font-size: 40rpx;color: #E5A330;">&#xe936;</text>
					<u-icon v-if="item.catalog == 1" class="mr-1" name="weixin-circle-fill" color="#04BE02" size="40"></u-icon>
					<u-icon v-if="item.catalog == 2" class="mr-1" name="zhifubao-circle-fill" color="#027AFF" size="40"></u-icon>
					<text style="color: #6A667F;font-size: 28rpx;">{{TypeList[item.catalog]}}</text>
				</view>
				<u-icon name="edit-pen" color="#888888" size="35"></u-icon>
			</view>
			<view class="flex align-center mt-1">
				<text class="mr-2" v-if="item.bank_catalog_text">{{item.bank_catalog_text}}</text>
				<text>{{item.name}}</text>
			</view>
			<text class="mt-1">{{item.account}}</text>
			<text class="mt-1">{{item.bank_store}}</text>
		</view>
		
		<!-- <view class="flex flex-column bg-white m-3 p-3 rounded">
			<view class="flex align-center justify-between">
				<view class="flex align-center">
					<u-icon class="mr-1" name="weixin-circle-fill" color="#04BE02" size="40"></u-icon>
					<text style="color: #6A667F;font-size: 28rpx;">微信</text>
				</view>
				<u-icon name="edit-pen" color="#888888" size="35"></u-icon>
			</view>
			<view class="flex align-center mt-1">
				<text>张三丰</text>
			</view>
			<text class="mt-1">这里是微信号</text>
		</view>
		
		<view class="flex flex-column bg-white m-3 p-3 rounded">
			<view class="flex align-center justify-between">
				<view class="flex align-center">
					<u-icon class="mr-1" name="zhifubao-circle-fill" color="#027AFF" size="40"></u-icon>
					<text style="color: #6A667F;font-size: 28rpx;">支付宝</text>
				</view>
				<u-icon name="edit-pen" color="#888888" size="35"></u-icon>
			</view>
			<view class="flex align-center mt-1">
				<text>张三丰</text>
			</view>
			<text class="mt-1">这里是支付宝号</text>
		</view> -->
		
		<view class="flex justify-center py-3">
			<view @tap="showPopup=true" class="bg-white flex align-center justify-center" style="width: 650rpx;height: 100rpx;">
				<u-icon name="plus" color="#2979ff" size="36"></u-icon>
				<text class="ml-2" style="color: #2979ff;font-size: 26rpx;">添加</text>
			</view>
		</view>
		
		<u-popup v-model="showPopup" mode="bottom" border-radius="14" :closeable="true">
			<view class="px-3 flex flex-column">
				<!-- <text>请选择要添加的收款方式</text> -->
				<view class="flex justify-center align-center mb-2 mt-4">
					<text style="font-size: 36rpx;color: #000000;font-weight: bold;">添加收款方式</text>
				</view>
				<view @tap="skipAddBankCard" class="flex align-center justify-between border-bottom" style="height: 110rpx;">
					<text style="font-size: 28rpx;color: #444;">银行卡</text>
					<u-icon name="arrow-right" color="#888888" size="30"></u-icon>
				</view>
				<view @tap="skipAddAlipay" class="flex align-center justify-between border-bottom" style="height: 110rpx;">
					<text style="font-size: 28rpx;color: #444;">支付宝</text>
					<u-icon name="arrow-right" color="#888888" size="30"></u-icon>
				</view>
				<view @tap="skipWeiChat" class="flex align-center justify-between" style="height: 110rpx;">
					<text style="font-size: 28rpx;color: #444;">微信</text>
					<u-icon name="arrow-right" color="#888888" size="30"></u-icon>
				</view>
			</view>
			
		</u-popup>
		
	</view>
</template>

<script>
	export default{
		onShow() {
			// 获取我的收款方式
			this.$post(this.$url.Account.GetBanks, {
				module: "income" //固定值income
			}, {
				isLoading: false
			}).then(res => {
				this.DataList = res.data
			});
		},
		data(){
			return{
				showPopup:false,
				DataList:[],
				// 0=银行卡、1=微信、2=支付宝
				TypeList:[
					'银行卡','微信','支付宝'
				]
			}
		},
		methods:{
			skipAddBankCard(){
				uni.navigateTo({
					url:'/pages/tabbar/my/PaymentMethod/add_bank_card'
				})
				this.showPopup = false;
			},
			skipAddAlipay(){
				uni.navigateTo({
					url:'/pages/tabbar/my/PaymentMethod/add_alipay'
				})
				this.showPopup = false;
			},
			skipWeiChat(){
				uni.navigateTo({
					url:'/pages/tabbar/my/PaymentMethod/add_wechat'
				})
				this.showPopup = false;
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>