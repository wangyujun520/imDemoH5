<template>
	<view class="content">
		<view class="flex m-3" style="background-color: #FE583C;height: 180rpx;border-radius: 20rpx;">
			<view @tap="skipCommission" class="flex flex-column align-center justify-center" style="width: 33.33%;">
				<text style="color: #ffffff;font-size: 36rpx;">564.15</text>
				<text style="color: #E1E1E1;font-size: 26rpx;">今日佣金</text>
			</view>
			<view @tap="skipReferrer" class="flex flex-column align-center justify-center" style="width: 33.33%;">
				<text style="color: #ffffff;font-size: 36rpx;">12</text>
				<text style="color: #E1E1E1;font-size: 26rpx;">今日推荐</text>
			</view>
			<view @tap="skipShareRecords" class="flex flex-column align-center justify-center" style="width: 33.33%;">
				<text style="color: #ffffff;font-size: 36rpx;">55</text>
				<text style="color: #E1E1E1;font-size: 26rpx;">今日分享</text>
			</view>
		</view>

		<view class="m-3 p-3 bg-white" style="border-radius: 20rpx;">
			<text style="color: #666;font-weight: bold;font-size: 28rpx;">营销管理</text>
			<view class="flex mt-3">
				<view @tap="skipDesignOrder" class="flex flex-column justify-center align-center" style="width: 25%;">
					<view class="flex align-center justify-center"
						style="background-color: #DC6448;border-radius: 50%;width: 90rpx;height: 90rpx;">
						<text class="iconfont text-white" style="font-size: 40rpx;">&#xe6fd;</text>
					</view>
					<text class="mt-1" style="color: #808285;font-size: 28rpx;">设计订单</text>
				</view>
				<view class="flex flex-column justify-center align-center" style="width: 25%;">
					<view class="flex align-center justify-center"
						style="background-color: #76C2E6;border-radius: 50%;width: 90rpx;height: 90rpx;">
						<text class="iconfont text-white" style="font-size: 40rpx;">&#xe6fb;</text>
					</view>
					<text class="mt-1" style="color: #808285;font-size: 28rpx;">施工订单</text>
				</view>
				<view class="flex flex-column justify-center align-center" style="width: 25%;">
					<view class="flex align-center justify-center"
						style="background-color: #70CE80;border-radius: 50%;width: 90rpx;height: 90rpx;">
						<text class="iconfont text-white" style="font-size: 40rpx;">&#xe6fc;</text>
					</view>
					<text class="mt-1" style="color: #808285;font-size: 28rpx;">材料订单</text>
				</view>
				<view @tap="skipReferrer" class="flex flex-column justify-center align-center" style="width: 25%;">
					<view class="flex align-center justify-center"
						style="background-color: #EAAC00;border-radius: 50%;width: 90rpx;height: 90rpx;">
						<text class="iconfont text-white" style="font-size: 40rpx;">&#xe6fe;</text>
					</view>
					<text class="mt-1" style="color: #808285;font-size: 28rpx;">推荐人</text>
				</view>
			</view>
		</view>

		<view class="flex align-center m-3">
			<view class="flex align-center justify-center" :class="showOrder?'yes':'no'" @tap="showOrder=true">
				<text style="font-size: 24rpx;">订单数据</text>
			</view>
			<view class="flex align-center justify-center ml-3" :class="!showOrder?'yes':'no'" @tap="showOrder=false">
				<text style="font-size: 24rpx;">财务数据</text>
			</view>
		</view>

		<view v-if="showOrder==true" class="m-3 py-3 bg-white" style="border-radius: 20rpx;">
			<view class="flex flex-column px-3">
				<text style="color: #666;font-weight: bold;font-size: 28rpx;">推荐订单</text>
				<view class="flex flex-wrap mt-3">
					<view class="flex flex-column justify-center align-center mb-3" style="width: 33.33%;">
						<text style="font-size: 26rpx;color: #666666;">22</text>
						<text class="mt-1" style="color: #B5B5B5;font-size: 28rpx;">装修订单数</text>
					</view>
					<view class="flex flex-column justify-center align-center mb-3" style="width: 33.33%;">
						<text style="font-size: 26rpx;color: #666666;">22</text>
						<text class="mt-1" style="color: #B5B5B5;font-size: 28rpx;">施工订单数</text>
					</view>
					<view class="flex flex-column justify-center align-center mb-3" style="width: 33.33%;">
						<text style="font-size: 26rpx;color: #666666;">22</text>
						<text class="mt-1" style="color: #B5B5B5;font-size: 28rpx;">材料订单数</text>
					</view>
					<view class="flex flex-column justify-center align-center mb-3" style="width: 33.33%;">
						<text style="font-size: 26rpx;color: #666666;">22</text>
						<text class="mt-1" style="color: #B5B5B5;font-size: 28rpx;">装修退单</text>
					</view>
					<view class="flex flex-column justify-center align-center mb-3" style="width: 33.33%;">
						<text style="font-size: 26rpx;color: #666666;">22</text>
						<text class="mt-1" style="color: #B5B5B5;font-size: 28rpx;">施工退单</text>
					</view>
					<view class="flex flex-column justify-center align-center mb-3" style="width: 33.33%;">
						<text style="font-size: 26rpx;color: #666666;">22</text>
						<text class="mt-1" style="color: #B5B5B5;font-size: 28rpx;">材料退单</text>
					</view>
				</view>
			</view>
			<view class="charts-box mt-3">
				<qiun-data-charts type="area" :opts="opts" :chartData="chartData" />
			</view>
		</view>
		
		<view v-if="showOrder==false" class="m-3 py-3 bg-white" style="border-radius: 20rpx;">
			<view class="flex flex-column px-3">
				<text style="color: #666;font-weight: bold;font-size: 28rpx;">佣金收入</text>
				<view class="flex flex-wrap mt-3">
					<view class="flex flex-column justify-center align-center mb-3" style="width: 33.33%;">
						<text style="font-size: 26rpx;color: #666666;">81,199</text>
						<text class="mt-1" style="color: #B5B5B5;font-size: 28rpx;">推荐佣金</text>
					</view>
					<view class="flex flex-column justify-center align-center mb-3" style="width: 33.33%;">
						<text style="font-size: 26rpx;color: #666666;">6,756</text>
						<text class="mt-1" style="color: #B5B5B5;font-size: 28rpx;">退款佣金</text>
					</view>
					<view class="flex flex-column justify-center align-center mb-3" style="width: 33.33%;">
						<text style="font-size: 26rpx;color: #666666;">6,660</text>
						<text class="mt-1" style="color: #B5B5B5;font-size: 28rpx;">待发佣金</text>
					</view>
				</view>
			</view>
			<view class="charts-box mt-3">
				<qiun-data-charts type="area" :opts="opts" :chartData="chartData" />
			</view>
		</view>
		
		
		<!-- 占位 -->
		<view class="" style="height: 30rpx;"></view>

	</view>
</template>

<script>
	export default {
		// onReady() {
		// 	this.getServerData();
		// },
		onShow() {
			let res = {
				categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
				series: [{
						name: "装修",
						data: [35, 8, 25, 37, 4, 20]
					},
					{
						name: "施工",
						data: [70, 40, 65, 100, 44, 68]
					},
					{
						name: "材料",
						data: [100, 80, 95, 150, 112, 132]
					}
				]
			};
			this.chartData = JSON.parse(JSON.stringify(res));
		},
		data() {
			return {
				showOrder: true,
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['area'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
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
			getServerData() {
				//模拟从服务器获取数据时的延时
				// setTimeout(() => {
				// 	//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					
				// }, 500);
			},
			// 跳转到佣金
			skipCommission(){
				uni.navigateTo({
					url:'/pages/UserLive/PromotionCenter/Commission'
				})
			},
			// 跳转到分享记录
			skipShareRecords(){
				uni.navigateTo({
					url:'/pages/UserLive/PromotionCenter/ShareRecords'
				})
			},
			// 跳转到推荐人
			skipReferrer(){
				uni.navigateTo({
					url:'/pages/UserLive/PromotionCenter/Referrer'
				})
			},
			// 跳转到设计订单
			skipDesignOrder(){
				uni.navigateTo({
					url:'/pages/UserLive/PromotionCenter/DesignOrder'
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.yes {
		background-color: #FE583C;
		color: #ffffff;
		width: 150rpx;
		height: 56rpx;
		border-radius: 40rpx;
	}

	.no {
		background-color: #f7f7f7;
		color: #444;
		width: 150rpx;
		height: 56rpx;
		border-radius: 40rpx;
	}

	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 400rpx;
	}
</style>
