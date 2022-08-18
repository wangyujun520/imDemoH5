<template>
	<view class="content">
		
		<view class="FindInfo px-2 py-2" style="border-bottom: 1px solid rgb(187, 187, 187, 0.5)" v-for="i in 5">
			<!-- 顶部开始 -->
			<view class="flex">
				<view class="flex align-center" @click="JumpHomePage(sitem)">
					<image src="/static/img/head/demo5.jpg" style="width: 110rpx; height: 110rpx" class="rounded"></image>
				</view>
				<view class="flex flex-column pl-2" style="width: 490rpx">
					<view class="UserInfo pt-1">
						<text class="mr-1" style="color: #101010; font-size: 32rpx; font-weight: bold">张三</text>
						<text class="font-sm text-white bg-danger px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx">销售人员</text>
					</view>
					<view class="Describe">
						<text style="font-size: 26rpx; color: #939393">个性签名</text>
					</view>
					<view class="Scoring">
						<u-rate
							:disabled="true"
							:current="3"
							:size="28"
							inactive-color="#B2B2B2"
							active-color="#FF9900"
							active-icon="star-fill"
							inactive-icon="star"
						></u-rate>
						<text style="color: #ff1b1b">4.0分</text>
					</view>
				</view>
				<view class="flex justify-end align-center" style="width: 110rpx">
					<text
						class="rounded px-1"
						style="color: #ff9900;border: 1px solid #ff9900;padding-top: 5rpx;padding-bottom: 5rpx;"
					>
						+关注
					</text>
					<!-- <text
						class="rounded px-1"
						style="color: #939393;border: 1px solid #939393;padding-top: 5rpx;padding-bottom: 5rpx;"
					>
						已关注
					</text> -->
				</view>
			</view>
			<!-- 顶部结束 -->
			<!-- 内容开始 -->
			<view class="Content-Text mt-1">
				<!-- 展开收起效果 -->
				<u-read-more :toggle="toggle" :show-height="showHeight" ref="uReadMore">
					<rich-text :nodes="content" style="line-height: 45rpx"></rich-text>
				</u-read-more>
			</view>
			<!-- 图片显示 -->
			<view class="Pic-Box flex flex-wrap mt-1">
				<view class="pl-1 pt-1" style="width: 235rpx; height: 235rpx" v-for="i in 9">
					<!-- <image @click="previewImage(imgitem, sitem.photos)" :src="imgitem" style="width: 100%; height: 100%"></image> -->
					<!-- 处理图片压缩，显示缩略图 -->
					<image src="/static/video/demo.jpg" mode="aspectFill" style="width: 100%; height: 100%"></image>
				</view>
			</view>
			<!-- 视频显示 -->
			<!-- <view v-if="sitem.communicationType == 'video'" @click="openVideo(sitem.video)" class="position-relative mt-2">
				<image
					@load="loadImage"
					:src="sitem.video + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
					lazy-load="true"
					:style="'width: ' + w + 'px;height: ' + h + 'px;'"
					class="rounded"
				></image>
				<text class="iconfont text-white position-absolute" style="font-size: 80rpx; width: 80rpx; height: 80rpx" :style="posterIconStyle">&#xe99a;</text>
			</view> -->
			<!-- 图文链接显示 -->
			<!-- <view @click="TextLinkPage()" class="TextLink mt-1 flex" style="height: 150rpx;background-color: #F7F7F7;">
						<view class="p-1" style="width: 150rpx;height: 150rpx;">
							<image src="/static/img/head/demo6.jpg" class="rounded" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="pr-1 flex align-center" style="width: 560rpx;">
							<text style="color: #101010;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">付款后四大皆空的样式这里是一个图文连接的样式这里是一个图文连接的样式付款后四大皆空的样式这里是一个图文连接的样式这里是一个图文连接的样式</text>
						</view>
					</view> -->
			<!-- 商品链接显示 -->
			<!-- <view @click="CommodityLinkPage()" class="CommodityLink mt-1 flex" style="height: 180rpx;background-color: #F7F7F7;">
						<view class="p-1" style="width: 180rpx;height: 180rpx;">
							<image src="/static/img/head/demo6.jpg" class="rounded" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="pr-1 flex flex-column justify-between p-2" style="width: 560rpx;">
							<text style="color: #101010;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;font-size: 28rpx;">付款后四大皆空的样式这里是一个图文连接的样式这里是一个图文连接的样式付款后四大皆空的样式这里是一个图文连接的样式这里是一个图文连接的样式</text>
							<text style="color: #E51C23;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">899.00</span></text>
						</view>
					</view> -->
		
			<!-- 内容结束 -->
		
			<!-- 定位信息开始 -->
			<view class="flex pt-2">
				<i class="iconfont pr-1" style="color: #398fff; font-weight: bold; font-size: 30rpx">&#xe659;</i>
				<text style="font-size: 26rpx; color: #666666">四川省成都市金牛区凤凰山街道</text>
			</view>
			<!-- 定位信息结束 -->
		
			<!-- 点赞评论开始 -->
			<view class="LikeBox flex px-1 pt-2">
				<view class="flex-1">
					<text style="color: #939393; font-size: 28rpx">2021-02-07</text>
					<!-- <text style="color: #4879d4" class="ml-1 font-sm">删除</text> -->
				</view>
				<view class="flex flex-1 justify-end align-center">
					<text
						:style="{ color: true ? '#ff9900' : '#939393' }"
						class="iconfont"
						style="font-size: 36rpx; margin-right: 5rpx"
					>
						&#xe641;
					</text>
					<text :style="{ color: true ? '#ff9900' : '#939393' }" style="font-size: 26rpx">点赞</text>
				
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},2000)
		},
		data(){
			return{
				showHeight: 200,
				toggle: true,
				content:`SDK可接受的浩丰科技都是框架繁华是框架的会计师对方会计师的恢复看见红灯刷卡缴费后`
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	
</style>