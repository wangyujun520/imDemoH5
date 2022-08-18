<template>
	<view class="content position-relative">
		<!-- 顶部列表 -->
		<view class="u-m-p-50">
			<view class="u-demo-area u-flex u-row-center">
				<u-dropdown class="bg-white" :close-on-click-mask="mask" ref="uDropdown" :activeColor="activeColor"
					:borderBottom="borderBottom">
					<u-dropdown-item @change="changeOrder1(value1)" v-model="value1" title="价格" :options="options1">
					</u-dropdown-item>
					<u-dropdown-item @change="changeOrder2(value2)" v-model="value2" title="销量" :options="options2">
					</u-dropdown-item>
					<u-dropdown-item @change="changeOrder3(value3)" v-model="value3" title="时间" :options="options3">
					</u-dropdown-item>
				</u-dropdown>
			</view>
		</view>

		<!-- 瀑布流 -->
		<!-- <view :style="{ height: swiperHeight + 'px' }" style="overflow: auto">
			<view class="wrap">
				</view>
		</view> -->
		<view class="wrap">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{ leftList }">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
						<u-lazy-load @click="skipCommodity(item)" threshold="-450" border-radius="10"
							:image="item.cover" :index="index"></u-lazy-load>
						<view @click="skipCommodity(item)" class="demo-title">{{ item.title }}</view>
						<view class="flex justify-between align-center mt-1">
							<view class="flex align-center">
								<text style="color: #e51c23; font-size: 20rpx">
									￥
									<span style="font-size: 30rpx; font-weight: bold">{{ item.price }}</span>
								</text>
							</view>
							<view @click="Collection(item)" class="flex align-center">
								<u-icon v-if="item.is_favorite==1" @click="attention(item)" name="heart" color="#939393"
									size="34"></u-icon>
								<u-icon v-else name="heart-fill" color="#FF9900" size="34"></u-icon>
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load @click="skipCommodity(item)" threshold="-450" border-radius="10"
							:image="item.cover" :index="index"></u-lazy-load>
						<view @click="skipCommodity(item)" class="demo-title">{{ item.title }}</view>
						<view class="flex justify-between align-center mt-1">
							<view class="flex align-center">
								<text style="color: #e51c23; font-size: 20rpx">
									￥
									<span style="font-size: 30rpx; font-weight: bold">{{ item.price }}</span>
								</text>
							</view>
							<view @click="Collection(item)" class="flex align-center">
								<u-icon v-if="item.is_favorite==1" name="heart" color="#939393" size="34"></u-icon>
								<u-icon v-else name="heart-fill" color="#FF9900" size="34"></u-icon>
							</view>
						</view>
					</view>
				</template>
			</u-waterfall>
		</view>
		<u-loadmore v-if="flowList.length>=5" bg-color="rgb(240, 240, 240)" :status="loadStatus"
			@loadmore="addRandomData"></u-loadmore>
		<view v-if="flowList.length == 0" class="flex justify-center align-center" style="height: 60vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>


	</view>
</template>

<script>
	export default {
		// 监听原生标题栏搜索输入框点击事件
		onNavigationBarSearchInputClicked(e) {
			uni.navigateTo({
				url: '/pages/tabbar/settle/ProductSearch'
			});
		},
		onShow() {
			try {
				// 动态获取高度
				let res = uni.getSystemInfoSync();
				const getinfo = uni.getSystemInfoSync();
				if (getinfo.model == 'iPhoneXSMax') {
					this.swiperHeight = res.windowHeight - uni.upx2px(150);
				} else {
					this.swiperHeight = res.windowHeight - uni.upx2px(80);
				}
			} catch (e) {
				console.log(e);
			}
			setTimeout(() => {
				this.InitData();
			}, 10)
		},
		onLoad(options) {
			if ((options.searchdata ?? '') != '') {
				this.key = options.searchdata;
			}
		},
		onPullDownRefresh() {
			this.InitData();
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			this.addRandomData();
		},
		data() {
			return {
				key: '',
				sort_by: '', //排序方式，目前提供：adddate（添加时间）、price（价格）、order_count（销量）
				sort: '', //asc=顺序、desc=倒序
				SearchData: "",
				swiperHeight: 500, //动态获取菜单高度
				value1: '', //价格选项默认第一个
				value2: '',
				value3: '',
				mask: true, //遮罩是否可以关闭
				options1: [{
						label: '顺序',
						value: 'asc'
					},
					{
						label: '倒序',
						value: 'desc'
					}
				],
				options2: [{
						label: '由多到少',
						value: 'asc'
					},
					{
						label: '由少到多',
						value: 'desc'
					}
				],
				options3: [{
						label: '由先到后',
						value: 'asc'
					},
					{
						label: '由后到先',
						value: 'desc'
					}
				],
				borderBottom: false,
				activeColor: '#ff9900', //激活颜色
				pageNo: 1, //显示第几页的数据
				pageSize: 5, //当前页显示多少条数据
				totalCount: 0, //总共条数
				page: 0, //分页数据
				loadStatus: 'loadmore', //加载前值为loadmore，加载中为loading，没有数据为nomore
				// 瀑布流
				flowList: [], //商品列表数据
				DataList: '', //Mock数据
				Type: 0,
				storeId: 0,
				selectdata: {
					orderby: '',
					brand: '',
					style: '',
					searchdata: ''
				},
			};
		},
		methods: {
			// 初始化数据
			InitData() {
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
					page_size: this.pageSize,
					// catalog_id: "", //类别id
					// city_code: "", //城市编码
					sort_by: this.sort_by, //排序方式，目前提供：adddate（添加时间）、price（价格）、order_count（销量）
					sort: this.sort //asc=顺序、desc=倒序
					// sort_by: "adddate", //排序方式，目前提供：adddate（添加时间）、price（价格）、order_count（销量）
					// sort: "desc" //asc=顺序、desc=倒序
				}
				// 获取商品明细
				this.$post(this.$url.Mall.GetGoods, requestData, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						uni.stopPullDownRefresh(); //停止当前页面下拉刷新
						this.flowList = res.data.list;
						this.totalCount = res.data.total_count; //分页总条数
					}
				})
			},
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
					// catalog_id: "", //类别id
					// city_code: "", //城市编码
					sort_by: this.sort_by, //排序方式，目前提供：adddate（添加时间）、price（价格）、order_count（销量）
					sort: this.sort //asc=顺序、desc=倒序
					// sort_by: "adddate", //排序方式，目前提供：adddate（添加时间）、price（价格）、order_count（销量）
					// sort: "desc" //asc=顺序、desc=倒序
				}
				// 获取商品明细
				this.$post(this.$url.Mall.GetGoods, requestData, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						this.loadStatus = 'loadmore'; //加载前
						this.flowList = [...this.flowList, ...res.data.list]; //合并数据
						this.totalCount = res.data.total_count; //分页总条数
					}
				})


			},
			borderChange(index) {
				this.borderBottom = !index;
			},
			activeColorChange(index) {
				this.activeColor = ['#2979ff', '#ff9900', '#19be6b'][index];
			},
			// 价格
			changeOrder1(sort) {
				this.sort_by = 'price';
				this.sort = sort;
				// sort_by: '', //排序方式，目前提供：price（价格）、order_count（销量）、adddate（添加时间）
				// sort: '' ,//asc=顺序、desc=倒序


				// this.$refs.uWaterfall.clear()
				// this.pageIndex =1;
				// this.selectdata.orderby = index;
				this.addRandomData();
			},
			// 销量
			changeOrder2(sort) {
				this.sort_by = 'order_count';
				this.sort = sort;
				// this.$refs.uWaterfall.clear()
				// this.pageIndex =1;
				// this.selectdata.orderby = index;
				this.addRandomData();
			},
			// 添加时间
			changeOrder3(sort) {
				this.sort_by = 'adddate';
				this.sort = sort;
				// this.$refs.uWaterfall.clear()
				// this.pageIndex =1;
				// this.selectdata.orderby = index;
				this.addRandomData();
			},
			changeStyle(index) {
				this.$refs.uWaterfall.clear()
				this.pageIndex = 1;
				this.selectdata.style = index;
				this.addRandomData();
			},
			closeDropdown() {
				this.$refs.uWaterfall.clear()
				this.pageIndex = 1;
				this.addRandomData();
				this.$refs.uDropdown.close();
			},
			tagClick(index) {
				this.list[index].active = !this.list[index].active;
			},
			maskChange(index) {
				this.mask = !index;
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
			// 商品点击事件
			skipCommodity(item) {
				console.log(JSON.stringify(item));
				uni.navigateTo({
					url: '/pages/tabbar/settle/ProductDetails?id=' + item.id
				});
			},
			clickimg(index) {
				this.$refs.uToast.show({
					title: `当前商品id是：${this.DataList.rotationChart[index].id}`,
					type: 'success'
				});
			}
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			this.addRandomData();
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
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

	.u-config-wrap {
		padding: 40rpx;
	}

	.slot-content {
		background-color: #ffffff;
		padding: 24rpx;

		.item-box {
			margin-bottom: 50rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.item {
				border: 1px solid $u-type-warning;
				color: $u-type-warning;
				padding: 8rpx 40rpx;
				border-radius: 100rpx;
				margin-top: 30rpx;
			}

			.active {
				color: #ffffff;
				background-color: $u-type-warning;
			}
		}
	}
</style>
