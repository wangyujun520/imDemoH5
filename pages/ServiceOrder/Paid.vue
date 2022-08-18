<template>
	<view class="content">
		<view class="flex flex-column p-2">
			<view class="rounded mb-2" v-for="(item,index) in DataList">
				<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">{{item.title}}</text>
						<text style="color: #FF0000;font-size: 26rpx;">￥{{item.money}}</text>
					</view>
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">{{item.des}}</text>
						<text style="color: #02B1BE;font-size: 26rpx;">{{item.status_text}}</text>
					</view>
				</view>
				<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
					<text style="font-size: 26rpx;color: #5B5B5B;">订单号：{{item.money_no}}</text>
					<text style="font-size: 26rpx;color: #5B5B5B;">订单时间：{{item.create_time}}</text>
				</view>
				<view v-if="item.status == 0 && module=='user'" class="flex align-center justify-between bg-white position-relative">
					<view class="flex flex-column w-100 p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
						<text v-if="item.pay_catalog_text" style="font-size: 26rpx;color: #5B5B5B;">支付方式：{{item.pay_catalog_text}}</text>
						<text v-if="item.pay_catalog_text" style="font-size: 26rpx;color: #5B5B5B;">支付时间：{{item.pay_time}}</text>
					</view>
					<view  @tap="tuikuan(item)" class="flex align-center justify-center rounded position-absolute" style="width: 140rpx;height: 60rpx;background-color: #ff9900;right: 30rpx;">
						<text class="text-white" style="font-size: 24rpx;">申请退款</text>
					</view>
				</view>
				
				<view v-if="item.status == 1 && module=='user'" style="height: 110rpx;" class="flex align-center justify-end pr-3 bg-white position-relative">
					<view @tap="pay2(item)" class="flex align-center justify-center rounded" style="width: 140rpx;height: 60rpx;background-color: #ff9900;right: 30rpx;">
						<text class="text-white" style="font-size: 24rpx;">去支付</text>
					</view>
				</view>
				
			</view>
		</view>
		
		
		
		<!-- <view class="rounded">
			<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #5B5B5B;">第一笔费用支付</text>
					<text style="color: #FF0000;font-size: 26rpx;">￥1799.80</text>
				</view>
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #5B5B5B;">签订合同后支付20%</text>
					<text style="color: #02B1BE;font-size: 26rpx;">已支付</text>
				</view>
			</view>
			<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="font-size: 26rpx;color: #5B5B5B;">订单号：202013322124563213</text>
				<text style="font-size: 26rpx;color: #5B5B5B;">订单时间：2020-01-01 08:08:20</text>
			</view>
			<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="font-size: 26rpx;color: #5B5B5B;">支付方式：支付宝支付</text>
				<text style="font-size: 26rpx;color: #5B5B5B;">支付时间：2020-01-01 14:28:40</text>
			</view>
		</view> -->
		
		<!-- <view class="rounded">
			<view class="bg-white mt-2 flex flex-column p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex justify-between">
					<text>第 1 笔追加金额</text>
					<text style="color: #FF0000;font-size: 26rpx;">￥100.00</text>
				</view>
			</view>
			<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="font-size: 26rpx;color: #5B5B5B;">追加方式：微信支付</text>
				<text style="font-size: 26rpx;color: #5B5B5B;">追加时间：2020-01-01 14:56:33</text>
			</view>
		</view>
		
		<view class="rounded">
			<view class="bg-white mt-2 flex flex-column p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex justify-between">
					<text>第 2 笔追加金额</text>
					<text style="color: #FF0000;font-size: 26rpx;">￥800.00</text>
				</view>
			</view>
			<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text style="font-size: 26rpx;color: #5B5B5B;">追加方式：支付宝支付</text>
				<text style="font-size: 26rpx;color: #5B5B5B;">追加时间：2020-01-01 14:56:33</text>
			</view>
		</view> -->
		
		
		<!-- AppendFee -->
		
		<!-- 占位 -->
		<!-- <view class="" style="height: 140rpx;"></view> -->
		
		<!-- <view class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white justify-end" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center justify-end pr-2">
					
					<text @click="AppendFee" class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						追加
					</text>
				</view>
			</view>
		</view> -->
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
		
		<u-modal v-model="showModal" confirm-color="#ff9900" :show-cancel-button="true" title="录入你要追加的金额" @confirm="ModalConfirm" @cancel="ModalCancel">
			<view class="flex justify-center align-center my-5 px-5">
				<!-- <input type="number" placeholder="请录入金额" v-model="Amount" style="background-color: #EEEDED;"> -->
				<u-input input-align="center" :clearable="false" placeholder="请录入金额" v-model="Amount" type="number" :border="false" style="background-color: #EEEDED;" />
			</view>
		</u-modal>
		
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default{
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				if (this.module != 'user') {
					return;
				}
				this.showModal = true;
			}
		},
		onLoad(options) {
			// 动态修改标题
			uni.setNavigationBarTitle({
				title: options.title
			});
			this.module = options.module;
			this.code = options.code;
			// this.order_money_id = options.id;
			this.catalog = options.catalog;
			this.order_id = options.order_id;
		},
		onShow() {
			if(this.module != 'user'){
				//#ifdef H5
				setTimeout(() => {
					document.querySelectorAll('.uni-page-head .uni-page-head-ft .uni-page-head-btn')[0]
						.querySelector('.uni-btn-icon').innerText = ' ';
				}, 10)
				//#endif
				// #ifdef APP-PLUS
				var currentWebview = this.$mp.page.$getAppWebview();
				currentWebview.setTitleNViewButtonStyle(0, { //h5端会报错
					text: ' '
				});
				// #endif
			}
			this.InitData();
		},
		data(){
			return{
				showModal:false,
				ShowPopup:false,
				Amount:'',//金额
				fee:'',
				module:'',
				code:'',
				order_money_id:'',
				catalog:'',
				order_id:'',
				DataList:[],
				PayList: [],
				pay_id: '', //支付id
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
				ShowPay:true
			}
		},
		methods:{
			// 立即支付点击事件
			pay() {
				// 获取支付通道
				this.$post(this.$url.Task.GetPays, {
					order_money_id: this.order_money_id
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					console.log(JSON.stringify(res))
					this.PayList = res.data;
					this.ShowPopup = true;
				});
			},
			// 立即支付点击事件
			pay2(item) {
				this.order_money_id = item.order_money_id;
				// 获取支付通道
				this.$post(this.$url.Task.GetPays, {
					order_money_id: item.order_money_id
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					console.log(JSON.stringify(res))
					this.PayList = res.data;
					this.ShowPopup = true;
				});
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
			
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
					order_money_id: this.order_money_id,
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
					order_money_id: this.order_money_id,
					pay_id: this.pay_id
				}, {
					isLoading: false,
					loadingTitle: ''
				}).then(res => {
					console.log(res.data)
					uni.requestPayment({
						provider: 'wxpay',
						// orderInfo:'服务端生成的支付订单信息',
						orderInfo:JSON.parse(res.data),
						success: res => {
							this.ShowPopup = false;//关闭弹窗
							setTimeout(()=>{
								this.$refs.uToast.show({
									title: '支付成功！',
									type: 'success'
								})
							},100)
							// 刷新当前页面
							this.InitData();
						},
						fail: err => {
							console.log('fail:' + JSON.stringify(err));
							this.ShowPopup = false;//关闭弹窗
							uni.showToast({
								title:'支付取消',
								icon:'none',
								duration:2000
							})
						}
					});
				});
			},
			// 追加金额确认
			ModalConfirm(){
				this.$post(this.$url.Task.AppendFee, {
					order_id: this.order_id, //订单id
					fee: this.Amount, //追加金额
					code: this.code ,//节点编码，fee=悬赏
					catalog:this.catalog
				}, {}).then(res => {
					this.order_money_id = res.data.order_money_id;
					// this.ShowPopup = true;
					this.pay();
				});
				
				
				// this.fee
				
				// this.AdditionalAmount = this.Amount;
				console.log("追加金额确认")
			},
			// 追加金额取消
			ModalCancel(){
				console.log("追加金额取消")
			},
			// 追加
			AppendFee(){
				this.showModal = true;
				
				// // 获取订单支付明细
				// this.$post(this.$url.Task.AppendFee, {
				// 	order_id: "3bf16e8f-0f19-4ac3-ad17-989f0db35377", //订单id
				// 	fee: "0.1", //追加金额
				// 	code: "" //节点编码，fee=悬赏
				// }, {
				// 	isLoading: false,
				// 	loadingTitle: ''
				// }).then(res => {
				// 	this.$refs.uToast.show({
				// 		title: `追加成功`,
				// 		type: 'success'
				// 	});
				// 	this.InitData();//刷新当前页面
				// });	
			},
			InitData(){
				// 获取订单支付明细
				this.$post(this.$url.Task.GetOrderMoneys, {
					// order_money_id:this.order_money_id,
					catalog:this.catalog,
					order_id:this.order_id,
					code:this.code
				}, {
					isLoading: false,
					loadingTitle: ''
				}).then(res => {
					this.DataList = res.data;
				});	
			},
			tuikuan(item){
				// this.module = options.module;
				// this.code = options.code;
				// this.order_money_id = options.id;
				// this.catalog = options.catalog;
				// this.order_id = options.order_id;
				
				
				uni.navigateTo({
					url:`/pages/ServiceOrder/Pay/RefundRequest?module=${this.module}&code=${this.code}&order_money_id=${item.order_money_id}&catalog=${this.catalog}&order_id=${this.order_id}`
				})
				// uni.showModal({
				// 	title: '提示',
				// 	content: `平台审核之后，支付金额将原路返回到账号，真的要申请退款吗？`,
				// 	success: (res)=> {
				// 		if (res.confirm) {
				// 			//0=接受；1=拒绝
				// 			this.$post(this.$url.Task.ApplyRefund, {
				// 				order_money_id: item.order_money_id
				// 			}, {}).then(res => {
				// 				// 成功
				// 				this.$refs.uToast.show({
				// 					title: `退款申请成功`,
				// 					type: 'success'
				// 				});
				// 				this.InitData();//刷新当前页面
				// 				// setTimeout(() => {
				// 				// 	// 两秒之后返回上一个界面
				// 				// 	uni.navigateBack({
				// 				// 		delta: 1
				// 				// 	});
				// 				// }, 2000);
				// 			});
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
