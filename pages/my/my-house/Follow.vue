<template>
	<view class="content">

		<view class="position-fixed" style="height: 80rpx;width: 750rpx;top: 0;z-index: 999;">
			<view class="flex">
				<view class="" style="width: 650rpx;">
					<!-- list 标签数组，元素为对象，如[{name: '推荐'}] -->
					<!-- active-color 选中的颜色 -->
					<!-- is-scroll tabs是否可以左右拖动 -->
					<!-- current 初始化显示第几个 -->
					<u-tabs :list="list" :active-color="activeColor" :is-scroll="true" :current="current"
						@change="change"></u-tabs>
				</view>
				<view @click="MenuShow" class="flex align-center justify-center"
					style="width: 100rpx;background-color: #FFFFFF;">
					<text class="iconfont text-dark" style="font-size: 40rpx;">&#xe66c;</text>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="" style="height: 80rpx;"></view>


		<!-- 弹出框样式开始 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable"
				:close-icon-pos="closeIconPos">
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in list" :key="index">
						<text @click="SwitchMenu(index)"
							:style="{ color: index == current ? '#FFFFFF' : '#101010', backgroundColor: index == current ? '#FF9900' : '#FFFFFF' }"
							class="mb-2 py-2 mr-2 label-style">
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>
		<!-- 弹出框样式结束 -->

		<!-- 设计师 -->
		<view v-if="current==0" class="px-2">
			<view @click="FlowList(sitem)" class="flex align-center bg-white mt-2 rounded p-2"
				v-for="(sitem, index) in FlowList" :key="index">

				<view class="flex align-center">
					<image :src="sitem.headPhoto" style="width: 110rpx;height: 110rpx;" class="rounded">
						</image>
				</view>
				<view class="flex flex-column pl-2" style="width: 470rpx;">
					<!-- <text class="title u-line-2">{{ item.title }}</text> -->
					<view class="UserInfo pt-1">
						<text class="mr-1"
							style="color: #101010;font-size: 32rpx;font-weight: bold;">{{ sitem.name }}</text>
						<text class="font-sm text-white bg-danger px-1 pl-1"
							style="border-radius: 0rpx 8rpx 8rpx 0rpx;">设计师</text>
						<!-- <text v-if="item.RankClass === 2" class="font-sm text-white bg-info px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">销售人员</text>
						<text v-if="item.RankClass === 3" class="font-sm text-white bg-success px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">管家</text>
						<text v-if="item.RankClass === 4" class="font-sm text-white bg-warning px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">商家</text> -->
					</view>
					<view class="Describe">
						<text style="font-size: 26rpx;color: #939393;">{{ sitem.signature }}</text>
					</view>
					<view class="Scoring">
						<u-rate :disabled="true" :current="4" :size="28" inactive-color="#B2B2B2" active-color="#FF9900"
							active-icon="star-fill" inactive-icon="star"></u-rate>
						<text style="color: #ff1b1b;">{{ sitem.score }}分</text>
					</view>
				</view>
				<view class="flex justify-end align-center" style="width: 120rpx;">
					<!-- <text class="rounded px-1" style="color: #ff9900;border: 1px solid #ff9900;padding-top: 5rpx;padding-bottom: 5rpx;">+关注</text> -->
					<text class="rounded px-1"
						style="color: #939393;border: 1px solid #939393;padding-top: 5rpx;padding-bottom: 5rpx;">已关注</text>
				</view>

			</view>

		</view>
		<!-- 案例 -->
		<view class="flex" v-if="current==1">
			<view class="wrap">
				<u-waterfall v-model="CaseList" ref="uWaterfall">
					<template v-slot:left="{ leftList }">
						<view @click="skipMyCase(item)" class="demo-warter" v-for="(item, index) in leftList"
							:key="index">
							<u-lazy-load threshold="0" border-radius="10" :image="item.coverMap" :index="index">
							</u-lazy-load>
							<view class="demo-title LineBreak">{{ item.content }}</view>
							<view class="flex justify-between align-center mt-1">
								<view class="flex align-center">
									<image :src="item.headPotrait" class="rounded" style="width: 45rpx; height: 45rpx">
									</image>
									<text
										style="font-size: 28rpx; color: #999; margin-left: 5rpx">{{ item.name }}</text>
								</view>
								<view class="flex align-center">
									<!-- 暂时不做点赞 -->
									<!-- <text class="iconfont" style="font-size: 36rpx;color: #939393;margin-right:5rpx;">&#xe641;</text>
									<text style="font-size: 26rpx;color:#939393;">{{item.good}}</text> -->
								</view>
							</view>
						</view>
					</template>
					<template v-slot:right="{ rightList }">
						<view @click="skipMyCase(item)" class="demo-warter" v-for="(item, index) in rightList"
							:key="index">
							<u-lazy-load threshold="0" border-radius="10" :image="item.coverMap" :index="index">
							</u-lazy-load>
							<view class="demo-title LineBreak">{{ item.content }}</view>
							<view class="flex justify-between align-center mt-1">
								<view class="flex align-center">
									<image :src="item.headPotrait" class="rounded" style="width: 45rpx; height: 45rpx">
									</image>
									<text
										style="font-size: 28rpx; color: #999; margin-left: 5rpx">{{ item.name }}</text>
								</view>
								<view class="flex align-center">
									<!-- 暂时不做点赞 -->
									<!-- <text class="iconfont" style="font-size: 36rpx;color: #939393;margin-right:5rpx;">&#xe641;</text>
									<text style="font-size: 26rpx;color:#939393;">{{item.good}}</text> -->
								</view>
							</view>
						</view>
					</template>
				</u-waterfall>
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
			</view>
		</view>
		<!-- 百科 -->
		<!-- <view class="mt-2" v-if="current==2">
			<view v-for="(k,kindex) in 10" :key="kindex" class="flex bg-white py-1 rounded" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="flex justify-center align-center" style="width: 300rpx;height: 160rpx;">
					<image class="rounded" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3831273641,3251280910&fm=26&gp=0.jpg" style="width: 240rpx;height: 140rpx;"></image>
				</view>
				<view class="flex flex-column justify-between pr-2" style="height: 160rpx;width: 450rpx;">
					<view class="mt-2"><text class="LineBreak" style="font-size: 30rpx;">洛基亚笔记本电脑系列产品通过印度BIS认证，中国制造</text></view>
					<view class="mb-1">
						<text>2020-11-11</text>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 商品 -->
		<view class="mt-2" v-if="current==2">
			<view class="wrap">
				<u-waterfall v-model="FlowCommodityList" ref="uWaterfall">
					<template v-slot:left="{ leftList }">
						<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
							<u-lazy-load @click="skipCommodity(item)" threshold="-450" border-radius="10"
								:image="item.coverMap" :index="index"></u-lazy-load>
							<view @click="skipCommodity(item)" class="demo-title">{{ item.name }}</view>
							<view class="flex justify-between align-center mt-1">
								<view class="flex align-center">
									<text style="color: #e51c23; font-size: 20rpx">
										￥
										<span style="font-size: 30rpx; font-weight: bold">{{ item.price }}</span>
									</text>
								</view>
								<view @click="Collection(item)" class="flex align-center">
									<u-icon v-if="!item.collection" @click="attention(item)" name="heart"
										color="#939393" size="34"></u-icon>
									<u-icon v-else name="heart-fill" color="#FF9900" size="34"></u-icon>
								</view>
							</view>
						</view>
					</template>
					<template v-slot:right="{ rightList }">
						<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
							<u-lazy-load @click="skipCommodity(item)" threshold="-450" border-radius="10"
								:image="item.coverMap" :index="index"></u-lazy-load>
							<view @click="skipCommodity(item)" class="demo-title">{{ item.name }}</view>
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
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomDataCommodity"></u-loadmore>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000)
		},
		data() {
			return {
				
				//列表数据
				list: [{
						name: '设计师'
					},
					{
						name: '案例'
					},
					// {
					// 	name: '百科'
					// },
					{
						name: '商品'
					}
				],
				current: 0, //当前选中的下标
				activeColor: this.$u.color['warning'],
				// 弹出菜单参数
				show: false, //是否显示弹出框菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
				// 弹出菜单参数
				swiperHeight: 500, // swiper菜单高度
				// 瀑布流
				loadStatus: "loadmore",
				CaseList: [], //商品列表数据
				totalCount: 0, //总共条数
				page: 0 ,//分页数据
				page1: 0 ,//分页数据
				FlowList: [],
				totalFlowCount: 0,
				Flowpage: 0 ,//分页数据
				FlowCommodityList: [],
				totalFlowCommodityCount: 0,
				FlowCommoditypage: 0 //分页数据
			};
		},
		onShow() {
			if (this.current == 0) {
				this.FlowUser();
			}
			if (this.current == 1) {
				this.MenuLoad();
			}
			if (this.current == 2) {
				this.FlowCommodity();
			}

		},
		onReachBottom() {
			if (this.current == 0) {
				this.FlowUser();
			}
			if (this.current == 1) {
				this.loadStatus = "loading"; //加载中
				this.addRandomData();
			}
			if (this.current == 2) {
				this.FlowCommodity();
			}
		},
		methods: {
			FlowCommodity(){
				this.FlowCommodityList=[];
				this.totalFlowCommodityCount=0;
				var ProductList = this.AJB.BizUrl + "api/Flow/GetPageCommodity";
				var ProductListDatas = {
					type:"",
					maxResultCount: 5,
					skipCount: this.page1,
				};
				this.AJB.UniAjax(ProductList, ProductListDatas)
					.then((res) => {
						uni.stopPullDownRefresh();
						console.log(JSON.stringify(res));
						this.totalFlowCommodityCount = res.dataList.totalCount; //总条数
						this.FlowCommodityList = res.dataList.items;

						if (this.totalFlowCommodityCount <= 5) {
							this.loadStatus = "nomore"; //加载完成
							return;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 商品点击事件
			skipCommodity(item) {
				console.log(JSON.stringify(item));
				uni.navigateTo({
					url: '/pages/tabBar/settle/ProductDetails?id=' + item.id
				});
			},
			FlowUser() {
				this.FlowList=[];
				this.totalFlowCount=0;
				var ProductList = this.AJB.BizUrl + "api/Flow/FlowUser";
				var ProductListDatas = {
					type:"",
					maxResultCount: 5,
					skipCount: this.page,
				};
				this.AJB.UniAjax(ProductList, ProductListDatas)
					.then((res) => {
						uni.stopPullDownRefresh();
						console.log(JSON.stringify(res));
						this.totalFlowCount = res.dataList.totalCount; //总条数
						this.FlowList = res.dataList.items;

						if (this.totalFlowCount <= 5) {
							this.loadStatus = "nomore"; //加载完成
							return;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			skipUser(item) {
				uni.navigateTo({
					url: '/pages/tabBar/find/homepage?id=' + item.mobileUserId
				});
			},
			skipMyCase(item) {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/CaseDetails?id=' + item.id
				});
			},
			addRandomDataCommodity()
			{
				this.page1 += 5;
				if (this.page1 >= this.totalFlowCommodityCount) {
					this.loadStatus = "nomore"; //加载完成
					return;
				}
				//获取商品列表
				var ProductList = this.AJB.BizUrl + "api/Flow/FlowUser";
				var ProductListDatas = {
					type:"",
					maxResultCount: 5,
					skipCount: this.page1,
				};
				this.AJB.UniAjax(ProductList, ProductListDatas)
					.then((res) => {
						uni.stopPullDownRefresh();
						console.log(JSON.stringify(res));
						this.totalFlowCommodityCount = res.dataList.totalCount; //总条数
						this.FlowCommodityList = res.dataList.items;
				
						if (this.totalFlowCommodityCount <= 5) {
							this.loadStatus = "nomore"; //加载完成
							return;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 瀑布流分页加载数据
			addRandomData() {
				console.log("执行了");
				this.page += 5;
				if (this.page >= this.totalCount) {
					this.loadStatus = "nomore"; //加载完成
					return;
				}
				//获取商品列表
				var ProductList =
					this.AJB.BizUrl + "api/Flow/GetPageDesignScheme";
				var ProductListDatas = {
					maxResultCount: 5,
					skipCount: this.page,
				};
				this.AJB.UniAjax(ProductList, ProductListDatas)
					.then((res) => {
						res.dataList.items.forEach((items) => {
							this.CaseList.push(items);
						});
						this.loadStatus = "loadmore"; //加载完成
					})
					.catch((err) => {
						console.log(err);
					});
			},
			MenuLoad() {
				this.CaseList=[];
				this.totalCount=0;
				//获取商品列表
				var ProductList = this.AJB.BizUrl + "api/Flow/GetPageDesignScheme";
				var ProductListDatas = {
					type:"",
					maxResultCount: 5,
					skipCount: this.page,
				};
				this.AJB.UniAjax(ProductList, ProductListDatas)
					.then((res) => {
						uni.stopPullDownRefresh();
						console.log(JSON.stringify(res));
						this.totalCount = res.dataList.totalCount; //总条数
						this.CaseList = res.dataList.items;

						if (this.totalCount <= 5) {
							this.loadStatus = "nomore"; //加载完成
							return;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			// 切换菜单
			SwitchMenu(index) {
				this.current = index;
				this.show = false;
				if (this.current == 0) {
					this.FlowUser();
				}
				if (this.current == 1) {
					this.MenuLoad();
				}
				if (this.current == 2) {
					this.FlowCommodity();
				}
			},
			// 菜单改变
			change(index) {
				this.current = index;
				if (this.current == 0) {
					this.$refs.uWaterfall.clear();
					this.FlowUser();
				}
				if (this.current == 1) {
					this.$refs.uWaterfall.clear();
					this.MenuLoad();
				}
				if (this.current == 2) {
					this.$refs.uWaterfall.clear();
					this.FlowCommodity();
				}
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
			
				this.current = event.detail.current;
				if (this.current == 0) {
					this.$refs.uWaterfall.clear();
					this.FlowUser();
				}
				if (this.current == 1) {
					this.$refs.uWaterfall.clear();
					this.MenuLoad();
				}
				if (this.current == 2) {
					this.$refs.uWaterfall.clear();
					this.FlowCommodity();
				}
			}
		}
	};
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

	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}
</style>
