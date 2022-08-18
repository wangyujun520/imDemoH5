<template>
	<view class="content">
		<view class="flex justify-between bg-white" style="height: 80rpx;">
			<view @click="subsectionchange(0)" :class="current == 0 ? 'selectColor' : 'noselectColor'" class="flex align-center justify-center"
			 style="width: 100%;height: 100%;">
				<text style="font-size: 26rpx;font-weight: bold;">店铺员工</text>
			</view>
			<view @click="subsectionchange(1)" :class="current == 1 ? 'selectColor' : 'noselectColor'" class="flex align-center justify-center"
			 style="width: 100%;height: 100%;border-left: 1px solid rgb(187,187,187,0.1);">
				<text style="font-size: 26rpx;font-weight: bold;">授权员工</text>
			</view>
		</view>
		<!-- 店铺员工 -->
		<view v-if="current == 0" :style="{ height: swiperHeight + 'px' }" style="overflow: auto;margin-top: 80rpx;">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in DataList" :key="index">
				<view class="flex p-2 u-border-bottom" @click="click(item,0)">
					<image mode="aspectFill" :src="item.image" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<!-- <view class="title-wrap"> -->
					<view class="flex flex-column">
						<!-- <text class="title u-line-2">{{ item.title }}</text> -->
						<view class="UserInfo pt-1">
							<text class="mr-1" style="color: #101010;font-size: 32rpx;font-weight: bold;">{{item.name}}</text>
							<text class="font-sm text-white bg-danger px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">{{item.type}}</text>
							<!-- <text v-if="item.RankClass === 2" class="font-sm text-white bg-info px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">销售人员</text>
							<text v-if="item.RankClass === 3" class="font-sm text-white bg-success px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">管家</text>
							<text v-if="item.RankClass === 4" class="font-sm text-white bg-warning px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">商家</text> -->
						</view>
						<view class="Describe">
							<text style="font-size: 26rpx;color: #939393;">{{item.content}}</text>
						</view>
						<view class="Scoring">
							<u-rate :disabled="true" :current="item.score" :size="28" inactive-color="#B2B2B2" active-color="#FF9900"
							 active-icon="star-fill" inactive-icon="star"></u-rate>
							<text style="color: #ff1b1b;">{{item.score}}分</text>
						</view>
					</view>
				</view>
			</u-swipe-action>
		</view>
		<!-- 授权员工 -->
		<view v-if="current == 1" :style="{ height: swiperHeight + 'px' }" style="overflow: auto;margin-top: 80rpx;">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in DataList2" :key="index">
				<view class="flex p-2 u-border-bottom" @click="click(item,1)">
					<image mode="aspectFill" :src="item.image" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<!-- <view class="title-wrap"> -->
					<view class="flex flex-column">
						<!-- <text class="title u-line-2">{{ item.title }}</text> -->
						<view class="UserInfo pt-1">
							<text class="mr-1" style="color: #101010;font-size: 32rpx;font-weight: bold;">{{item.name}}</text>
							<text class="font-sm text-white bg-danger px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">{{item.type}}</text>
							<!-- <text v-if="item.RankClass === 2" class="font-sm text-white bg-info px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">销售人员</text>
							<text v-if="item.RankClass === 3" class="font-sm text-white bg-success px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">管家</text>
							<text v-if="item.RankClass === 4" class="font-sm text-white bg-warning px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">商家</text> -->
						</view>
						<view class="Describe">
							<text style="font-size: 26rpx;color: #939393;">{{item.content}}</text>
						</view>
						<view class="Scoring">
							<u-rate :disabled="true" :current="item.score" :size="28" inactive-color="#B2B2B2" active-color="#FF9900"
							 active-icon="star-fill" inactive-icon="star"></u-rate>
							<text style="color: #ff1b1b;">{{item.score}}分</text>
						</view>
					</view>
				</view>
			</u-swipe-action>
		</view>

		<u-modal v-model="ModalShow" :show-cancel-button="true" @confirm="ModalConfirm" @cancel="ModalCancel">
			<view class="flex flex-column align-center py-3" style="width: 600rpx;">
				<text>您是否确定将当前订单分给</text>
				<text>【{{userinfo.name}}】进行销售</text>
			</view>
		</u-modal>
		<!-- <view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 100vh;">
			<u-empty text="暂未添加商铺员工" mode="list"></u-empty>
		</view> -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: e => {
			if (e.float == 'right') {
				// console.log('右上角按钮点击事件');
				// 跳转到添加商品员工
				uni.navigateTo({
					url: '/pages/tabBar/my/datamodification/AddShopStaff'
				})
			}
		},
		data() {
			return {
				id: 0,
				isauth:false,
				userinfo: {},
				ModalShow: false,
				current: 0,
				swiperHeight: 0,
				DataList: '', //Mock数据
				DataList2: '', //Mock数据
			};
		},
		onLoad(optino) {
			this.id = optino.id
		},
		onShow() {
			// 获取商铺员工首页信息
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyStoreEmployee';
			var RequrestDatas = {};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					this.DataList = res.dataList;
				})
				.catch(err => {
					console.log(err);
				});

			// 获取商铺员工首页信息
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyStoreWarrantyEmployee';
			var RequrestDatas = {};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					this.DataList2 = res.dataList;
					console.log(JSON.stringify(this.DataList));
				})
				.catch(err => {
					console.log(err);
				});

			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == 'iPhoneXSMax') {
					this.swiperHeight = res.windowHeight - uni.upx2px(130);
				} else {
					this.swiperHeight = res.windowHeight - uni.upx2px(70);
				}
			} catch (e) {
				console.log(e);
			}

		},
		methods: {
			subsectionchange(e) {
				this.current = e;
			},
			ModalConfirm() {
				console.log(JSON.stringify(this.userinfo))
				var RequrestUrl = this.AJB.BizUrl + "api/Order/ChangeSaleManUser";
				var RequrestDatas = {
					OrderId: this.id,
					isauth: this.isauth,
					userID: this.userinfo.id
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas, false)
					.then((res) => {
						if (res.code == 200) {
							this.$refs.uToast.show({
								title: '分配销售人员成功!',
								type: 'success'
							})
							uni.navigateBack({
								delta: 1
							})
						}
					})
					.catch((err) => {
						this.$refs.uToast.show({
							title: '分配销售人员失败!',
							type: 'warning'
						})
					});
			},
			// 模态框取消事件
			ModalCancel() {

			},
			click(item,index) {
				if(index==1)
				{
					this.isauth =true;
				}
				this.userinfo = item;
				this.ModalShow = true;

			}
		}
	};
</script>

<style lang="scss" scoped>
	.selectColor {
		color: #FF9900;
		border-bottom: 1px solid #FF9900;
	}

	.noselectColor {
		color: #000;
		border-bottom: 1px solid #FFFFFF;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>