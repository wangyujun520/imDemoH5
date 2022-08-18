<template>
	<view class="p-3">
		<view class="flex bg-white flex-column align-center py-5">
			<view class="">
				<image src="https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/fangchanjingjiren.png" style="width: 120rpx;height: 120rpx;"></image>
			</view>
			<text style="font-size: 26rpx;color: #777;">房产经纪人</text>
			<text class="my-1" style="font: 26rpx;color: #0072FF;">张天宇</text>
		</view>
		
		<view class="flex justify-between align-center my-2 py-2 bg-white">
			<view @click="skipMyLevel" class="flex flex-column justify-center align-center" style="width: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
				<text class="iconfont" style="color: #3F81C1;font-size: 50rpx;">&#xe6b4;</text>
				<text style="color: #888;font-size: 24rpx;">我的等级</text>
			</view>
			<view @click="skipRealEstateManagement" class="flex flex-column justify-center align-center" style="width: 100%;">
				<text style="color: #FF9900;font-size: 50rpx;font-weight: bold;">1/3</text>
				<text style="color: #888;font-size: 24rpx;">房产管理</text>
			</view>
		</view>
		
		<view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">姓名</text>
				<view class="flex align-center">
					<image src="/static/img/authentication.png" style="width: 30rpx;height: 30rpx;"></image>
					<text style="color: #777;font-size: 28rpx;">张天宇</text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">联系电话</text>
				<view class="flex align-center pr-2">
					<text style="color: #777;font-size: 28rpx;">15882563652</text>
					<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				</view>
			</view>
			<view @click="skipAffiliatedCompany" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">归属公司</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;">链家地产(半岛城邦店)</text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	onLoad(options) {
		
	},
	onShow() {
		
	},
	methods: {
		// 跳转到我的等级界面
		skipMyLevel(){
			uni.navigateTo({
				url:'/pages/tabBar/my/identityauthentication/MyLevel'
			})
		},
		// 跳转到房产管理界面
		skipRealEstateManagement(){
			uni.navigateTo({
				url:'/pages/tabBar/my/identityauthentication/EstateManagement'
			})
		},
		// 跳转到归属公司界面
		skipAffiliatedCompany(){
			uni.navigateTo({
				url:'/pages/tabBar/my/identityauthentication/AffiliatedCompany'
			})
		}
	}
};
</script>

<style lang="scss">
	
</style>