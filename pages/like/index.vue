<template>
	<view class="content">
		
		<!-- <view class="flex flex-column">
			<view class="flex" v-for="(item,index) in DataList">
				{{item.id}}
			</view>
		</view> -->
		
		<!-- 内容 -->
		<view v-if="DataList.length>0" v-for="(sitem, sindex) in DataList" :key="sindex" class="FindInfo bg-white px-2 py-2"
			style="border-bottom: 1px solid rgb(187, 187, 187, 0.5)">
			<view class="flex">
				<!-- <view class="flex align-center" @click="skipPersonalHomePage(sitem)"> -->
				<view class="flex align-center">
					<image :src="sitem.user.header" style="width: 90rpx; height: 90rpx;border-radius: 15rpx;"></image>
				</view>
				<view class="flex flex-column justify-between pl-2">
					<view class="UserInfo flex justify-between" style="border: 0px solid red;width: 590rpx;">
						<text style="color: #101010; font-size: 32rpx; font-weight: bold">{{ sitem.user.name }}</text>
						<u-icon v-if="sitem.is_self == 1" @tap="showMoreMenu(sitem)" name="more-dot-fill" color="#999" size="30"></u-icon>
					</view>
					<view class="flex flex-wrap">
						<view  class="flex align-center mr-1 mt-1" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
							<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">{{sitem.user.catalog_text}}</text>
						</view>
						
						<!-- <view class="flex align-center mr-1 mt-1" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
							<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">机构</text>
						</view>
						<view class="flex align-center mr-1 mt-1" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
							<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">开发商</text>
						</view> -->
						
						<!-- <view class="flex align-center mr-1" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
							<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">机构</text>
						</view>
						<view class="flex align-center mr-1" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
							<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">开发商</text>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 顶部结束 -->
			<view v-if="sitem.status==1" class="flex align-center justify-center mt-2" style="height: 50rpx;background-color: #FFE1D3;">
				<text style="color: #FF814A;font-size: 26rpx;">内容审核中</text>
			</view>
			<!-- 内容开始 -->
			<view class="Content-Text mt-1">
				<text>{{sitem.content}}</text>
			</view>
			<!-- 图片显示 -->
			<view class="Pic-Box flex flex-wrap mt-1">
				<view class="pl-1 pt-1" v-for="(imgitem, imgindex) in sitem.photos" :key="imgindex" style="width: 235rpx; height: 235rpx">
					<!-- <image @click="previewImage(imgitem, sitem.photos)" :src="imgitem" style="width: 100%; height: 100%"></image> -->
					<!-- 处理图片压缩，显示缩略图 -->
					<image @click="previewImage(imgitem, sitem.photos)" mode="aspectFill" :src="imgitem" style="width: 100%;height: 100%;border-radius: 10rpx;"></image>
					<!-- <image @click="previewImage(imgitem.thumbnail, sitem.files)" :src="imgitem.thumbnail" mode="aspectFill" style="width: 100%; height: 100%"></image> -->
				</view>
			</view>
			<!-- 视频显示 -->
			<!-- <view v-if="sitem.type == '3'" @click="openVideo(sitem.files[0].url)"
				class="position-relative mt-2">
				<image @load="loadImage"
					:src="sitem.files[0].url + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
					lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image>
				<text class="iconfont text-white position-absolute"
					style="font-size: 80rpx; width: 80rpx; height: 80rpx" :style="posterIconStyle">&#xe99a;</text>
			</view> -->
			<view v-if="sitem.type == '3'" @click="openVideo(sitem.photos[0])" class="position-relative mt-2">
				<!-- <image @load="loadImage" :src="sitem.files[0].url + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
					lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image> -->
				<image :src="sitem.photos[0] + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
					lazy-load="true" mode="aspectFill" style="width: 100%;height: 300rpx;" class="rounded"></image>
				<view class="position-absolute flex align-center justify-center" style="top: 0;right: 0;bottom: 0;left: 0;width: 100%;height: 100%;">
					<text class="iconfont text-white"
						style="font-size: 80rpx; width: 80rpx; height: 80rpx" >&#xe99a;</text>
				</view>
			</view>
			<!-- 定位信息开始 -->
			<!-- <view class="flex pt-2">
				<i class="iconfont pr-1" style="color: #18b566; font-weight: bold; font-size: 30rpx">&#xe65e;</i>
				<text style="font-size: 26rpx; color: #666666">{{ sitem.address | address }}</text>
			</view> -->
			<!-- 定位信息结束 -->
			<!-- 点赞评论开始 -->
			<view class="LikeBox flex px-1 pt-2">
				<view class="flex-1">
					<text style="color: #939393; font-size: 28rpx" v-html="sitem.create_time"></text>
					<!-- 是否是自己；0=是；1=否 -->
					<text @click="Remove(sitem.id)" style="color: #4879d4" class="ml-1 font-sm"
						v-if="sitem.is_self == 0">删除</text>
				</view>
				<view class="flex align-center">
					<!-- <view class="flex align-center mr-2" @tap="report(sitem)" v-if="sitem.is_self == 1">
						<text style="color: #939393;font-size: 26rpx;">举报</text>
						<text style="color: #939393;font-size: 40rpx;" class="iconfont">&#xe762;</text>
					</view> -->
					<view class="flex flex-1 justify-end align-center">
						<!-- 是否喜欢 0=已喜欢；1=未喜欢 -->
						<text :style="{ color: sitem.is_like==0 ? '#ff9900' : '#939393' }" class="iconfont" style="font-size: 36rpx; margin-right: 5rpx" @click="support(sitem,sindex)">
						<!-- <text :style="{ color: sitem.is_like==0 ? '#18b566' : '#939393' }" class="iconfont" style="font-size: 36rpx; margin-right: 5rpx" @click="sitem=0"> -->
							&#xe641;
						</text>
						<text :style="{ color: sitem.is_like==0 ? '#ff9900' : '#939393' }"
							style="font-size: 26rpx">{{ sitem.like_count }}</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default{
		onShow() {
			// 获取提现明细
			this.$post(this.$url.User.GetLikes, {
				page_no: 1, //页码
				page_size: 100 //每页数量
			}, {
				isLoading: true
			}).then(res => {
				this.DataList = res.data.list;
				console.log()
			});
		},
		data(){
			return{
				DataList:[]
			}
		},
		methods:{
			// skipPersonalHomePage(item){
			// 	// console.log(JSON.stringify(item))
			// 	uni.navigateTo({
			// 		url:'/pages/tabbar/find/homepage?id='+item.data_id
			// 	})
			// }
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>