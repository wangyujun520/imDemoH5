<template>
	<view class="content">

		<view style="height: 80rpx;width: 750rpx;">
			<view class="flex">
				<view class="bg-white" style="width: 650rpx;">
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
			<view @click="skipFlowList(sitem)" class="flex align-center bg-white mt-2 rounded p-2"
				v-for="(sitem, index) in designerList" :key="index">

				<view class="flex align-center">
					<image :src="sitem.cover" style="width: 110rpx;height: 110rpx;" class="rounded">
						</image>
				</view>
				<view class="flex flex-column pl-2" style="width: 470rpx;">
					<!-- <text class="title u-line-2">{{ item.title }}</text> -->
					<view class="UserInfo pt-1">
						<text class="mr-1"
							style="color: #101010;font-size: 32rpx;font-weight: bold;">{{ sitem.title }}</text>
						<text class="font-sm text-white bg-danger px-1 pl-1"
							style="border-radius: 0rpx 8rpx 8rpx 0rpx;">设计师</text>
						<!-- <text v-if="item.RankClass === 2" class="font-sm text-white bg-info px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">销售人员</text>
						<text v-if="item.RankClass === 3" class="font-sm text-white bg-success px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">管家</text>
						<text v-if="item.RankClass === 4" class="font-sm text-white bg-warning px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">商家</text> -->
					</view>
					<view class="Describe">
						<text style="font-size: 26rpx;color: #939393;">{{ sitem.slogan }}</text>
					</view>
					<view class="Scoring">
						<u-rate :disabled="true" :current="sitem.point" :size="28" inactive-color="#B2B2B2" active-color="#FF9900"
							active-icon="star-fill" inactive-icon="star"></u-rate>
						<text style="color: #ff1b1b;">{{ sitem.point }}分</text>
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
		<!-- 占位 -->
		<view class="wrap" v-if="current==1">
			<u-waterfall v-model="CaseList" ref="uWaterfall">
				<template v-slot:left="{ leftList }">
					<view @click="skipMyCase(item)" class="demo-warter" v-for="(item, index) in leftList"
						:key="index">
						<u-lazy-load threshold="0" border-radius="10" :image="item.cover" :index="index">
						</u-lazy-load>
						<view class="flex">
							<text style="color: #02b1be; font-size: 26rpx">{{ item.tags }}</text>
						</view>
						<view class="demo-title LineBreak">{{ item.title }}</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view @click="skipMyCase(item)" class="demo-warter" v-for="(item, index) in rightList"
						:key="index">
						<u-lazy-load threshold="0" border-radius="10" :image="item.cover" :index="index">
						</u-lazy-load>
						<view class="flex">
							<text style="color: #02b1be; font-size: 26rpx">{{ item.tags }}</text>
						</view>
						<view class="demo-title LineBreak">{{ item.title }}</view>
					</view>
				</template>
			</u-waterfall>
		</view>
		<!-- <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore> -->
		
		<!-- 百科 -->
		
		<!-- 商品 -->
		<view v-if="current==2" class="mt-2">
			<view class="wrap">
				<u-waterfall v-model="FlowCommodityList" ref="uWaterfall">
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
									<u-icon v-if="!item.collection" name="heart" color="#939393" size="34"></u-icon>
									<u-icon v-else name="heart-fill" color="#FF9900" size="34"></u-icon>
								</view>
							</view>
						</view>
					</template>
				</u-waterfall>
			</view>
		</view>
		
		<!-- <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomDataCommodity"></u-loadmore> -->
		
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {
			// setTimeout(() => {
			// 	uni.stopPullDownRefresh();
			// }, 2000)
		},
		data() {
			return {
				//列表数据
				list: [{
						name: '设计师',
						value:'1'
					},
					{
						name: '案例',
						value:'2'
					},
					{
						name: '商品',
						value:'4'
					}
				],
				current: 0, //当前选中的下标
				pageNo: 1, //显示第几页的数据
				pageSize: 5, //当前页显示多少条数据
				totalCount: 0, //总共条数
				page: 0, //分页数据
				loadStatus: 'loadmore', //加载前值为loadmore，加载中为loading，没有数据为nomore
				designerList:[],//设计师列表
				// 瀑布流
				flowList: [], //商品列表数据
				activeColor: this.$u.color['warning'],
				// 弹出菜单参数
				show: false, //是否显示弹出框菜单
				mode: 'top', //显示位置
				mask: true, // 是否显示遮罩
				closeable: false, //是否显示关闭按钮
				closeIconPos: 'top-right', //关闭按钮位置
				// 弹出菜单参数
				swiperHeight: 500, // swiper菜单高度
				CaseList: [], //商品列表数据
				totalFlowCount: 0,
				Flowpage: 0 ,//分页数据
				FlowCommodityList: [],
				totalFlowCommodityCount: 0,
				FlowCommoditypage: 0 //分页数据
			};
		},
		onShow() {
			this.InitData();//初始化数据
		},
		// onReachBottom() {
		// 	if (this.current == 0) {
		// 		this.FlowUser();
		// 	}
		// 	if (this.current == 1) {
		// 		this.loadStatus = "loading"; //加载中
		// 		this.addRandomData();
		// 	}
		// 	if (this.current == 2) {
		// 		this.FlowCommodity();
		// 	}
		// },
		methods: {
			// 跳转设计师
			skipFlowList(item){
				uni.navigateTo({
					url:'/pages/tabbar/find/homepage?id='+item.data_id
				})
			},
			// 跳转案例
			skipMyCase(item) {
				uni.navigateTo({
					// url: '/pages/TaskOrder/MyCase/CaseDetails?id=' + item.id
					url: '/pages/tabbar/settle/case-details?id=' + item.data_id
				});
			},
			// 商品点击事件
			skipCommodity(item) {
				console.log(JSON.stringify(item));
				uni.navigateTo({
					// url: '/pages/tabBar/settle/ProductDetails?id=' + item.id
					url: '/pages/tabbar/settle/ProductDetails?id=' + item.data_id
				});
			},
			InitData(){
				// 设计师
				if(this.current == 0){
					this.$post(this.$url.User.GetFavorites, {
						page_no: this.pageNo,
						page_size: this.pageSize,
						catalog: this.list[this.current].value //类型；1=设计师；2=案例；5=百科；4=商品； 3=发现；
					}, {
						isLoading: true
					}).then(res => {
						// console.log(JSON.stringify(res))
						// this.DataList = res.data.list;
						this.designerList = res.data.list;
					});
				}
				// 案例
				if(this.current == 1){
					// 获取我的关注
					this.$post(this.$url.User.GetFavorites, {
						page_no: 1,
						page_size: 10,
						catalog: this.list[this.current].value //类型；1=设计师；2=案例；5=百科；4=商品； 3=发现；
					}, {
						isLoading: true
					}).then(res => {
						// console.log(JSON.stringify(res))
						// this.DataList = res.data.list;
						this.CaseList = res.data.list;
					});
				}
				// 商品
				if(this.current == 2){
					this.$post(this.$url.User.GetFavorites, {
						page_no: 1,
						page_size: 10,
						catalog: this.list[this.current].value //类型；1=设计师；2=案例；5=百科；4=商品； 3=发现；
					}, {
						isLoading: true
					}).then(res => {
						// console.log(JSON.stringify(res))
						// this.DataList = res.data.list;
						this.FlowCommodityList = res.data.list;
					});
				}
				
				
			},
			
			FlowUser() {
			},
			skipUser(item) {
				uni.navigateTo({
					url: '/pages/tabbar/find/homepage?id=' + item.mobileUserId
				});
			},
			
			addRandomDataCommodity() {
				
			},
			// 瀑布流分页加载数据
			addRandomData() {
				
			},
			MenuLoad() {
				
			},
			// 切换菜单
			SwitchMenu(index) {
				this.current = index;
				this.show = false;
				this.InitData();
			},
			// 菜单改变
			change(index) {
				this.current = index;
				this.InitData();
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
				this.current = event.detail.current;
				this.InitData();
			}
		}
	};
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
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
