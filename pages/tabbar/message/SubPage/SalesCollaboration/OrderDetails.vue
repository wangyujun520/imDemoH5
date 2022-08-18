<template>
	<view class="content position-relative">
		<view class="flex flex-column" style="margin: 20rpx;">
			<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" :src="DataList.header" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="flex flex-column justify-center" style="width: 380rpx;height: 100%;">
						<view class="">
							<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{DataList.name}}</text>
						</view>
						<view class="flex align-center">
							<text style="color: #888;font-size: 26rpx;">{{DataList.address}}</text>
						</view>
					</view>
					<view class="flex justify-end align-center pr-2" style="height: 100%;width: 200rpx;">

					</view>
				</view>
				<!-- <view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="" style="width: 440rpx;">
						<text class="text-title">户型：</text>
						<text class="text-content">{{order.houseType}}</text>
					</view>
					<view class="" style="width: 280rpx;">
						<text class="text-title">建筑面积：</text>
						<text class="text-content">{{order.area}}㎡</text>
					</view>
				</view> -->

				<view class="flex flex-wrap px-3">
					<view class="" style="width: 325rpx;border: 0px solid red;" v-for="(item,index) in DataList.tags">
						<text class="text-title">{{item.lable}}：</text>
						<text class="text-content">{{item.value}}</text>
					</view>
				</view>

				<!-- <view class="flex flex-wrap px-5 py-2 ">
					<text style="color: #939393;font-size: 28rpx;width: 217rpx;border: 0px solid red;" v-for="(item,index) in DataList.tags">{{item.lable}}：{{item.value}}</text>
				</view> -->


				<view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="" style="width: 640rpx;">
						<text class="iconfont" style="font-size: 28rpx;color: #999;">&#xe65e;</text>
						<text style="font-size: 24rpx; color: #999">{{DataList.address}}</text>
					</view>
				</view>
			</view>
			<!-- 设计师 -->
			<view @click="gotodesign(order.desgnUser)" class="flex flex-column p-2 bg-white mt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<text style="color: #888;font-size: 26rpx;">设计师</text>
				<view class="flex align-center rounded pl-3"
					style="background-color: #F6F6F7;width: 670rpx;height: 150rpx;">
					<image :src="DataList.designer.header" class="rounded" style="width: 120rpx;height: 120rpx;">
					</image>
					<view class="flex flex-column ml-2">
						<view class="flex align-center">
							<text class="mr-1"
								style="color: #101010;font-size: 32rpx;font-weight: bold;">{{DataList.designer.name}}</text>
							<text class="font-sm text-white bg-danger px-1 pl-1"
								style="border-radius: 0rpx 8rpx 8rpx 0rpx;">设计师</text>
						</view>
						<view class="flex">
							<text style="font-size: 26rpx;color: #939393;">{{DataList.designer.slogan}}</text>
						</view>
						<view class="flex">
							<u-rate :disabled="true" :current="DataList.designer.point" :size="28"
								inactive-color="#B2B2B2" active-color="#FF9900" active-icon="star-fill"
								inactive-icon="star"></u-rate>
							<text style="color: #ff1b1b;">{{DataList.designer.point}}分</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 店铺信息 -->
			<view class="flex flex-column p-2 bg-white mt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<text style="color: #888;font-size: 26rpx;">店铺信息</text>
				<view class="flex align-center rounded pl-3"
					style="background-color: #F6F6F7;width: 670rpx;height: 150rpx;">
					<image
						src="https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E5%95%86%E5%AE%B6.png"
						class="rounded" style="width: 120rpx;height: 120rpx;"></image>
					<view class="flex flex-column ml-2">
						<view class="flex align-center">
							<text class="mr-1"
								style="color: #101010;font-size: 32rpx;font-weight: bold;">{{DataList.store.name}}</text>
						</view>
						<view class="flex mt-1">
							<text class="iconfont" style="font-size: 28rpx;color: #999;">&#xe65e;</text>
							<text style="font-size: 24rpx;color: #999;">{{DataList.store.address}}</text>
						</view>
					</view>
				</view>
			</view>


			<!-- 销售人员 -->
			<view @click="gotoSale(order.saleManUser)" class="flex flex-column p-2 bg-white mt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<text style="color: #888;font-size: 26rpx;">销售人员</text>
				<view class="flex align-center rounded pl-3"
					style="background-color: #F6F6F7;width: 670rpx;height: 150rpx;">
					<image :src="DataList.salesman.header" class="rounded" style="width: 120rpx;height: 120rpx;">
					</image>
					<view class="flex flex-column ml-2">
						<view class="flex align-center">
							<text class="mr-1"
								style="color: #101010;font-size: 32rpx;font-weight: bold;">{{DataList.salesman.name}}</text>
							<text class="font-sm text-white bg-danger px-1 pl-1"
								style="border-radius: 0rpx 8rpx 8rpx 0rpx;">销售</text>
						</view>
						<view class="flex">
							<text style="font-size: 26rpx;color: #939393;">{{DataList.salesman.slogan}}</text>
						</view>
						<view class="flex">
							<u-rate :disabled="true" :current="DataList.salesman.point" :size="28"
								inactive-color="#B2B2B2" active-color="#FF9900" active-icon="star-fill"
								inactive-icon="star"></u-rate>
							<text style="color: #ff1b1b;">{{DataList.salesman.point}}分</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 材料清单 -->
			<view @click="skipMaterialList" class="flex flex-column p-2 bg-white mt-2"
				style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<view class="flex">
						<text style="font-size: 26rpx;color: #999;">材料清单</text>
					</view>
					<view class="">
						<!-- <text style="font-size: 26rpx;color: #FF9900;">剩余(20天)</text> -->
						<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
					</view>
				</view>
				<view class="flex mt-2">
					<text style="color: #02B1BE;">已取货：{{DataList.taked_count}}</text>
					<text style="color: #FF9900;margin-left: 50rpx;">未取货：{{DataList.none_taking_count}}</text>
				</view>
			</view>
			<!-- 占位 -->
			<view style="height: 150rpx;"></view>

		</view>

		<view @click="checkUserToRoom" class="position-fixed"
			style="bottom: 300rpx;right: 50rpx;background-color: #DD6666;width: 100rpx;height: 100rpx;border-radius: 50%;z-index: 999999;">
			<view class="flex flex-column align-center justify-center" style="width: 100%;height: 100%;">
				<text class="iconfont" style="color: #FFFFFF;font-size: 50rpx;margin-top: 5rpx;">&#xe6ad;</text>
				<text class="text-white" style="font-size: 22rpx;margin-top: -10rpx;">管家</text>
			</view>
		</view>

		<view class="position-fixed bg-white" style="bottom: 0;width: 750rpx;height: 100rpx;" v-if="DataList.status == 2">
			<view class="flex justify-between align-center px-3" style="width: 100%;height: 100%;">
				<text
					style="color: #4D86D7;background-color: #FFFFFF;border: 1px solid #4D86D7;padding: 15rpx 50rpx;font-size: 26rpx;border-radius: 40rpx;">联系商家</text>
				<view class="flex align-center justify-end" style="width: 350rpx;">
					<text @click="Confirm('-1')"
						style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						拒绝
					</text>
					<text @click="Confirm('10')" class="ml-3"
						style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
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
		onLoad(options) {
			this.id = options.id;
			this.module = options.module;
		},
		onShow() {
			this.InitData();
		},
		data() {
			return {
				module:'',
				id: '',
				id: 0,
				DataList: {},
				order: {}
			}
		},
		methods: {
			Confirm(state) {
				// 接收、拒绝协同订单
				this.$post(this.$url.Mall.UpdateMallOrder, {
					id: this.DataList.id, //材料方案id
					status: state //10=待取货（确定）；；-1=已拒绝（取消）
				}, {
					isLoading: false
				}).then(res => {
					this.$refs.uToast.show({
						title: '接受成功',
						type: 'success'
					});
					setTimeout(() => {
						//返回上一个界面
						uni.navigateBack({
							delta: 1
						})
					}, 2000);
				});
			},
			InitData() {
				let requestData = {
					id: this.id
				}
				this.$post(this.$url.Mall.GetHelpOrder, requestData, {
					isLoading: false
				}).then(res => {
					this.DataList = res.data;
				});
			},
			// 跳转到管家聊天
			checkUserToRoom() {

			},
			gotodesign(Option) {
				uni.navigateTo({
					url: "/pages/tabBar/find/homepage?id=" + Option,
				});
			},
			gotoSale(Option) {
				uni.navigateTo({
					url: "/pages/tabBar/find/homepage?id=" + Option,
				});
			},

			// 跳转到材料清单界面
			skipMaterialList() {
				uni.navigateTo({
					url: '/pages/tabbar/my/OrderWork/MaterialList?id=' + this.id+'&module='+this.module
				})
			},
			shopstaff() {
				uni.navigateTo({
					// url: '/pages/tabbar/my/OrderWork/ShopStaff',
					url: '/pages/tabbar/my/datamodification/ShopStaff?mall_id=' + this.DataList.mall.id + '&id=' +
						this.DataList.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-title {
		font-size: 26rpx;
		color: #888;
	}

	.text-content {
		font-size: 28rpx;
		color: #101010;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>