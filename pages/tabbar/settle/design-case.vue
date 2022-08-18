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
				<scroll-view class="tab-scroll-view py-1" :scroll-x="true" show-scrollbar="false">
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
					<view class="demo-warter" @click="skipCommodity(item)" v-for="(item, index) in leftList" :key="item.id">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.cover" :index="index"></u-lazy-load>
						<view class="flex">
							<text style="color: #02b1be; font-size: 26rpx">{{ item.tags }}</text>
						</view>
						<view class="demo-title">{{ item.title }}</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="demo-warter" @click="skipCommodity(item)" v-for="(item, index) in rightList" :key="item.id">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.cover" :index="index"></u-lazy-load>
						<view class="flex">
							<text style="color: #02b1be; font-size: 26rpx">{{ item.tags }}</text>
						</view>
						<view class="demo-title">{{ item.title }}</view>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore v-if="flowList.length>5" bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	
		<view v-if="flowList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		// 监听原生标题栏搜索输入框点击事件
		onNavigationBarSearchInputClicked(e) {
			uni.navigateTo({
				url: '/pages/tabbar/settle/CaseSearch'
			});
		},
		// onPullDownRefresh() {
		// 	this.getdata();
		// },
		onLoad(options) {
			if((options.house_style??'')!=''){
				this.house_style_page = options.house_style;
			}
		},
		onShow() {
			// 获取数据字典
			this.getDic();
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
				SearchData: "",
				page_no : 1,
				page_size : 10,
				house_area : '',
				house_catalog : '',
				house_cost : '',
				house_style : '',
				house_style_page:'',//上一个页面传递过来的
				key : ''
			};
		},
		methods: {
			// 获取数据字典
			getDic(){
				let DicList = [
					{
						menuName: '面积',
						alias: 'area',
						List: []
					},
					{
						menuName: '户型',
						alias: 'houseType',
						List: []
					},
					{
						menuName: '预算',
						alias: 'budget',
						List: []
					},
					{
						menuName: '风格',
						alias: 'style',
						List: []
					}
				]
				this.$post(this.$url.Public.GetDicts,{
					key: "house_area"//面积
				},{}).then(res=>{
					if(res.code == 200 && res.status == 0){
						res.data.forEach(item=>{
							let newData = {
								key:item.key,
								name:item.value,
								like: false
							}
							DicList[0].List.push(newData)
						})
						//获取接口
						this.$post(this.$url.Public.GetDicts,{
							key: "house_catalog"//户型
						},{}).then(res=>{
							if(res.code == 200 && res.status == 0){
								res.data.forEach(item=>{
									let newData = {
										key:item.key,
										name:item.value,
										like: false
									}
									DicList[1].List.push(newData)
								})
								//获取接口
								this.$post(this.$url.Public.GetDicts,{
									key: "house_cost"//费用
								},{}).then(res=>{
									if(res.code == 200 && res.status == 0){
										res.data.forEach(item=>{
											let newData = {
												key:item.key,
												name:item.value,
												like: false
											}
											DicList[2].List.push(newData)
										})
										//获取接口
										this.$post(this.$url.Public.GetDicts,{
											key: "house_style"//风格
										},{}).then(res=>{
											if(res.code == 200 && res.status == 0){
												res.data.forEach(item=>{
													let newData = {
														key:item.key,
														name:item.value,
														like: false
													}
													DicList[3].List.push(newData)
												})
												
												
												
												//获取接口
												// console.log(JSON.stringify(DicList))
												this.MenuList = DicList
												
												if((this.house_style_page??'')!=''){
													res.data.forEach((item2,index)=>{
														if(this.house_style_page===item2.key){
															this.SwitchMenu(DicList[3].List, 3, (index+1));
														}
													})
												}else{
													this.getdata();
												}
												
												
												// if((this.house_style_page??'')!=''){
												// 	console.log(this.house_style_page)
												// 	this.SwitchMenu(DicList[3].List, 3, this.house_style_page);
												// }
												
											}
										})
									}
								})
							}
						})
					}
				})
				
			},
			getdata() {
				// 获取案例明细
				this.$post(this.$url.Case.GetCases,{
					page_no:this.page_no ,//页码
					page_size:this.page_size , //每页数量
					house_area:this.house_area , //房屋面积
					house_catalog:this.house_catalog , //房屋类型
					house_cost:this.house_cost , //费用
					house_style:this.house_style , //房屋风格
					key: this.key //关键字
				},{}).then(res=>{
					if(res.code == 200 && res.status == 0){
						this.totalCount = res.data.total_count; //总条数
						this.flowList = res.data.list;
						if (this.totalCount <= 5) {
							this.loadStatus = "nomore"; //加载完成
							return;
						}
					}
				})
				
				// //获取商品列表
				// var ProductList = this.AJB.BizUrl + 'api/Communication/GetPageDesignScheme';
				// var ProductListDatas = {
				// 	maxResultCount: 5,
				// 	skipCount: this.page,
				// 	selectdata: this.selectdata
				// };
				// this.AJB.UniAjax(ProductList, ProductListDatas)
				// 	.then(res => {
						
				// 		uni.stopPullDownRefresh(); //关闭下拉刷新
				// 		console.log(JSON.stringify(res.dataList.items));
				// 		this.totalCount = res.dataList.totalCount; //总条数
				// 		this.flowList = res.dataList.items;

				// 		if (this.totalCount <= 5) {
				// 			this.loadStatus = 'nomore'; //加载完成
				// 			return;
				// 		}
				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 	});
			},
			// 收藏和取消收藏
			Collection(item) {
				this.$refs.uWaterfall.modify(item.id, 'collection', !item.collection);
			},
			// 商品点击事件
			skipCommodity(item) {
				uni.navigateTo({
					// url: '/pages/TaskOrder/MyCase/CaseDetails?id=' + item.id
					url: '/pages/tabbar/settle/case-details?id=' + item.id
				});
			},
			// 瀑布
			addRandomData() {
				
			},
			SwitchMenu(item, menuindex, itemindex) {
				console.log(item)
				console.log(menuindex)
				console.log(itemindex)
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
								FindData.area = litem.key;
							}
							if (mitem.alias == 'houseType') {
								FindData.houseType = litem.key;
							}
							if (mitem.alias == 'budget') {
								FindData.budget = litem.key;
							}
							if (mitem.alias == 'style') {
								FindData.style = litem.key;
							}
						}
					});
				});
				
				// house_area:this.house_area , //房屋面积
				// house_catalog:this.house_catalog , //房屋类型
				// house_cost:this.house_cost , //费用
				// house_style:this.house_style , //房屋风格
				// key: this.key //关键字
				
				this.selectdata = FindData;
				
				this.house_area = this.selectdata.area;
				this.house_catalog = this.selectdata.houseType;
				this.house_cost = this.selectdata.budget;
				this.house_style = this.selectdata.style;
				
				// console.log(JSON.stringify(this.selectdata))
				this.getdata();
			}
		},
		// onShow() {
		// 	this.getdata();
		// },
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
		width: 580rpx;
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