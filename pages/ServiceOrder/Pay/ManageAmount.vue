<template>
	<view class="content">
		<view class="p-2">
			<view class="p-2 flex flex-column bg-white rounded">
				<!-- <text style="color: #666;font-size: 26rpx;">订单号：202013322124563213</text> -->
				<view class="flex py-2 px-3 my-2 justify-between align-center rounded" style="background-color: #F7F7F7;">
					<view class="flex align-center">
						<!-- <image class="rounded" src="/static/img/head/demo6.jpg" style="width: 100rpx;height: 100rpx;"></image> -->
						<view class="flex flex-column ml-2">
							<!-- <view class="flex align-center">
								<text>咚咚锵</text>
								<text class="iconfont" style="font-size: 30rpx;color: #FF9900;">&#xe69d;</text>
							</view> -->
							<text style="color: #666;font-size: 26rpx;">装修施工管理费</text>
						</view>
					</view>
					<view class="flex align-end" style="height: 80rpx;">
						<text style="color: #E51C23;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">{{amount}}</span></text>
					</view>
				</view>
				<!-- 
				<view class="flex" style="height: 40rpx;">
					<view class="" style="width: 240rpx;">
						<text class="text-title">装修风格：</text>
						<text class="text-content">现代简约</text>
					</view>
					<view class="" style="width: 280rpx;">
						<text class="text-title">设计面积：</text>
						<text class="text-content">100㎡</text>
					</view>
				</view>
				<view class="flex" style="height: 40rpx;">
					<view class="" style="width: 720rpx;">
						<text class="text-title">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</text>
						<text class="text-content">四川省成都市武侯区G213辅路</text>
					</view>
				</view> -->
			</view>
			<!-- <view class="bg-white flex flex-column my-2 p-2 rounded">
				<view @click="skipPaid(sitem)" class="flex flex-column py-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);"
				 v-for="(sitem,sindex) in datalist.payAmountList">
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">{{sitem.name}}</text>
						<text style="color: #FF0000;font-size: 26rpx;">￥{{sitem.amount}}</text>
					</view>
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">{{sitem.orderId}}</text>
					</view>
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">{{sitem.msg}}</text>
						<text v-if="sitem.payState==2" style="color: #02B1BE;font-size: 26rpx;">已支付</text>
						<text v-if="sitem.payState==1" style="color: #f13b37;font-size: 26rpx;">待支付</text>
						<text v-if="sitem.payState==0" style="color: #8f9499;font-size: 26rpx;">未开始</text>
					</view>
				</view>
			</view> -->

			<!-- <view class="bg-white p-2 flex flex-column rounded">
				<text>费用支付情况</text>
				<text>已支付<span class="textColor">{{datalist.payCount}}</span>笔：<span class="textColor">{{datalist.payAmount}}</span>元</text>
			 -->	<!-- 	<text>未支付 <span class="textColor">>{{datalist.payAmount}}</span>笔：<span class="textColor">00.00</span>元</text> -->
				<!-- <text>追加金额：<span class="textColor">{{datalist.addAmount}}</span>元</text>
			</view>
 -->
			<!-- 占位 -->
			<view class="" style="height: 150rpx;"></view>
		</view>

		<!-- 立即支付 -->
		<view class="position-fixed bg-white" style="width: 750rpx;height: 120rpx;bottom: 0;">
			<view class="flex align-center justify-between px-3" style="width: 100%;height: 100rpx;">
				<view class="flex flex-column">
					<text style="color: #E51C23;font-size: 28rpx;">￥<span style="font-size: 40rpx;font-weight: bold;">{{payAmount}}</span></text>
					<view class="flex" style="font-size: 24rpx;">
						<text>点击支付即视为同意</text><text style="color: #02B1BE;">《在线支付协议》</text>
					</view>
				</view>
				<view v-if="State<18" class="flex align-center">
					<view @click="pay" class="flex justify-center align-center ml-2 rounded" style="background-color: #FF9900;width: 180rpx;height: 70rpx;">
						<text style="color: #FFFFFF;">立即支付</text>
					</view>
				</view>
				<view v-else class="flex align-center">
					<view  class="flex justify-center align-center ml-2 rounded" style="background-color: #FF9900;width: 180rpx;height: 70rpx;">
						<text style="color: #FFFFFF;">已支付</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 追加 -->
		<!-- <view class="position-fixed bg-white" style="width: 750rpx;height: 120rpx;bottom: 0;">
			<view class="flex align-center justify-between px-3" style="width: 100%;height: 100rpx;">
				<view class="flex">
					<text style="color: #999;font-size: 26rpx;">第一笔费用已支付</text>
				</view>
				<view class="flex align-center">
					<view @click="Add" class="flex justify-center align-center ml-2 rounded" style="background-color: #02B1BE;width: 180rpx;height: 70rpx;">
						<text style="color: #FFFFFF;">追加</text>
					</view>
				</view>
			</view>
		</view> -->

		<view v-if="!ShowPopup&&!showModal" @click="checkUserToRoom" class="position-fixed" style="bottom: 300rpx;right: 50rpx;background-color: #FF9900;width: 100rpx;height: 100rpx;border-radius: 50%;z-index: 999999;">
			<view class="flex align-center justify-center" style="width: 100%;height: 100%;">
				<text class="iconfont" style="color: #FFFFFF;font-size: 50rpx;">&#xe6ab;</text>
			</view>
		</view>

		<!-- 立即支付弹出层 -->
		<u-popup v-model="ShowPopup" mode="bottom" border-radius="20" :closeable="true">
			<view class="flex justify-center align-center mb-2 mt-4">
				<text style="font-size: 36rpx;color: #000000;font-weight: bold;">支付方式</text>
			</view>
			<view class="flex justify-center align-center">
				<text style="font-size: 30rpx;color: #FF0000;font-weight: bold;">￥</text><text style="font-size: 50rpx;color: #FF0000;font-weight: bold;">{{payAmount}}</text>
			</view>
			<view class="flex flex-column bg-white rounded mt-3">
				<!-- 支付宝 -->
				<view class="flex justify-between align-center p-3">
					<view class="flex align-center">
						<u-icon name="zhifubao-circle-fill" color="#00A0E9" size="50"></u-icon>
						<text class="ml-2" style="font-size: 30rpx;color: #000000;">支付宝</text>
					</view>
					<view class="flex align-center justify-end">
						<u-radio-group width="40rpx" size="38" v-model="value" @change="radioGroupChange">
							<u-radio @change="radioChange" :name="list[0].name" :disabled="list[0].disabled" active-color="#ff9900"
							 :icon-size="20">
							</u-radio>
						</u-radio-group>
					</view>
				</view>
				<!-- 微信支付 -->
				<view class="flex justify-between align-center p-3">
					<view class="flex align-center">
						<u-icon name="weixin-circle-fill" color="#62B900" size="50"></u-icon>
						<text class="ml-2" style="font-size: 30rpx;color: #000000;">微信支付</text>
					</view>
					<view class="flex align-center justify-end">
						<u-radio-group width="40rpx" size="38" v-model="value" @change="radioGroupChange">
							<u-radio @change="radioChange" :name="list[1].name" :disabled="list[1].disabled" active-color="#ff9900"
							 :icon-size="20">
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-center" style="height: 150rpx;">
				<u-button @click="PayImmediately" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">立即支付</u-button>
			</view>
		</u-popup>

		<u-modal v-model="showModal" confirm-color="#ff9900" :show-cancel-button="true" title="录入你要追加的金额" @confirm="ModalConfirm"
		 @cancel="ModalCancel">
			<view class="flex justify-center align-center my-5 px-5">
				<u-input input-align="center" :clearable="false" placeholder="请录入金额" v-model="AdditionalAmount" type="number"
				 :border="false" style="background-color: #EEEDED;" />
			</view>
		</u-modal>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				datalist: {},
				id: 0,
				number: 0,
				amount: 0,
				payAmount: 0,
				payOrderId: "",
				ShowPopup: false,
				showModal: false,
				AdditionalAmount: '',
				pricevalue: '',
				type: 'text',
				border: true,
				list: [{
						name: 'zhifubao',
						disabled: false
					},
					{
						name: 'weixin',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: 'zhifubao',
				State:0
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.payAmount = option.amount;
			this.amount = option.amount;
			this.State   =option.State;
			console.log(JSON.stringify(option))
			var RequrestUrl =
				this.AJB.BizUrl + "api/Design/GetPayList";
			var RequrestDatas = {
				id: this.id 
			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then((res) => {
					if (res.code == 200) {
						this.datalist = res.dataList;
						console.log(JSON.stringify(this.datalist))
						res.dataList.payAmountList.forEach(item => {
							if (item.payState == 1) {
								// this.payAmount = item.amount;
								this.payOrderId = item.orderId;
								this.number = item.remarks;
							}
						})



					}
				})
				.catch((err) => {
					console.log(err);
				});

		},
		methods: {
			// 立即支付点击事件
			pay() {
				this.ShowPopup = true;
			},
			// 追加按钮点击事件
			Add() {
				this.showModal = true;
			},
			// 追加金额确认
			ModalConfirm() {
				console.log("追加金额确认")
			},
			// 追加金额取消
			ModalCancel() {
				console.log("追加金额取消")
			},
			// 立即支付点击事件
			PayImmediately() {
				this.toPay(this.value);
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {

			},
			// 跳转到已支付界面
			skipPaid(item) {
				if (item.payState == 2) {
					uni.navigateTo({
						url: '/pages/ServiceOrder/Pay/Paid?id='+this.id+'&item=' + JSON.stringify(item)
					})
				}
			},
			checkUserToRoom() {
				// console.log(JSON.stringify(toUserInfo));
				// var toUserInfo = {
				// 	"UserID":this.user.tel,
				// 	"NickName":this.user.name
				// }
				// this.$store.commit('createConversationActive', toUserInfo.UserID);
				// uni.navigateTo({
				// 	url: '/pages/chat/chat/chat?name=' + toUserInfo.NickName
				// });
				uni.navigateTo({
					url: '/pages/chat/chat/chat'
				});
			},
			// 1、点击支付，先获取手机上是否已安装支付宝或微信
			toPay(PayId) {
				// #ifdef APP-PLUS
				uni.getProvider({
					service: "payment",
					success: (e) => {
						console.log(e.provider);
						let arrStr = e.provider.join(',')
						if (PayId == "zhifubao") {
							if (arrStr.indexOf('alipay') === -1) {
								uni.showToast({
									icon: 'none',
									title: '目前只支持支付宝'
								})
								return
							}
							// 调用支付
							this.requestPayment('alipay')
						} else if (PayId == "weixin") {
							if (arrStr.indexOf('wxpay') === -1) {
								uni.showToast({
									icon: 'none',
									title: '目前只支持支付宝'
								})
								return
							}
							// 调用支付
							this.requestPayment('wxpay')
						} else {
							uni.showToast({
								icon: 'none',
								title: '请安装支付宝或者微信!'
							})
						}

					},
					fail: (e) => {
						console.log("获取支付通道失败：", e);
					}
				});
				// #endif
			},
			// 2、异步调用支付，先获取订单信息
			async requestPayment(PayId) {
				let orderInfo = await this.getOrderInfo(PayId);
				// orderInfo 的值：见下方
				if (orderInfo.statusCode !== 200) {
					console.log("获得订单信息失败", orderInfo);
					uni.showModal({
						content: "获得订单信息失败",
						showCancel: false
					})
					return;
				}
				this.payOrderId = orderInfo.data.msg;
				uni.requestPayment({
					provider: PayId,
					orderInfo: orderInfo.data.dataList,
					success: (e) => {
						let appid = "";
						let Confirmsdatas = {
							payid: PayId,
							IsAdd: true,
							taskId: this.id,
							price: this.payAmount,
							Remarks:"装修施工管理费",
							OrderId: this.payOrderId,
							number: this.number + 1
						};
						let url = this.AJB.BizUrl + "api/Pay/payConfirms";
						return new Promise((res) => {
							uni.request({
								url: url,
								method: "POST",
								data: Confirmsdatas,
								success: (result) => {

									uni.showToast({
										title: "支付成功!"
									})
								},
								fail: (e) => {
									res(e);
								}
							})
						})

					},
					fail: (e) => {
						console.log("fail", e);
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					},
					complete: () => {
						this.providerList[index].loading = false;
					}
				})
			},

			// 3、获取订单信息
			getOrderInfo(e) {
				let appid = "";
				let datas = {
					payid: e,
					IsAdd: false,
					taskId: this.id,
					price: this.payAmount,
					OrderId: this.payOrderId
				};

				let url = this.AJB.BizUrl + "api/Pay/payment";
				return new Promise((res) => {
					uni.request({
						url: url,
						method: "POST",
						data: datas,
						success: (result) => {
							res(result);

						},
						fail: (e) => {
							res(e);
						}
					})
				})
			}
		}
	};
</script>

<style>
	.text-title {
		font-size: 26rpx;
		color: #999;
	}

	.text-content {
		font-size: 26rpx;
		color: #999;
	}

	.textColor {
		color: #02B1BE;
	}
</style>
