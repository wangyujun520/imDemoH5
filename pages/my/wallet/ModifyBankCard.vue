<template>
	<view class="content px-3">
		<view class="flex flex-column py-2 border-bottom">
			<view class="flex flex-column">
				<text style="font-size: 28rpx;">姓名</text>
				<input class="mt-2" v-model="tempData.name" type="text" placeholder="请输入姓名" />
			</view>
		</view>
		<view class="flex flex-column py-2 border-bottom">
			<view class="flex flex-column">
				<text style="font-size: 28rpx;">银行卡号</text>
				<input class="mt-2" v-model="tempData.card_no" type="text" placeholder="请输入银行卡号" />
			</view>
		</view>
		<view class="flex flex-column py-2 border-bottom">
			<view class="flex flex-column">
				<text style="font-size: 28rpx;">开户银行</text>
				<input class="mt-2" v-model="tempData.card_bank" type="text" placeholder="根据录入的银行卡号识别" />
			</view>
		</view>
		<view class="flex flex-column py-2 border-bottom">
			<view class="flex flex-column">
				<text style="font-size: 28rpx;">开户地址</text>
				<input class="mt-2" v-model="tempData.address" type="text" placeholder="请输入开户地址" />
			</view>
		</view>

		<view class="flex align-center justify-center my-5"
			style="background-color: #FF9900;height: 100rpx;border-radius: 10rpx;">
			<text @click="Submit" class="text-white" style="font-size: 28rpx;">修改</text>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.tempData = JSON.parse(decodeURIComponent(options.data));
			console.log(this.tempData)
		},
		data() {
			return {
				tempData: {
					id:'',
					name: '',
					card_no: '',
					card_bank: '',
					address: ''
				}
			}
		},
		methods: {
			// 提交
			Submit() {
				this.$post(this.$url.User.SaveBank, this.tempData, {
					isLoading: true
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '修改成功',
							icon: 'success'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 2000)
					}
				});
			}
		},
		onShow() {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
</style>
