<template>
	<view class="content">
		<!-- <view class="bg-white flex p-2">
			<input type="number" v-model="Amount" placeholder="请输入合同金额" class="w-100" style="font-size: 28rpx;" /></input>
		</view>
		<view class="bg-white flex p-2">
			<text style="font-size: 26rpx;color: #999;">合同金额分四次支付,签订合同完成支付30%,确认设计效果图支付30%
				确认完成施工图支付30%,装修验收完成后支付剩余的10%.</text>
		</view> -->

		<view class="flex flex-column bg-white align-center justify-center" style="padding: 30rpx 50rpx;">
			<input type="number" :disabled="isDesin" value="" v-model="Amount" placeholder="请输入合同金额" />

		</view>
		<view class="flex flex-column bg-white align-center justify-center" style="padding: 30rpx 50rpx;">
			<text>
				合同金额分四次支付,签订合同完成支付30%,
				确认设计效果图支付30%确认完成施工图支付30%,
				装修验收完成后支付剩余的10%.
			</text>
		</view>
		<view v-if="isshow" class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确认合同金额
			</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gopay: true, //支付按钮显示开关，避免重复点击
				id: 0,
				isDesin: false,
				isshow: true,
				Amount: ""

			};
		},
		methods: {
			Submit() {
				if (this.Amount <= 0) {
					this.$refs.uToast.show({
						title: '合同金额必须大于0!',
						type: 'error'
					})
					return;
				}
				if (!this.gopay) {
					return;
				}
				this.gopay = false;
				var RequrestUrl =
					this.AJB.BizUrl + "api/Design/ConfirmDesingnAmount";
				var RequrestDatas = {
					id: this.id,
					amount: this.Amount
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						if (res.code == 200) {
							//e签宝注册
							var RequrestUrl = this.AJB.BizUrl + 'api/Esign/RegisteredEsign';
							var RequrestDatas = {};
							this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {

								})
								.catch(err => {
									console.log(err);
								});
							uni.navigateBack({
								delta: 1
							})
						}
					})
					.catch((err) => {
						this.gopay = true;
						console.log(err);
					});
			}
		},
		onLoad(option) {
			if (option.isDesin == 'true') {
				this.isDesin = true
			}
			if (option.isDesin == 'false') {
				this.isDesin = false
			}
			if (this.Amount > 0) {
				this.isshow = false;
			}
			this.Amount = option.Amount
			this.id = option.id
		}
	}
</script>

<style lang="scss">

</style>
