<template>
	<view class="content">
		<!-- 第一行 -->
		<view class="position-relative" style="height: 650rpx;">
			<image :src="DataList.cover" style="height: 400rpx;width: 750rpx;"></image>
			<view class="flex flex-column bg-white position-absolute"
				style="top: 380rpx;width: 750rpx;border-radius: 20rpx 20rpx 0 0;">
				<text
					style="margin-left: 200rpx;font-size: 32rpx;color: #000000;font-weight: bold;margin-top: 10rpx;">{{DataList.nick}}</text>
				<view class="flex align-center pl-5 mt-2">
					<text class="iconfont" style="font-size: 28rpx;">&#xe6a7;</text>
					<text class="ml-1">{{DataList.estate_title}}</text>
				</view>
				<view class="flex flex-wrap px-5 py-2 ">
					<text style="color: #939393;font-size: 28rpx;width: 217rpx;border: 0px solid red;" v-for="(item,index) in DataList.tags">{{item.lable}}：{{item.value}}</text>
				</view>
			</view>
			<image :src="DataList.header" class="position-absolute rounded" style="width: 120rpx;height: 120rpx;left: 50rpx;top: 320rpx;border: 1px solid #fff;"></image>
		</view>

		<view class="flex bg-white flex-column mb-2" v-for="(sitem,sindex) in DataList.nodes">
			<view class="p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="color: #000000;font-size: 28rpx;font-weight: bold;">{{sitem.title}}</text>
			</view>
			<view>
				<view class="p-3">
					<text style="color: #939393;font-size: 26rpx;">前期准备</text>
				</view>
				<view class="flex px-2">
					<text style="color: #000000;font-size: 26rpx;">{{sitem.pre_content}}</text>
				</view>
				<view class="Pic-Box flex flex-wrap mt-1">
					<view class="pl-1 pt-1" v-for="(imgitem, imgindex) in sitem.pre_banners" :key="imgindex"
						style="width: 235rpx; height: 235rpx">
						<image @click="previewImage(imgitem, sitem.pre_banners)" :src="imgitem"
							style="width: 100%; height: 100%"></image>
					</view>
				</view>
				<view class="p-3 border-bottom">
					<text style="color: #939393; font-size: 28rpx">{{sitem.pre_date}}</text>
				</view>
				<view class="p-3">
					<text style="color: #939393;font-size: 26rpx;">现场交底</text>
				</view>
				<view class="flex px-2">
					<text style="color: #000000;font-size: 26rpx;">{{sitem.scene_content}}</text>
				</view>
				<view class="p-3 border-bottom">
					<text style="color: #939393; font-size: 28rpx">{{sitem.scene_date}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $T from '@/common/free-lib/time.js';
	export default {
		computed: {
			// 短视频封面图标
			posterIconStyle() {
				let w = this.w / 2 - uni.upx2px(80) / 2;
				let h = this.h / 2 - uni.upx2px(80) / 2;
				return `left:${w}px;top:${h}px;`;
			},
		},
		data() {
			return {
				"id": 0,
				DataList: [],
				w: 100, //视频宽度
				h: 100, //视频高度
				showActionSheet: false,
				swiperHeight: 500,
			}
		},
		onLoad(options) {
			this.id = options.id;
			// 获取装修记录列表
			this.$post(this.$url.Design.GetDetail,{
				id:options.id
			},{}).then(res=>{
				if(res.code == 200 && res.status == 0){
					this.DataList = res.data;
				}
			})
			
			
			// var RequrestUrl = this.AJB.BizUrl + "api/PlanNode/GetPlanNodeDetailed";
			// var RequrestDatas = {
			// 	TaskId: this.id
			// };
			// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
			// 	.then((res) => {
			// 		this.DataList = res.dataList;
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
		},
		methods: {
			// 加载图片
			loadImage(e) {
				// 拿到图片的宽高
				let w = e.detail.width;
				let h = e.detail.height;
				// 最大宽度 px
				let maxW = uni.upx2px(500);
				// 最大高度 px
				let maxH = uni.upx2px(350);
				if (h <= maxH) {
					// 用原来的宽高
					this.w = w <= maxW ? w : maxW;
					this.h = h;
					return;
				}
				this.h = maxH;
				let w2 = maxH * (w / h);
				this.w = w2 <= maxW ? w2 : maxW;
			},
			// 打开视频
			openVideo(url) {
				// 跳转页面
				uni.navigateTo({
					url: "/pages/chat/video/video?url=" + url,
				});
			},
			
			// 预览图片
			previewImage(url, list) {
				console.log(url);
				console.log(list);
			
				uni.previewImage({
					current: url,
					// urls: this.imageList,
					urls: list,
					indicator: "number",
				});
			},
			vFormateTime(datetime) {
				var timestamps = (new Date(datetime)).getTime();
				return $T.getDateDiffv1(timestamps); //时差结果

			},
		}
	}
</script>

<style>
</style>
