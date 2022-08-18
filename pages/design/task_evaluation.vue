<template>
	<view class="content">

		<view class="flex flex-column align-center justify-center bg-white m-3 pt-3">
			<view class="flex align-center rounded pl-3"
				style="background-color: #F6F6F7;width: 630rpx;height: 170rpx;">
				<image :src="DataList.designer.header" class="rounded" style="width: 120rpx;height: 120rpx;"></image>
				<view class="flex flex-column ml-2">
					<view class="flex align-center">
						<text class="mr-1"
							style="color: #101010;font-size: 32rpx;font-weight: bold;">{{DataList.designer.name}}</text>
						<text class="font-sm text-white bg-danger px-1 pl-1"
							style="border-radius: 0rpx 8rpx 8rpx 0rpx;">设计师</text>
					</view>
					<view class="flex">
						<text style="font-size: 26rpx;color: #939393;">{{DataList.designer.sloagan}}</text>
					</view>
					<view class="flex">
						<u-rate :disabled="true" :current="DataList.designer.point" :size="28" inactive-color="#B2B2B2"
							active-color="#FF9900" active-icon="star-fill" inactive-icon="star"></u-rate>
						<text style="color: #ff1b1b;">{{DataList.designer.point}}分</text>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-between mt-3 px-3"
				style="height: 100rpx;border-top: 1px solid rgba(187, 187, 187, 0.2);width: 100%;">
				<view class="flex align-center">
					<text class="mr-1" style="color: #101010;font-size: 28rpx;">评分</text>
					<u-rate :disabled="rankno==1||DataList.status == 0" :current="DataList.point" @change="pointChange" :size="40"
						inactive-color="#B2B2B2" active-color="#FF9900" active-icon="star-fill" inactive-icon="star">
					</u-rate>
					<text class="ml-1" style="font-size: 30rpx;color: #BDBDBC;">{{DataList.point}}</text>
				</view>
				<text v-if="DataList.status == 0" style="color: #02B1BE;font-size: 28rpx;">已评价</text>
			</view>
		</view>

		<view v-if="DataList.status == 1 && module=='user'" class="flex align-center justify-center"
			style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			if (options.module != 'undefined') {
				this.module = options.module;
			}
			this.order_id = options.order_id;
			// 获取评价信息
			this.$post(this.$url.Task.GetPoint, {
				order_id: this.order_id
			}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				this.DataList = res.data;
			});
		},
		data() {
			return {
				rankno: uni.getStorageSync('rankno'),
				module: '',
				DataList: {
					id: "",
					designer: {
						header: "",
						name: "",
						sloagan: "",
						point: ""
					},
					status: "",
					point: ""
				},
				order_id: '',
				imgUrl: 'https://img1.baidu.com/it/u=722430420,1974228945&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
			}
		},
		methods: {
			pointChange(e) {
				console.log(e)
				this.DataList.point = e;
			},
			Submit() {
				// 任务评价
				this.$post(this.$url.Task.TaskPoint, {
					order_id: this.order_id,
					point: this.DataList.point
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.$refs.uToast.show({
						title: '评价成功',
						type: 'success'
					});
					setTimeout(() => {
						//返回上一个界面
						uni.navigateBack({
							delta: 1
						})
					}, 2000);
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
</style>
