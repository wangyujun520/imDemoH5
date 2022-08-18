<template>
	<view class="content">
		<!-- 第一行 -->
		<view class="flex flex-column bg-white p-2">
			<text style="color: #000000;font-size: 40rpx;font-weight: bold;">{{DataList.title}}</text>
			<view class="flex justify-between align-center mt-2">
				<view class="flex align-center" style="width: 530rpx;height: 150rpx;">
					<text class="LineBreak3">{{DataList.des}}</text>
				</view>
				<view class="flex align-center justify-center" style="width: 150rpx;height: 150rpx;">
					<image src="/static/img/shafa.png" style="width: 100%;height: 100%;"></image>
					<!-- <image :src="DataList.style_url" style="width: 100%;height: 100%;"></image> -->
					
				</view>
			</view>
			<!-- 暂时隐藏 -->
			<!-- <text style="color: #FF9900;font-size: 26rpx;" @tap="look">查看百科</text> -->
			<view class="flex align-end justify-center" style="height: 100rpx;">
				<text style="color: #BDBDBD;">根据测试结果，为你推荐以下内容</text>
			</view>
		</view>

		<!-- 设计师 -->
		<view class="flex bg-white justify-between align-center p-2">
			<text style="color: #000000;font-size: 30rpx; font-weight: bold;">{{DataList.title}}设计师</text>
			<view class="flex align-center" @click="skipDesigner">
				<text>全部</text>
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
			</view>
		</view>

		<view class="bg-white">
			<scroll-view class="tab-scroll-view py-2" :scroll-x="true" show-scrollbar="false">
				<view class="tab-item ml-2 position-relative" style="background-color: #F3F4F5;border-radius: 10rpx;"
					v-for="(item, index) in DataList.designers">
					<image :src="item.cover" style="width: 100%;height: 210rpx;border-radius: 10rpx 10rpx 0 0;"></image>
					<image :src="item.header" class="position-absolute rounded"
						style="width: 70rpx;height: 70rpx;top: 160rpx;left: 30rpx;"></image>
					<view class="position-absolute rounded"
						style="right: 20rpx;top: 160rpx;background-color: rgba(0,0,0,0.6);padding: 5rpx 10rpx;">
						<u-icon name="star-fill" color="#FF9900" size="28"></u-icon>
						<text style="color: #ff1b1b;font-size: 24rpx;margin-left: 5rpx;">{{item.point}}分</text>
					</view>
					<view class="flex mt-2 pl-2 align-center">
						<text style="color: #000000;font-size: 28rpx;font-weight: bold;">{{item.name}}</text>
						<text class="ml-1 rounded"
							style="color: #FFFFFF;font-size: 24rpx;background-color: #458C69;padding: 0 10rpx;">设计师</text>
					</view>
					<view class="flex flex-wrap p-2">
						<text v-for="tag in item.tags" style="color: #FF9900;background-color: #FFEDDE;font-size: 26rpx;padding: 5rpx 10rpx;"
							class="mr-1 mb-1">{{tag}}</text>
						<!-- <text style="color: #FF9900;background-color: #FFEDDE;font-size: 26rpx;padding: 5rpx 10rpx;" class="mr-1 mb-1">简约</text>
						<text style="color: #FF9900;background-color: #FFEDDE;font-size: 26rpx;padding: 5rpx 10rpx;" class="mr-1 mb-1">中式</text>
						<text style="color: #FF9900;background-color: #FFEDDE;font-size: 26rpx;padding: 5rpx 10rpx;" class="mr-1 mb-1">地中海</text> -->
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 案列 -->
		<view class="flex bg-white justify-between align-center p-2" @click="skipanli">
			<text style="color: #000000;font-size: 30rpx; font-weight: bold;">{{DataList.title}}设计案列</text>
			<view class="flex align-center">
				<text>全部</text>
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
			</view>
		</view>

		<view class="flex flex-wrap">
			<view class="flex p-1" style="width: 50%;" @click="skipCommodity(item)" v-for="(item, index) in DataList.cases" :key="index">
				<view class="bg-white flex flex-column rounded p-2">
					<image :src="item.cover" style="height: 300rpx;width: 100%;"></image>
					<text style="color: #02b1be; font-size: 26rpx">{{ item.tags }}</text>
					<view class="demo-title">{{ item.title }}</view>
				</view>
			</view>
		</view>

		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">再试一次
			</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		onBackPress(e) {
			// // 这里可以自定义返回逻辑，比如下面跳转其他页面
			// console.log(JSON.stringify(e));
			// uni.navigateTo({
			// 	url: "/pages/tabbar/settle/style-test/Index",
			// });
			// // return true 表示禁止默认返回
			// return true;
		},
		data() {
			return {
				catalog: 0,
				DataList: {}
			}
		},
		onLoad(options) {
			this.catalog = options.catalog;

			// 获取风格测试结果
			this.$post(this.$url.Case.GetStyleContent, {
				catalog: options.catalog
			}, {
				isLoading: true,
				loadingTitle: '加载中...'
			}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.DataList = res.data;
				}
			})
		},
		onShow() {

			// // 第一次接口
			// var RequrestUrl = this.AJB.BizUrl + "api/Communication/GetDecorationStyle";
			// var RequrestDatas = {
			// 	id: this.id
			// };
			// this.AJB.UniAjax(RequrestUrl, RequrestDatas, false)
			// 	.then((res) => {
			// 		if (res.code == 200) {
			// 			console.log(JSON.stringify(res));
			// 			 this.DataList =res.DataList;

			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
		},
		methods: {
			// 查看百科
			look(){
				// 跳转到这里
				// this.DataList.style_url
				let name = '装修百科';
				let url = this.DataList.style_url;
				// #ifdef H5
					window.location.href = url;
				// #endif
				// #ifdef APP-PLUS
					// 跳转到内部窗口并且传递链接
					uni.navigateTo({
						url: `/pages/webview/webview?url=${url}&title=${name}`
					})
				// #endif
			},
			skipDesigner() {
				// 跳转到设计师界面
				uni.navigateTo({
					url: '/pages/tabbar/settle/style-test/Designer?house_style='+this.DataList.house_style
				})
			},
			skipanli() {
				// 跳转到设计案例
				uni.navigateTo({
					// url: '/pages/tabbar/settle/DesignCase',
					url: '/pages/tabbar/settle/design-case?house_style='+this.DataList.house_style
				})
			},
			skipCommodity(item){
				uni.navigateTo({
					url: '/pages/tabbar/settle/case-details?id='+item.id,
				})
			},
			Submit() {
				uni.navigateTo({
					url: "/pages/tabbar/settle/style-test/index",
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
	.LineBreak2 {
		white-space: initial;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
		line-height: 35rpx;
	}

	.LineBreak3 {
		white-space: initial;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
		line-height: 35rpx;
	}

	.tab-scroll-view {
		width: 750rpx;
		flex-direction: row;
		white-space: nowrap;

		.tab-item {
			display: inline-block;
			width: 350rpx;
			// height: 130rpx;
		}
	}

	/deep/.uni-scroll-view ::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}

	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}
</style>
