<template>
	<view class="content px-3">
		<view @tap="skipWithdrawalMethod" class="flex justify-between align-center" style="height: 100rpx;">
			<text style="color: #000000;font-size: 28rpx;">提现方式</text>
			<u-icon name="arrow-right" style="font-size: 28rpx;color: #bbb;"></u-icon>
		</view>
		<view class="flex p-3 flex-column rounded" style="background-color: #F7F7F7;">
			<view class="flex align-center">
				<text class="iconfont" style="color: #FF9900;font-size: 40rpx;">&#xe657;</text>
				<text class="ml-1" style="color: #6A667F;font-size: 28rpx;">银行卡</text>
			</view>
			<view class="flex align-center mt-1">
				<text style="color: #101010;">{{BankShow.card_bank}}</text>
				<text class="ml-2">{{BankShow.name}}</text>
			</view>
			<text style="margin-top: 5rpx;">{{BankShow.card_no}}</text>
			<text style="margin-top: 5rpx;">{{BankShow.address}}</text>
		</view>
		<view class="flex justify-between align-center" style="height: 120rpx;">
			<text style="color: #000000;font-size: 28rpx;">提现金额</text>
			<!-- <u-icon name="arrow-right" style="font-size: 28rpx;color: #bbb;"></u-icon> -->
		</view>
		
		<input type="number" class="text-center" v-model="money" style="background-color: #eee;color: #888;height: 90rpx;font-size: 28rpx;" placeholder="请输入提现金额" />
		
		<view class="flex flex-column border-top mt-5 py-3">
			<view class="flex justify-between">
				<text>提现金额</text>
				<text style="color: #FF9900;">{{taking_money}}元</text>
			</view>
		</view>
		
		<view @click="submit" class="flex align-center justify-center my-3" style="background-color: #FF9900;height: 100rpx;border-radius: 10rpx;">
			<text class="text-white" style="font-size: 28rpx;">立即提现</text>
		</view>
		
		<view class="flex justify-between align-center" style="height: 120rpx;">
			<text style="color: #000000;font-size: 28rpx;">温馨提示</text>
		</view>
		<view class="flex flex-column">
			<text>1、最低提现1元，最高提现10000元，提现时间为工作日9:00 - 17:00</text>
			<text>2、提现需要3个工作日审核周期，审核通过后即可发放到提现账户，有时因网络等原因可能会有短暂延迟</text>
		</view>
		
		<!-- 占位 -->
		<view class="" style="height: 100rpx;">
			
		</view>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				console.log("右上角点击事件");
				// 跳转到提现记录界面
				uni.navigateTo({
					url:'/pages/my/wallet/WithdrawalRecord',
					// url:'/pages/tabbar/my/PaymentMethod/Index'
				})
			}
		},
		onLoad(options) {
			this.taking_money = options.taking_money;
			
			// this.$post(this.$url.User.GetBanks, this.tempData, {
			this.$post(this.$url.Account.GetBanks, {
				module: "wallet"
			}, {
				isLoading: true
			}).then(res => {
				if(res.data.length!=0){
					this.BankShow = res.data[0]
				}else{
					this.BankShow = {}
				}
			});
			
		},
		data() {
			return {
				money:'',//提现金额
				taking_money:'',
				BankShow:{}
			}
		},
		methods: {
			// 跳转到提现方式
			skipWithdrawalMethod(){
				uni.navigateTo({
					// url:'/pages/my/wallet/WithdrawalMethod',
					url:'/pages/tabbar/my/PaymentMethod/Index'
				})
			},
			// 提现
			submit(){
				if(this.money>this.taking_money){
					uni.showToast({
						title:'提现金额不能大于可提现金额',
						icon:'none'
					})
					return;
				}
				this.$post(this.$url.Account.TakingMoney, {
					money: this.money,
					bank_id:this.BankShow.id
				}, {
					isLoading: true
				}).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:res.msg,
							icon:'success'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},2000)
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
</style>