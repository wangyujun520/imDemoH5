<template>
	<view class="content p-2">
		
		<view class="rounded">
			<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #5B5B5B;">{{datalist.name}}</text>
					<text style="color: #FF0000;font-size: 26rpx;">￥{{datalist.amount}}</text>
				</view>
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #5B5B5B;">{{datalist.msg}}</text>
					<text style="color: #02B1BE;font-size: 26rpx;">已支付</text>
				</view>
			</view>
			<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="font-size: 26rpx;color: #5B5B5B;">订单号：{{datalist.orderId}}</text>
				<text style="font-size: 26rpx;color: #5B5B5B;">订单时间：{{datalist.createTime}}</text>
			</view>
			<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="font-size: 26rpx;color: #5B5B5B;">支付方式：{{datalist.payType}}</text>
				<text style="font-size: 26rpx;color: #5B5B5B;">支付时间：{{datalist.updateTime}}</text>
			</view>
		</view>
		
		<view class="rounded" v-for="(sitem,sindex) in datalist.addAmounts">
			<view class="bg-white mt-2 flex flex-column p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);" >
				<view class="flex justify-between">
					<text>{{sitem.msg}}</text>
					<text style="color: #FF0000;font-size: 26rpx;">￥{{sitem.amount}}</text>
				</view>
			</view>
			<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="font-size: 26rpx;color: #5B5B5B;">支付方式：{{sitem.payType}}</text>
				<text style="font-size: 26rpx;color: #5B5B5B;">订单号：{{sitem.orderId}}</text>
				<text style="font-size: 26rpx;color: #5B5B5B;">追加时间：{{sitem.createTime}}</text>
			</view>
		</view>
		
		
		
		<view class="flex justify-center align-center" style="height: 200rpx;">
			<text @click="Add()" class="rounded" style="color: #FFFFFF;font-size: 28rpx;background-color: #02B1BE;padding: 20rpx 80rpx;">追加</text>
		</view>
		
		<u-modal v-model="showModal" confirm-color="#ff9900" :show-cancel-button="true" title="录入你要追加的金额" @confirm="ModalConfirm" @cancel="ModalCancel">
			<view class="flex justify-center align-center my-5 px-5">
				<u-input input-align="center" :clearable="false" placeholder="请录入金额" v-model="Amount" type="number" :border="false" style="background-color: #EEEDED;" />
			</view>
		</u-modal>
		<u-popup v-model="ShowPopup" mode="bottom" border-radius="20" :closeable="true">
			<view class="flex justify-center align-center mb-2 mt-4">
				<text style="font-size: 36rpx;color: #000000;font-weight: bold;">支付方式</text>
			</view>
			<view class="flex justify-center align-center">
				<text style="font-size: 30rpx;color: #FF0000;font-weight: bold;">￥</text><text  style="font-size: 50rpx;color: #FF0000;font-weight: bold;">{{AdditionalAmount}}</text>
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
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				orderId:"",
				list: [{
						name: 'zhifubao',
						disabled: false
					},
					{
						name: 'weixin',
						disabled: false
					}
				],
				Amount:0,
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: 'zhifubao',
				datalist:"",
				ShowPopup: false,
				showModal:false,
				AdditionalAmount:''
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.datalist = JSON.parse(option.item);
			console.log(JSON.stringify(option))
		},
		methods: {
			// 追加按钮点击事件
			Add(){
				this.showModal = true;
			},
			// 追加金额确认
			ModalConfirm(){
				this.ShowPopup = true;
				this.AdditionalAmount = this.Amount;
				console.log("追加金额确认")
			},
			// 追加金额取消
			ModalCancel(){
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
				this.orderId = orderInfo.data.msg;
				uni.requestPayment({
					provider: PayId,
					orderInfo: orderInfo.data.dataList,
					success: (e) => {
						let appid = "";
						let Confirmsdatas = {
							payid: PayId,
							IsAdd: true,
							taskId: this.id,
							price: this.Amount,
							OrderId: this.orderId,
							number:  1
						};
						console.log(JSON.stringify(Confirmsdatas))
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
					IsAdd: true,
					taskId: this.id,
					price: this.Amount,
					OrderId:this.datalist.orderId
				};
console.log(JSON.stringify(datas))
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
	page{
		background-color: #f7f7f7;
	}
</style>
