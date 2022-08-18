<template>
	<view class="content px-3">
		<view @click="skipInfo(item)" class="bg-white mt-3 rounded position-relative" v-for="(item,index) in DataList"
			:key="index">
			<!-- 已结束 -->
			<view v-if="item.status==0" class="flex position-absolute justify-center align-center"
				style="width: 100%;height: 100%;z-index: 999;background-color: rgba(0,0,0,0.3);">
				<text class="iconfont" style="font-size: 200rpx;color: #FFFFFF;">&#xe602;</text>
			</view>
			<!-- 第一行 -->
			<view class="flex justify-between px-2" style="height: 100rpx;">
				<view class="flex align-center">
					<image class="rounded" :src="item.logo" style="width: 60rpx;height: 60rpx;"></image>
					<text class="mx-1" style="color: #6B8EB5;font-size: 28rpx;">{{item.name}}</text>
					<text style="color: #FFFFFF;background-color: #8A2BE2;font-size: 22rpx;padding: 0 10rpx;">{{item.catalog}}</text>
				</view>
				<view class="flex align-center"><text style="font-size: 26rpx;color: #888;">{{item.create_time}}</text>
				</view>
			</view>
			<!-- 第二行 -->
			<view style="height: 350rpx;">
				<image :src="item.banners[0]" style="width: 100%;height: 100%;"></image>
			</view>
			<!-- 第三行 -->
			<view class="flex p-2 flex-column">
				<text style="font-size: 30rpx;font-weight: bold;color: #000000;">{{item.title}}</text>
				<text style="color: #888;font-size: 26rpx;">{{item.introduce}}</text>
			</view>
		</view>
		
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无活动" mode="list"></u-empty>
		</view>
		
	</view>
</template>

<script>
	export default {
		// 右上角点击事件
		onNavigationBarButtonTap: function(e) {
			if (e.float == 'right') {
				if(this.rankno==2){
					// 跳转到我的活动页面
					uni.navigateTo({
						url: '/pages/tabbar/message/NavMenu/MyActivities'
					});
				}
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000)
		},
		data() {
			return {
				rankno:uni.getStorageSync('rankno'),
				DataList: '' //Mock数据
			};
		},
		methods: {
			skipInfo(item) {
				console.log(item.status)
				if (item.status != 0) {
					uni.navigateTo({
						url: '/pages/tabbar/message/NavMenu/EventDetails?id='+item.id+'&title='+item.title
					})
				}
			}
		},
		onShow() {
			if(this.rankno!=2){
				//#ifdef H5
				setTimeout(()=>{
					document.querySelectorAll('.uni-page-head .uni-page-head-ft .uni-page-head-btn')[0].querySelector('.uni-btn-icon').innerText = ' ';
				},10)
				//#endif
				// #ifdef APP-PLUS
				var currentWebview = this.$mp.page.$getAppWebview();
				currentWebview.setTitleNViewButtonStyle(0, { //h5端会报错
					text: ' '
				});
				// #endif
			}
			
			let requestData = {
				key: "", //关键字
				page_size: 10, //每一页数量
				page_no: 1 //页码
			}
			// 获取活动明细
			this.$post(this.$url.Mall.GetActivities, requestData, {
				isLoading:true,
				loadingTitle:'加载中...'
			}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.DataList = res.data.list;
				}
			})
		}
	};
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
</style>
