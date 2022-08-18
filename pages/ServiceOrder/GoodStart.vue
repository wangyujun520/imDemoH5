<template>
	<view class="content">

		<view :style="{ height: swiperHeight + 'px' }" class="py-2" style="overflow: auto;">


			<view class="flex flex-column bg-white mb-2 p-2" v-for="(item, index) in DataList">
				<!-- 第一行 -->
				<view class="flex justify-between">
					<view class="flex">
						<text style="color: #888;font-size: 28rpx;">{{name}}</text>
					</view>
					<!-- <view class="flex">
						<text style="font-size: 32rpx;color: #000000;" class="iconfont">&#xe61e;</text>
					</view> -->
				</view>
				<!-- 第二行 -->
				<view class="flex my-2">
					<text style="color: #000000;font-size: 28rpx;">{{item.content}}</text>
				</view>

				<view v-if="item.photos!=null" class="Pic-Box flex flex-wrap mt-1">
					<view class="pl-1 pt-1" v-for="(imgitem, imgindex) in item.photos" :key="imgindex" style="width: 235rpx; height: 235rpx">
						<image @click="previewImage(imgitem, item.photos)" :src="imgitem" style="width: 100%; height: 100%"></image>
					</view>
				</view>
				<!-- 视频显示 -->
				<view v-if="item.video!=null" @click="openVideo(item.video)" class="position-relative mt-2">
					<image @load="loadImage" :src="item.video + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
					 lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image>
					<text class="iconfont text-white position-absolute" style="font-size: 80rpx; width: 80rpx; height: 80rpx" :style="posterIconStyle">&#xe99a;</text>
				</view>

				<text style="color: #939393; font-size: 28rpx" v-html="vFormateTime(item.createTime)"> </text>
			</view>
		</view>
		<view v-if="item.state==1 &&isSee=='false'" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
				</view>
				<view class="flex align-center justify-center" style="width: 350rpx;">
					<text @click="Confirm(1)" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid ;">发起验收</text>
				</view>
			</view>
		</view>
		<view v-if="item.state==2" class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
				</view>
				<view v-if='item.designId=="00000000-0000-0000-0000-000000000000"' class="flex align-center justify-center" style="width: 350rpx;">
					<text @click="Confirm(2)" style="background-color: #EA8531;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid ;">验收</text>
				</view>
				<view v-if='item.designId!="00000000-0000-0000-0000-000000000000"&&item.userId=="00000000-0000-0000-0000-000000000000"'
				 class="flex align-center justify-center" style="width: 350rpx;">
					<text @click="Confirm(3)" style="background-color: #EA8531;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid ;">验收</text>
				</view>
			</view>
		</view>
		<!-- 已验收 -->
		<view v-if="item.state==3" style="height: 300rpx;overflow: auto;" class="bg-white">

			<view class="flex justify-between p-2">
				<text style="color: #FF9900;font-size: 28rpx;">已验收</text>
				<text style="color: #000000;font-size: 30rpx;">——</text>
			</view>
				<view v-if='item.designId !="00000000-0000-0000-0000-000000000000"' class="flex align-center">
					<view class="flex">
						<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
					</view>
					<view @click="JumpHomePage(item.userId)" class="flex flex-column ml-2">
						<view class="flex">
							<text style="color: #000000;font-size: 28rpx;">{{item.userName}}</text>
							<text class="ml-1" style="background-color: #458C69;color: #FFFFFF;padding: 5rpx 20rpx;">设计师</text>
						</view>
						<view class="flex">
							验收时间:<text style="color: #888;font-size: 26rpx;" v-html="vFormateTime(item.updateUserTime)"></text>
						</view>
					</view>
				</view>
				
				<view v-if='item.userId!="00000000-0000-0000-0000-000000000000"' class="flex align-center">
					<view class="flex">
						<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
					</view>
					<view @click="JumpHomePage(item.designId)" class="flex flex-column ml-2">
						<view class="flex">
							<text style="color: #000000;font-size: 28rpx;">{{item.designName}}</text>
							<text class="ml-1" style="background-color: #458C69;color: #FFFFFF;padding: 5rpx 20rpx;">客户</text>
						</view>
						<view class="flex">

							验收时间:<text style="color: #888;font-size: 26rpx;" v-html="vFormateTime(item.updateDesignTime)"></text>

						</view>
					</view>
				</view>
				<view v-if='item.manageId!="00000000-0000-0000-0000-000000000000"' class="flex align-center">

				<view class="flex">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
					<view @click="JumpHomePage(item.manageId)" class="flex flex-column ml-2">
						<view class="flex">
							<text style="color: #000000;font-size: 28rpx;">{{item.manageName}}</text>
							<text class="ml-1" style="background-color: #458C69;color: #FFFFFF;padding: 5rpx 20rpx;">监理</text>
						</view>
						<view class="flex">
							验收时间:<text style="color: #888;font-size: 26rpx;" v-html="vFormateTime(item.updateManageTime)"></text>

						</view>
					</view>
				</view>
			
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-action-sheet :mask-close-able="false" :list="ActionSheetList" @click="SetUpClick" v-model="showActionSheet"></u-action-sheet>
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
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				console.log(this.isSee)
				if (this.isSee == "false") {
					console.log("fdsag")
					this.showActionSheet = true;
				}

			}
		},
		data() {
			return {

				isSee: false,
				nodeid: 0,
				taskid: 0,
				name: "",
				DataList: [],
				item: "",
				ActionSheetList: [{
						text: "发布图文",
					},
					{
						text: "发布视频",
					},
				],
				w: 100, //视频宽度
				h: 100, //视频高度
				showActionSheet: false,
				swiperHeight: 500,
				"photos": [
					
				]
			}
		},
		onLoad(Option) {
			this.isSee = Option.isSee;

			if (this.isSee == 'true') {
				var webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewButtonStyle(0, {
					text: ' '
				});
			}
			this.item = uni.getStorageSync('GoodStart');
			// 动态修改标题
			uni.setNavigationBarTitle({
				title: Option.name
			});
			console.log(this.item);
			this.nodeid = Option.id
			this.name = Option.name
			this.taskid = Option.taskid

		},
		onShow() {
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == 'iPhoneXSMax') {
					this.swiperHeight = res.windowHeight - uni.upx2px(360);
				} else {
					this.swiperHeight = res.windowHeight - uni.upx2px(380);
				}
			} catch (e) {
				console.log(e);
			}
			var RequrestUrl =
				this.AJB.BizUrl + "api/PlanNode/GetNodeDetailedList";
			var RequrestDatas = {
				TaskID: this.taskid,
				nodeid: this.nodeid,
				maxResultCount: 100,
				skipCount: 0,
			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then((res) => {
					console.log(JSON.stringify(res));
					if (res.code == 200) {
						console.log(JSON.stringify(res))
						this.DataList = res.dataList.items
						//	this.$set(this.DataList, this.current, res.dataList.items);
						// console.log("load from api,type:" + this.list[this.current].name);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		methods: {
			Confirm(item) {
				var RequrestUrl =
					this.AJB.BizUrl + "api/PlanNode/Confirm";
				var RequrestDatas = {
					TaskID: this.taskid,
					nodeid: this.nodeid,
					type: item,
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						console.log(JSON.stringify(res));
						if (res.code == 200) {
							this.$refs.uToast.show({
								title: '验收成功!',
								type: 'success'
							})

						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			JumpHomePage(item) {
				uni.navigateTo({
					url: "/pages/tabBar/find/homepage?id=" + item,
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
			vFormateTime(datetime) {
				var timestamps = (new Date(datetime)).getTime();
				return $T.getDateDiffv1(timestamps); //时差结果

			},
			SetUpClick(index) {
				// console.log(`点击了第${index + 1}项，内容为：${this.ActionSheetList[index].text}`)

				// 跳转到发布图文界面
				if (index == 0) {
					uni.navigateTo({
						url: '/pages/ServiceOrder/ReleaseImageText?id=' + this.nodeid + "&taskid=" + this.taskid,
					});
				}

				// 跳转到发布视频界面
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/ServiceOrder/ReleaseVideo?id=' + this.nodeid + "&taskid=" + this.taskid,
					});
				}
			},
		}
	}
</script>

<style>

</style>
