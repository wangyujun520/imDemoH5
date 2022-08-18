<template>
	<view class="content p-3">
		<view class="" v-html="content">

		</view>
		<view class="flex justify-center align-center" style="height: 200rpx;">
			<view @click="Next()" class="flex justify-center align-center"
				style="width: 640rpx;background: linear-gradient(to bottom right, #FFCC99, #FF9900);border-radius: 30rpx;padding: 15rpx 0;">
				<text style="color: #FFFFFF;font-size: 30rpx;">下一步</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				option: ''
			}
		},
		onShow() {
			var ProductList = this.AJB.BizUrl + 'api/Explain/GetExplain';
			var ProductListDatas = {
				"Type": "AJBZZ03",
			};
			this.AJB.UniAjax(ProductList, ProductListDatas).then(res => {
					console.log(JSON.stringify(res));
					if (res.code == 200) {
						this.content = res.dataList.content;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		onLoad(Option) {
			this.option = Option
		},
		methods: {
			Next() {
				uni.navigateTo({
					url: '/pages/tabBar/my/identityauthentication/' + this.option.url + '?authenticate=' + this
						.option
						.authenticate
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 10px;
	}

	page {
		background-color: #EFEFF4;
	}

	p {
		font-size: 14px;
		margin-top: 0;
		margin-bottom: 10px;
		color: #8f8f94;
		line-height: 24px;
	}
</style>
