<template>
	<view class="content">
		<!-- 菜单 -->
		<view class="flex flex-column bg-white">
			<view class="flex" v-for="(menuitem, menuindex) in MenuList" :key="menuindex">
				<view class="flex align-center justify-end" style="width: 150rpx">
					<view class="" style="
              padding: 5rpx 30rpx;
              border: 1px solid rgba(187, 187, 187, 0.2);
              border-radius: 20rpx;
              background-color: #eee;
            ">
						<text>{{ menuitem.menuName }}</text>
					</view>
				</view>
				<scroll-view class="tab-scroll-view py-2" :scroll-x="true" show-scrollbar="false">
					<view @click="SwitchMenu(menuitem.List, menuindex, listindex)" :key="listindex" class="tab-item ml-2 position-relative"
					 :class="[listitem.like ? 'Select' : 'NoSelect']" v-for="(listitem, listindex) in menuitem.List">
						<text>{{ listitem.name }}</text>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 瀑布流 -->
		<view class="wrap">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{ leftList }">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
						<u-lazy-load @click="skipCommodity(item)" threshold="-450" border-radius="10" :image="item.coverMap" :index="index"></u-lazy-load>
						<view class="flex">
							<text style="color: #02b1be; font-size: 26rpx">{{ item.houseArea }}㎡ | {{ item.houseType }} | {{ item.cost }} |
								{{ item.houseStyle }}</text>
						</view>
						<view @click="skipCommodity(item)" class="demo-title">{{ item.content }}</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load @click="skipCommodity(item)" threshold="-450" border-radius="10" :image="item.coverMap" :index="index"></u-lazy-load>
						<view class="flex">
							<text style="color: #02b1be; font-size: 26rpx">{{ item.houseArea }}㎡ | {{ item.houseType }} | {{ item.cost }} |
								{{ item.houseStyle }}</text>
						</view>
						<view @click="skipCommodity(item)" class="demo-title">{{ item.content }}</view>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	</view>
</template>

<script>
	export default {
		// 监听原生标题栏搜索输入框点击事件
		onNavigationBarSearchInputClicked(e) {
			uni.navigateTo({
				url: '/pages/tabBar/settle/CaseSearch'
			});
		},
		onPullDownRefresh() {
			this.getdata();
		},
		onLoad(option) {
			var menuLists = {
				code: 200,
				msg: 'ok',
				dataList: [{
						menuName: '面积',
						alias: 'area',
						List: [{
								name: '30㎡以下',
								like: false
							},
							{
								name: '30-60㎡',
								like: false
							},
							{
								name: '60-90㎡',
								like: false
							},
							{
								name: '90-120㎡',
								like: false
							},
							{
								name: '120-150㎡',
								like: false
							}
						]
					},
					{
						menuName: '户型',
						alias: 'houseType',
						List: [{
								name: '一室',
								like: false
							},
							{
								name: '二室',
								like: false
							},
							{
								name: '三室',
								like: false
							},
							{
								name: '四室',
								like: false
							},
							{
								name: '四室以上',
								like: false
							},
							{
								name: '复式',
								like: false
							}
						]
					},
					{
						menuName: '预算',
						alias: 'budget',
						List: [{
								name: '5万以下',
								like: false
							},
							{
								name: '5-10万',
								like: false
							},
							{
								name: '10-15万',
								like: false
							},
							{
								name: '15-20万',
								like: false
							},
							{
								name: '20-30万',
								like: false
							}
						]
					},
					{
						menuName: '风格',
						alias: 'style',
						List: [{
								name: '北欧',
								like: false
							},
							{
								name: '中式',
								like: false
							},
							{
								name: '美式',
								like: false
							},
							{
								name: '现代',
								like: false
							},
							{
								name: '工业风',
								like: false
							},
							{
								name: '日式',
								like: false
							}
						]
					}
					// ,
					// {
					// 	"menuName": "特色",
					// 	"List": [{
					// 			"name": "整屋设计",
					// 			"like": false
					// 		},
					// 		{
					// 			"name": "全屋定制",
					// 			"like": false
					// 		},
					// 		{
					// 			"name": "硬装设计",
					// 			"like": false
					// 		},
					// 		{
					// 			"name": "软装设计",
					// 			"like": false
					// 		},
					// 		{
					// 			"name": "局部改造",
					// 			"like": false
					// 		}
					// 	]
					// }
				]
			};
			this.MenuList = menuLists.dataList;
			
			var FindData = {
				area: '',
				houseType: '',
				budget: '',
				style: '',
				searchdata: ''
			};
			FindData.searchdata = option.SearchData;
			this.SearchData = option.SearchData;
			this.selectdata = FindData;
			this.getdata();
		},
		data() {
			return {
				// 瀑布流
				loadStatus: 'loadmore',
				flowList: [], //商品列表数据
				totalCount: 0, //总共条数
				page: 0, //分页数据
				MenuList: '', //Mock菜单数据
				selectdata: '',
				SearchData: ""
			};
		},
		methods: {
			getdata() {
				
				//获取商品列表
				var ProductList = this.AJB.BizUrl + 'api/Communication/GetPageDesignScheme';
				var ProductListDatas = {
					maxResultCount: 5,
					skipCount: this.page,
					selectdata: this.selectdata
				};
			
				this.AJB.UniAjax(ProductList, ProductListDatas)
					.then(res => {
						
						uni.stopPullDownRefresh(); //关闭下拉刷新
						console.log(JSON.stringify(res.dataList.items));
						this.totalCount = res.dataList.totalCount; //总条数
						this.flowList = res.dataList.items;

						if (this.totalCount <= 5) {
							this.loadStatus = 'nomore'; //加载完成
							return;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 收藏和取消收藏
			Collection(item) {
				this.$refs.uWaterfall.modify(item.id, 'collection', !item.collection);
			},
			// 商品点击事件
			skipCommodity(item) {
				uni.navigateTo({
					url: '/pages/TaskOrder/MyCase/CaseDetails?id=' + item.id
				});
			},
			// 瀑布
			addRandomData() {
				
				this.page += 5;
				if (this.page >= this.totalCount) {
					this.loadStatus = 'nomore'; //加载完成
					return;
				}
				//获取商品列表
				var ProductList = this.AJB.BizUrl + 'api/Communication/GetPageDesignScheme';
				var ProductListDatas = {
					maxResultCount: 5,
					skipCount: this.page,
					selectdata: this.selectdata
				};
				this.AJB.UniAjax(ProductList, ProductListDatas)
					.then(res => {
						
						res.dataList.items.forEach(items => {
							this.flowList.push(items);
						});
						this.loadStatus = 'loadmore'; //加载完成
					})
					.catch(err => {
						console.log(err);
					});
			},
			SwitchMenu(item, menuindex, itemindex) {
					this.$refs.uWaterfall.clear()
				//清空选项
				this.MenuList[menuindex].List.forEach((foritem, forindex) => {
					
					// 选中的是自己
					if (forindex == itemindex) {
						// 当前是选中
						if (item[itemindex].like) {
							foritem.like = false;
						} else {
							//当前是未选中
							this.MenuList[menuindex].List.forEach((fitem, findex) => {
								fitem.like = false;
							});
							foritem.like = true;
						}
					}
				});
				var FindData = {
					area: '',
					houseType: '',
					budget: '',
					style: '',
					searchdata: ''
				};
				FindData.searchdata = this.SearchData;

				this.MenuList.forEach((mitem, mindex) => {
					mitem.List.forEach((litem, linde) => {
						if (litem.like) {
							if (mitem.alias == 'area') {
								FindData.area = litem.name;
							}
							if (mitem.alias == 'houseType') {
								FindData.houseType = litem.name;
							}
							if (mitem.alias == 'budget') {
								FindData.budget = litem.name;
							}
							if (mitem.alias == 'style') {
								FindData.style = litem.name;
							}
						}
					});
				});
				this.selectdata = FindData;
				this.getdata();
			}
		},
		onShow() {
			this.getdata();
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			this.addRandomData();
			// // 模拟数据加载
			// setTimeout(() => {
			// 	this.addRandomData();
			// 	this.loadStatus = 'loadmore';
			// }, 1000);
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

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.Select {
		background-color: #ff9900;
		color: #ffffff;
	}

	.NoSelection {
		background-color: #ffffff;
		color: #101010;
	}

	.LineBreak {
		white-space: initial;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
		line-height: 30rpx;
	}

	.tab-scroll-view {
		width: 600rpx;
		flex-direction: row;
		white-space: nowrap;

		.tab-item {
			display: inline-block;
			padding: 5rpx 30rpx;
			border-radius: 20rpx;
			border: 1px solid rgba(187, 187, 187, 0.2);
			// width: 500rpx;
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
<style>
	page {
		background-color: #f7f7f7;
	}
</style>