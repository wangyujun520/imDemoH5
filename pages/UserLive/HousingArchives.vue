<template>
	<view class="content">
		<view class="px-2 mt-2" @click="skipServiceOrder(sitem)" v-for="(sitem,sindex) in DataList">
			<view class="py-2 bg-white rounded">
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<text>{{sitem.title}}</text>
				</view>
				<view class="px-2 flex flex-wrap align-center">
					<view v-for="(tag,index) in sitem.tags" class="mt-2" style="width: 335rpx;">
						<text class="text-title">{{tag.key}}：</text>
						<text class="text-content">{{tag.value}}</text>
					</view>
				</view>
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="flex align-center" style="width: 720rpx;">
						<text class="iconfont" style="font-size: 30rpx;color: #777;">&#xe65e;</text>
						<text class="text-content">{{sitem.address}}</text>
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
		// 下拉刷新
		onPullDownRefresh() {
			this.RefreshData();
		},
		onReachBottom() {
			this.loadStatus = "loading"; //加载中
			this.addRandomData();
		},
		data() {
			return {
				loadStatus: "loadmore",
				page: 0, //分页数据
				totalCount: 0, //总共条数
				DataList: []
			}
		},
		onShow() {
			// var RequrestUrl = this.AJB.BizUrl + "api/Design/GetRecordList";
			// var RequrestDatas = {
			// 	type: "2",
			// 	maxResultCount: 5,
			// 	skipCount: 0,
			// };
			// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
			// 	.then((res) => {
			// 		this.DataList = res.dataList.items;
			// 		this.totalCount = res.dataList.totalCount;
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});


			let requestData = {
				page_size: 10, //每一页数量
				page_no: 1 //页码
			}
			// 获取全部工单
			this.$post(this.$url.User.GetDesignOrders, requestData, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				// console.log(123)
				if (res.code == 200 && res.status == 0) {
					console.log(JSON.stringify(res.data))
					this.DataList = res.data.list
				}
			});
		},
		methods: {
			// 下拉刷新
			RefreshData() {
				var RequrestUrl = this.AJB.BizUrl + "api/Design/GetRecordList";
				var RequrestDatas = {
					type: "2",
					maxResultCount: 5,
					skipCount: 0
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then((res) => {
					uni.stopPullDownRefresh(); //停止当前页面下拉刷新
					this.DataList = res.dataList.items;
					this.totalCount = res.dataList.totalCount;
				}).catch((err) => {
					console.log(err);
				});
			},
			// 上拉加载更多
			addRandomData() {
				// console.log("上拉加载更多")
				console.log(this.page);
				this.page += 5;
				if (this.page >= this.totalCount) {
					this.loadStatus = "nomore"; //加载完成
					return;
				}
				var RequrestUrl = this.AJB.BizUrl + "api/Design/GetRecordList";
				var RequrestDatas = {
					type: "2",
					maxResultCount: 5,
					skipCount: this.page
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then((res) => {
					res.dataList.items.forEach((items) => {
						this.DataList.push(items);
					});
					this.totalCount = res.dataList.totalCount;
					this.loadStatus = "loadmore"; //加载完成
				}).catch((err) => {
					console.log(err);
				});
			},
			skipServiceOrder(item) {
				// 跳转到服务工单
				uni.navigateTo({
					url: '/pages/ServiceOrder/Index?id=' + item.id
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.text-title {
		font-size: 26rpx;
		color: #999;
	}

	.text-content {
		font-size: 26rpx;
		color: #999;
	}
</style>
