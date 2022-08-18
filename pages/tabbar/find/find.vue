<template>
	<view class="content" style="overflow: hidden;">
		<!-- <u-navbar :is-back="false" :borderBottom="false" title="发现" :background="navbackground">
			<view class="flex justify-between align-center px-3" style="border: 0px solid red;height: 100rpx;width: 750rpx;">
				<view @tap="showSelect = true" class="flex align-center" style="width: 120rpx;height: 60rpx;border: 0px solid red;">
					<text style="font-size: 24rpx;margin-right: 5rpx;">{{ district.label }}</text>
					<u-icon name="arrow-down" size="24"></u-icon>
				</view>
				<text @tap="addFind" class="iconfont" style="color: #101010;font-size: 34rpx;font-weight: bold;">&#xe81b;</text>
			</view>
		</u-navbar> -->
		<u-sticky>
			<view class="flex" style="height: 80rpx;width: 750rpx;">
				<view class="" style="width: 650rpx">
					<u-tabs bgColor="#FFFFFF" :list="tabsList" active-color="#ff9900" :is-scroll="true" :current="current" @change="change"></u-tabs>
				</view>
				<view @tap="MenuShow" class="flex align-center justify-center bg-white" style="width: 100rpx;height: 88rpx;">
					<text class="iconfont" style="font-size: 40rpx;color: #101010;">&#xe6f2;</text>
				</view>
			</view>
		</u-sticky>
		
		<!-- 内容 -->
		<view v-if="DataList.length>0" v-for="(sitem, sindex) in DataList" :key="sindex" class="FindInfo px-2 py-2 bg-white"
			style="border-bottom: 1px solid rgb(187, 187, 187, 0.5)">
			<view class="flex">
				<view class="flex align-center" @click="skipPersonalHomePage(sitem)">
					<image :src="sitem.user.header" style="width: 90rpx; height: 90rpx;border-radius: 15rpx;"></image>
				</view>
				<view class="flex flex-column justify-between pl-2">
					<view class="UserInfo flex justify-between" style="border: 0px solid red;width: 590rpx;">
						<text style="color: #101010; font-size: 32rpx; font-weight: bold">{{ sitem.user.nick }}</text>
						<u-icon v-if="sitem.is_self == 1" @tap="showMoreMenu(sitem)" name="more-dot-fill" color="#999" size="30"></u-icon>
					</view>
					<view class="flex flex-wrap">
						<view v-for="(catalog,index) in sitem.user.biz_catalog" :key="index" class="flex align-center mr-1 mt-1" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
							<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">{{catalog}}</text>
						</view>
						
						<!-- <view class="flex align-center mr-1 mt-1" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
							<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">机构</text>
						</view>
						<view class="flex align-center mr-1 mt-1" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
							<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">开发商</text>
						</view> -->
						
						<!-- <view class="flex align-center mr-1" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
							<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">机构</text>
						</view>
						<view class="flex align-center mr-1" style="background-color: #FFE4D7;padding: 0rpx 15rpx;border-radius: 20rpx;">
							<text class="iconfont" style="font-size: 24rpx;color: #FF9900;">&#xe634;</text>
							<text style="color:#FF9900;font-size: 24rpx;margin-left: 5rpx;">开发商</text>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 顶部结束 -->
			<view v-if="sitem.status==1" class="flex align-center justify-center mt-2" style="height: 50rpx;background-color: #FFE1D3;">
				<text style="color: #FF814A;font-size: 26rpx;">内容审核中</text>
			</view>
			<!-- 内容开始 -->
			<view class="Content-Text mt-1">
				<text>{{sitem.content}}</text>
			</view>
			<!-- 图片显示 -->
			<view v-if="sitem.type == '2'" class="Pic-Box flex flex-wrap mt-1">
				<view class="pl-1 pt-1" v-for="(imgitem, imgindex) in sitem.files" :key="imgindex" style="width: 235rpx; height: 235rpx">
					<!-- <image @click="previewImage(imgitem, sitem.photos)" :src="imgitem" style="width: 100%; height: 100%"></image> -->
					<!-- 处理图片压缩，显示缩略图 -->
					<image @click="previewImage(imgitem, sitem.files)" mode="aspectFill" :src="imgitem.url" style="width: 100%;height: 100%;border-radius: 10rpx;"></image>
					<!-- <image @click="previewImage(imgitem.thumbnail, sitem.files)" :src="imgitem.thumbnail" mode="aspectFill" style="width: 100%; height: 100%"></image> -->
				</view>
			</view>
			<!-- 视频显示 -->
			<view v-if="sitem.type == '3'" @click="openVideo(sitem.files[0].url)" class="position-relative mt-2">
				<!-- <image @load="loadImage" :src="sitem.files[0].url + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
					lazy-load="true" :style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image> -->
				<image :src="sitem.files[0].url + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
					lazy-load="true" mode="aspectFill" style="width: 100%;height: 300rpx;" class="rounded"></image>
				<view class="position-absolute flex align-center justify-center" style="top: 0;right: 0;bottom: 0;left: 0;width: 100%;height: 100%;">
					<text class="iconfont text-white"
						style="font-size: 80rpx; width: 80rpx; height: 80rpx" >&#xe99a;</text>
				</view>
			</view>
			
			<!-- 定位信息开始 -->
			<view class="flex pt-2">
				<i class="iconfont pr-1" style="color: #ff9900; font-weight: bold; font-size: 30rpx">&#xe65e;</i>
				<text style="font-size: 26rpx; color: #666666">{{ sitem.address | address }}</text>
			</view>
			<!-- 定位信息结束 -->
			<!-- 点赞评论开始 -->
			<view class="LikeBox flex px-1 pt-2">
				<view class="flex-1">
					<text style="color: #939393; font-size: 28rpx" v-html="sitem.add_date"></text>
					<!-- 是否是自己；0=是；1=否 -->
					<text @click="Remove(sitem.id)" style="color: #4879d4" class="ml-1 font-sm"
						v-if="sitem.is_self == 0">删除</text>
				</view>
				<view class="flex align-center">
					<!-- <view class="flex align-center mr-2" @tap="report(sitem)" v-if="sitem.is_self == 1">
						<text style="color: #939393;font-size: 26rpx;">举报</text>
						<text style="color: #939393;font-size: 40rpx;" class="iconfont">&#xe762;</text>
					</view> -->
					<view class="flex flex-1 justify-end align-center">
						<!-- 是否喜欢 0=已喜欢；1=未喜欢 -->
						<text :style="{ color: sitem.is_like==0 ? '#ff9900' : '#939393' }" class="iconfont" style="font-size: 36rpx; margin-right: 5rpx" @click="support(sitem,sindex)">
						<!-- <text :style="{ color: sitem.is_like==0 ? '#ff9900' : '#939393' }" class="iconfont" style="font-size: 36rpx; margin-right: 5rpx" @click="sitem=0"> -->
							&#xe641;
						</text>
						<text :style="{ color: sitem.is_like==0 ? '#ff9900' : '#939393' }"
							style="font-size: 26rpx">{{ sitem.like_count }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 上拉加载更多 -->
		<u-loadmore v-if="totalCount>5" bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData" icon-type="flower"></u-loadmore>
		
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
		
		<!-- 占位 -->
		<!-- <view class="bg-white" style="height: 50rpx;"></view> -->
		
		<!-- 弹出框样式 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="show" :mode="mode" length="50%" :mask="mask" :closeable="closeable"
				:close-icon-pos="closeIconPos">
				<!-- 系统栏高度 -->
				<view class="status_bar"></view>
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<block v-for="(item, index) in tabsList" :key="index">
						<text @click="SwitchMenu(index)"
							:style="{ color: index == current ? '#FFFFFF' : '#101010', backgroundColor: index == current ? '#ff9900' : '#FFFFFF' }"
							class="mb-2 py-2 mr-2 label-style">
							{{ item.name }}
						</text>
					</block>
				</view>
			</u-popup>
		</view>
		<!-- 右上角点击 -->
		<u-action-sheet :list="ActionSheetList" @click="SetUpClick" @close="ShowTabBar"
			v-model="showActionSheet"></u-action-sheet>
		
		<u-modal :zoom="false" :show-cancel-button="true" confirm-color="#02BB00" :mask-close-able="true" v-model="showModal" title="举报原因" @confirm="ModalConfirm">
			<view class="flex flex-column px-3">
				<view class="flex justify-between py-3 border-bottom" v-for="(item, index) in ReportList" :key="index" >
					<text style="font-size: 28rpx;">{{item.value}}</text>
					<u-radio-group v-model="ReportValue" icon-size="24" :size="40">
						<u-radio active-color="#FF8F2E" :name="index"></u-radio>
					</u-radio-group>
				</view>
			</view>
		</u-modal>
		
		<u-popup v-model="showMore" mode="bottom" border-radius="20" :closeable="true">
			<view class="" style="height: 50rpx;"></view>
			<u-row gutter="16" justify="center">
				<u-col span="3" @tap="report">
					<view class="flex align-center justify-center" style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center" style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #FF9900;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe8f0;</text>
						</view>
						<text class="font-sm text-muted mt-2">举报</text>
					</view>
				</u-col>
				<u-col span="3">
					<view @tap="ShieldingDynamics" class="flex align-center justify-center" style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center" style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #FF9900;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe6f4;</text>
						</view>
						<text class="font-sm text-muted mt-2">屏蔽此条动态</text>
					</view>
				</u-col>
				<u-col span="3">
					<view @click="PullBlacklist" class="flex align-center justify-center" style="height: 250rpx;flex-direction: column;">
						<view class="flex align-center justify-center" style="width: 100rpx;height: 100rpx;border-radius: 50%;background-color: #FF9900;">
							<text class="iconfont text-white" style="font-size: 60rpx;">&#xe705;</text>
						</view>
						<text class="font-sm text-muted mt-2">屏蔽他的动态</text>
					</view>
				</u-col>
			</u-row>
			
		</u-popup>
		
	</view>
</template>

<script>
// import Gps from '@/common/wa-permission/gps.js';
// const gps = new Gps();
export default {
	onNavigationBarButtonTap: function(e) {
		if (e.float == 'right') {
			this.showActionSheet = true;
		}
	},
	// 上拉触底事件
	onReachBottom() {
		this.loadStatus = 'loading'; //加载中
		this.addRandomData();
	},
	// 监听用户下拉动作
	onPullDownRefresh() {
		this.InitData(); //初始化界面数据
	},
	computed: {
		// 短视频封面图标
		posterIconStyle() {
			let w = this.w / 2 - uni.upx2px(80) / 2;
			let h = this.h / 2 - uni.upx2px(80) / 2;
			return `left:${w}px;top:${h}px;`;
		}
	},
	onLoad() {
		this.InitData(); //初始化界面数据
	},
	data() {
		return {
			IsIos: false,
			lock:false,//不锁
			lock2:false,//不锁
			TempData:{},
			showMore:false,
			findid:'',
			ReportList:[{
				key:'1',
				value:'内容质量差'
			},
			{
				key:'2',
				value:'广告'
			},
			{
				key:'3',
				value:'重复，旧闻'
			},
			{
				key:'4',
				value:'低俗'
			},
			{
				key:'5',
				value:'与事实不符'
			},
			{
				key:'6',
				value:'错别字'
			},
			{
				key:'7',
				value:'格式问题'
			},
			{
				key:'8',
				value:'其他问题，我要吐槽（支持录入框）'
			}],
			ReportValue:0,//当前选中举报原因
			showModal:false,
			pageNo: 1, //当前显示页数
			pageSize: 5, //每页显示条数
			totalCount: 0, //分页总条数
			page: 0, //分页数据
			loadStatus: 'loadmore', //加载前值为loadmore，加载中为loading，没有数据为nomore
			w:0,
			h:0,
			showActionSheet:false,
			ActionSheetList: [{
					text: '发布文字'
				},{
					text: '发布图文'
				},
				{
					text: '发布视频'
				}
			],
			tabsList:[],
			current: 0,//当前选中下标
			show:false,//显示菜单
			mode: 'top', //显示位置
			mask: true, // 是否显示遮罩
			closeable: false, //是否显示关闭按钮
			closeIconPos: 'top-right', //关闭按钮位置
			DataList:[],
			//默认中心点【天府广场】
			latitude: 30.657401, //中心经度
			longitude: 104.065861, //中心纬度
			city_code: '5101', //城市编码
			navbackground:{
				background: '#FFFFFF'
			},
			SelectList: [],
			district:{
				label: "",
				value: ""
			},
			showSelect:false,
		};
	},
	methods: {
		// 屏蔽此条动态
		ShieldingDynamics(){
			// 关闭模态框
			this.showMore = false;
			let RequestData = {
				catalog:'2',
				target_id: this.TempData.id
			}
			console.log(JSON.stringify(RequestData))
			this.$post(this.$url.Discover.AddBlack, RequestData,{
				isLoading:true
			}).then(res => {
				if(res.code == 200){
					uni.showToast({
						title:'屏蔽成功',
						icon:'success'
					})
					// 刷新页面
					this.InitData();
				}
			});
			
		},
		// 屏蔽他的动态
		PullBlacklist(){
			// 关闭模态框
			this.showMore = false;
			let RequestData = {
				catalog:'1',
				target_id: this.TempData.user.vip_id
			}
			console.log(JSON.stringify(RequestData))
			this.$post(this.$url.Discover.AddBlack, RequestData,{
				isLoading:true
			}).then(res => {
				if(res.code == 200){
					uni.showToast({
						title:'屏蔽成功',
						icon:'success'
					})
					// 刷新页面
					this.InitData();
				}
			});
		},
		// 显示更多菜单
		showMoreMenu(sitem){
			this.TempData = sitem;
			this.showMore = true;
		},
		// 举报按钮点击事件
		report(){
			this.showMore = false;
			// this.findid = this.TempData.id;
			// 跳转到举报页面
			uni.navigateTo({
				url: '/pages/tabbar/find/Report?id='+this.TempData.id+'&module=1'
			});
			// this.showModal = true;
		},
		ModalConfirm(){
			console.log();
			// 内容举报
			let RequrestData = {
				id:this.findid,//投诉id
				catalog: this.ReportList[this.ReportValue].key
			};
			this.$post(this.$url.Discover.Report, RequrestData,{
				isLoading:true
			}).then(res => {
				console.log(JSON.stringify(res))
				if(res.code == 200){
					// 点赞成功，取消点赞
					uni.showToast({
						title:'举报成功',
						icon:'success'
					})
				}
			});
			
		},
		// 右上角点击事件
		addFind(){
			this.showActionSheet = true;
		},
		// 初始化数据
		InitData(){
			this.DataList=[];//清空列表
			this.loadStatus = 'loadmore'; //加载前
			this.totalCount = 0;
			this.page = 0;
			this.pageNo = 1;
			this.pageSize = 5;
			this.tabsList=[{
				name:'全部',
				id:''
			}];
			// 获取发现类型
			this.$post(this.$url.Discover.GetCatalogs, {},{
				isLoading:true,
				loadingTitle:'加载中...'
			}).then(res => {
				// console.log(JSON.stringify(res))
				res.data.forEach(item=>{
					let tab = {
						name:item.title,
						id:item.id
					}
					this.tabsList.push(tab);
				})
			});
			// 获取列表数据
			let RequrestData = {
				city_code: this.district.value,
				page_no: this.pageNo,
				page_size: this.pageSize,
				catalog_id: ""//全部
			};
			this.$post(this.$url.Discover.GetContents, RequrestData,{
				isLoading:true,
				loadingTitle:'加载中...'
			}).then(res => {
				uni.stopPullDownRefresh(); //停止当前页面下拉刷新
				this.DataList = res.data.list; //合并数据
				this.totalCount = res.data.total_count; //分页总条数
			});
		},
		// 上拉加载
		addRandomData() {
			this.page += 5;
			this.pageNo++;
			if (this.page >= this.totalCount) {
				this.loadStatus = 'nomore'; //加载完成
				return;
			}
			// 获取列表数据
			let RequrestData = {
				city_code: this.district.value,
				page_no: this.pageNo,
				page_size: this.pageSize,
				catalog_id: ""//全部
			};
			this.$post(this.$url.Discover.GetContents, RequrestData,{
				isLoading:true
			}).then(res => {
				console.log(JSON.stringify(res))
					this.loadStatus = 'loadmore'; //加载前
					this.DataList = [...this.DataList, ...res.data.list]; //合并数据
					this.totalCount = res.data.total_count; //分页总条数
			});
		},
		// 跳转到个人主页
		skipPersonalHomePage(item){
			if(item.is_self != 0){
				uni.navigateTo({
					url:'/pages/tabbar/find/homepage?id='+item.user.vip_id
				})
			}
		},
		// 点赞
		support(item,index) {
			// 点赞发现
			let RequrestData = {
				id: item.id,
				catalog:3
			};
			this.$post(this.$url.User.Like, RequrestData,{
				isLoading:false
			}).then(res => {
				console.log(JSON.stringify(res))
				if(res.code == 200){
					// 点赞成功，取消点赞
					// <!-- 是否喜欢 0=已喜欢；1=未喜欢 -->
					if (item.is_like == 1) {
						this.DataList[index].is_like = 0;
						this.DataList[index].like_count++;
					}else{
						this.DataList[index].is_like = 1;
						this.DataList[index].like_count--;
					}
				}
			});
			
		},
		Remove(id) {
			// var _self = this;
			uni.showModal({
				title: '提示',
				content: '真的要删除吗',
				success: res => {
					if (res.confirm) {
						// console.log("删除成功")
						this.DelFind(id);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		DelFind(id){
			// 删除内容
			let RequrestData = {
				id:id
			};
			console.log(JSON.stringify(RequrestData))
			this.$post(this.$url.Discover.Delete, RequrestData,{
				isLoading:true
			}).then(result => {
				console.log(JSON.stringify(result))
				if(result.code == 200){
					uni.showToast({
						title: '删除成功',
						icon: 'success',
						duration: 2000
					})
					// 删除成功
					this.InitData();
				}
			});
		},
		// 打开视频
		openVideo(url) {
			// 跳转页面
			uni.navigateTo({
				url: '/pages/chat/video/video?url=' + url
			});
		},
		// 加载图片
		loadImage(e) {
			// 拿到图片的宽高
			let w = e.detail.width;
			let h = e.detail.height;
			// 最大宽度 px
			let maxW = uni.upx2px(500);
			// 最大高度 px
			let maxH = uni.upx2px(350);
			if (h <= maxH) {
				// 用原来的宽高
				this.w = w <= maxW ? w : maxW;
				this.h = h;
				return;
			}
			this.h = maxH;
			let w2 = maxH * (w / h);
			this.w = w2 <= maxW ? w2 : maxW;
		},
		change(index) {
			this.current = index;
			
			// this.InitData();
			
			this.DataList=[];//清空列表
			this.loadStatus = 'loadmore'; //加载前
			this.totalCount = 0;
			this.page = 0;
			this.pageNo = 1;
			this.pageSize = 5;
			// 获取列表数据
			let RequrestData = {
				city_code: this.district.value,
				page_no: this.pageNo,
				page_size: this.pageSize,
				catalog_id: this.tabsList[this.current].id
			};
			this.$post(this.$url.Discover.GetContents, RequrestData,{
				isLoading:false
			}).then(res => {
				console.log(JSON.stringify(res))
				this.DataList = res.data.list; //合并数据
				this.totalCount = res.data.total_count; //分页总条数
			});
		},
		// 显示弹出框菜单
		MenuShow() {
			this.show = true;
		},
		// 切换菜单
		SwitchMenu(index) {
			// this.current = index;
			this.show = false;
			this.current = index;
			
			// this.InitData();
			
			this.DataList=[];//清空列表
			this.loadStatus = 'loadmore'; //加载前
			this.totalCount = 0;
			this.page = 0;
			this.pageNo = 1;
			this.pageSize = 5;
			// 获取列表数据
			let RequrestData = {
				city_code: this.district.value,
				page_no: this.pageNo,
				page_size: this.pageSize,
				catalog_id: this.tabsList[this.current].id
			};
			this.$post(this.$url.Discover.GetContents, RequrestData,{
				isLoading:true
			}).then(res => {
				console.log(JSON.stringify(res))
				this.DataList = res.data.list; //合并数据
				this.totalCount = res.data.total_count; //分页总条数
			});
		},
		// 轮播图点击
		clickSwiper(index){
			console.log(`点击了第${index+1}张图片`)
		},
		SetUpClick(index) {
			// uni.showTabBar(); //显示TabBar
			// console.log(`点击了第${index + 1}项，内容为：${this.ActionSheetList[index].text}`)
			
			// 跳转到发布文字界面
			if (index == 0) {
				uni.navigateTo({
					url: '/pages/tabbar/find/ReleaseText'
				});
			}
			
			// 跳转到发布图文界面
			if (index == 1) {
				uni.navigateTo({
					url: '/pages/tabbar/find/ReleaseImageText'
				});
			}
		
			// 跳转到发布视频界面
			if (index == 2) {
				uni.navigateTo({
					url: '/pages/tabbar/find/ReleaseVideo'
				});
			}
		},
		ShowTabBar() {
			uni.showTabBar(); //显示TabBar
		},
		// 预览图片
		previewImage(url, list) {
			// console.log(url)
			console.log(list)
			let Urls = [];
			list.forEach(item=>{
				Urls.push(item.url);
			})
			uni.previewImage({
				current: url.url,
				urls: Urls,
				indicator: 'number'
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.special-list {
	font-size: 30rpx;
	overflow-x: auto;
	padding-bottom: 30rpx;
	.list-box {
		flex-basis: 300rpx;
		flex-shrink: 0;
		white-space: nowrap;
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;
		image {
			width: 300rpx;
			height: 300rpx;
			border: 1px solid rgba(187, 187, 187, 0.2);
		}
		text {
			font-size: 28rpx;
			color: #101010;
			font-weight: bold;
		}
	}
}
// 取消滚动条显示
.special-list::-webkit-scrollbar {
	display: none;
}

.label-style {
	font-size: 28rpx;
	border: 1px solid #f5f5f5;
	border-radius: 10rpx;
	width: 160rpx;
	text-align: center;
}
</style>
<style>
	page{
		background-color: #F7F7F7;
	}
</style>