<template>
	<view class="content">
		<view class="p-2">
			<view class="p-2 flex flex-column bg-white rounded">
				<text style="color: #666;font-size: 26rpx;">订单号：202013322124563213</text>
				<view class="flex py-2 px-3 my-2 justify-between align-center rounded" style="background-color: #F7F7F7;">
					<view class="flex align-center">
						<image class="rounded" src="/static/img/head/demo6.jpg" style="width: 100rpx;height: 100rpx;"></image>
						<view class="flex flex-column ml-2">
							<view class="flex align-center">
								<text>咚咚锵</text>
								<text class="iconfont" style="font-size: 30rpx;color: #FF9900;">&#xe69d;</text>
							</view>
							<text style="color: #666;font-size: 26rpx;">设计师服务费</text>
						</view>
					</view>
					<view class="flex align-end" style="height: 80rpx;">
						<!-- <u-input v-model="pricevalue" :type="type" :border="false" :input-align="right" /> -->
						<u-input v-model="pricevalue" type="number" :border="false" input-align="right" placeholder="请填写价格" />
						<!-- <text style="color: #E51C23;font-size: 20rpx;">￥<span style="font-size: 30rpx;font-weight: bold;">8999.00</span></text> -->
					</view>
				</view>

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
				</view>
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

			<view class="flex my-2">
				<text style="color: #888;font-size: 26rpx;">提交订单即视为同意</text>
				<text style="color: #02B1BE;font-size: 26rpx;">《用户服务协议》</text>
				<text style="color: #02B1BE;font-size: 26rpx;">《隐私政策》</text>
			</view>
		</view>

		<view class="position-absolute bg-white" style="width: 750rpx;height: 100rpx;bottom: 0;">
			<view class="flex align-center justify-between px-3" style="width: 100%;height: 100%;">
				<view class="">
					<text style="color: #E51C23;font-size: 28rpx;">￥<span style="font-size: 40rpx;font-weight: bold;">8999.00</span></text>
				</view>
				<view class="flex align-center">
					<!-- <text style="font-size: 32rpx;color: #888;">待支付</text> -->
					<view @click="submit" class="flex justify-center align-center ml-2 rounded" style="background-color: #FF9900;width: 180rpx;height: 70rpx;">
						<text style="color: #FFFFFF;">补差</text>
					</view>
					<view @click="submit" class="flex justify-center align-center ml-2 rounded" style="background-color: #FF9900;width: 180rpx;height: 70rpx;">
						<text style="color: #FFFFFF;">打赏</text>
					</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
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
			};
		},
		methods: {
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
				console.log(orderInfo.statusCode);
				// orderInfo 的值：见下方
				if (orderInfo.statusCode !== 200) {
					console.log("获得订单信息失败", orderInfo);
					uni.showModal({
						content: "获得订单信息失败",
						showCancel: false
					})
					return;
				}
				uni.requestPayment({
					provider: PayId,
					orderInfo: orderInfo.data.dataList,
					success: (e) => {
						console.log("success", e);
						uni.showToast({
							title: "感谢您的赞助!"
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
				// #ifdef APP-PLUS
				appid = plus.runtime.appid; // appid：
				console.log(appid)
				// #endif
				let datas = {
					payid: e,
					appid:appid,
					total:this.price
				};
						
				let url = this.AJB.BizUrl + "api/Pay/payment";
				return new Promise((res) => {
					uni.request({
						url: url,
						method:"POST",
						data: datas,
						success: (result) => {
							res(result);
							
						},
						fail: (e) => {
							res(e);
						}
					})
				})
			},
			submit() {
				this.toPay(this.value);
				console.log(this.value)
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
</style>
