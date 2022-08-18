<template>
	<view class="content">
		<view class="rotation-chart">
			<u-toast ref="uToast"></u-toast>
			<!-- <u-swiper :height="280" :list="BannerList" :title="title" :effect3d="effect3d" :indicator-pos="indicatorPos" :mode="mode" :interval="3000" @click="clickimg"></u-swiper> -->
			<u-swiper :height="280" :list="BannerList" :title="title" :effect3d="effect3d" :indicator-pos="indicatorPos" :mode="mode" :interval="3000"></u-swiper>
		</view>

		<!-- 菜单 -->
		<view class="flex flex-wrap bg-white pb-2">
			<view
				@click="skipPage(menuitem)"
				v-for="(menuitem, menuindex) in DataList"
				:key="menuindex"
				class="flex flex-column justify-center align-center mt-2"
				style="width: 187rpx"
				v-if="menuindex<7"
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
					<view class="demo-warter" @click="skipCommodity(item)" v-for="(item, index) in leftList" :key="index">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.cover" :index="index"></u-lazy-load>
						<view class="demo-title">{{ item.title }}</view>
						<view class="flex justify-between align-center mt-1">
							<view class="flex align-center">
								<text style="color: #e51c23; font-size: 20rpx">
									￥
									<span style="font-size: 30rpx; font-weight: bold">{{ item.price }}</span>
								</text>
							</view>
							<view @click="Collection(item)" class="flex align-center">
								<u-icon v-if="!item.collection" name="heart" color="#939393" size="34"></u-icon>
								<u-icon v-else name="heart-fill" color="#FF9900" size="34"></u-icon>
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="demo-warter" @click="skipCommodity(item)" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.cover" :index="index"></u-lazy-load>
						<view class="demo-title">{{ item.title }}</view>
						<view class="flex justify-between align-center mt-1">
							<view class="flex align-center">
								<text style="color: #e51c23; font-size: 20rpx">
									￥
									<span style="font-size: 30rpx; font-weight: bold">{{ item.price }}</span>
								</text>
							</view>
							<view @click="Collection(item)" class="flex align-center">
								<u-icon v-if="!item.collection" name="heart" color="#939393" size="34"></u-icon>
								<u-icon v-else name="heart-fill" color="#FF9900" size="34"></u-icon>
							</view>
						</view>
					</view>
				</template>
			</u-waterfall>
		</view>
		
		<view v-if="flowList.length == 0" class="flex justify-center align-center" style="height: 60vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
		<u-loadmore bg-color="rgb(240, 240, 240)" v-if="flowList.length>=5" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		
	</view>
</template>

<script>
export default {
	onShow() {
		setTimeout(()=>{
			this.InitData();
		},10)
	},
	onLoad(options) {
		if((options.order_id??'')!=''){
			this.order_id = options.order_id;
		}
		
		
		if(options.del_id != undefined){
			this.del_id = options.del_id
		}
		
		this.$post(this.$url.Article.GetBanners,{
			sign:'mall_news'
		},{}).then(res=>{
			if(res.code == 200 && res.status == 0){
				this.BannerList = res.data;
			}
		})
		
		//获取分类信息
		this.$post(this.$url.Mall.GetCatalogs,{
			sign:'mall_news'
		},{}).then(res=>{
			if(res.code == 200 && res.status == 0){
				this.DataList = res.data;
			}
		})
	},
	onReachBottom() {
		this.loadStatus = 'loading';
		this.addRandomData();
	},
	// 监听原生标题栏搜索输入框点击事件
	onNavigationBarSearchInputClicked(e) {
		console.log('点击了');
		uni.navigateTo({
			url: '/pages/tabbar/settle/ProductSearch'
		});
	},
	onPullDownRefresh() {
		this.InitData();
	},
	data() {
		return {
			del_id:'',
			key:'',
			order_id:'',
			// 是否显示标题文字
			title: false,
			//指示器类型
			// rect-指示器为方块状
			// dot-指示器为圆点
			// number-指示器为数字
			// round-激活的指示器为块状，未激活的未点状，为默认值
			// none-不显示指示器
			mode: 'round',
			//指示器的位置
			// topLeft-指示器位于左上角
			// topCenter-指示器位于上方中间位置
			// topRight-指示器位于右上角
			// bottomLeft-指示器位于左下角
			// bottomCenter-指示器位于底部中间位置，为默认值
			// bottomRight-指示器位于右下角
			indicatorPos: 'bottomCenter',
			// 是否开启3D效果
			effect3d: true,
			DataList: [], //Mock数据
			BannerList: [],
			pageNo: 1, //显示第几页的数据
			pageSize: 5, //当前页显示多少条数据
			totalCount: 0, //总共条数
			page: 0, //分页数据
			loadStatus: 'loadmore', //加载前值为loadmore，加载中为loading，没有数据为nomore
			// 瀑布流
			flowList: [] //商品列表数据
		};
	},
	methods: {
		InitData(){
			// 清空数据
			this.$refs.uWaterfall.clear();
			this.flowList = [];
			this.loadStatus = 'loadmore'; //加载前
			this.totalCount = 0;
			this.page = 0;
			this.pageNo = 1;
			this.pageSize = 5;
			
			let requestData = {
				key: this.key, //关键字
				page_no: this.pageNo,
				page_size: this.pageSize
				// catalog_id: "", //类别id
				// city_code: "", //城市编码
				// sort_by: "", //排序方式，目前提供：adddate（添加时间）、price（价格）、order_count（销量）
				// sort: "" //asc=顺序、desc=倒序
			}
			// 获取商品明细
			this.$post(this.$url.Mall.GetGoods,requestData,{}).then(res=>{
				if(res.code == 200 && res.status == 0){
					uni.stopPullDownRefresh(); //停止当前页面下拉刷新
					this.flowList = res.data.list;
					this.totalCount = res.data.total_count; //分页总条数
				}
			})
		},
		// 瀑布
		addRandomData() {
			this.page += 5;
			this.pageNo++;
			if (this.page >= this.totalCount) {
				this.loadStatus = 'nomore'; //加载完成
				return;
			}
			let requestData = {
				key: this.key, //关键字
				page_no: this.pageNo,
				page_size: this.pageSize,
				sort_by: "adddate", //排序方式，目前提供：adddate（添加时间）、price（价格）、order_count（销量）
				sort: "" //asc=顺序、desc=倒序
			};
			this.$post(this.$url.Mall.GetGoods, requestData, {
				isLoading: true
			}).then(res => {
				console.log(JSON.stringify(res));
				this.loadStatus = 'loadmore'; //加载前
				this.flowList = [...this.flowList, ...res.data.list]; //合并数据
				this.totalCount = res.data.total_count; //分页总条数
			});
		},
		// 收藏和取消收藏
		Collection(item) {
			if (!item.collection) {
				var RequrestUrl = this.AJB.BizUrl + 'api/Communication/AttentionCommodity';
				var RequrestDatas = {
					commodityId: item.id
				};
				this.AJB.UniAjax(RequrestUrl, RequrestDatas)
					.then(res => {
						console.log(JSON.stringify(res));
						if (res.code == 200) {
							//成功
							item.collection = true;
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		// 跳转到详情界面
		skipPage(item) {
			console.log(JSON.stringify(item));
			// item.name
			uni.navigateTo({
				url: '/pages/tabbar/settle/ProductList?id=' + item.id
			});
		},
		// 跳转到更多页面
		skipMorePage() {
			uni.navigateTo({
				url: '/pages/tabbar/settle/MoreCategories'
			});
		},
		// 商品点击事件
		skipCommodity(item) {
			console.log(JSON.stringify(item))
			// 跳转到商品详情界面
			uni.navigateTo({
				url: '/pages/tabbar/settle/ProductDetails?id=' + item.id+'&order_id='+this.order_id+'&del_id='+this.del_id
			});
		},
		clickimg(index) {
			// 跳转到商品详情界面
			uni.navigateTo({
				url: '/pages/tabbar/settle/ProductDetails?id=' + this.BannerList[index].id+'&order_id='+this.order_id
			});
		}
	
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
	page {
		background-color: #f7f7f7;
	}
</style>