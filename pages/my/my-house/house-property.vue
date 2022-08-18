<template>
	<view class="content px-2">
		<view @click="skipPropertyDetails(sitem)" v-for="(sitem,sindex) in DataList"
			class="flex flex-column mt-2 bg-white" style="padding: 30rpx 60rpx;">
			<image :src="sitem.photos" style="width: 590rpx;height: 400rpx;"></image>
			<text class="mt-2" style="font-size: 26rpx;color: #101010;">
				<text class="iconfont mr-1">&#xe6a7;</text>{{sitem.estate}}</text>
			<text class="mt-1" style="color: #FF9900;font-size: 24rpx;font-weight: bold;">{{sitem.tags}}</text>
			<text class="mt-1" style="color: #888;font-size: 24rpx;">
				<text class="iconfont">&#xe65e;</text>{{sitem.address}}</text>
		</view>

		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 90vh">
			<u-empty text="暂无房产" mode="list"></u-empty>
		</view>

	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap(e) {
			if (e.float == 'right') {
				uni.navigateTo({
					url: '/pages/my/my-house/add-house'
				})
			}
		},
		// 监听用户下拉动作
		onPullDownRefresh() {
			this.InitData();
		},
		onReachBottom() {

		},
		data() {
			return {
				DataList: []
			}
		},
		onShow() {
			this.InitData();
		},
		methods: {
			InitData(){
				// 获取我的房产明细
				this.$post(this.$url.User.GetHouses, {}, {
					isLoading: true
				}).then(res => {
					if (res.code == 200 && res.status == 0) {
						this.DataList = res.data
						uni.stopPullDownRefresh();
					}
				});
			},
			// 跳转到房产详情界面
			skipPropertyDetails(item) {
				// uni.navigateTo({
				// 	url: '/pages/tabbar/my/Index/PropertyDetails?id=' + item
				// })
				// 跳转到新增或者修改页面
				uni.navigateTo({
					url:'/pages/my/my-house/add-house?id='+item.id
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
