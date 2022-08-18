<template>
	<view class="content">
		<view class="flex">
			<view class="" style="width: 650rpx">
				<!-- list 标签数组，元素为对象，如[{name: '推荐'}] -->
				<!-- active-color 选中的颜色 -->
				<!-- is-scroll tabs是否可以左右拖动 -->
				<!-- current 初始化显示第几个 -->
				<u-tabs :list="list" :active-color="activeColor" :is-scroll="true" :current="current" @change="change"></u-tabs>
			</view>
			<view @click="MenuShow" class="flex align-center justify-center" style="width: 100rpx; background-color: #ffffff">
				<text class="iconfont text-dark" style="font-size: 40rpx">&#xe66c;</text>
			</view>
		</view>

		<!-- 弹出框样式开始 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable"
			 :close-icon-pos="closeIconPos">
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in list" :key="index">
						<text @click="SwitchMenu(index)" :style="{
                color: index == current ? '#FFFFFF' : '#101010',
                backgroundColor: index == current ? '#FF9900' : '#FFFFFF',
              }"
						 class="mb-2 py-2 mr-2 label-style">
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>
		<!-- 弹出框样式结束 -->

		<!-- 菜单开始 -->
		<swiper :style="{ height: swiperHeight + 'px' }" circular :current="current" @change="changeSwiper">
			<swiper-item v-for="(swiperitem, swiperindex) in list" :key="swiperindex" style="overflow: auto">
				<view v-for="(radio, rindex) in DataList[current]" :key="rindex">
					<view class="flex flex-column m-2">
						<view class="bg-white pl-3" style="width: 100%; border-radius: 10rpx 10rpx 0 0">
							<view class="flex align-center" style="height: 140rpx">
								<!-- <view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
									<image class="rounded" src="/static/video/demo.jpg" style="width: 100rpx;height: 100rpx;"></image>
								</view> -->
								<view class="flex flex-column justify-center" @click="skipOrderDetails(radio.id)" style="width: 520rpx; height: 100%">
									<view class="">
										<text style="
                        font-size: 30rpx;
                        color: #101010;
                        font-weight: bold;
                      ">{{ radio.ownerName }}</text>
									</view>
									<view class="flex align-center">
										<text style="color: #777; font-size: 26rpx">预计订单金额：</text>
										<text style="color: #ff0000; font-weight: bold"><span style="font-size: 26rpx">￥</span><span style="font-size: 30rpx">{{
                        radio.realPrice
                      }}</span></text>
									</view>
								</view>
								<view class="flex justify-end align-center pr-2" style="height: 100%; width: 190rpx">
									<u-radio-group width="40rpx" size="38" v-model="value" @change="radioGroupChange">
										<u-radio @change="radioChange" :name="radio.id" :disabled="radio.status != 1" active-color="#ff9900"
										 :icon-size="20">
										</u-radio>
									</u-radio-group>
								</view>
							</view>
							<view class="flex flex-column" style="margin-top: -20rpx">
								<view class="flex" style="color: #02b1be; font-size: 26rpx">
									<text>商品总数量</text>
									<text class="ml-5">X{{ radio.commCount }}</text>
								</view>
								<view class="flex my-2">
									<text class="iconfont" style="font-size: 30rpx; color: #888">&#xe65e;</text>
									<text style="font-size: 26rpx; color: #888">{{
                    radio.address
                  }}</text>
								</view>
							</view>
						</view>
						<view class="flex bg-white" style="
                height: 80rpx;
                border-top: 1px solid rgba(187, 187, 187, 0.2);
                border-radius: 0 0 10rpx 10rpx;
              ">
							<view class="flex align-center justify-center" style="
                  width: 100%;
                  height: 100%;
                  border-right: 1px solid rgba(187, 187, 187, 0.2);
                ">
								<text style="font-size: 24rpx; color: #777">{{
                  radio.creationTime
                }}</text>
							</view>
							<view class="flex align-center justify-center" style="
                  width: 100%;
                  height: 100%;
                  border-right: 1px solid rgba(187, 187, 187, 0.2);
                ">
								<text style="font-size: 24rpx; color: #777">{{
                  radio.orderStatus
                }}</text>
							</view>
							<view class="flex align-center justify-center" style="width: 100%; height: 100%">
								<text style="font-size: 24rpx; color: #777">{{
                  radio.saleManName
                }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 占位 -->
				<view style="height: 100rpx"></view>
			</swiper-item>
		</swiper>
		<!-- 菜单结束 -->

		<!-- 底部按钮 -->
		<view class="position-fixed" style="height: 100rpx; width: 100%; bottom: 0">
			<view class="flex bg-white" style="
          width: 100%;
          height: 100%;
          border-top: 1px solid rgba(187, 187, 187, 0.2);
        ">
				<view class="flex align-center pl-2" style="width: 100rpx"> </view>
				<view class="flex align-center justify-end pr-2" style="width: 650rpx">
					<text style="
              background-color: #ffffff;
              color: #101010;
              font-size: 26rpx;
              padding: 10rpx 40rpx;
              border-radius: 40rpx;
              border: 1px solid #101010;
            ">取消</text>
					<text @click="ShowModalBox" class="ml-3" style="
              background-color: #ff9900;
              color: #ffffff;
              font-size: 26rpx;
              padding: 10rpx 40rpx;
              border-radius: 40rpx;
              border: 1px solid #ff9900;
            ">加入清单</text>
				</view>
			</view>
		</view>

		<!-- 模态框 -->
		<u-modal :zoom="false" title="" :content="ModalContent" v-model="ModalShow" :show-cancel-button="true" confirm-color="#FF9900"
		 confirm-text="查看订单" cancel-text="返回" @confirm="ModalConfirm" @cancel="ModalCancel">
		</u-modal>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap: function(e) {
			if (e.float == "right") {
				// console.log("右上角点击事件");

				// 跳转到创建订单界面
				uni.navigateTo({
					url: "/pages/tabBar/my/OrderWork/CreateOrder",
				});
			}
		},
		data() {
			return {
				ModalContent: "商品加入成功",
				ModalShow: false,
				value: 0,
				//列表数据
				list: [],
				current: 0, //当前选中的下标
				activeColor: this.$u.color["warning"],
				// 弹出菜单参数
				show: false, //是否显示弹出框菜单
				mode: "top", //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: "top-right", //关闭按钮位置
				// 弹出菜单参数
				swiperHeight: 500, // swiper菜单高度
				DataList: [],
				commId: 0,
			};
		},
		onShow() {
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == "iPhoneXSMax") {
					this.swiperHeight = res.windowHeight - 40 - uni.upx2px(70);
				} else {
					this.swiperHeight = res.windowHeight - 40;
				}
			} catch (e) {
				console.log(e);
			}

			// 第一次接口
			var RequrestUrl = this.AJB.BizUrl + "api/Order/GetOrderTypes";
			var RequrestDatas = {};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas, false)
				.then((res) => {
					if (res.code == 200) {
						this.list = [];
						res.dataList.forEach((item) => {
							this.list.push({
								name: item,
							});
						});

						this.list.forEach((item) => {
							this.DataList.push({});
						});

						this.GetData(true);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		onLoad(option) {
			this.commId = option.id;
			console.log(this.commId);
		},
		methods: {
			// 格式化日期结束
			GetData(isforce) {
				//获取数据
				if (this.DataList[this.current].length !== undefined && !isforce) {
					return;
				}

				var RequrestUrl = this.AJB.BizUrl + "api/Order/GetOrderList";
				var RequrestDatas = {
					type: this.list[this.current].name,
					isSelf: true,
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						console.log(JSON.stringify(res));
						if (res.code == 200) {
							this.$set(this.DataList, this.current, res.dataList);
							// console.log("load from api,type:" + this.list[this.current].name);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 跳转到订单详情
			skipOrderDetails(id) {
				uni.navigateTo({
					url: "/pages/tabBar/my/OrderWork/SalesOrderDetails?id=" + id + "&CommId=" + this.commId,
				});
			},
			// 切换菜单
			SwitchMenu(index) {
				this.current = index;
				this.show = false;
				this.GetData(false);
			},
			// 菜单改变
			change(index) {
				this.current = index;
				this.GetData(false);
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				console.log(this.value);
				// console.log(e);
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
				this.current = event.detail.current;
				this.GetData(false);
				// console.log(JSON.stringify(event))
			},
			// 显示模态框
			ShowModalBox() {
				var RequrestUrl = this.AJB.BizUrl + "api/Order/AddCommToOrder";
				var RequrestDatas = {
					OrderId: this.value,
					CommId: this.commId,
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then((res) => {
						console.log(JSON.stringify(res));
						if (res.code == 200) {
							this.ModalShow = true;
							this.GetData(true);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 模态框确定
			ModalConfirm() {
				console.log("模态框确定");

				// 跳转到订单详情界面
				uni.navigateTo({
					url: "/pages/tabBar/my/OrderWork/SalesOrderDetails?id=" + this.value + "&CommId=" + this.commId,
				});
			},
			// 模态框取消
			ModalCancel() {
				console.log("模态框取消");
			},
		},
	};
</script>

<style lang="scss">
	.label-style {
		font-size: 28rpx;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
		width: 160rpx;
		text-align: center;
	}

	// 通过/deep/样式穿透去控制组件的内容
	.wrap /deep/ .u-content {
		color: #666 !important;
	}
</style>
