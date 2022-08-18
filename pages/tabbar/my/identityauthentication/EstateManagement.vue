<template>
	<view class="content">
		<!-- 菜单开始 -->

		<view class="flex bg-white flex-column">

			<view class="flex p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);" v-for="(item,index) in DataList">
				<view  @click="skipCommodity(item)" class="">
					<image
						:src="item.img"
						class="rounded" style="width: 180rpx;height: 180rpx;"></image>
				</view>
				<view class="flex flex-column px-2" style="width: 600rpx;">
					<text style="color: #000000;font-weight: bold;font-size: 30rpx;">{{ item.title }}</text>
					<view class="flex align-center mt-5">
						<text style="font-size: 26rpx;color: #FF0000;font-weight: bold;">￥</text><text
							style="font-size: 34rpx;color: #FF0000;font-weight: bold;">{{ item.money }}万</text>
					<!-- 	<text class="ml-2" style="text-decoration: line-through;color: #888;">108万</text> -->
					</view>
					<view class="flex align-center justify-between">
						<view class="flex">
							<text style="color: #888;font-size: 24rpx;"></text>
							<text style="color: #888;font-size: 24rpx;" class="ml-2"></text>
							<text style="color: #888;font-size: 24rpx;" class="ml-2"></text>
						</view>
						<text @click="ShowActionSheet" class="iconfont"
							style="font-weight: bold;font-size: 40rpx;">&#xe61e;</text>
					</view>
				</view>
			</view>

		</view>

		<!-- 菜单结束 -->

		<u-action-sheet :list="ActionSheetList" v-model="ActionSheetListShow" @click="SetUpClick"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		onNavigationBarButtonTap: function(val) {
			// 跳转到新增
			if (val.index == 0) {
				// console.log("跳转到新增");
				uni.navigateTo({
					url: '/pages/tabBar/my/identityauthentication/NewProperty'
				})
			}
			// 跳转到草稿箱
			if (val.index == 1) {
				// console.log("跳转到草稿箱");
				uni.navigateTo({
					url: '/pages/tabBar/my/identityauthentication/PropertyDraft'
				})
			};
		},
		data() {
			return {
				ActionSheetListShow: false,
				ActionSheetList: [{
					text: '分享房产'
				}, {
					text: '编辑房产'
				}, {
					text: '删除房产',
					color: 'red'
				}],

				activeColor: this.$u.color['warning'],
				// 弹出菜单参数
				show: false, //是否显示弹出框菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
				// 弹出菜单参数
				swiperHeight: 500, // swiper菜单高度
				DataList: [], //Mock数据
				pageIndex: 1,
				pageSize: 6
			};
		},
		onShow() {
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == 'iPhoneXSMax') {
					this.swiperHeight = res.windowHeight - 40 - uni.upx2px(70);
				} else {
					this.swiperHeight = res.windowHeight - 40;
				}
			} catch (e) {
				console.log(e);
			}
		},
		methods: {
			skipCommodity(item) {
				console.log(JSON.stringify(item));
				uni.navigateTo({
					url: '/pages/tabBar/settle/PropertyDetails?id=' + item.id
				});
			},
			ShowActionSheet() {
				this.ActionSheetListShow = true;
			},
			SetUpClick(index) {
				// 分享房产
				if (index == 0) {
					console.log("分享房产")
				}

				// 编辑房产
				if (index == 1) {
					console.log("编辑房产")
				}

				// 删除房产
				if (index == 2) {
					console.log("删除房产")
				}
			}
		},
		onLoad() {
			var RequrestUrl = this.AJB.BizUrl + 'api/HouseInfo/GetPageHouse';
			var RequrestDatas = {
				MaxResultCount: this.pageSize,
				SkipCount: (this.pageIndex - 1) * this.pageSize,
				ismy: true

			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then(res => {
					console.log(res);
					uni.stopPullDownRefresh(); //关闭下拉刷新动画
					res.dataList.items.forEach(element => {
						this.DataList.push(element);
					});
					this.loadStatus = 'loadmore';
					this.pageIndex++;
				})
				.catch(err => {
					console.log(err);
				});

		}

	}
</script>

<style lang="scss">
	.label-style {
		font-size: 28rpx;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
		width: 160rpx;
		text-align: center;
	}

	// 通过/deep/样式穿透去控制组件的内容
	.wrap /deep/ .u-content {
		color: #666 !important;
	}
</style>
