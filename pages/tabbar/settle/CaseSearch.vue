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
		<u-modal v-model="showModal" :content="content" confirm-text="删除" :show-cancel-button="true" confirm-color="red"
			@cancel="showModal=false" @confirm="ModalConfirm"></u-modal>
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
			let sear = uni.getStorageSync('CaseSearchData')
			let seas = sear + ',' + this.SearchData
			// 同步缓存
			uni.setStorage({
				key: 'CaseSearchData',
				data: seas,
				success: function() {
					console.log('success');
				}
			});
			let SearchData = this.SearchData; //搜索框里面输入的值
			uni.hideKeyboard(); //收起键盘
			
			let pages = getCurrentPages(); //获取所有页面栈实例列表
			let prevPage = pages[pages.length - 2]; //上一页页面实例
			prevPage.$vm.key = SearchData;
			// 返回上一个界面并刷新数据
			uni.navigateBack({
				delta: 1
			});
			// uni.navigateTo({
			// 	url: '/pages/tabbar/settle/DesignCase?SearchData=' + SearchData
			// });
		},
		data() {
			return {
				showModal: false,
				content: '确认删除最近搜索记录吗？',
				SearchData: '',
				DataList: {
					searchRecords: [],
					hotSearch: []
				} //Mock数据
			}
		},
		methods: {
			SelectWork(name) {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.key = name;
				// 返回上一个界面并刷新数据
				uni.navigateBack({
					delta: 1
				});
				// uni.navigateTo({
				// 	url: '/pages/tabBar/settle/DesignCase?SearchData=' + name
				// });
			},
			ModalConfirm() {
				this.DataList.searchRecords = [];
				uni.removeStorageSync('CaseSearchData');
			},
			delLog() {
				console.log(this.DataList.searchRecords)
				// 提示
				this.showModal = true;
			}
		},
		onShow() {
			let search = uni.getStorageSync('CaseSearchData')

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
