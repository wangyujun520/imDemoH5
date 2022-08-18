<template>
	<view class="content">
		<view class="rotation-chart">
			<u-toast ref="uToast"></u-toast>
			<u-swiper :height="280" :list="BannerList" :title="title" :effect3d="effect3d" :indicator-pos="indicatorPos" :mode="mode" :interval="3000" @click="clickimg"></u-swiper>
		</view>

		<!-- 菜单 -->
		<view class="flex flex-wrap bg-white pb-2">
			<view
				@click="skipPage(menuitem)"
				v-for="(menuitem, menuindex) in DataList"
				v-if="menuindex<7"
				:key="menuindex"
				class="flex flex-column justify-center align-center mt-2"
				style="width: 187rpx"
			>
				<view class="flex justify-center align-center" style="width: 90rpx;height: 90rpx;background-color: #f0f0f0;border-radius: 50%;">
					<image :src="menuitem.cover" style="width: 50rpx; height: 50rpx"></image>
				</view>
				<text style="font-size: 26rpx; color: #101010" class="mt-1">{{ menuitem.title }}</text>
			</view>

			<view @click="skipMorePage" class="flex flex-column justify-center align-center mt-2" style="width: 187rpx">
				<view class="flex justify-center align-center" style="width: 90rpx;height: 90rpx;background-color: #f0f0f0;border-radius: 50%;">
					<!-- <image src="/static/img/settle/shejianli.png" style="width: 50rpx; height: 50rpx"></image> -->
					<text class="iconfont" style="font-size: 40rpx;color: #888;">&#xe6f2;</text>
				</view>
				<text style="font-size: 26rpx; color: #101010" class="mt-1">更多</text>
			</view>
		</view>
		<!-- 菜单 -->

		<!-- 瀑布流 -->
		<view class="wrap">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{ leftList }">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
						<u-lazy-load @click="skipCommodity(item)" threshold="-450" border-radius="10" :image="item.cover" :index="index"></u-lazy-load>
						<view @click="skipCommodity(item)" class="demo-title">{{ item.title }}</view>
						<view class="flex justify-between align-center mt-1">
							<view class="flex align-center">
								<text style="color: #e51c23; font-size: 20rpx">
									<span style="font-size: 30rpx; font-weight: bold">{{ item.price }}</span>
								</text>
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load @click="skipCommodity(item)" threshold="-450" border-radius="10" :image="item.cover" :index="index"></u-lazy-load>
						<view @click="skipCommodity(item)" class="demo-title">{{ item.title }}</view>
						<view class="flex justify-between align-center mt-1">
							<view class="flex align-center">
								<text style="color: #e51c23; font-size: 20rpx">
									<span style="font-size: 30rpx; font-weight: bold">{{ item.price }}</span>
								</text>
							</view>
						</view>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore v-if="flowList.length>5" bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	</view>
</template>

<script>
export default {
	onBackPress(e) {
		// 这里可以自定义返回逻辑，比如下面跳转其他页面
		uni.switchTab({
		    url: '/pages/tabbar/settle/settle'
		});
		// return true 表示禁止默认返回
		return true;
	},
	// 监听原生标题栏搜索输入框点击事件
	onNavigationBarSearchInputClicked(e) {
		console.log('点击了');
		uni.navigateTo({
			// url: '/pages/tabbar/settle/ProductSearch'
			url: '/pages/tabbar/settle/EstateSearch'
		});
	},
	onPullDownRefresh() {
		this.InitData();
	},
	data() {
		return {
			// 是否显示标题文字
			title: false,
			mode: 'round',
			indicatorPos: 'bottomCenter',
			// 是否开启3D效果
			effect3d: true,
			// 瀑布流
			loadStatus: 'loadmore',
			flowList: [],
			DataList: [], //Mock数据
			BannerList: [],
			pageIndex: 1,
			pageSize: 6
		};
	},
	methods: {
		InitData(){
			//获取Banner信息
			this.$post(this.$url.Article.GetBanners,{
				sign:'estate_news'
			},{}).then(res=>{
				if(res.code == 200 && res.status == 0){
					this.BannerList = res.data;
				}
			})
			
			//获取分类信息
			this.$post(this.$url.Estate.GetDevs,{},{}).then(res=>{
				if(res.code == 200 && res.status == 0){
					this.DataList = res.data;
				}
			})
			this.addRandomData();
		},
		// 跳转到详情界面
		skipPage(item) {
			console.log(JSON.stringify(item));
			// item.name
			uni.navigateTo({
				url: '/pages/tabbar/settle/HouseList?id=' + item.id
			});
		},
		// 跳转到更多页面
		skipMorePage() {
			uni.navigateTo({
				url: '/pages/tabbar/settle/HouseType'
			});
		},
		// 商品点击事件
		skipCommodity(item) {
			// console.log(JSON.stringify(item))
			// 跳转到商品详情界面
			uni.navigateTo({
				url: '/pages/tabbar/settle/PropertyDetails?id=' + item.id
			});
		},
		clickimg(index) {
			// this.$refs.uToast.show({
			//   // title: `点击了第${index + 1}张图片`,
			//   title: `当前商品id是：${this.BannerList[index].id}`,
			//   type: "success",
			// });

			// // 跳转到商品详情界面
			// uni.navigateTo({
			// 	url: '/pages/tabBar/settle/ProductDetails?id=' + this.BannerList[index].id
			// });
		},
		// 瀑布
		addRandomData() {
			let requestData = {
				dev_id: "", //开发商id
				key: "", //关键字
				page_no: 1, //页码
				page_size: 10 //分页
			}
			//获取分类信息
			this.$post(this.$url.Estate.GetEsates,requestData,{}).then(res=>{
				if(res.code == 200 && res.status == 0){
					this.totalCount = res.data.total_count; //总条数
					this.flowList = res.data.list;
					if (this.totalCount <= 5) {
						this.loadStatus = "nomore"; //加载完成
						return;
					}
				}
			})
		}
	},
	onShow() {
		this.InitData();
	},
	onReachBottom() {
		this.loadStatus = 'loading';
		this.addRandomData();
	}
};
</script>

<style lang="scss" scoped>
.demo-warter {
	border-radius: 8px;
	margin: 5px;
	background-color: #ffffff;
	padding: 8px;
	position: relative;
}

.u-close {
	position: absolute;
	top: 32rpx;
	right: 32rpx;
}

.demo-image {
	width: 100%;
	border-radius: 4px;
}

.demo-title {
	font-size: 30rpx;
	margin-top: 5px;
	color: $u-main-color;
}

.demo-tag {
	display: flex;
	margin-top: 5px;
}

.demo-tag-owner {
	background-color: $u-type-error;
	color: #ffffff;
	display: flex;
	align-items: center;
	padding: 4rpx 14rpx;
	border-radius: 50rpx;
	font-size: 20rpx;
	line-height: 1;
}

.demo-tag-text {
	border: 1px solid $u-type-primary;
	color: $u-type-primary;
	margin-left: 10px;
	border-radius: 50rpx;
	line-height: 1;
	padding: 4rpx 14rpx;
	display: flex;
	align-items: center;
	border-radius: 50rpx;
	font-size: 20rpx;
}

.demo-price {
	font-size: 30rpx;
	color: $u-type-error;
	margin-top: 5px;
}

.demo-shop {
	font-size: 22rpx;
	color: $u-tips-color;
	margin-top: 5px;
}

// 菜单
.menus {
	display: flex;
	background-color: #ffffff;
}

.menu {
	position: relative;
	width: calc(750rpx / 4);
	height: 150rpx;
	line-height: 60rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 26rpx;
}

// 菜单
.iconfont {
	font-size: 60rpx;
}

.item {
	margin: 30rpx 0;
}

.grid-text {
	font-size: 28rpx;
	margin-top: 4rpx;
	color: $u-type-info;
}

.badge-icon {
	position: absolute;
	width: 40rpx;
	height: 40rpx;
}

.swiper {
	height: 480rpx;
}

.indicator-dots {
	margin-top: 40rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.indicator-dots-item {
	background-color: $u-tips-color;
	height: 6px;
	width: 6px;
	border-radius: 10px;
	margin: 0 3px;
}

.indicator-dots-active {
	background-color: $u-type-primary;
}
</style>
<style>
	page{
		background-color: #f7f7f7;
	}
</style>