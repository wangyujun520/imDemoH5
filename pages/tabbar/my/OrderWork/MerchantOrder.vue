<template>
	<view class="content">

		<view class="" @click="skipOrderDetails(item)" v-for="(item, index) in DataList" :key="index">
			<view class="flex flex-column m-2">
				<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
					<view class="flex align-center" style="height: 140rpx;">
						<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
							<image class="rounded" :src="item.header" style="width: 100rpx;height: 100rpx;">
							</image>
						</view>
						<view class="flex flex-column justify-center" style="width: 380rpx;height: 100%;">
							<view class="">
								<text
									style="font-size: 30rpx;color: #101010;font-weight: bold;">{{item.name }}</text>
							</view>
							<view class="flex align-center">
								<text style="color: #777;font-size: 26rpx;">预计订单金额：</text>
								<text style="color: #FF0000;font-weight: bold;"><span style="font-size: 26rpx;">￥
									</span><span style="font-size: 30rpx;">{{item.money}}</span></text>
							</view>
						</view>
						<view class="flex justify-end align-center pr-2" style="height: 100%;width: 190rpx;"></view>
					</view>
					<view class="flex flex-column" style="padding-left: 140rpx;margin-top: -20rpx;">
						<view class="flex" style="color: #02B1BE;font-size: 26rpx;">
							<text>商品总数量</text>
							<text class="ml-5">X{{ item.count }}</text>
						</view>
						<view class="flex my-2">
							<text class="iconfont" style="font-size: 30rpx;color: #888;">&#xe65e;</text>
							<text style="font-size: 26rpx;color: #888;">{{item.address}}</text>
						</view>
					</view>
				</view>
				<view class="flex bg-white"
					style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);border-radius: 0 0 10rpx 10rpx;">
					<view class="flex align-center justify-center"
						style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
						<text style="font-size: 24rpx;color: #777;">{{item.create_time}}</text>
					</view>
					<view class="flex align-center justify-center" :class="item.status!=0?'red':''"
						style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
						<text style="font-size: 24rpx;color: #777;">{{item.status_text}}</text>
					</view>
					<view class="flex align-center justify-center" style="width: 100%;height: 100%;">
						<text style="font-size: 24rpx;color: #777;">{{item.salesman}}</text>
					</view>
				</view>
			</view>
		</view>

		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000)
		},
		onLoad(options) {
			this.status = options.status;
			// 动态设置标题
			switch (options.status) {
				case '':
					uni.setNavigationBarTitle({
						title: '全部订单'
					})
					break;
				case '1':
					uni.setNavigationBarTitle({
						title: '等待交易订单'
					})
					break;
				case '0':
					uni.setNavigationBarTitle({
						title: '交易完成订单'
					})
					break;
				default:
					uni.setNavigationBarTitle({
						title: '商家订单'
					})
					break;
			}
			// this.GetData(true);
		},
		onShow() {
			this.InitData();
		},
		data() {
			return {
				status:'',//状态0=已完成；1=待交易；-1=已取消；
				DataList: []
			}
		},
		methods: {
			// 跳转到订单详情
			skipOrderDetails(item) {
				uni.navigateTo({
					url: '/pages/tabbar/my/OrderWork/OrderDetails?id=' + item.id
				})
			},
			// 初始化数据
			InitData() {
				let requestData = {
					key: "", //关键字
					status: this.status, //状态0=已完成；1=待交易；-1=已取消；
					page_no: 1 ,//页码
					page_size: 10 //每一页数量
				}
				this.$post(this.$url.Mall.GetOrders, requestData, {
					isLoading: false
				}).then(res => {
					this.DataList = res.data.list;
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
	.red{
		color: red;
	}
</style>
