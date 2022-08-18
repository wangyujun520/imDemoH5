<template>
	<view class="content position-relative">
		<view class="flex justify-between align-center justify-center px-4"
			style="height: 400rpx;background-size: 100% 100%;"
			:style="{ backgroundImage: 'url(' + dataList.cover + ')' }">
			<text style="color: #FFFFFF;font-size: 40rpx;font-weight: bold;">{{ dataList.title }}</text>
		</view>
		<view class="bg-white flex flex-column position-absolute p-3"
			style="top: 380rpx;width: 750rpx;border-radius: 10rpx 10rpx 0 0;">
			<!-- 个人信息 -->
			<view class="flex align-center justify-between mt-4 rounded px-3"
				style="background-color: #f7f7f7;height: 160rpx;">
				<view class="flex align-center" @click="skiphomepage(dataList)">
					<view class="flex">
						<image class="rounded" :src="dataList.headPhoto" style="width: 80rpx;height: 80rpx;"></image>
					</view>
					<view class="flex flex-column">
						<view class="">
							<text class="ml-1" style="color: #6B8EB5;font-size: 28rpx;">{{ dataList.name }}</text>
							<text class="font-sm text-white px-1 pl-1 ml-1"
								style="border-radius: 0rpx 8rpx 8rpx 0rpx;background-color: #8A2BE2;">{{dataList.professions}}</text>
							
						</view>
						<view class=""><text style="font-size: 26rpx;color: #888;" class="mt-1 ml-1">{{dataList.signature }}</text></view>
					</view>
				</view>
				<view class="flex align-center">
					<text v-if="!dataList.attention && !dataList.isSelf" @click="attention(dataList)"
						class="rounded px-1"
						style="color: #ff9900;border: 1px solid #ff9900;padding-top: 5rpx;padding-bottom: 5rpx;">
						+关注
					</text>
					<text v-if="dataList.attention && !dataList.isSelf" @click="attention(dataList)" class="rounded px-1"
						style="color: #939393;border: 1px solid #939393;padding-top: 5rpx;padding-bottom: 5rpx;">已关注</text>
				</view>
			</view>
			<!-- 房屋资料 -->
			<view class="flex justify-between bg-white mt-3 rounded"
				style="height: 150rpx;border: 1px solid rgba(187,187,187,0.2);">
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view><text style="color: #888;font-size: 26rpx;">户型</text></view>
					<view class="mt-1">
						<text style="font-size: 28rpx;">{{ dataList.houseType }}</text>
					</view>
				</view>
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view><text style="color: #888;font-size: 26rpx;">风格</text></view>
					<view class="mt-1">
						<text style="font-size: 28rpx;">{{ dataList.houseStyle }}</text>
					</view>
				</view>
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view><text style="color: #888;font-size: 26rpx;">面积</text></view>
					<view class="mt-1">
						<text style="font-size: 28rpx;">{{ dataList.houseArea }}㎡</text>
					</view>
				</view>

				<!-- <view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view><text style="color: #888;font-size: 26rpx;">方式</text></view>
					<view class="mt-1">
						<text style="font-size: 28rpx;">{{ (dataList.mode = 0 ? '半包' : '全包') }}</text>
					</view>
				</view> -->

				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view><text style="color: #888;font-size: 26rpx;">价格</text></view>
					<view class="mt-1">
						<text style="font-size: 28rpx;">{{ dataList.cost }}万</text>
					</view>
				</view>
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view><text style="color: #888;font-size: 26rpx;">方式</text></view>
					<view class="mt-1">
						<text style="font-size: 28rpx;">{{ (dataList.mode = 0 ? '半包' : '全包') }}</text>
					</view>
				</view>

				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view><text style="color: #888;font-size: 26rpx;">位置</text></view>
					<view class="mt-1">
						<!-- <text style="font-size: 28rpx;">{{dataList.address}}</text> -->
						<text style="font-size: 28rpx;">{{ AddressToCity }}</text>
						<text style="font-size: 28rpx;" v-if="dataList.address == ''">无定位</text>
						<!-- <text style="font-size: 28rpx;">成都市</text> -->
					</view>
				</view>
			</view>
			<!-- 说在前面 -->
			<view class="flex py-3"><text style="color: #000000;font-weight: bold;font-size: 30rpx;">说在前面</text></view>
			<view class="flex">
				<text>{{ dataList.conternt }}</text>
			</view>

			<!-- 户型图 -->
			<view v-for="(sitem, sindex) in dataList.space" :key="sindex">
				<view class="flex py-3">
					<text style="color: #000000;font-weight: bold;font-size: 30rpx;">{{ sitem.name }}</text>
				</view>
				<view class="flex flex-column" v-for="(sditem, sdindex) in sitem.spaceDetails" :key="sdindex">
					<!-- <image v-if="sditem.img!=null" :src="sditem.img" style="width: 100%;"></image> -->
					<!-- <image v-if="sditem.img!=null" :src="sditem.img" @load="loadImage"></image> -->

					<image v-if="sditem.img != null" @load="loadImage" :src="sditem.img" lazy-load="true"
						:style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image>

					<text style="font-size: 28rpx;line-height: 46rpx;" class="my-3">{{ sditem.content }}</text>
				</view>
			</view>

			<!-- 商品链接 -->
			<!-- <view class="flex py-3">
				<text style="color: #000000;font-weight: bold;font-size: 30rpx;">商品链接</text>
			</view>
			<view @click="AddCommodity(item)" v-for="(item,index) in DataList" :key="index" class="flex bg-white py-1" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex justify-center align-center" style="width: 200rpx;height: 200rpx;">
					<image class="rounded" :src="item.productPicture" style="width: 160rpx;height: 160rpx;"></image>
				</view>
				<view class="flex flex-column justify-between pr-2" style="height: 200rpx;width: 550rpx;">
					<view class="mt-2"><text class="LineBreak" style="font-size: 30rpx;">{{item.content}}</text></view>
					<view class="mb-1">
						<text v-if="item.price != null" style="color: #FF0000;font-weight: bold;">
							<span style="font-size: 26rpx;">￥</span>
							<span style="font-size: 35rpx;">{{item.price}}</span>
						</text>
					</view>
				</view>
			</view> -->

			<!-- 屏蔽 -->
			<!-- <view @click="skipThreeDimensional" class="position-fixed" style="bottom: 300rpx;right: 50rpx;background-color: #3291F8;width: 120rpx;height: 120rpx;border-radius: 50%;">
				<view class="flex flex-column align-center justify-center" style="color: #FFFFFF;width: 100%;height: 100%;">
					<text class="iconfont" style="font-size: 50rpx;">&#xe6a9;</text>
					<text style="font-size: 22rpx;">3D效果</text>
				</view>
			</view> -->

			<view @click="skipCatalog" class="position-fixed bg-white"
				style="bottom: 150rpx;right: 50rpx;width: 120rpx;height: 120rpx;border-radius: 50%;border: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center justify-center" style="color: #101010;width: 100%;height: 100%;">
					<text class="iconfont" style="font-size: 50rpx;">&#xe66c;</text>
				</view>
			</view>
		</view>

		<u-popup v-model="showpopup" mode="bottom" border-radius="20">

			<view class="" style="height: 50rpx;"></view>
			<u-row gutter="16" justify="center">
				<!-- <u-col span="3">
					<view class="flex align-center justify-center" style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center"
							style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #FF9900;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe6ab;</text>
						</view>
						<text class="font-sm text-muted mt-2">分享IM</text>
					</view>
				</u-col>
				<u-col span="3">
					<view class="flex align-center justify-center" style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center"
							style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #02B1BE;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe670;</text>
						</view>
						<text class="font-sm text-muted mt-2">发现</text>
					</view>
				</u-col> -->
				<u-col span="3">
					<view @click="weixin" class="flex align-center justify-center"
						style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center"
							style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #04BE02;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe6e5;</text>
						</view>
						<text class="font-sm text-muted mt-2">微信</text>
					</view>
				</u-col>
				<u-col span="3">
					<view @click="pengyouquan" class="flex align-center justify-center"
						style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center"
							style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #04BE02;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe6e6;</text>
						</view>
						<text class="font-sm text-muted mt-2">朋友圈</text>
					</view>
				</u-col>
			</u-row>

		</u-popup>

	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				this.showpopup = true;
			}
		},
		data() {
			return {
				id: 0,
				showpopup: false,
				w: 100, //图片宽度
				h: 100, //图片高度
				doYouCare: false,
				dataList: {
					id: 0,
					houseType: '0',
					houseStyle: '0',
					houseArea: 0,
					cost: 0,
					address: '',
					addressKey: '',
					mode: 0,
					state: 1,
					cover: '',
					title: '',
					conternt: '',
					threeurl: '',
					stylePicture: '',
					space: [{
						name: '',
						number: 0,
						spaceDetails: [{
							sort: '1',
							content: '',
							img: ''
						}]
					}]
				}
			};
		},
		computed: {
			AddressToCity() {
				if (this.dataList.address != null) {
					var index = this.dataList.address.lastIndexOf('\-');
					return this.dataList.address.substring(index + 1, this.dataList.address.length);
				} else {
					return '无定位';
				}
			}
		},
		onLoad(Option) {
			console.log(Option);
			//Option.id
			var RequrestUrl = this.AJB.BizUrl + 'api/Case/GetMyCaseInfo';
			var RequrestDatas = {
				id: Option.id
			};
			this.id = Option.id;
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then(res => {
					console.log(JSON.stringify(res))
					if (res.code == 200) {
						this.dataList = res.dataList;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		methods: {
			weixin() {
				let ShareUrl = "http://m.anjubang.cn/#/pages/CaseInfo/CaseInfo?tel=" + uni.getStorageSync("LoginPhone") +
					"&id=" + this.id + "";
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: ShareUrl,
					title: "案例详情",
					summary: this.dataList.title,
					imageUrl: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/icon/192.png",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			pengyouquan() {
				let ShareUrl = "http://m.anjubang.cn/#/pages/CaseInfo/CaseInfo?tel=" + uni.getStorageSync("LoginPhone") +
					"&id=" + this.id + "";
				uni.share({
					provider: 'weixin',
					scene: 'WXSenceTimeline',
					type: 0,
					href: ShareUrl,
					title: "案例详情",
					summary: this.dataList.title,
					imageUrl: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/icon/192.png",
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			skiphomepage(item) {
				// 跳转到个人信息界面
				uni.navigateTo({
					url: '/pages/tabBar/find/homepage?id=' + item.mobileUserId
				});
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
			// 跳转到3D效果
			skipThreeDimensional() {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/EffectPreview?url=' +
						'https://www.kujiale.com/xiaoguotu/pano/3FO3B14JOSXL?kpm=Nnw.a4590563ceec856e.2141e62.1555990136900'
				});
			},
			// 跳转到目录界面
			skipCatalog() {
				uni.removeStorageSync('SpaceDetaileCatalog');
				// 同步缓存
				uni.setStorage({
					key: 'SpaceDetaileCatalog',
					data: this.dataList.space,
					success: function() {
						console.log('success');
					}
				});
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/Catalog'
				});
			},
			attention(item) {
				this.follow = !this.follow;
				//if (!item.attention) {
				var RequrestUrl = this.AJB.BizUrl + 'api/Communication/Attention';
				var RequrestDatas = {
					mobileUserId: item.mobileUserId
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then(res => {
						console.log(JSON.stringify(res));
						if (res.code == 200) {
							//成功
							item.attention = !item.attention;
						}
					})
					.catch(err => {
						console.log(err);
					});
				//}
			},
			AddCommodity(item) {
				console.log(JSON.stringify(item));
			}
		}
	};
</script>

<style>
	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
	}
</style>
