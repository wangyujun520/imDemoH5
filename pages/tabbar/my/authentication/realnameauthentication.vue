<template>
	<view class="content p-3">
		<!-- <text>实名认证</text> -->
		
		<view class="flex bg-white align-center justify-center flex-column" style="height: 400rpx;">
			<image src="/static/img/authentication.png" style="width: 100rpx;height: 100rpx;"></image>
			<text style="color: #777;font-size: 30rpx;color: #3E8EFF;" class="mt-3">您已通过实名认证</text>
		</view>
		
		<view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">姓名</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;">{{DataList.name}}</text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			
			<view class="flex justify-between align-center pl-2" style="height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">证件号</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;">{{DataList.idNumber}}</text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		
		<view class="flex justify-center align-center" style="height: 100rpx;">
			<text style="color: #777;font-size: 26rpx;">身份证号只提供平台确定信息使用</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				DataList:''//Mock数据
			}
		},
		onShow() {
			// 获取实名认证信息
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetAuthenticateInfo';
			var RequrestDatas = {};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
				console.log(JSON.stringify(res))
				this.DataList = res.dataList;
			})
			.catch(err => {
				console.log(err);
			});
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
