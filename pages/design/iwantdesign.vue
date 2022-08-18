<template>

	<view class="content">
		<view class="p-3" style="width: 750rpx;height: 240rpx;">
			<view @tap="skipMyProperty" class="bg-white flex align-center justify-center position-relative"
				style="width: 100%;height: 100%;">
				<text
					style="color: #101010;font-size: 40rpx;font-weight: bold;">{{DataList.house_text==''?'请选择您要设计的房产':DataList.house_text}}</text>
				<u-icon name="arrow-right" class="position-absolute" style="font-size: 28rpx;color: #777;right: 30rpx;">
				</u-icon>
			</view>
		</view>

		<view class="flex flex-column bg-white px-3 mt-3">
			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">预算金额</text>
				<view class="flex align-center">
					<u-input type="number" v-model="DataList.money" input-align="right" placeholder="请输入预算金额"
						placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
				</view>
			</view>

			<view @tap="showStyle=true" class="flex align-center bg-white justify-between border-bottom"
				style="height: 100rpx;">
				<text>风格</text>
				<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
					<text class="mr-1">{{DataList.house_style_text||'请选择'}}</text>
					<u-icon name="arrow-right" color="#888" size="28"></u-icon>
				</view>
			</view>

			<view @tap="showDay=true" class="flex align-center bg-white justify-between border-bottom"
				style="height: 100rpx;">
				<text>任务周期</text>
				<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
					<text class="mr-1">{{DataList.day_text||'请选择'}}</text>
					<u-icon name="arrow-right" color="#888" size="28"></u-icon>
				</view>
			</view>

			<view @tap="showDecorationTime=true" class="flex align-center bg-white justify-between border-bottom"
				style="height: 100rpx;">
				<text>预计装修时间</text>
				<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
					<text class="mr-1">{{DataList.start_date||'请选择'}}</text>
					<u-icon name="arrow-right" color="#888" size="28"></u-icon>
				</view>
			</view>

			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">常住人口</text>
				<view class="flex align-center">
					<u-input type="number" maxlength="3" v-model="DataList.people_count" input-align="right" placeholder="请输入常住人口"
						placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
				</view>
			</view>

			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">特殊需求</text>
				<view class="flex align-center">
					<u-input type="text" v-model="DataList.content" input-align="right" placeholder="请输入特殊需求"
						placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
				</view>
			</view>

		</view>

		<!-- <view class="flex bg-white justify-between px-3 border-bottom" style="height: 120rpx;">
			<view @click="SwitchingDesign" class="flex justify-center align-center">
				<text :class="DataList.fee_status==1?'yes':'no'">免费设计</text>
			</view>
			<view @click="SwitchingDesign" class="flex justify-center align-center">
				<text :class="DataList.fee_status==0?'yes':'no'">有偿设计</text>
			</view>
		</view> -->
		
		<view class="bg-white px-3">
			<view class="flex align-center" style="height: 100rpx;">
				<text class="form-title-style" style="width: 160rpx;">悬赏</text>
				<view class="flex align-center">
					<u-switch v-model="IsFee" @change="switchChange"></u-switch>
					<!-- <u-input type="text" v-model="DataList.fee" input-align="right" placeholder="请输入悬赏金额"
						placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" /> -->
				</view>
			</view>
		</view>
		
		<view class="bg-white px-3">
			<view class="flex align-center position-relative" style="height: 120rpx;margin-top: -30rpx;">
				<text class="form-title-style" style="width: 160rpx;border: 0px solid red;">悬赏金额</text>
				<u-input type="text" v-model="DataList.fee" input-align="left" placeholder="请输入悬赏金额"
					placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
				<view v-if="!IsFee" class="position-absolute" style="width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.5);">
					
				</view>
			</view>
		</view>

		<view class="w-100 flex justify-center align-center" style="height: 150rpx;">
			<text @click="PublishTask" class="text-white rounded"
				style="background-color: #FF9900;font-size: 30rpx;padding: 16rpx 240rpx;">发布任务</text>
		</view>

		<!-- 模态框 -->
		<u-mask class="flex justify-center align-center" :show="show">
			<view class="bg-white rounded" style="width: 500rpx;height: 800rpx">
				<view class="flex justify-center align-center" style="height: 100rpx;">
					<text style="color: #101010;font-size: 28rpx;font-weight: bold;">发布设计说明</text>
				</view>
				<view class="bg-white px-2" style="height: 620rpx;font-size: 26rpx;">
					<scroll-view scroll-y="true" style="height: 100%;">
						<view class="" v-html="content">

						</view>
						<!-- <u-parse :content="" @navigate="navigate"></u-parse> -->
						<!-- <view class="flex" v-html="Explain.content">
							
						</view> -->
						<!-- {{Explain.content}} -->
					</scroll-view>
				</view>
				<view class="flex" style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);">
					<view class="flex justify-center align-center" style="width: 50%;height: 100%;">
						<text @click="refuse" style="color: #666;font-size: 28rpx;">不同意</text>
					</view>
					<view class="flex justify-center align-center"
						style="width: 50%;height: 100%;border-left: 1px solid rgba(187,187,187,0.2);">
						<text @click="show = false" style="color: #FF9900;font-size: 28rpx;">同意并继续</text>
					</view>
				</view>
			</view>
		</u-mask>
		<!-- 风格 -->
		<u-select v-model="showStyle" :list="HouseStyleList" @confirm="SelectStyle"></u-select>
		<!-- 日期选择 -->
		<u-select v-model="showDay" :list="dayList" :default-value="defaultValue" @confirm="SelectDay"></u-select>
		<u-picker mode="time" v-model="showDecorationTime" @confirm="confirm"></u-picker>
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
		<u-toast ref="uToast"></u-toast>
	</view>

</template>

<script>
	import uParse from "@/components/feng-parse/parse.vue"
	export default {
		components: {
			uParse
		},
		data() {
			return {
				order_money_id:'',
				IsFee:false,
				defaultValue: [29],
				ShowPopup: false,
				list: [{
						name: 'zhifubao',
						disabled: false
					},
					{
						name: 'weixin',
						disabled: false
					}
				],
				value: 'zhifubao',
				ShowPay: true,
				PayList: [],
				pay_id:'',
				content: '',
				show: false,
				Paid: false,
				SwitchChecked: false,
				DecorationTime: '', //预计装修时间
				showDecorationTime: false,
				Explain: [],
				showStyle: false,
				HouseStyleList: [],
				DataList: {
					house_id: "", //我的房产id
					house_text: "", //我的房产显示
					money: '', //预算金额
					house_style: '', //风格类型，用于跳转
					day: '', //天数
					day_text: '', //天数显示
					start_date: "", //计划装修时间
					people_count: '', //长住人员数量
					content: "", //特殊要求
					fee_status: 1, //是否开启佣金；0=开启；1=关闭
					fee: '' //悬赏金额
				}, //Mock数据
				xiangmu: [],
				DesignID: "",
				showDay: false,
				dayList: []
			};
		},
		onLoad(option) {
			// this.show = true; //显示模态框
			this.dayList = [];
			for (var i = 1; i <= 60; i++) {
				this.dayList.push({
					value: i,
					label: i + '天'
				})
			}
		},
		onShow() {
			this.$post(this.$url.Article.GetArticle, {
				sign: "design_arg"
			}, {}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.content = res.data.content
				}
			})
			// 获取风格数据字典
			this.$post(this.$url.Public.GetDicts, {
				key: "house_style"
			}, {}).then(res => {
				res.data.forEach(item => {
					let style = {
						value: item.key,
						label: item.value
					}
					this.HouseStyleList.push(style)
				})
			})
		},
		methods: {
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
							// setTimeout(() => {
							// 	this.$refs.uToast.show({
							// 		title: '支付成功！',
							// 		type: 'success'
							// 	})
							// }, 100)
							// // 刷新当前页面
							// this.InitData();
							this.$refs.uToast.show({
								title: '支付成功！',
								type: 'success'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},2000)
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
						orderInfo: JSON.parse(res.data),
						success: res => {
							this.ShowPopup = false; //关闭弹窗
							// setTimeout(() => {
							// 	this.$refs.uToast.show({
							// 		title: '支付成功！',
							// 		type: 'success'
							// 	})
							// }, 100)
							// // 刷新当前页面
							// this.InitData();
							this.$refs.uToast.show({
								title: '支付成功！',
								type: 'success'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},2000)
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
			// 选择风格
			SelectStyle(e) {
				this.DataList.house_style_text = e[0].label;
				this.DataList.house_style = e[0].value;
			},
			SelectDay(e) {
				this.DataList.day_text = e[0].label;
				this.DataList.day = e[0].value;
			},
			// 跳转到我的房产
			skipMyProperty() {
				uni.navigateTo({
					url: '/pages/design/my_property'
				})
			},
			navigate(e) {
				console.log(e)
			},
			refuse() {
				console.log("fdsafdsa")
				uni.switchTab({
					url: '/pages/tabBar/settle/settle'
				})
			},
			openingTime() {
				this.showDecorationTime = true
			},
			confirm(e) {
				console.log(JSON.stringify(e))
				this.DataList.start_date = e.year + '-' + e.month + '-' + e.day;
			},
			// 跳转到风格界面
			skipStyle() {
				// uni.navigateTo({
				// 	url: '/pages/TaskOrder/MyCase/Style?style=' + this.DataList.houseStyle
				// })
			},
			skipIncludeProject() {
				// 跳转到我要设计界面
				uni.navigateTo({
					url: '/pages/design/Includeproject?list=' + JSON.stringify(this.xiangmu)
				})
			},
			switchChange(e) {
				// this.SwitchChecked = e.target.value;
				this.IsFee = e;
				console.log(e)
				if(!e){
					this.DataList.fee = ''
				}
			},
			// 提交
			PublishTask() {
				// 非空校验
				if ((this.DataList.house_id ?? '') == '') {
					this.$refs.uToast.show({
						title: '请选择房产',
						type: 'warning'
					})
					return
				}
				if ((this.DataList.money ?? '') == '') {
					this.$refs.uToast.show({
						title: '请输入预算金额',
						type: 'warning'
					})
					return
				}
				if ((this.DataList.house_style ?? '') == '') {
					this.$refs.uToast.show({
						title: '请选择风格',
						type: 'warning'
					})
					return
				}
				if ((this.DataList.day ?? '') == '') {
					this.$refs.uToast.show({
						title: '请选择任务周期',
						type: 'warning'
					})
					return
				}
				if ((this.DataList.start_date ?? '') == '') {
					this.$refs.uToast.show({
						title: '请选择计划装修时间',
						type: 'warning'
					})
					return
				}
				if ((this.DataList.people_count ?? '') == '') {
					this.$refs.uToast.show({
						title: '请输入常住人口',
						type: 'warning'
					})
					return
				}
				// if ((this.DataList.content ?? '') == '') {
				// 	this.$refs.uToast.show({
				// 		title: '请输入特殊要求',
				// 		type: 'warning'
				// 	})
				// 	return
				// }
				if (this.IsFee) {
					if ((this.DataList.fee ?? '') == '') {
						this.$refs.uToast.show({
							title: '请输入悬赏金额',
							type: 'warning'
						})
						return
					}
				}
				let requestData = {
					house_id: this.DataList.house_id, //我的房产id
					money: this.DataList.money, //预算金额
					house_style: this.DataList.house_style, //风格类型，用于跳转
					day: this.DataList.day, //天数
					start_date: this.DataList.start_date, //计划装修时间
					people_count: this.DataList.people_count, //长住人员数量
					content: this.DataList.content, //特殊要求
					// fee_status: this.DataList.fee_status, //是否开启佣金；0=开启；1=关闭
					fee_status: this.IsFee?'0':'1', //是否开启佣金；0=开启；1=关闭
					fee: this.DataList.fee //悬赏金额
				}
				// 我要设计
				this.$post(this.$url.Design.Post, requestData, {
					isLoading: true,
					loadingTitle: '发布任务中...'
				}).then(res => {
					if(res.data.pay_status==1){
						this.order_money_id = res.data.order_money_id;
						// 需要调用支付
						this.pay()
					}else{
						// 任务发布成功
						this.$refs.uToast.show({
							title: '发布任务成功',
							type: 'success'
						});
						setTimeout(() => {
							// 两秒之后返回上一个界面
							uni.navigateBack({
								delta: 1
							});
						}, 2000);
					}
					
				})
			},
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
			AddressSelect() {
				// 跳转到房产地址选择界面
				uni.navigateTo({
					url: '/pages/map/mapsearch'
				})
			},
			SwitchingDesign() {
				console.log(this.DataList.fee_status)
				if (this.DataList.fee_status === 0) {
					this.DataList.fee_status = 1
				} else {
					this.DataList.fee_status = 0
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	// 隐藏scroll-view的滚动条
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}

	.yes {
		color: #FF9900;
		background-color: #FFF8F1;
		border: 1px solid #FF9900;
		padding: 10rpx 80rpx;
		border-radius: 30rpx;
	}

	.no {
		color: #101010;
		background-color: #FFFFFF;
		border: 1px solid #101010;
		padding: 10rpx 80rpx;
		border-radius: 30rpx;
	}
</style>
<style>
	page {
		background-color: #F7F7F7;
	}
</style>
