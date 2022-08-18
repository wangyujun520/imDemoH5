<template>
	<view class="content px-2">
		<view @click="skipPropertyDetails(sitem.id)" v-for="(sitem,sindex) in DataList"
			class="flex flex-column mt-2 bg-white" style="padding: 30rpx 60rpx;">
			<image :src="sitem.cover" style="width: 590rpx;height: 400rpx;"></image>
			<text class="mt-2" style="font-size: 26rpx;color: #101010;"><text
					class="iconfont mr-1">&#xe6a7;</text>{{sitem.communityName}}</text>
			<text class="mt-1" style="color: #FF9900;font-size: 24rpx;font-weight: bold;">{{sitem.area}}㎡
				{{sitem.houseType}} {{sitem.cityName}}</text>
			<text class="mt-1" style="color: #888;font-size: 24rpx;"><text
					class="iconfont">&#xe65e;</text>{{sitem.address}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap(e) {
			if (e.float == 'right') {
				uni.navigateTo({
					url: '/pages/tabBar/my/Index/ADDHouse'
				})
			}
		},
		// 监听用户下拉动作
		onPullDownRefresh() {

		},
		onReachBottom() {

		},
		data() {
			return {
				DataList: []
			}
		},
		onShow() {
			var RequrestUrl = this.AJB.BizUrl + "api/House/GetMyHouseList";
			var RequrestDatas = {
				type: "321",
				state: 0,
				maxResultCount: 20,
				skipCount: 0
			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then((res) => {
					if (res.code == 200) {
						this.DataList = res.dataList.items;
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		methods: {
			// 跳转到房产详情界面
			skipPropertyDetails(item) {
				uni.navigateTo({
					url: '/pages/tabBar/my/Index/PropertyDetails?id=' + item
				})
			}
		}
	}
</script>

<style>
</style>
