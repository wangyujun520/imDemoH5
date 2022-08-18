<template>
	<view class="content">
		<view style="overflow: auto;" class="pb-5">
			<!-- 轮播图开始 -->
			<u-swiper @click="previewImage" height="750" border-radius="0" :list="DataList.banner" mode="number"
				indicator-pos="bottomRight" :autoplay="false">

			</u-swiper>
			<!-- 轮播图结束 -->
			<view class="py-2 bg-white">
				<text class="ml-2" style="color: #E51C23;font-size: 30rpx;">￥<span
						style="font-size: 40rpx;font-weight: bold;">{{DataList.sale_price}}</span></text>
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<text>{{DataList.title}}</text>
				</view>
				<!-- <view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="" style="width: 400rpx;">
						<text class="text-title">物业类别：</text>
						<text class="text-content">普通住宅</text>
					</view>
					<view class="" style="width: 320rpx;">
						<text class="text-title">建筑类别：</text>
						<text class="text-content">塔楼 高层</text>
					</view>
				</view>
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="" style="width: 400rpx;">
						<text class="text-title">装修状况：</text>
						<text class="text-content">毛坯</text>
					</view>
					<view class="" style="width: 320rpx;">
						<text class="text-title">产权年限：</text>
						<text class="text-content">70年</text>
					</view>
				</view>
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<view style="width: 700rpx;">
						<text class="text-title">开发商：</text>
						<text class="text-content">金科物业服务集团有限公司四川分公司</text>
					</view>
				</view> -->
			</view>
			<!-- 地址信息 -->
			<view @click="skipAddress"
				class="px-2 flex align-center justify-between bg-white my-2" style="height: 80rpx;">
				<view class="flex align-center " style="width: 620rpx;">
					<text class="iconfont" style="font-size: 30rpx;color: #777;">&#xe65e;</text>
					<text class="text-content">{{DataList.address}}</text>
				</view>
				<view class="flex justify-end" style="width: 100rpx;">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
			</view>
			<!-- 楼盘详情 -->
			<view class="flex flex-column bg-white">
				<!-- 标题 -->
				<view class="py-2">
					<u-divider>楼盘详情</u-divider>
				</view>
				<view class="u-content p-3">
					<view class="flex py-2">
						<text style="color: #000000;font-weight: bold;font-size: 30rpx;">项目简介</text>
					</view>
					<view class="flex flex-column">
						<!-- <image @load="loadImage" :src="sditem.img" lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image> -->
						<text style="font-size: 28rpx;line-height: 46rpx;" class="my-3">{{DataList.des}}</text>
					</view>
					<view class="flex py-2">
						<text style="color: #000000;font-weight: bold;font-size: 30rpx;">小区规划</text>
					</view>
					<view class="flex flex-column">
						<view class="flex align-center" v-for="(tags,tindex) in DataList.tags" :key="tindex">
							<text style="color: #A29F9F;font-size: 28rpx;">{{tags.key}}：</text>
							<text style="color: #101010;font-size: 28rpx;">{{tags.value}}</text>
						</view>
					</view>
					<view class="flex py-2">
						<text style="color: #000000;font-weight: bold;font-size: 30rpx;">图片介绍</text>
					</view>
				</view>
				<img :src="img" class="mx-3" v-for="img in DataList.photos">
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showpopup: false,
				w: 100, //图片宽度
				h: 100, //图片高度
				id: 0,
				DataList: ""
			}
		},
		onLoad(option) {
			//获取分类信息
			this.$post(this.$url.Estate.GetEsate,{
				id:option.id
			},{}).then(res=>{
				this.DataList = res.data;
			})
			
			// var RequrestUrl = this.AJB.BizUrl + 'api/HouseInfo/GetHouseInfo';
			// var RequrestDatas = {
			// 	id: Option.id
			// };

			// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
			// 	.then(res => {
			// 		console.log(JSON.stringify(res))
			// 		if (res.code == 200) {
			// 			this.DataList = res.DataList;
			// 		}
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 	});
		},
		methods: {
			toShowSex(latitude, longitude) {
				
				// 方法要传入需要标注地点的纬度latitude，经度longitude，名字name
				var latitude = latitude;
				var longitude = longitude;
				var name = this.DataList.address;
				// var name = this.AddressInfo;
				
				// console.log(123)
				// console.log(latitude)
				// console.log(longitude)
				// console.log(name)
				
				let url = "";
				if (plus.os.name == "Android") {//判断是安卓端
					plus.nativeUI.actionSheet({//选择菜单
						title: "选择地图应用",
						cancel: "取消",
						buttons: [{title: "腾讯地图"},{title: "百度地图"}, {title: "高德地图"}]
					}, function(e) {
						switch (e.index) {
							//下面是拼接url,不同系统以及不同地图都有不同的拼接字段
							case 1:
								//注意referer=xxx的xxx替换成你在腾讯地图开发平台申请的key
								url = `qqmap://map/geocoder?coord=${latitude},${longitude}&referer=xxx`;
								break;
							case 2:
								url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`;
								break;
							case 3:
								url = `androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
								break;
							default:
								break;
						}
						if (url != "") {
							url = encodeURI(url);
							//plus.runtime.openURL(url,function(e){})调起手机APP应用
							plus.runtime.openURL(url, function(e) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})
				} else {
					// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置
					// 在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加
					//（如urlschemewhitelist:["iosamap","baidumap"]）  
					plus.nativeUI.actionSheet({
						title: "选择地图应用",
						cancel: "取消",
						buttons: [{title: "腾讯地图"},{title: "百度地图"}, {title: "高德地图"}]
					}, function(e) {
						switch (e.index) {
							case 1:
								url = `qqmap://map/geocoder?coord=${latitude},${longitude}&referer=xxx`;
								break;
							case 2:
								url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
								break;
							case 3:
								url = `iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
								break;
							default:
								break;
						}
						if (url != "") {
							url = encodeURI(url);
							plus.runtime.openURL(url, function(e) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})
				}
			},
			// 加载图片
			loadImage(e) {
				// 拿到图片的宽高
				let w = e.detail.width;
				let h = e.detail.height;
				// 最大宽度 px
				let maxW = uni.upx2px(680);
				// 最大高度 px
				let maxH = uni.upx2px(500);
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
			skipAddress() {
				// 跳转到地图信息
				let location = this.DataList.lng+','+this.DataList.lat
				uni.navigateTo({
					url:'/pages/chat/map/map?data='+this.DataList.address+'&location='+location
				})
			},
			// 预览图片
			previewImage(index) {
				var imgArr = [];
				this.list.forEach(item => {
					imgArr.push(item.image);
				})
				uni.previewImage({
					current: imgArr[index],
					urls: imgArr,
					indicator: 'number'
				});
			},
		},
		onShow() {

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}

	// 隐藏scroll-view的滚动条
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}

	.Selection {
		background-color: #ff9900;
		color: #ffffff;
	}

	.NoSelection {
		background-color: #f0f0f0;
		color: #444;
	}

	.text-title {
		font-size: 26rpx;
		color: #999;
	}

	.text-content {
		font-size: 26rpx;
		color: #999;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>