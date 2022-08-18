<template>
	<view class="content">
		
		<view class="flex flex-column" style="margin: 20rpx;" @tap="skipConstructionTask(item)" v-for="(item,sindex) in DataList">
			<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" :src="item.header" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="flex flex-column justify-center" style="width: 480rpx;height: 100%;">
						<view class="">
							<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{item.name}}</text>
						</view>
						<view class="mt-1">
							<text style="font-size: 26rpx;color: #666;">{{item.estate_title}}</text>
						</view>
					</view>
					<view class="flex justify-end align-center pr-2" style="height: 100%;width: 100rpx;">
						<view class="" v-if="item.fee_status==0">
							<text class="text-white"
								style="border-radius: 50%;background-color: #FA4730;font-size: 40rpx;padding: 5rpx 15rpx;">赏</text>
						</view>
					</view>
				</view>
				<view class="px-2">
					<text style="color: #02B1BE;font-size: 28rpx;">{{item.tags}}</text>
				</view>
				<view class="px-2 my-2">
					<view v-if="item.content!=''&&item.content!=undefined" class="p-1"
						style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">{{item.content}}</text>
					</view>
					<view v-else class="p-1" style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">无特殊要求</text>
					</view>
				</view>
			</view>
			<view class="flex bg-white"
				style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);border-radius: 0 0 10rpx 10rpx;">
				<view class="flex align-center justify-center"
					style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<text style="font-size: 24rpx;color: #777;">{{item.create_time}}</text>
				</view>
				<view class="flex align-center justify-center"
					style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<text v-if="item.status == 0" style="font-size: 24rpx;color: #777;">{{item.status_text}}</text>
					<text v-else style="font-size: 24rpx;color: red;">{{item.status_text}}</text>
					
				</view>
				<view class="flex align-center justify-center" style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #777;">{{item.end_day}}天到期</text>
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
		onLoad(options) {
			this.status = options.status;
			// 动态设置标题
			switch (options.status) {
				case '':
					uni.setNavigationBarTitle({
						title: '全部'
					})
					break;
				case '0':
					uni.setNavigationBarTitle({
						title: '已完成'
					})
					break;
				case '1':
					uni.setNavigationBarTitle({
						title: '待接单'
					})
					break;
				case '2':
					uni.setNavigationBarTitle({
						title: '施工中'
					})
					break;
				case '-1':
					uni.setNavigationBarTitle({
						title: '已拒绝'
					})
					break;
				case '-2':
					uni.setNavigationBarTitle({
						title: '用户拒绝'
					})
					break;
				default:
					uni.setNavigationBarTitle({
						title: '监理工单'
					})
					break;
			}
		},
		onShow() {
			this.InitData();
		},
		data() {
			return {
				DataList: []
			}
		},
		methods: {
			InitData() {
				let requestData = {
					status: this.status, //状态；空=全部；0=已完成;1=待解单;2=施工中;-1=工人拒绝;-2=用户拒绝
					page_no: 1,
					page_size: 1000
				}
				this.$post(this.$url.Worker.GetOrders, requestData, {
					isLoading: false
				}).then(res => {
					this.DataList = res.data.list;
				});
			},
			skipConstructionTask(item){
				uni.navigateTo({
					url:'/pages/UserLive/ConstructionTask?id='+item.id+"&module=surveyor"
				})
			}
		}

	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
</style>
