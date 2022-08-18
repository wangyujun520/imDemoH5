<template>
	<view class="content p-3">
		<view @tap="SelectBankCrad(item)" class="flex p-3 flex-column rounded bg-white mb-3"
			v-for="(item,index) in BankList">
			<view class="flex align-center justify-between position-relative">
				<view class="flex align-center">
					<text class="iconfont" style="color: #FF9900;font-size: 40rpx;">&#xe657;</text>
					<text class="ml-1" style="color: #6A667F;font-size: 28rpx;">银行卡</text>
				</view>
				<text @tap="ModifyBankCard(item)" class="iconfont" style="color: #888;font-size: 40rpx;">&#xe8cf;</text>
			</view>
			<view class="flex align-center mt-1">
				<text style="color: #101010;">{{item.card_bank}}</text>
				<text class="ml-2">{{item.name}}</text>
			</view>
			<text style="margin-top: 5rpx;">{{item.card_no}}</text>
			<text style="margin-top: 5rpx;">{{item.address}}</text>
		</view>

		<view @tap="AddBankCard" class="flex justify-center py-5" style="width: 100%;">
			<view class="flex justify-center align-center rounded bg-white"
				style="width: 690rpx;border: 1px solid #FF9900;color: #FF9900;height: 100rpx;">
				<!-- <text class="iconfont" style="font-size: 36rpx;font-weight: bold;">&#xe612;</text> -->
				<u-icon name="plus" color="#FF9900" size="36"></u-icon>
				<text class="ml-2" style="font-size: 30rpx;">添加银行卡</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				BankList: []
			}
		},
		methods: {
			// 添加银行卡
			AddBankCard() {
				uni.navigateTo({
					url: '/pages/my/wallet/AddBankCard'
				})
			},
			// 修改银行卡
			ModifyBankCard(item) {
				uni.navigateTo({
					url: '/pages/my/wallet/ModifyBankCard?data=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			SelectBankCrad(item) {
				// 返回上个界面并修改值
				// SelectBankCrad(item)
				console.log(JSON.stringify(item))
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.BankShow.card_bank = item.card_bank;
				prevPage.$vm.BankShow.name = item.name;
				prevPage.$vm.BankShow.card_no = item.card_no;
				prevPage.$vm.BankShow.address = item.address;
				prevPage.$vm.BankShow.id = item.id;
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
			}
		},
		onShow() {
			// 获取银行卡
			this.$post(this.$url.User.GetBanks, {}, {
				isLoading: true
			}).then(res => {
				this.BankList = res.data;
			});
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
</style>
