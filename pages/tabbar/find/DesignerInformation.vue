<template>
	<view class="content">
		
		<view class="bg-white mt-2 px-2">
			<!-- 基本信息 -->
			<view class="flex flex-column bg-white py-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex">
					<text style="color: #888;font-size: 28rpx;font-weight: bold;">基本信息</text>
				</view>
				<view class="flex align-center">
					<text style="color: #101010;font-size: 26rpx;">姓名：</text>
					<text style="color: #888;font-size: 26rpx;">张三</text>
				</view>
				<view class="flex align-center">
					<text style="color: #101010;font-size: 26rpx;">性别：</text>
					<text style="color: #888;font-size: 26rpx;">男</text>
				</view>
				<view class="flex align-center">
					<text style="color: #101010;font-size: 26rpx;">年龄：</text>
					<text style="color: #888;font-size: 26rpx;">25</text>
				</view>
				<view class="flex flex-column">
					<text style="color: #101010;font-size: 26rpx;">认证信息：</text>
					<view class="flex flex-wrap">
						<view class="flex align-center mr-2">
							<text class="iconfont" style="color: #FF9900;">&#xe66a;</text>
							<text style="color: #888;font-size: 26rpx;">身份证</text>
						</view>
						<view class="flex align-center mr-2">
							<text class="iconfont" style="color: #FF9900;">&#xe66a;</text>
							<text style="color: #888;font-size: 26rpx;">手机号</text>
						</view>
						<view class="flex align-center mr-2">
							<text class="iconfont" style="color: #FF9900;">&#xe66a;</text>
							<text style="color: #888;font-size: 26rpx;">真人照</text>
						</view>
						<view class="flex align-center mr-2">
							<text class="iconfont" style="color: #FF9900;">&#xe66a;</text>
							<text style="color: #888;font-size: 26rpx;">案例实景</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 认证时间 -->
			<view class="flex flex-column bg-white py-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex">
					<text style="color: #888;font-size: 28rpx;font-weight: bold;">认证时间</text>
				</view>
				<text style="color: #101010;font-size: 26rpx;">2020-11-11</text>
			</view>
			<!-- 归属公司 -->
			<view class="flex flex-column bg-white py-2">
				<view class="flex">
					<text style="color: #888;font-size: 28rpx;font-weight: bold;">归属公司</text>
				</view>
				<text style="color: #101010;font-size: 26rpx;">平台</text>
			</view>
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
		onShow() {
			
		}
	}
</script>

<style>
</style>
