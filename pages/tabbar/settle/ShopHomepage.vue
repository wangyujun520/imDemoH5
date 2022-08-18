<template>
	<view class="content p-2" style="overflow: hidden">
		<!-- 第一行 -->
		<view class="flex flex-column bg-white rounded p-3">
			<view class="flex justify-between align-center">
				<view class="flex align-center">
					<image
						src="https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E5%95%86%E5%AE%B6.png"
						style="width: 100rpx;height: 100rpx;"></image>
					<view class="flex flex-column ml-2">
						<text style="color: #000000; font-size: 28rpx">{{
              DataList.name
            }}</text>
						<text class="mt-1" style="color: #888; font-size: 26rpx">{{ DataList.goods_count }}件商品</text>
					</view>
				</view>
				<view @click="checkUserToRoom" class="flex" style="
            background-color: #ff9900;
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
          ">
					<view class="flex align-center justify-center" style="width: 100%; height: 100%">
						<text class="iconfont" style="color: #ffffff; font-size: 45rpx">&#xe6ab;</text>
					</view>
				</view>
			</view>
			<view v-if="DataList.address" class="flex align-center" style="width: 720rpx;color: #888;">
				<text class="iconfont" style="font-size: 30rpx;">&#xe65e;</text>
				<text style="font-size: 26rpx;">{{DataList.address}}</text>
			</view>
		</view>
		<!-- 第二行 -->
		<view class="flex align-center p-3 bg-white rounded mt-2">
			<text style="font-size: 28rpx;color: #000000;">主营商品：</text>
			<text style="font-size: 26rpx;color: #888;">{{DataList.major_goods}}</text>
		</view>
		<!-- 暂时屏蔽 -->
		<!-- <view @click="ApplySale" class="flex justify-between align-center py-3 pl-3 pr-2 bg-white mt-2 rounded">
			<text>申请加入销售商品</text>
			<u-icon name="arrow-right" style="font-size: 28rpx; color: #777"></u-icon>
		</view> -->
		<!-- 暂时屏蔽 -->
		<!-- <view class="flex flex-column p-3 bg-white mt-2 rounded">
			<text style="color: #000000; font-size: 28rpx">你已获得该店铺销售权限</text>
			<text style="color: #888;font-size: 26rpx;">加入时间：2021-01-16</text>
		</view> -->

		<!-- 瀑布流 -->
		<view class="wrap">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{ leftList }">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
						<u-lazy-load @click="skipCommodity(item)" threshold="-450" border-radius="10"
							:image="item.cover" :index="index"></u-lazy-load>
						<view @click="skipCommodity(item)" class="demo-title">{{
              item.title
            }}</view>
						<view class="flex justify-between align-center mt-1">
							<view class="flex align-center">
								<text style="color: #e51c23; font-size: 20rpx">￥<span
										style="font-size: 30rpx; font-weight: bold">{{
                    item.price
                  }}</span></text>
							</view>
							<view @click="Collection(item)" class="flex align-center">
								<u-icon v-if="!item.collection" name="heart" color="#939393" size="34"></u-icon>
								<u-icon v-else name="heart-fill" color="#FF9900" size="34"></u-icon>
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load @click="skipCommodity(item)" threshold="-450" border-radius="10"
							:image="item.cover" :index="index"></u-lazy-load>
						<view @click="skipCommodity(item)" class="demo-title">{{
              item.title
            }}</view>
						<view class="flex justify-between align-center mt-1">
							<view class="flex align-center">
								<text style="color: #e51c23; font-size: 20rpx">￥<span
										style="font-size: 30rpx; font-weight: bold">{{
                    item.price
                  }}</span></text>
							</view>
							<view @click="Collection(item)" class="flex align-center">
								<u-icon v-if="!item.collection" name="heart" color="#939393" size="34"></u-icon>
								<u-icon v-else name="heart-fill" color="#FF9900" size="34"></u-icon>
							</view>
						</view>
					</view>
				</template>
			</u-waterfall>
		</view>
		
		<!-- <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore> -->

		<!-- 模态框 -->
		<u-mask class="flex justify-center align-center" :show="show" :zoom="false">
			<view class="bg-white rounded" style="width: 570rpx; height: 900rpx">
				<view class="flex justify-center align-center" style="height: 100rpx">
					<text style="color: #101010; font-size: 30rpx; font-weight: bold">商品售卖申请协议</text>
				</view>
				<view class="bg-white px-2" style="height: 720rpx; font-size: 28rpx">
					<scroll-view scroll-y="true" style="height: 100%">
						<u-parse :content="content"></u-parse>
					</scroll-view>
				</view>
				<view class="flex" style="height: 80rpx; border-top: 1px solid rgba(187, 187, 187, 0.2)">
					<view @click="show = false" class="flex justify-center align-center"
						style="width: 50%; height: 100%">
						<text style="color: #666; font-size: 28rpx">不同意</text>
					</view>
					<view class="flex justify-center align-center" style="
              width: 50%;
              height: 100%;
              border-left: 1px solid rgba(187, 187, 187, 0.2);
            ">
						<text @click="AgreeAgreement" style="color: #ff9900; font-size: 28rpx">同意并继续</text>
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == "right") {
				// console.log("右上角点击事件");
				// 跳转到商品分类
				uni.navigateTo({
					url: "/pages/tabbar/settle/CommodityClassification",
				});
			}
		},
		data() {
			return {
				id: '',
				activity_id:'',
				content: "",
				// 瀑布流
				loadStatus: "loadmore",
				flowList: [],
				DataList: [], //Mock数据
				BannerList: [],
				pageIndex: 1,
				pageSize: 6,
				show: false,
				DataList: {},
				isSale: false,
			};
		},
		methods: {
			// 申请销售
			ApplySale() {
				if (this.DataList.hasSale) {
					return;
				}
				this.show = true;
			},
			// 同意商品协议
			AgreeAgreement() {
				var _self = this;
				var ProductList = _self.AJB.BizUrl + "api/Communication/ApplyDataList";
				var ProductListDatas = {
					DataListId: _self.id,
				};
				_self.AJB.UniAjax(ProductList, ProductListDatas)
					.then((res) => {
						console.log(JSON.stringify(res));
						if (res.code == 200) {
							// 跳转到提交成功界面
							uni.navigateTo({
								url: "/pages/tabBar/my/authentication/BusinessAudit",
							});
						}
					})
					.catch((err) => {
						console.log(err);
					});
				this.show = false; //关闭模态框
			},
			checkUserToRoom() {
				// uni.navigateTo({
				// 	url: "/pages/tabbar/find/homepage?id=" + this.DataList.mobileUserId,
				// });
				this.$store.commit('createConversationActive', this.DataList.mobile);
				uni.navigateTo({
					url: '/pages/chat/chat/chat?name=' + this.DataList.name
				});
				
			},
			// 收藏和取消收藏
			Collection(item) {
				if (!item.collection) {
					var RequrestUrl =
						this.AJB.BizUrl + "api/Communication/AttentionCommodity";
					var RequrestDatas = {
						commodityId: item.id,
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then((res) => {
							console.log(JSON.stringify(res));
							if (res.code == 200) {
								//成功
								item.collection = true;
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
			},
			// 跳转到详情界面
			skipPage(item) {
				console.log(JSON.stringify(item));
				// item.name
				uni.navigateTo({
					url: "/pages/tabBar/settle/ProductList?id=" + item.id,
				});
			},
			// 跳转到更多页面
			skipMorePage() {
				uni.navigateTo({
					url: "/pages/tabBar/settle/MoreCategories",
				});
			},
			// 商品点击事件
			skipCommodity(item) {
				// console.log(JSON.stringify(item))
				// 跳转到商品详情界面
				uni.navigateTo({
					url: "/pages/tabbar/settle/ProductDetails?id=" + item.id+"&activity_id="+this.activity_id
				});
			},
			clickimg(index) {
				// this.$refs.uToast.show({
				//   // title: `点击了第${index + 1}张图片`,
				//   title: `当前商品id是：${this.BannerList[index].id}`,
				//   type: "success",
				// });

				// 跳转到商品详情界面
				uni.navigateTo({
					url: "/pages/tabBar/settle/ProductDetails",
				});
			},
			// 瀑布
			addRandomData() {
				var RequrestUrl = this.AJB.BizUrl + "api/Communication/GetPageCommodity";
				var RequrestDatas = {
					MaxResultCount: this.pageSize,
					SkipCount: (this.pageIndex - 1) * this.pageSize,
					Type: null,
					DataListId: this.id,
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						console.log(res);

						res.dataList.items.forEach((element) => {
							this.flowList.push(element);
						});
						this.loadStatus = "loadmore";
						this.pageIndex++;
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
		onShow() {
			// var ProductList = this.AJB.BizUrl + 'api/Explain/GetExplain';
			// var ProductListDatas = {
			// 	"Type": "AJB002",
			// };
			// this.AJB.UniAjax(ProductList, ProductListDatas).then(res => {
			// 		console.log(JSON.stringify(res));
			// 		if (res.code == 200) {
			// 			this.content = res.dataList.content;
			// 		}
			// 	})
			// 	.catch(err => {
			// 		console.log(err);
			// 	});
			// let res = uni.getStorageSync("professionInfo");
			// res.forEach((item) => {
			// 	console.log(item);
			// 	if (item == "销售人员") {
			// 		this.isSale = true;
			// 	}
			// });

			// var RequrestUrl = this.AJB.BizUrl + "api/Communication/GetDataListDetail";
			// var RequrestDatas = {
			// 	DataListId: this.id,
			// };
			// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
			// 	.then((res) => {
			// 		console.log(JSON.stringify(res));
			// 		if (res.code == 200) {
			// 			this.DataList = res.dataList;
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});

			// //banner
			// //获取Banner信息
			// var RequrestUrl = this.AJB.BizUrl + "api/Communication/GetBanner";
			// var RequrestDatas = {};
			// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
			// 	.then((res) => {
			// 		this.BannerList = res.dataList;
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});

			// //获取分类信息
			// var RequrestUrl = this.AJB.BizUrl + "api/Communication/GetCategoriesDto";
			// var RequrestDatas = {};
			// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
			// 	.then((res) => {
			// 		this.DataList = res.dataList;
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});

			// this.addRandomData();
		},
		onLoad(options) {
			this.id = options.id;
			console.log(this.id);
			
			if((options.activity_id??'')!=''){
				this.activity_id = options.activity_id
			}

			// 获取商城主页
			this.$post(this.$url.Mall.GetMallHome, {
				id: this.id
			}, {}).then(res => {
				this.DataList = res.data;
				this.flowList = res.data.goods_list;
			})
		},
		onReachBottom() {
			this.loadStatus = "loading";
			this.addRandomData();
		},
	};
</script>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #ffffff;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}

	// 菜单
	.menus {
		display: flex;
		background-color: #ffffff;
	}

	.menu {
		position: relative;
		width: calc(750rpx / 4);
		height: 150rpx;
		line-height: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
	}

	// 菜单
	.iconfont {
		font-size: 60rpx;
	}

	.item {
		margin: 30rpx 0;
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	.badge-icon {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
	}

	.swiper {
		height: 480rpx;
	}

	.indicator-dots {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.indicator-dots-item {
		background-color: $u-tips-color;
		height: 6px;
		width: 6px;
		border-radius: 10px;
		margin: 0 3px;
	}

	.indicator-dots-active {
		background-color: $u-type-primary;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>