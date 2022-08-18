<template>
	<view class="content px-3">
		<view @tap="skipWithdrawalDetails" class="flex flex-column border-bottom py-3" v-for="(item,index) in DataList" :key="item.id">
			<view class="flex justify-between">
				<text style="font-size: 30rpx;color: #444;">{{item.title}}</text>
				<text style="font-size: 32rpx;color: #F05C5C;">{{item.money}}</text>
			</view>
			<view class="flex justify-between mt-1">
				<text style="color: #bbb;font-size: 26rpx;">{{item.add_date}}</text>
				<text style="color: #444;font-size: 28rpx;">{{item.status_text}}</text>
			</view>
		</view>
		
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				DataList:[]
			}
		},
		methods: {
			// 跳转到提现详情
			skipWithdrawalDetails(){
				// uni.navigateTo({
				// 	url:'/pages/my/wallet/WithdrawalDetails'
				// })
			}
		},
		onShow() {
			// 获取提现明细
			this.$post(this.$url.Account.GetTakingMoneys, {
				type:3
			}, {
				isLoading: true
			}).then(res => {
				// console.log(JSON.stringify(res))
				this.DataList = res.data.list;
			});
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
</style>