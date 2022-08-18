<template>
	<view class="content">
		<!-- <view :style="'height:' + MenuHeight + 'px'" style="overflow: auto" class="pb-5"> -->
		<view style="overflow: auto">
			<u-swiper @click="previewImage" height="750" border-radius="0" :list="DataList.banners" mode="number"
				indicator-pos="bottomRight" :autoplay="false">
			</u-swiper>
			<!-- 商品介绍 -->
			<view class="flex flex-column bg-white p-2">
				<text style="font-size: 28rpx">{{ DataList.title }}</text>
				<view class="flex align-center">
					<text style="color: #e51c23; font-size: 30rpx">￥<span style="font-size: 40rpx; font-weight: bold">
							{{DataList.price}}</span></text>
				</view>
				<view class="" style="color: #888;font-size: 26rpx;">
					已售{{DataList.sold_count}}
				</view>
			</view>
			<!-- <view class="flex flex-column bg-white p-2" v-if="isShow">
				<text style="font-size: 28rpx">佣金</text>
				<view class="flex align-center">
					<text style="color: #e51c23; font-size: 30rpx"><span style="font-size: 40rpx; font-weight: bold">{{ comm.commissionScale }}%</span></text>
				</view>
			</view> -->
			<!-- 已选商品 -->
			<view @click="ChooseCommodity" class="flex bg-white align-center justify-between p-2 my-2">
				<view class="flex">
					<text>型号</text>
				</view>
				<view class="flex">
					<text>{{ DataList.specs }}</text>
					<u-icon name="arrow-right" style="font-size: 28rpx; color: #777"></u-icon>
				</view>
			</view>
			<view class="flex flex-column bg-white">
				<!-- 标题 -->
				<view class="py-2">
					<u-divider>商品详情</u-divider>
				</view>
				<!-- 商品详情 -->
				<image v-for="showimg in DataList.img_detail" @load="loadImage" :style="'height: ' + h + 'px;'" style="width: 750rpx;" :src="showimg" lazy-load="true"></image>
				<view class="py-2">
					<u-divider>销售说明</u-divider>
				</view>
				<view class="bg-white flex flex-column px-3 pb-3" style="color: #101010;font-size: 28rpx;">
					<text>1.本站所有商品均不支持在线下单，如果您有喜欢的商品您可以收藏，或分享给您的设计师。</text>
					<text>2.如有您想买卖该商品，请自行联系商家。</text>
				</view>
			</view>
		</view>

		<!-- <view class="flex align-center px-3 justify-between bg-white" style="height: 100rpx">
			<view class="flex align-center">
				<view @click="skipshop" class="flex flex-column align-center justify-center">
					<text class="iconfont" style="font-size: 40rpx; color: #888">&#xe70a;</text>
					<text style="color: #888; font-size: 28rpx">店铺</text>
				</view>
				<view @click="Follow" class="flex flex-column align-center justify-center ml-4">
					<u-icon v-if="!DataList.collection" name="heart" color="#939393" size="34"></u-icon>
					<u-icon v-else name="heart-fill" color="#FF9900" size="34"></u-icon>
					<text style="color: #888; font-size: 28rpx; margin-top: 2rpx"> 关注</text>
				</view>
			</view>

			<view class="flex">
				<view @click="GoShop" class="flex justify-center align-center" :style="{
            'border-radius': isSale
              ? '40rpx 0 0 40rpx'
              : '40rpx 40rpx 40rpx 40rpx',
          }" style="background-color: #02b1be; width: 200rpx; height: 80rpx">
					<text style="color: #ffffff; font-size: 28rpx">咨询商家</text>
				</view>

				<view v-if="isDesignerSales">
					<view v-if="isSale" @click="ApplySale" class="flex justify-center align-center" style="
					  background-color: #ff9900;
					  width: 200rpx;
					  height: 80rpx;
					  border-radius: 0 40rpx 40rpx 0;
					">
						<text style="color: #ffffff; font-size: 28rpx" v-html="DataList.hasSale ? '加入清单' : '申请销售'"></text>
					</view>
				</view>
				<view v-else>
					<view @click="ApplyDesignerSale" class="flex justify-center align-center" style="
					  background-color: #ff9900;
					  width: 200rpx;
					  height: 80rpx;
					  border-radius: 0 40rpx 40rpx 0;
					">
						<text style="color: #ffffff; font-size: 28rpx" v-html="'加入清单'"></text>
					</view>
				</view>
			</view>
		</view> -->
		
		
		<!-- 弹窗 -->
		<!-- <u-popup v-model="popupShow" mode="bottom" border-radius="14">
			<view class="flex" style="height: 300rpx;">
				<view class="flex justify-center align-center" style="width: 300rpx;height: 100%;">
					<image src="http://img14.360buyimg.com/n4/jfs/t1/138694/17/10615/68848/5f861345E105290e8/27a4a550d6b41eee.jpg" style="width: 220rpx;height: 220rpx;"></image>
				</view>
				<view class="flex flex-column justify-end" style="width: 450rpx;padding-bottom: 50rpx;">
					<view class="flex">
						<text style="color: #E51C23;font-size: 30rpx;">￥<span style="font-size: 46rpx;font-weight: bold;">9299</span></text>
					</view>
					<view class="flex mt-2">
						<text style="color: #888;font-size: 26rpx;">已选</text>
						<text style="font-size: 26rpx;color: #000000;margin-left: 5rpx;">深海蓝，128GB</text>
					</view>
				</view>
			</view>
			<view class="flex flex-column">
				<text style="font-size: 30rpx;font-weight: bold;color: #000000;" class="ml-3">颜色</text>
				<view class="flex flex-wrap p-2" style="width: 750rpx;">
					<text @click="SelectWork(index)" :class="[item.isLike ? 'Selection' : 'NoSelection']" v-for="(item,index) in ColorList" :key="index" class="mb-1 ml-1" style="font-size: 26rpx;padding: 10rpx 30rpx;border-radius: 30rpx;">{{item.name}}</text>
				</view>
			</view>
			<view class="flex flex-column">
				<text style="font-size: 30rpx;font-weight: bold;color: #000000;" class="ml-3">版本</text>
				<view class="flex flex-wrap p-2" style="width: 750rpx;">
					<text @click="SelectEdition(index)" :class="[item.isLike ? 'Selection' : 'NoSelection']" v-for="(item,index) in EditionList" :key="index" class="mb-1 ml-1" style="font-size: 26rpx;padding: 10rpx 30rpx;border-radius: 30rpx;">{{item.name}}</text>
				</view>
			</view>
			<view class="flex flex-column">
				<text style="font-size: 30rpx;font-weight: bold;color: #000000;" class="ml-3">数量</text>
				<view class="flex p-2" style="width: 750rpx;">
					<u-number-box v-model="value" @change="valChange"></u-number-box>
				</view>
			</view>
			<view class="flex align-center px-3 justify-between bg-white" style="height: 120rpx;border-top:1px solid rgba(187,187,187,0.2) ;">
				<view class="flex align-center">
					<view class="flex flex-column align-center justify-center">
						<text class="iconfont" style="font-size: 40rpx;color: #888;">&#xe70a;</text>
						<text style="color: #888;font-size: 28rpx;">店铺</text>
					</view>
					<view @click="Follow" class="flex flex-column align-center justify-center ml-4">
						<u-icon v-if="follow" name="heart" color="#939393" size="40" style="margin-top: 5rpx;"></u-icon>
						<u-icon v-else name="heart-fill" color="#FF9900" size="40" style="margin-top: 5rpx;"></u-icon>
						<text style="color: #888;font-size: 28rpx;margin-top: 2rpx;">关注</text>
					</view>
				</view>
				<view class="flex">
					<view class="flex justify-center align-center" style="background-color: #02B1BE;width: 200rpx;height: 80rpx;border-radius: 40rpx 0 0 40rpx;">
						<text style="color: #FFFFFF;font-size: 28rpx;">咨询商家</text>
					</view>
					<view @click="ApplySale" class="flex justify-center align-center" style="background-color: #FF9900;width: 200rpx;height: 80rpx;border-radius: 0 40rpx 40rpx 0;">
						<text style="color: #FFFFFF;font-size: 28rpx;">申请销售</text>
					</view>
				</view>
			</view>
		</u-popup> -->
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
						<text @click="AgreeAgreement(DataList.storeId)"
							style="color: #ff9900; font-size: 28rpx">同意并继续</text>
					</view>
				</view>
			</view>
		</u-mask>

		<u-popup v-model="showpopup" mode="bottom" border-radius="20">

			<view class="" style="height: 50rpx;"></view>
			<u-row gutter="16" justify="center">
				<!-- <u-col span="3">
					<view class="flex align-center justify-center" style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center" style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #FF9900;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe6ab;</text>
						</view>
						<text class="font-sm text-muted mt-2">分享IM</text>
					</view>
				</u-col>
				<u-col span="3">
					<view class="flex align-center justify-center" style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center" style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #02B1BE;">
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

		<u-toast ref="uToast"></u-toast>
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
				w: 100, //图片宽度
				h: 100, //图片高度
				id: '',
				showpopup: false,
				designer: {},
				isDesignerSales: true,
				ColorList: [{
						name: "海蓝色",
						isLike: false,
					},
					{
						name: "金色",
						isLike: false,
					},
					{
						name: "石墨色",
						isLike: false,
					},
					{
						name: "银色",
						isLike: false,
					},
				],
				EditionList: [{
						name: "128GB",
						isLike: false,
					},
					{
						name: "256GB",
						isLike: false,
					},
					{
						name: "512GB",
						isLike: false,
					},
				],
				value: 0,
				follow: false, //是否关注
				show: false,
				// popupShow:true,//规格弹窗
				MenuHeight: 0,
				content: '',
				DataList: {},
				isSale: false,
				isShow: false,
			};
		},
		methods: {
			// 加载图片
			loadImage(e) {
				// 拿到图片的宽高
				let w = e.detail.width;
				let h = e.detail.height;
				// 最大宽度 px
				let maxW = uni.upx2px(750);
				// 最大高度 px
				let maxH = uni.upx2px(1000);
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
			weixin() {
				let ShareUrl = "http://m.anjubang.cn/#/pages/goods/goods?tel=" + uni.getStorageSync("LoginPhone") +
					"&id=" + this.id + "";
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: ShareUrl,
					title: "安居邦",
					summary: "商品详情",
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
				let ShareUrl = "http://m.anjubang.cn/#/pages/goods/goods?tel=" + uni.getStorageSync("LoginPhone") +
					"&id=" + this.id + "";
				uni.share({
					provider: 'weixin',
					scene: 'WXSenceTimeline',
					type: 0,
					href: ShareUrl,
					title: "安居邦",
					summary: "商品详情",
					imageUrl: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/icon/192.png",
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			skipshop() {
				// 跳转到店铺主页
				uni.navigateTo({
					url: "/pages/tabBar/settle/ShopHomepage?id=" + this.DataList.storeId,
				});
			},
			valChange(e) {
				console.log("当前值为: " + e.value);
			},
			SelectWork(index) {
				this.ColorList[index].isLike = !this.ColorList[index].isLike;
			},
			SelectEdition(index) {
				this.EditionList[index].isLike = !this.EditionList[index].isLike;
			},
			// 关注和取消关注
			Follow() {
				this.follow = !this.follow;

				var RequrestUrl = this.AJB.BizUrl + 'api/Communication/AttentionCommodity';
				var RequrestDatas = {
					commodityId: this.DataList.id
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then(res => {
						console.log(JSON.stringify(res));
						if (res.code == 200) {
							//成功
							this.DataList.collection = this.follow;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 申请销售
			ApplySale() {
				if (this.DataList.hasSale) {
					// 跳转到加入清单界面
					uni.navigateTo({
						url: "/pages/tabBar/my/OrderWork/SalesOrder?id=" + this.id,
					});
					return;
				}
				this.show = true;
			},
			GoShop() {
				uni.navigateTo({
					url: "/pages/tabBar/find/homepage?id=" + this.DataList.mobileUserId,
				});
			},
			ApplyDesignerSale() {
				var _self = this;

				var CaiLiaoUrl = _self.AJB.BizUrl + "api/CaiLiao/AddCaiLiao";
				var CaiLiaoDatas = {
					TaskID: this.designer.taskId,
					StoreId: this.DataList.storeId,
					CommodityId: this.DataList.id,
					Name: this.DataList.name,
					CommissionScale: this.DataList.commissionScale,
					Number: 1

				};
				_self.AJB.UniAjax(CaiLiaoUrl, CaiLiaoDatas)
					.then((res) => {
						if (res.code == 200) {

							this.$refs.uToast.show({
								title: '材料清单确认完成!',
								type: 'success'
							})
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 同意商品协议
			AgreeAgreement(StoreId) {
				console.log(StoreId);
				var _self = this;
				var ProductList = _self.AJB.BizUrl + "api/Communication/ApplyStore";
				var ProductListDatas = {
					StoreId: StoreId,
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
			// 选择商品
			ChooseCommodity() {
				console.log("选择商品");
				// this.popupShow = true;
			},
			// 预览图片
			previewImage(index) {
				var imgArr = [];
				this.DataList.imgUrl.forEach((item) => {
					imgArr.push(item);
				});
				uni.previewImage({
					current: imgArr[index],
					urls: imgArr,
					indicator: "number",
				});
			},
		},
		onLoad(option) {
			this.id = option.id;
			console.log(this.id);
		},
		onShow() {
			// 获取商品明细
			this.$post(this.$url.Mall.GetGoodsDetail, {
				id: this.id
			}, {}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.DataList = res.data;
				}
			})
			
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == "iPhoneXSMax") {
					this.MenuHeight = res.windowHeight - uni.upx2px(100) - uni.upx2px(62);
				} else {
					this.MenuHeight = res.windowHeight - uni.upx2px(100);
				}
			} catch (e) {
				console.log(e);
			}
		},
	};
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}

	// 隐藏scroll-view的滚动条
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none;
	}

	.Selection {
		background-color: #ff9900;
		color: #ffffff;
	}

	.NoSelection {
		background-color: #f0f0f0;
		color: #444;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>