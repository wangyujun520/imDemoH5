<!-- <template>
	<view class="content">
		<view class="flex">
			<text>签署失败</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		onLoad(options) {
			console.log(options.state);
		}
	}
</script>

<style lang="scss">
	
</style> -->
<template>
 	<view class="content p-3">
 		<view class="flex bg-white align-center justify-center flex-column" style="height: 400rpx;">
 			<!-- <image src="/static/img/authentication.png" style="width: 100rpx;height: 100rpx;"></image> -->
 			<image src="/static/img/AuthenticationFailed.png" style="width: 100rpx;height: 100rpx;"></image>
 			<text style="font-size: 30rpx;color: #FA3534;" class="mt-3">您的合同签署失败</text>
 		</view>
 		
 		<view class="flex align-end justify-center" style="height: 150rpx;">
 			<u-button @click="ReSign" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">重新签署</u-button>
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
 		
 
 	},
 	computed: {},
 	onReady() {},
 	methods: {
		// 重新签署
 		ReSign(){
 			console.log("重新签署")
 		}
 	}
 };
 </script>
 
 <style>
 </style>