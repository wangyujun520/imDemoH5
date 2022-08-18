<template>
	<view class="content">
		<view class="flex justify-between bg-white py-3 px-3">
			<view class="flex align-center" style="border: 0px solid red;">
				<view class="pb-2 mr-5" :class="item.key == dateValue?'yes':'no'" @tap="DateCheck(item)"
					style="font-size: 30rpx;" v-for="(item,index) in DateList" :key="item.key">
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="flex align-center px-3" style="background-color: #F7F7F7;color: #2A3C4A;" v-if="dateValue==1"
				@tap='dateClick'>
				<text style="font-size: 24rpx;font-weight: bold;">{{date_text}}</text>
				<text class="mx-3">|</text>
				<text class="iconfont" style="font-size: 40rpx;">&#xe6f7;</text>
			</view>
			<view class="flex align-center px-3" style="background-color: #F7F7F7;color: #2A3C4A;"
				v-else-if="dateValue==2" @tap='dateClick'>
				<text style="font-size: 24rpx;font-weight: bold;">{{date_text}}</text>
				<text class="mx-3">|</text>
				<text class="iconfont" style="font-size: 40rpx;">&#xe6f7;</text>
			</view>
			<view class="flex align-center px-3" style="background-color: #F7F7F7;color: #2A3C4A;" v-else
				@tap='dateClick'>
				<text style="font-size: 24rpx;font-weight: bold;">{{date_text}}</text>
				<text class="mx-3">|</text>
				<text class="iconfont" style="font-size: 40rpx;">&#xe6f7;</text>
			</view>
		</view>

		<view class="px-3 py-4 m-3 bg-white flex" style="border-radius: 20rpx;">
			<view class="flex flex-column align-center justify-center" style="width: 33.33%;">
				<text style="color: #101010;font-size: 28rpx;">待签订</text>
				<text class="mt-2" style="color: #FC7032;font-size: 60rpx;">10</text>
			</view>
			<view class="flex flex-column align-center justify-center" style="width: 33.33%;">
				<text style="color: #101010;font-size: 28rpx;">已完成</text>
				<text class="mt-2" style="color: #4A81AC;font-size: 60rpx;">05</text>
			</view>
			<view class="flex flex-column align-center justify-center" style="width: 33.33%;">
				<text style="color: #101010;font-size: 28rpx;">已退单</text>
				<text class="mt-2" style="color: #808080;font-size: 60rpx;">08</text>
			</view>
		</view>

		<view class="m-3 py-3 bg-white" style="border-radius: 20rpx;">
			<view class="flex flex-column px-3">
				<text style="color: #101010;font-weight: bold;font-size: 32rpx;">订单进行中</text>
				<view class="flex flex-column mt-3">

					<view class="flex justify-between align-center mb-3">
						<view class="flex align-center">
							<text class="iconfont" style="font-size: 38rpx;color: #2A3C4A;">&#xe6fa;</text>
							<text class="ml-1" style="font-size: 28rpx;color: #101010;">已签订设计合同</text>
						</view>
						<text class="mt-1" style="color: #888888;font-size: 28rpx;">23</text>
					</view>
					<view class="flex justify-between align-center mb-3">
						<view class="flex align-center">
							<text class="iconfont" style="font-size: 38rpx;color: #2A3C4A;">&#xe6fa;</text>
							<text class="ml-1" style="font-size: 28rpx;color: #101010;">第一笔费用待支付</text>
						</view>
						<text class="mt-1" style="color: #888888;font-size: 28rpx;">23</text>
					</view>
					<view class="flex justify-between align-center mb-3">
						<view class="flex align-center">
							<text class="iconfont" style="font-size: 38rpx;color: #2A3C4A;">&#xe6fa;</text>
							<text class="ml-1" style="font-size: 28rpx;color: #101010;">第二笔费用待支付</text>
						</view>
						<text class="mt-1" style="color: #888888;font-size: 28rpx;">23</text>
					</view>

				</view>
				<text style="color: #888888;font-size: 28rpx;">注：已接单记录所有已成功接单的数据</text>

				<view class="mb-5 mt-3" style="height:50rpx;border-bottom:1px dashed #D7D6D6;"></view>

				<text class="mt-3" style="color: #101010;font-weight: bold;font-size: 32rpx;">数据走势</text>
			</view>
			<view class="charts-box mt-3">
				<qiun-data-charts type="area" :opts="opts" :chartData="chartData" />
			</view>
		</view>

		<!-- 占位 -->
		<view class="" style="height: 30rpx;"></view>
		<u-picker mode="time" v-model="show1" :params="params1" @confirm="confirm" @cancel="cancel"></u-picker>
		<u-picker mode="time" v-model="show2" :params="params2" @confirm="confirm" @cancel="cancel"></u-picker>
		<u-picker mode="time" v-model="show3" :params="params3" @confirm="confirm" @cancel="cancel"></u-picker>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			var myDate = new Date();
			var reg = new RegExp('/', "g")
			var time = myDate.toLocaleDateString().replace(reg, '-');
			this.date_text = time;
		},
		onShow() {
			this.InitData();
		},
		data() {
			return {
				params1: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				params2: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				params3: {
					year: true,
					month: false,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				show1: false,
				show2: false,
				show3: false,
				dateValue: 1, //默认				
				DateList: [{
						name: '按日',
						key: 1
					},
					{
						name: '按月',
						key: 2
					},
					{
						name: '按年',
						key: 3
					}
				],
				YearColumns: [
					['2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年',
						'2023年', '2024年', '2025年', '2026年', '2027年', '2028年', '2029年', '2030年', '2031年', '2032年',
						'2033年', '2034年', '2035年'
					]
				],
				date_text: '2022-01-12',

				mode: 'single',
				catalog: '1', ////请求日期类型（1=日，2=月，3=年）
				datas: '', //接口数据
				success_data: '', //接口收入详情列表
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['area'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 15],
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						area: {
							type: "curve",
							opacity: 0.2,
							addLine: true,
							width: 2,
							gradient: true
						}
					}
				}
			}
		},
		methods: {
			// 初始化数据
			InitData() {
				let res = {
					categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
					series: [{
							name: "已签订",
							data: [35, 8, 25, 37, 4, 20]
						},
						{
							name: "已退单",
							data: [70, 40, 65, 100, 44, 68]
						}
					]
				};
				this.chartData = JSON.parse(JSON.stringify(res));
			},
			DateCheck(item) {
				if (item.key == 1) {
					if (this.dateValue != 1) {
						var myDate = new Date();
						var reg = new RegExp('/', "g")
						var time = myDate.toLocaleDateString().replace(reg, '-');

						this.date_text = time;
						this.dateValue = item.key;
						this.catalog = item.key; //请求日期类型（1=日，2=月，3=年）
						console.log(this.date_text)
						//请求数据
						// this.InitData();
					}
				}
				if (item.key == 2) {
					if (this.dateValue != 2) {
						var myDate = new Date();
						var reg = new RegExp('/', "g")

						var year = myDate.getFullYear();
						var month = myDate.getMonth();

						if (month < 9)
							month = "0" + (month + 1);

						this.date_text = year + "-" + month;
						this.dateValue = item.key;
						this.catalog = item.key; //请求日期类型（1=日，2=月，3=年）
						console.log(this.date_text)
						//请求数据
						this.InitData();
					}
				}
				if (item.key == 3) {
					if (this.dateValue != 3) {
						var myDate = new Date();
						var reg = new RegExp('/', "g")
						var year = myDate.getFullYear();
						this.date_text = year;
						this.dateValue = item.key;
						this.catalog = item.key; //请求日期类型（1=日，2=月，3=年）
						console.log(this.date_text)
						//请求数据
						this.InitData();
					}
				}

			},
			// 跳转到收款记录
			skipCollectionRecord() {
				if (this.datas.success_data.length == 0) {
					// 非空校验
					this.$refs.uToast.show({
						message: '暂无收入详情',
						type: 'warning'
					})
					return;
				};
				let datas = encodeURIComponent(JSON.stringify(this.datas.success_data))
				uni.navigateTo({
					url: '/pages/accounting-center/collection-record?datas=' + datas //传数据
				})
			},
			// 跳转到退款记录
			skipRefundRecord() {
				if (this.datas.refund_data.length == 0) {
					// 非空校验
					this.$refs.uToast.show({
						message: '暂无退款详情',
						type: 'warning'
					})
					return;
				};
				let refundDatas = encodeURIComponent(JSON.stringify(this.datas.refund_data))
				uni.navigateTo({
					url: '/pages/accounting-center/refund-record?datas=' + refundDatas //传数据
				})
			},
			// 点击时间触发
			dateClick() {
				if (this.dateValue == 1) {
					this.show1 = true;
				}
				if (this.dateValue == 2) {
					this.show2 = true;
				}
				if (this.dateValue == 3) {
					this.show3 = true;
				}
			},
			confirm(e) {
				if (this.dateValue == 1) {
					this.date_text = e.year + '-' + e.month + '-' + e.day;
					this.show1 = false;
				} else if (this.dateValue == 2) {
					this.date_text = e.year + '-' + e.month;
					this.show2 = false;
				} else {
					this.date_text = e.year;
					this.show3 = false;
				}
				// this.InitData();
			},
			// 点击关闭时间选择
			cancel() {
				this.show1 = false;
				this.show2 = false;
				this.show3 = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.yes {
		border-bottom: 3px solid #FC7032;
		color: #FC7032;
	}

	.no {
		border-bottom: 3px solid #FFFFFF;
		color: #101010;
	}
</style>
<style>
	page {
		background-color: #F7F7F7;
	}

	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 400rpx;
	}
</style>
