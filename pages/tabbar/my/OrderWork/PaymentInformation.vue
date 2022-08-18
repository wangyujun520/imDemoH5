<template>
	<view class="content">
		<view class="p-2">
			<view class="px-2 flex flex-column bg-white rounded">
				<view class="flex align-center border-bottom" style="height: 90rpx;">
					<text style="color: #5B5B5B;font-size: 24rpx;">订单号：{{DataList.order_no}}</text>
				</view>
				<view class="flex align-end" style="height: 50rpx;">
					<text style="color: #02B1BE;font-size: 24rpx;">{{DataList.tags}}</text>
				</view>
				<view class="flex py-2 px-3 my-2 justify-between align-center rounded"
					style="background-color: #F7F7F7;">
					<view class="flex align-center">
						<image class="rounded" :src="DataList.surveyor.header" style="width: 100rpx;height: 100rpx;">
						</image>
						<view class="flex flex-column ml-2">
							<view class="flex align-center">
								<text class="mr-1"
									style="font-size: 26rpx;color: #000;font-weight: bold;">{{DataList.surveyor.name}}</text>
								<text class="iconfont" style="font-size: 30rpx;color: #FF9900;">&#xe69d;</text>
							</view>
							<text class="mt-1" style="color: #000;font-size: 26rpx;font-weight: bold;">施工总服务费</text>
						</view>
					</view>
					<view class="flex align-end" style="height: 80rpx;">
						<text style="color: #E51C23;font-size: 20rpx;">￥<span
								style="font-size: 30rpx;font-weight: bold;">{{DataList.money}}</span></text>
					</view>
				</view>
				<view class="flex align-center mb-2" style="color: #6C6C6C;">
					<text class="iconfont mr-1" style="font-size: 30rpx;">&#xe6a7;</text>
					<text style="font-size: 26rpx;">{{DataList.estate_title}}</text>
				</view>
			</view>

			<view class="bg-white flex flex-column my-2 p-2 rounded">
				<view @click="skipPaid(item)" v-for="(item,index) in DataList.money_list" :key="index"
					class="flex flex-column py-2" :class="DataList.money_list.length-1>index?'border-bottom':''">
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">{{item.title}}</text>
						<text :class="item.status==0?'yes-pay':'no-pay'" style="font-size: 26rpx;">￥{{item.fee}}</text>
					</view>
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">{{item.sub_title}}</text>
						<text :class="item.status==0?'yes-pay':'no-pay'"
							style="font-size: 26rpx;">{{item.status_text}}</text>
					</view>
				</view>
			</view>

			<view class="bg-white p-2 flex flex-column rounded" style="color: #939393;font-size: 24rpx;">
				<text class="mb-1" style="color: #101010;font-size: 28rpx;font-weight: bold;">费用支付情况</text>
				<text>已支付<span class="textColor">{{DataList.payed.count}}</span>笔：<span
						class="textColor">{{DataList.payed.money}}</span>元</text>
				<text>未支付 <span class="textColor">{{DataList.none_pay.count}}</span>笔：<span
						class="textColor">{{DataList.none_pay.money}}</span>元</text>
				<text>追加金额：<span class="textColor">0</span>元</text>
				<!-- <text>追加<span class="textColor">{{DataList.ext_pay.count}}</span>笔：<span class="textColor">{{DataList.ext_pay.money}}</span>元</text> -->
			</view>

			<!-- 占位 -->
			<view class="" style="height: 150rpx;"></view>
		</view>

		<!-- 立即支付 -->
		<view v-if="rankno==0&&node_status!=0&&ShowPay" class="position-fixed bg-white"
			style="width: 750rpx;height: 120rpx;bottom: 0;">
			<view class="flex align-center justify-between px-3" style="width: 100%;height: 120rpx;">
				<!-- <view class="flex flex-column">
					<view  @click="PayAgreement" class="flex" style="font-size: 24rpx;">
						<text>点击支付即视为同意</text><text style="color: #02B1BE;">《在线支付协议》</text>
						<text>{{DataList.paying.title}}</text>
					</view>
					<text style="color: red;font-size: 28rpx;">￥<span style="font-size: 40rpx;font-weight: bold;">{{DataList.paying.money}}</span></text>
				</view> -->
				<view class="flex align-end">
					<view class="flex align-center" style="color: red;font-weight: bold;">
						<text style="font-size: 28rpx;">￥</text>
						<text style="font-size: 45rpx;">{{DataList.paying.money}}</text>
					</view>
					<text class="ml-1"
						style="color: #666;font-size: 24rpx;margin-bottom: 10rpx;">{{DataList.paying.title}}</text>
				</view>
				<view class="flex align-center">
					<view @click="pay" class="flex justify-center align-center ml-2 rounded"
						style="background-color: #FF9900;width: 180rpx;height: 70rpx;">
						<text style="color: #FFFFFF;">立即支付</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 立即支付弹出层 -->
		<u-popup v-model="ShowPopup" mode="bottom" border-radius="20" :closeable="true">
			<view class="flex justify-center align-center mb-2 mt-4">
				<text style="font-size: 36rpx;color: #000000;font-weight: bold;">支付方式</text>
			</view>
			<!-- <view class="flex justify-center align-center">
				<text style="font-size: 30rpx;color: #FF0000;font-weight: bold;">￥</text><text style="font-size: 50rpx;color: #FF0000;font-weight: bold;">{{DataList.paying.money}}</text>
			</view> -->
			<view class="flex flex-column bg-white rounded mt-3">
				<!-- 支付宝 -->
				<view class="flex justify-between align-center p-3">
					<view class="flex align-center">
						<u-icon name="zhifubao-circle-fill" color="#00A0E9" size="50"></u-icon>
						<text class="ml-2" style="font-size: 30rpx;color: #000000;">支付宝</text>
					</view>
					<view class="flex align-center justify-end">
						<u-radio-group width="40rpx" size="38" v-model="value" @change="radioGroupChange">
							<u-radio @change="radioChange" :name="list[0].name" :disabled="list[0].disabled"
								active-color="#ff9900" :icon-size="20">
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
							<u-radio @change="radioChange" :name="list[1].name" :disabled="list[1].disabled"
								active-color="#ff9900" :icon-size="20">
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-center" style="height: 150rpx;">
				<u-button @click="PayImmediately" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">
					立即支付</u-button>
			</view>
		</u-popup>

		<u-modal v-model="showModal" confirm-color="#ff9900" :show-cancel-button="true" title="录入你要追加的金额"
			@confirm="ModalConfirm" @cancel="ModalCancel">
			<view class="flex justify-center align-center my-5 px-5">
				<u-input input-align="center" :clearable="false" placeholder="请录入金额" v-model="AdditionalAmount"
					type="number" :border="false" style="background-color: #EEEDED;" />
			</view>
		</u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				module:'',
				node_code:'',
				node_status: '',
				rankno: uni.getStorageSync('rankno'),
				order_id: '',
				PayList: [],
				pay_id: '', //支付id
				imgUrl: 'https://img2.baidu.com/it/u=1814268193,3619863984&fm=253&fmt=auto&app=138&f=JPEG?w=632&h=500',
				DataList: {
					order_id: "",
					order_no: "",
					tags: "",
					surveyor: {
						id: "",
						name: "",
						header: "",
						catalog: [],
						mobile: ""
					},
					estate_title: "",
					money: "",
					money_list: [],
					payed: {
						count: "",
						money: ""
					},
					none_pay: {
						count: "",
						money: ""
					},
					paying: {
						order_money_id: "",
						title: "",
						money: ""
					}
				},
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
				ShowPay: true
			};
		},
		onLoad(options) {
			this.order_id = options.order_id;
			if ((options.node_status ?? '') != '') {
				this.node_status = options.node_status;
			}
			this.module = options.module;
			this.node_code = options.node_code;
		},
		onShow() {
			this.InitData();
		},
		methods: {
			// 初始化数据
			InitData() {
				this.$post(this.$url.Work.GetPayOrder, {
					order_id: this.order_id
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList = res.data;
					if (res.data.paying.title == undefined) {
						this.ShowPay = false;
					}

				});
			},
			PayAgreement() {
				uni.navigateTo({
					url: '/pages/login/PayAgreement'
				})
			},
			// 立即支付点击事件
			pay() {
				// 获取支付通道
				this.$post(this.$url.Task.GetPays, {
					order_money_id: this.DataList.paying.order_money_id
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					console.log(JSON.stringify(res))
					this.PayList = res.data;
					this.ShowPopup = true;
				});
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
				// this.toPay(this.value);
				console.log(this.value)
				if (this.value == 'zhifubao') {
					console.log(JSON.stringify(this.PayList))
					this.PayList.forEach(item => {
						if (item.provider == 'alipay') {
							this.pay_id = item.id;
						}
					})
					// 支付宝支付
					this.alipay();
				}
				if (this.value == 'weixin') {
					this.PayList.forEach(item => {
						if (item.provider == 'wepay') {
							this.pay_id = item.id;
						}
					})
					// 微信支付
					this.wxpay();
				}
			},
			// 支付宝支付
			alipay() {
				let requestData = {
					order_money_id: this.DataList.paying.order_money_id,
					pay_id: this.pay_id
				}
				console.log(JSON.stringify(requestData))
				// 8.3、获取订单支付通道
				this.$post(this.$url.Task.GetPayParas, requestData, {
					isLoading: false,
					loadingTitle: ''
				}).then(res => {
					console.log(JSON.stringify(res))
					uni.requestPayment({
						provider: 'alipay',
						// orderInfo:'服务端生成的支付订单信息',
						orderInfo: res.data,
						success: res => {
							this.ShowPopup = false; //关闭弹窗
							setTimeout(() => {
								this.$refs.uToast.show({
									title: '支付成功！',
									type: 'success'
								})
							}, 100)
							// 刷新当前页面
							this.InitData();
						},
						fail: err => {
							console.log('fail:' + JSON.stringify(err));
							this.ShowPopup = false; //关闭弹窗
							uni.showToast({
								title: '支付取消',
								icon: 'none',
								duration: 2000
							})
						}
					});
				});
			},
			// 微信支付
			wxpay() {
				// 8.3、获取订单支付通道
				this.$post(this.$url.Task.GetPayParas, {
					order_money_id: this.DataList.paying.order_money_id,
					pay_id: this.pay_id
				}, {
					isLoading: false,
					loadingTitle: ''
				}).then(res => {
					console.log(res.data)
					uni.requestPayment({
						provider: 'wxpay',
						// orderInfo:'服务端生成的支付订单信息',
						orderInfo: JSON.parse(res.data),
						success: res => {
							this.ShowPopup = false; //关闭弹窗
							setTimeout(() => {
								this.$refs.uToast.show({
									title: '支付成功！',
									type: 'success'
								})
							}, 100)
							// 刷新当前页面
							this.InitData();
						},
						fail: err => {
							console.log('fail:' + JSON.stringify(err));
							this.ShowPopup = false; //关闭弹窗
							uni.showToast({
								title: '支付取消',
								icon: 'none',
								duration: 2000
							})
						}
					});
				});
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
				if (item.status == 0) {
					uni.navigateTo({
						url:`/pages/ServiceOrder/Paid?title=支付信息&module=${this.module}&order_id=${this.order_id}&code=${this.node_code}&catalog=2`
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
	page {
		background-color: #F7F7F7;
	}

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

	.no-pay {
		color: #FF0000;
	}

	.yes-pay {
		color: #02B1BE;
	}
</style>
