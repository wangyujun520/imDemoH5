<template>
	<view class="content">
		<view class="bg-white">
			<!-- 头像 -->
			<view class="flex flex-row pl-2" style="height: 120rpx;">
				<view @click="skipMyInfo()" class="HeadImg p-1" style="width: 120rpx;height: 100%;">
					<!-- <image
						class="rounded"
						src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1608299331&di=a7976fd7c35b9dc3a793d94ab378cca8&src=http://hbimg.b0.upaiyun.com/0cd238587a0984d24b8688ad35c187da3ace5314317c-KPcKiS_fw658"
						style="width: 100%;height: 100%;"
					></image> -->
					<!-- <image class="rounded" src="https://ajb-app-dev.oss-cn-shenzhen.aliyuncs.com/DataList/DefaultAvatar.jpg" style="width: 100%;height: 100%;"></image> -->
					<image class="rounded" :src="DataList.header" style="width: 100%;height: 100%;"></image>
					<!-- <image class="rounded" :src="DataList.header" style="width: 100%;height: 100%;"></image> -->
				</view>
				<view @click="skipMyInfo()" class="flex flex-column pt-1 pl-1" style="width: 390rpx;height: 100%;">
					<view v-if="DataList.is_auth == 0" class="Name flex align-center">
						<text style="font-size: 36rpx;color: #101010;font-weight: bold;">{{DataList.nick}}</text>
						<!-- <text class="font-sm text-white bg-danger px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">{{DataList.biz_catalog[0]}}</text> -->
						<text class="font-sm text-white bg-danger px-1 pl-1 ml-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;" v-for="item in DataList.biz_catalog">{{item}}</text>
					</view>
					<view v-else class="Name flex align-center"><text style="font-size: 36rpx;color: #101010;font-weight: bold;" class="mr-1">未实名</text></view>
					<text style="font-size: 26rpx;color: #666;" class="LineBreak">{{DataList.slogan}}</text>
				</view>
				<view v-if="DataList.is_auth == 0" @click="skipMyCertification()" class="flex justify-end align-center" style="width: 220rpx;height: 100%;">
					<text class="px-3 py-1" style="background-color: #F9EDDC;color: #101010;border-radius: 50rpx 0rpx 0rpx 50rpx;">我的认证</text>
				</view>
				<view v-else @click="skiprenzhen()" class="flex justify-end align-center" style="width: 220rpx;height: 100%;">
					<text class="px-3 py-1" style="background-color: #F9EDDC;color: #101010;border-radius: 50rpx 0rpx 0rpx 50rpx;">实名认证</text>
				</view>
			</view>
			<!-- 第一行菜单 -->
			<view style="height: 150rpx;" class="mt-1">
				<!-- <view class="pt-2" style="width: 20%;float: left;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 60rpx;display: block;color: #02B1BE;">&#xe6cc;</text>
					<text style="font-size: 22rpx;color: #999;">评论</text>
				</view> -->
				<view @tap="skipLike" class="pt-2" style="width: 25%;float: left;height: 100%;text-align: center;">
					<!-- <text class="iconfont" style="font-size: 40rpx;display: block;color: #3E8EFF;">&#xe693;</text> -->
					<text class="iconfont" style="font-size: 60rpx;display: block;color: #FF9900;">&#xe6cf;</text>
					<text style="font-size: 22rpx;color: #999;">点赞</text>
				</view>
				<view @tap="skipMyHouse" class="pt-2" style="width: 25%;float: left;height: 100%;text-align: center;">
					<!-- <text class="iconfont" style="font-size: 40rpx;display: block;color: #02B1BE;">&#xe695;</text> -->
					<text class="iconfont" style="font-size: 60rpx;display: block;color: #4BA76B;">&#xe6d2;</text>
					<text style="font-size: 22rpx;color: #999;">房产</text>
				</view>
				<view @tap="skipFollow" class="pt-2" style="width: 25%;float: left;height: 100%;text-align: center;">
					<!-- <text class="iconfont" style="font-size: 40rpx;display: block;color: #FF0000;">&#xe696;</text> -->
					<text class="iconfont" style="font-size: 60rpx;display: block;color: #D81E06;">&#xe6cd;</text>
					<text style="font-size: 22rpx;color: #999;">关注</text>
				</view>
				<view @tap="skipWallet" class="pt-2" style="width: 25%;float: left;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 60rpx;display: block;color: #4A90E2;">&#xe6e9;</text>
					<text style="font-size: 22rpx;color: #999;">钱包</text>
				</view>
				
			</view>
		</view>
		
		<!-- 设计师工单 -->
		<view class="bg-white mx-2 flex flex-column mt-2" v-for="(mitem,mindex) in MenuList" :key="mindex">
			<text class="mt-3 ml-3" style="font-size: 35rpx;font-weight: bold;color: #101010;">{{mitem.group}}</text>
			<view class="task-box flex flex-wrap mt-1">
				<view @tap="skipMenu(menuitem)" class="py-2" v-for="(menuitem,menuindex) in mitem.menus" :key="menuitem.id"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" :style="{color:menuitem.color}" style="font-size: 50rpx;display: block;" v-html="menuitem.icon"></text>
					<text style="font-size: 25rpx;">{{menuitem.title}}</text>
				</view>
				<!-- <view @click="skipAllWorkOrders('免费工单','1','1')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #907DE5;">&#xe69a;</text>
					<text style="font-size: 25rpx;">免费工单</text>
				</view>
				<view @click="skipAllWorkOrders('悬赏工单','1','0')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #F29A53;">&#xe69b;</text>
					<text style="font-size: 25rpx;">悬赏工单</text>
				</view>
				<view @click="skipAllWorkOrders('拒绝工单','2','-2')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #81C298;">&#xe697;</text>
					<text style="font-size: 25rpx;">拒绝工单</text>
				</view>
				<view @click="skipAllWorkOrders('完成工单','2','0')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #27BDC8;">&#xe698;</text>
					<text style="font-size: 25rpx;">完成工单</text>
				</view>
				<view @click="skipMyPlan" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #FF9900;">&#xe92d;</text>
					<text style="font-size: 25rpx;">我的方案</text>
				</view>
				<view @click="skipMyCase" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #81C298;">&#xe6ce;</text>
					<text style="font-size: 25rpx;">我的案例</text>
				</view>
				<view @click="skipDesignOrder" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #E0747F;">&#xe6da;</text>
					<text style="font-size: 25rpx;">设计订单</text>
				</view> -->
			</view>
		</view>
		
		
		
		<!-- 设计师工单 -->
		<!-- <view class="bg-white mx-2 flex flex-column mt-2">
			<text class="mt-3 ml-3" style="font-size: 35rpx;font-weight: bold;color: #101010;">设计师工单</text>
			<view class="task-box flex flex-wrap mt-1">
				<view @click="skipAllWorkOrders('全部工单','0','0')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #E08F8C;">&#xe69c;</text>
					<text style="font-size: 25rpx;">全部工单</text>
				</view>
				<view @click="skipAllWorkOrders('免费工单','1','1')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #907DE5;">&#xe69a;</text>
					<text style="font-size: 25rpx;">免费工单</text>
				</view>
				<view @click="skipAllWorkOrders('悬赏工单','1','0')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #F29A53;">&#xe69b;</text>
					<text style="font-size: 25rpx;">悬赏工单</text>
				</view>
				<view @click="skipAllWorkOrders('拒绝工单','2','-2')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #81C298;">&#xe697;</text>
					<text style="font-size: 25rpx;">拒绝工单</text>
				</view>
				<view @click="skipAllWorkOrders('完成工单','2','0')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #27BDC8;">&#xe698;</text>
					<text style="font-size: 25rpx;">完成工单</text>
				</view>
				<view @click="skipMyPlan" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #FF9900;">&#xe92d;</text>
					<text style="font-size: 25rpx;">我的方案</text>
				</view>
				<view @click="skipMyCase" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #81C298;">&#xe6ce;</text>
					<text style="font-size: 25rpx;">我的案例</text>
				</view>
				<view @click="skipDesignOrder" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #E0747F;">&#xe6da;</text>
					<text style="font-size: 25rpx;">设计订单</text>
				</view>
			</view>
		</view> -->
		<!-- 用户安居 -->
		<!-- <view class="bg-white mx-2 flex flex-column mt-2">
			<text class="mt-3 ml-3" style="font-size: 35rpx;font-weight: bold;color: #101010;">用户安居</text>
			<view class="task-box flex flex-wrap mt-1">
				<view @tap="skipDesignWordOrder" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #FF9900;">&#xe6a4;</text>
					<text style="font-size: 25rpx;">设计工单</text>
				</view>
				<view @tap="skipHousingArchives" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #8772E2;">&#xe6d0;</text>
					<text style="font-size: 25rpx;">安居档案</text>
				</view>
				<view @tap="skipMyPoints" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #0EB5C1;">&#xe6f8;</text>
					<text style="font-size: 25rpx;">我的积分</text>
				</view>
				<view @tap="skipRepairOrder" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #8772E2;">&#xe6e3;</text>
					<text style="font-size: 25rpx;">维修单</text>
				</view>
				<view @tap="skipSalesOrder" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #8772E2;">&#xe6d0;</text>
					<text style="font-size: 25rpx;">销售订单</text>
				</view>
				<view @tap="skipConstructionWorkOrder" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #0EB5C1;">&#xe6f8;</text>
					<text style="font-size: 25rpx;">施工工单</text>
				</view>
				<view @tap="skipServiceOrder" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #E0747F;">&#xe6da;</text>
					<text style="font-size: 25rpx;">服务订单</text>
				</view>
			</view>
		</view> -->
		<!-- 商铺管理 -->
		<!-- <view class="bg-white mx-2 flex flex-column mt-2">
			<text class="mt-3 ml-3" style="font-size: 35rpx;font-weight: bold;color: #101010;">商铺管理</text>
			<view class="task-box flex flex-wrap mt-1">
				<view @click="skipAllBusinessOrders('')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #FF0000;">&#xe6d4;</text>
					<text style="font-size: 25rpx;">全部订单</text>
				</view>
				<view @click="skipAllBusinessOrders('1')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #02B1BE;">&#xe6d5;</text>
					<text style="font-size: 25rpx;">待交易订单</text>
				</view>
				<view @click="skipAllBusinessOrders('0')" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #FF9900;">&#xe6d8;</text>
					<text style="font-size: 25rpx;">已完成订单</text>
				</view>
				<view @click="skipBusinessRepairOrder" class="py-2"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #8772E2;">&#xe6e3;</text>
					<text style="font-size: 25rpx;">维修单</text>
				</view>
				<view class="py-2" @click="skipProductList"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #8772E2;">&#xe6e3;</text>
					<text style="font-size: 25rpx;">商品管理</text>
				</view>
				<view class="py-2" @click="skipListing"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #8772E2;">&#xe6e3;</text>
					<text style="font-size: 25rpx;">商品上架</text>
				</view>
				<view class="py-2" @click="skipCommodityClassification"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #8772E2;">&#xe6e3;</text>
					<text style="font-size: 25rpx;">商品分类</text>
				</view>
			</view>
		</view> -->
		<!-- 销售订单 -->
		<!-- <view class="bg-white mx-2 flex flex-column mt-2">
			<text class="mt-3 ml-3" style="font-size: 35rpx;font-weight: bold;color: #101010;">销售订单</text>
			<view class="task-box flex flex-wrap mt-1">
				<view @click="skipSalesOrder(1)" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #3E8FFF;">&#xe6de;</text>
					<text style="font-size: 25rpx;">销售订单</text>
				</view>
				<view @click="skipCoordinationtask" class="py-2" style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #FF9900;">&#xe85c;</text>
					<text style="font-size: 25rpx;">协同订单</text>
				</view>
			</view>
		</view> -->
		<!-- 监理工单 -->
		<!-- <view class="bg-white mx-2 flex flex-column mt-2">
			<text class="mt-3 ml-3" style="font-size: 35rpx;font-weight: bold;color: #101010;">监理工单</text>
			<view class="task-box flex flex-wrap mt-1">
				<view class="py-2" @click="skipSupervisionWorkOrder(1)"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #FF9900;">&#xe6db;</text>
					<text style="font-size: 25rpx;">全部工单</text>
				</view>
				<view class="py-2" @click="skipSupervisionWorkOrder(2)"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #3E8FFF;">&#xe6dc;</text>
					<text style="font-size: 25rpx;">进行中</text>
				</view>
				<view class="py-2" @click="skipSupervisionWorkOrder(3)"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #02B1BE;">&#xe6d9;</text>
					<text style="font-size: 25rpx;">已完成</text>
				</view>
				<view class="py-2" @click="skipSupervisionWorkOrder(4)"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #FF0000;">&#xe6dd;</text>
					<text style="font-size: 25rpx;">已拒绝</text>
				</view>
				<view class="py-2" @click="skipSupervisionWorkOrder(1)"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #E0747F;">&#xe6da;</text>
					<text style="font-size: 25rpx;">施工订单</text>
				</view>
			</view>
		</view> -->
		<!-- 工人工单 -->
		<!-- <view class="bg-white mx-2 flex flex-column mt-2">
			<text class="mt-3 ml-3" style="font-size: 35rpx;font-weight: bold;color: #101010;">工人工单</text>
			<view class="task-box flex flex-wrap mt-1">
				<view class="py-2" @click="skipConstructionWorkOrder"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #FF9900;">&#xe6db;</text>
					<text style="font-size: 25rpx;">全部工单</text>
				</view>
				<view class="py-2" @click="skipConstructionWorkOrder"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #3E8FFF;">&#xe6dc;</text>
					<text style="font-size: 25rpx;">进行中</text>
				</view>
				<view class="py-2" @click="skipConstructionWorkOrder"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #02B1BE;">&#xe6d9;</text>
					<text style="font-size: 25rpx;">已完成</text>
				</view>
				<view class="py-2" @click="skipConstructionWorkOrder"
					style="width: 177rpx;height: 100%;text-align: center;">
					<text class="iconfont" style="font-size: 50rpx;display: block;color: #FF0000;">&#xe6dd;</text>
					<text style="font-size: 25rpx;">已拒绝</text>
				</view>
			</view>
		</view> -->
		
		<!-- 占位 -->
		<view class="" style="height: 20rpx;"></view>
		
	</view>
</template>

<script>
export default {
	onNavigationBarButtonTap: function(e) {
		if (e.float == 'right') {
			uni.navigateTo({
				url: '/pages/my/setup'
			});
		}
	},
	onShow() {
		// 获取个人信息
		this.$post(this.$url.User.GetBaseData, {},{
			isLoading:false,
			loadingTitle:'加载中...'
		}).then(res => {
			// console.log(123)
			if(res.code == 200 && res.status==0){
				console.log(JSON.stringify(res.data))
				uni.setStorageSync('rankno',res.data.catalog);//职级编号
				this.DataList = res.data;
			}
		});
		
		// 获取用户功能菜单
		this.$post(this.$url.User.GetMenus, {},{
			isLoading:false,
			loadingTitle:'加载中...'
		}).then(res => {
			this.MenuList = res.data;
		});
		
		
		
	},
	data() {
		return {
			DataList:{},
			MenuList:[]//菜单
		};
	},
	methods: {
		skipMenu(menu){
			uni.navigateTo({
				url : menu.url
			})
		},
		// 跳转到商品列表
		skipProductList(){
			uni.navigateTo({
				url:'/pages/ShopManagement/commodity_management'
			})
		},
		// 跳转到上架列表
		skipListing(){
			uni.navigateTo({
				url:'/pages/ShopManagement/listing'
			})
		},
		// 跳转到商品分类
		skipCommodityClassification(){
			uni.navigateTo({
				url:'/pages/ShopManagement/commodity_classification'
			})
		},
		// 跳转到我的方案
		skipMyPlan(){
			uni.navigateTo({
				url:'/pages/TaskOrder/MyPlan'
			})
		},
		// 跳转到我的案例
		skipMyCase(){
			uni.navigateTo({
				url:'/pages/TaskOrder/MyCase/Index'
			})
		},
		// 跳转到设计订单
		skipDesignOrder(){
			uni.navigateTo({
				url:'/pages/TaskOrder/MyCase/DesignOrder'
			})
		},
		skipAllWorkOrders(title,type,value) {
			uni.navigateTo({
				url: '/pages/TaskOrder/AllWorkOrders?title=' + title+'&type='+type+'&value='+value
			})
		},
		// 跳转到设计工单
		skipDesignWordOrder(){
			uni.navigateTo({
				url:'/pages/UserLive/DesignWordOrder'
			})
		},
		// 跳转到安居档案
		skipHousingArchives(){
			uni.navigateTo({
				url:'/pages/UserLive/HousingArchives'
			})
		},
		// 跳转到我的积分
		skipMyPoints(){
			uni.navigateTo({
				url:'/pages/UserLive/MyPoints'
			})
		},
		// 跳转到维修订单
		skipRepairOrder(){
			uni.navigateTo({
				url:'/pages/UserLive/RepairOrder'
			})
		},
		// 跳转到销售订单
		skipSalesOrder(){
			uni.navigateTo({
				url: '/pages/tabbar/my/SalesOrder/SalesOrder'
			})
		},
		// 跳转到协同订单
		skipCoordinationtask(){
			uni.navigateTo({
				url:'/pages/tabbar/message/NavMenu/coordinationtask'
			})
		},
		// 跳转监理工单
		skipSupervisionWorkOrder(item) {
			// item=1 全部任务
			// item=2 进行中
			// item=3 已完成
			// item=4 与设计师洽谈中
			uni.navigateTo({
				url: '/pages/tabbar/my/OrderWork/SupervisionWorkOrder?item=' + item
			})
		},
		// 跳转到施工工单
		skipConstructionWorkOrder(){
			uni.navigateTo({
				url:'/pages/UserLive/ConstructionWorkOrder'
			})
		},
		// 跳转到服务订单
		skipServiceOrder(){
			uni.navigateTo({
				url:'/pages/UserLive/ServiceOrder'
			})
		},
		// 跳转商铺订单
		skipAllBusinessOrders(status) {
			// item='' 全部订单
			// item='1' 等待交易订单
			// item='0' 交易完成订单
			uni.navigateTo({
				url: '/pages/tabbar/my/OrderWork/MerchantOrder?status=' + status
			})
		},
		// 跳转商品维修单
		skipBusinessRepairOrder() {
			uni.navigateTo({
				url: '/pages/tabbar/my/OrderWork/BusinessRepairOrder'
			})
		},
		// 跳转到点赞页面
		skipLike(){
			uni.navigateTo({
				url:'/pages/like/index'
			})
		},
		// 跳转到我的房产
		skipMyHouse(){
			uni.navigateTo({
				url:'/pages/my/my-house/house-property'
			})
		},
		// 跳转到关注
		skipFollow(){
			uni.navigateTo({
				url:'/pages/tabbar/my/Index/Follow'
			})
		},
		// 跳转到钱包
		skipWallet(){
			uni.navigateTo({
				url:'/pages/my/wallet/Index'
			})
		},
		// 跳转到个人信息界面
		skipMyInfo() {
			console.log("跳转到个人信息界面");
			uni.navigateTo({
				url: "/pages/my/personalinformation"
			})
		},
		// 跳转到我的认证
		skipMyCertification() {
			uni.navigateTo({
				url: "/pages/tabbar/my/mycertification"
			})
		},
		skipComment(){
			
		},
		skipGood(){
			
		},
		skipHouseProperty(){
			
		},
		// 跳转到实名认证
		skiprenzhen(){
			uni.navigateTo({
				url:'/pages/my/authentication/norealnameauthentication'
			})
		}
	}
};
</script>

<style lang="scss">
	page{
		background-color: #F7F7F7;
	}
</style>
