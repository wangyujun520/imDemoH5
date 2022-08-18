<template>
	<view class="content">
		<view class="flex justify-center align-center">
			<h1>认证所需材料</h1>
		</view>
		<view class="flex justify-center align-center" style="margin-top: 10px;color: #888888;">
			请确保准备好一下材料,您得信息我们将严格保密
		</view>
		<view class="flex justify-center align-center" style="margin-top: 10px;">
			<image src="/static/img/scsfz.png" style="width: 136px;height: 164px;"></image>
		</view>
		<view class="flex justify-center align-center" style="margin-top: 10px;">
			<h4>手持身份证</h4>
		</view>
		<view class="flex justify-center align-center" style="margin-top: 10px;">
			<image src="/static/img/mm.png" style="width: 136px;height: 94px;"></image>

		</view>
		<view class="flex justify-center align-center" style="margin-top: 10px;">
			<h4>店铺照</h4>
		</view>
		<view class="flex justify-center align-center" style="margin-top: 10px;">
			<image src="/static/img/yyzz.png" style="width: 136px;height: 94px;"></image>

		</view>
		<view class="flex justify-center align-center" style="margin-top: 10px;">
			<h4>营业执照</h4>
		</view>
		<view @click="Next()" class="flex justify-center align-center" style="margin-top: 10px;">
			<view class="flex justify-center align-center"
				style="width: 640rpx;background: linear-gradient(to bottom right, #0000FF, #0000FF);border-radius: 30rpx;padding: 15rpx 0;">
				<text style="color: #FFFFFF;font-size: 30rpx;">准备好了</text>
			</view>
		</view>
		<!-- <view class="flex justify-center align-center" style="margin-top: 10px;font-size: 24rpx;
		color: #999;">
			<uni-icons :color="agreement?activeColor:deactiveColor " type="checkbox-filled" size="14"
				@click="checkAgreement"></uni-icons>
			<text @click="checkAgreement">请认真阅读并同意</text>
			<span style="color: #FF9900;">《用户协议》</span>
			和
			<span style="color: #FF9900;">《隐私政策》</span>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agreement: false,
				activeColor: '#FF9900',
				deactiveColor: '#999999'
			}
		},
		onLoad(option) {
			console.log("fdsafds")
		},
		methods: {
			checkAgreement() {
				this.agreement = !this.agreement;

			},
			Next() {
				uni.navigateTo({
					url: '/pages/tabbar/my/identityauthentication/Business/index'
				})
			}
		}
	}
</script>

<style scoped lang='scss'>
page{
	background-color: #f7f7f7;
}
</style>
