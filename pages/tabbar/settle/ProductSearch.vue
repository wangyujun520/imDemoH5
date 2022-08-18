<template>
	<view class="content p-3">
		<view class="flex justify-between">
			<text style="color: #101010;font-size: 26rpx;font-weight: bold;">搜索记录</text>
			<text @click="delLog()" class="iconfont">&#xe6a6;</text>
		</view>
		<view class="flex py-2">
			<view class="flex flex-wrap" style="width: 690rpx;">
				<text @click="SelectWork(item.name)" v-for="(item,index) in DataList.searchRecords" :key="index"
					class="rounded mb-1 ml-1 NoSelection"
					style="font-size: 26rpx;padding: 10rpx 30rpx;">{{item.name}}</text>
			</view>
		</view>
		<view class="flex justify-between">
			<text style="color: #101010;font-size: 26rpx;font-weight: bold;">热门搜索</text>
		</view>
		<view class="flex py-2">
			<!-- <view class="flex flex-wrap" style="width: 690rpx;">
				<text @click="SelectWork(item.name)" v-for="(item,index) in DataList.hotSearch" :key="index" class="rounded mb-1 ml-1 NoSelection"
				 style="font-size: 26rpx;padding: 10rpx 30rpx;">{{item.name}}</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		// 取消按钮点击事件
		onNavigationBarButtonTap() {
			// 返回上一个界面
			uni.navigateBack({
				delta: 1
			});
		},
		// 监听原生标题栏搜索输入框输入内容变化事件
		onNavigationBarSearchInputChanged(val) {
			this.SearchData = val.text;
		},
		// 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
		onNavigationBarSearchInputConfirmed(e) {

			let sear = uni.getStorageSync('ProductSearchData')
			let seas = sear + ',' + this.SearchData
			// 同步缓存
			uni.setStorage({
				key: 'ProductSearchData',
				data: seas,
				success: function() {
					console.log('success');
				}
			});
			let SearchData = this.SearchData; //搜索框里面输入的值
			uni.hideKeyboard(); //收起键盘
			uni.navigateTo({
				url: '/pages/tabbar/settle/ProductList?searchdata=' + SearchData
			});
		},
		data() {
			return {
				SearchData: '',
				DataList: {
					"searchRecords": [],
					"hotSearch": []
				} //Mock数据
			}
		},
		methods: {
			SelectWork(name) {
				uni.navigateTo({
					url: '/pages/tabbar/settle/ProductList?searchdata=' + name
				});
			},
			delLog() {
				this.DataList.searchRecords=[];
				uni.removeStorageSync('ProductSearchData');
			}
		},
		onShow() {
			let search = uni.getStorageSync('ProductSearchData')

			if (search != null || search != undefined) {
				let searchs = search.split(',');
				searchs.forEach((data) => {
					if (data.length > 0) {
						this.DataList.searchRecords.push({
							"name": data
						});
					}

				});
			}
			console.log(this.DataList)

		}
	}
</script>

<style lang="scss">
	.Selection {
		background-color: #ff9900;
		color: #ffffff;
	}

	.NoSelection {
		background-color: #f0f0f0;
		color: #444;
	}
</style>
