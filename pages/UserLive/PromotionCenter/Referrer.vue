<template>
	<view class="content">
		<view class="px-2 bg-white flex align-center" style="height: 100rpx;">
			<u-search bg-color="#F2F2F2" placeholder="搜索员工姓名" :show-action="false" v-model="keyword"></u-search>
		</view>
		<view class="flex align-center bg-white pl-3" v-for="i in 3">
			<img class="rounded mr-3" src="https://img2.baidu.com/it/u=4244269751,4000533845&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" style="width: 100rpx;height: 100rpx;">
			<view class="flex flex-column border-bottom py-4" style="width: 100%;height:100%;">
				<text style="color: #101010;font-size: 32rpx;font-weight: bold;">李思思</text>
				<view class="flex justify-between align-center mt-1 pr-3" style="color: #A6A6A6;font-size:24rpx;">
					<text>我的推荐</text>
					<text>推荐日期：2022.01.01</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				keyword:''
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>