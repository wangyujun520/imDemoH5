<template>
	<view class="content p-3">
		<!-- <text>实名认证</text> -->
		
		<view class="flex bg-white align-center justify-center flex-column" style="height: 400rpx;">
			<!-- <image src="/static/img/toBeReviewed.png" style="width: 100rpx;height: 100rpx;"></image> -->
			<image src="http://oss.anjubang.cn/toBeReviewed.png" style="width: 100rpx;height: 100rpx;"></image>
			<text style="font-size: 30rpx;color: #FF9900;" class="mt-3">平台审核中，请耐心等待</text>
		</view>
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="CloseMenu" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">关闭</u-button>
		</view>
	</view>
</template>

<script>
export default {
	
	data() {
		return {
			DataList:''
		};
	},
	onShow() {
		// // 我的认证首页
		// var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyProfession';
		// var RequrestDatas = {};
		// this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
		// 	this.DataList = res.dataList;
		// 	console.log(JSON.stringify(res));
		// })
		// .catch(err => {
		// 	console.log(err);
		// });

	},
	computed: {},
	onReady() {},
	methods: {
		CloseMenu(){
			uni.reLaunch({
				url:'/pages/tabbar/my/mycertification'
			})
			// this.DataList.forEach(item => {
			// 	if(item.workType == "工人"){
			// 		uni.redirectTo({
			// 			url:'/pages/tabbar/my/identityauthentication/WorkerCertification?authenticate='+item.authenticate
			// 		})
			// 	}
			// });
			
			// //关闭当前界面跳转到工人认证界面
			// uni.redirectTo({
			// 	// url:'/pages/tabBar/my/identityauthentication/WorkerCertification'
			// 	url:'/pages/tabBar/my/identityauthentication/WorkerCertification?authenticate='+item.authenticate
			// })
		}
	}
};
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
