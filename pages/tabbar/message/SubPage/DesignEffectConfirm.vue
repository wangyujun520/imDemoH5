<template>
	<view class="content" style="padding-bottom: 100rpx;">
		<!-- <image :src="dataList.cover" style="width: 750rpx;height: 400rpx;"></image> -->
		<view style="background-size: 100% 100%;height: 400rpx;" :style="{ backgroundImage: 'url(' + dataList.cover + ')' }">
			<view class="flex flex-column align-center justify-center" style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);">
				<text style="color: #ffffff; font-size: 40rpx; font-weight: bold">{{ dataList.conternt }}</text>
				<text style="color: #ffffff; font-size: 28rpx; font-weight: bold" class="mt-3">{{ dataList.createTime }}</text>
			</view>
		</view>


		<view class="bg-white flex flex-column position-absolute p-3" style="top: 380rpx;width: 750rpx;border-radius: 10rpx 10rpx 0 0;">
			<view class="flex align-center mt-1">
				<text class="iconfont" style="font-size: 40rpx;">&#xe68b;</text>
				<text style="font-size: 34rpx;color: #000;font-weight: bold;">{{ dataList.title }}</text>
			</view>

			<!-- 个人信息 -->
			<view class="flex align-center justify-between mt-4 rounded px-3" style="background-color: #f7f7f7;height: 160rpx;">
				<view class="flex align-center" @click="skiphomepage">
					<view class="flex">
						<image class="rounded" :src="item.headPortrait" style="width: 80rpx;height: 80rpx;"></image>
					</view>
					<view class="flex flex-column">
						<view class="">
							<text class="ml-1" style="color: #6B8EB5;font-size: 28rpx;">{{ item.name }}</text>
							<!-- <text style="color: #FFFFFF;background-color: #8A2BE2;font-size: 22rpx;margin-left: 5rpx;">{{ item.TypeWork }}</text> -->
							<text class="font-sm text-white px-1 pl-1 ml-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;background-color: #8A2BE2;">{{ item.TypeWork }}</text>
						</view>
						<view class=""><text style="font-size: 26rpx;color: #888;" class="mt-1 ml-1">2020-11-11 12:12</text></view>
					</view>
				</view>
				<view class="flex align-center">
					<text v-if="!doYouCare" class="rounded px-1" @click="attention" style="color: #ff9900;border: 1px solid #ff9900;padding-top: 5rpx;padding-bottom: 5rpx;">
						+关注
					</text>
					<text @click="attention" v-else class="rounded px-1" style="color: #939393;border: 1px solid #939393;padding-top: 5rpx;padding-bottom: 5rpx;">已关注</text>
				</view>
			</view>
			<!-- 房屋资料 -->
			<view class="flex justify-between bg-white mt-3 rounded" style="height: 150rpx;border: 1px solid rgba(187,187,187,0.2);">
				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view><text style="color: #888;font-size: 26rpx;">户型</text></view>
					<view class="mt-1">
						<text style="font-size: 28rpx;" v-if="dataList.houseType == null">无户型</text>
						<text style="font-size: 28rpx;" v-else>{{ dataList.houseType }}</text>
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

				<view class="flex flex-column justify-center align-center" style="height: 100%;width: 100%;">
					<view><text style="color: #888;font-size: 26rpx;">方式</text></view>
					<view class="mt-1">
						<text style="font-size: 28rpx;">{{ (dataList.mode = 0 ? '半包' : '全包') }}</text>
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
						<!-- <text style="font-size: 28rpx;">{{ dataList.address }}</text> -->
						<text style="font-size: 28rpx;">{{AddressToCity}}</text>
					</view>
				</view>
			</view>

			<view @click="skipAddress" class="flex justify-between p-2 mt-4" style="background-color: #F6F6F7;">
				<view class="flex">
					<text class="iconfont" style="font-size: 30rpx; color: #777">&#xe65e;</text>
					<text class="text-content">四川省成都市武侯区G213辅路</text>
				</view>
				<view class="flex">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
			</view>

			<view v-for="(sitem, sindex) in dataList.space" :key="sindex">
				<view class="flex py-3">
					<text style="color: #000000;font-weight: bold;font-size: 30rpx;">{{ sitem.name }}</text>
				</view>
				<view class="flex flex-column" v-for="(sditem, sdindex) in sitem.spaceDetails" :key="sdindex">
					<!-- <image v-if="sditem.img != null" :src="sditem.img" style="width: 100%;"></image> -->
					<image v-if="sditem.img!=null" @load="loadImage" :src="sditem.img" lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'"
					 class="rounded"></image>
					<text>{{ sditem.content }}</text>
				</view>
			</view>
		</view>

		<view @click="skipCatalog" class="position-fixed bg-white" style="bottom: 150rpx;right: 50rpx;width: 120rpx;height: 120rpx;border-radius: 50%;border: 1px solid rgba(187,187,187,0.2);">
			<view class="flex align-center justify-center" style="color: #101010;width: 100%;height: 100%;"><text class="iconfont"
				 style="font-size: 50rpx;">&#xe66c;</text></view>
		</view>

		<view class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text @click="checkUserToRoom" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						联系设计师
					</text>
				</view>
				<view v-if="isShow" class="flex align-center justify-center" style="width: 350rpx;">
					<text @click="Confirm(1)" style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						拒绝
					</text>
					<text @click="Confirm(2)" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						接受
					</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: e => {
			if (e.float == 'right') {
				console.log('右上角按钮点击事件');
			}
		},
		data() {
			return {
				w: 100, //图片宽度
				h: 100, //图片高度
				isShow: false,
				item: {
					isOver: false,
					headPortrait: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
					name: '掌上明珠',
					TypeWork: '商家',
					releaseTime: '2020-12-26 03:27',
					coverMap: '/static/img/test111.png',
					title: '品牌周年庆“全场9折”',
					content: '冰箱、洗衣机、空调家电全场优惠，最高单件优惠可减1999元，抢完及止！！！'
				},
				doYouCare: false,
				dataList: {},
				id: 0
			};
		},
		computed: {
			AddressToCity() {
				if (this.dataList.address != null) {
					var index = this.dataList.address.lastIndexOf("\-");
					return this.dataList.address.substring(index + 1, this.dataList.address.length);
				} else {
					return '无定位';
				}
			}
		},
		watch: {},
		onLoad(Option) {
			console.log(Option.id);
			this.id = Option.id;
			//Option.id
			var RequrestUrl = this.AJB.BizUrl + 'api/Design/GetDesignEffectInfo';
			var RequrestDatas = {
				id: Option.id
			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then(res => {
					if (res.code == 200) {
						console.log(JSON.stringify(res.dataList));
						this.dataList = res.dataList;
						if (!this.dataList.isConfirm) {
							this.isShow = true;
						} else {
							this.isShow = false;
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		methods: {
			skipAddress(){
				// 跳转到地址详情
				uni.navigateTo({
					url:'/pages/tabBar/settle/map'
				})
			},
			skiphomepage() {
				// 跳转到个人信息界面
				uni.navigateTo({
					url: '/pages/tabBar/find/homepage'
				})
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
			Confirm(item) {
				var RequrestUrl = this.AJB.BizUrl + 'api/Design/ConfirmDesignEffect';
				var RequrestDatas = {
					id: this.id,
					type: item
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then(res => {
						if (res.code == 200) {
							if (item == 1) {
								this.$refs.uToast.show({
									title: '你已拒绝当前装修效果图!',
									type: 'success'
								});
							} else {
								this.$refs.uToast.show({
									title: '装修效果图确定成功!',
									type: 'success'
								});
							}

						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			checkUserToRoom() {
				// console.log(JSON.stringify(toUserInfo));
				var toUserInfo = {
					UserID: this.dataList.tel,
					NickName: this.dataList.name
				};
				console.log(JSON.stringify(this.dataList));
				this.$store.commit('createConversationActive', toUserInfo.UserID);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + toUserInfo.NickName
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
			attention() {
				// console.log(item)
				this.doYouCare = !this.doYouCare;
			},
			AddCommodity(item) {
				console.log(JSON.stringify(item));
			}
		}
	};
</script>

<style>
	page {
		background-color: #ffffff;
	}

	.text-title {
		font-size: 26rpx;
		color: #999;
	}

	.text-content {
		font-size: 26rpx;
		color: #999;
	}

	.u-content {
		padding: 24rpx;
		font-size: 32rpx;
		color: $u-content-color;
		line-height: 1.6;
	}
</style>
