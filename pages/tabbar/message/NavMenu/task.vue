<template>
	<view class="content">
		<!-- 任务大厅 -->
		<view class="" v-if="current == 0">
			<!-- 占位 -->
			<!-- <view style="height: 40px;"></view> -->
			<view @click="skipdesignassignment1(sitem)" class="flex flex-column" style="margin: 20rpx;" v-for="(sitem,sindex) in MissionHall">
				<view class="bg-white position-relative" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
					<view class="flex align-center" style="height: 140rpx;">
						<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
							<image class="rounded" :src="sitem.header" style="width: 100rpx;height: 100rpx;"></image>
						</view>
						<view class="flex flex-column justify-center" style="width: 480rpx;height: 100%;border: 0px solid red;">
							<view class="">
								<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{sitem.name}}</text>
							</view>
							<view class="flex align-center">
								<text style="color: #777;font-size: 26rpx;">预算金额：</text>
								<text style="color: #FF0000;font-weight: bold;"><span
										style="font-size: 26rpx;">￥</span><span
										style="font-size: 30rpx;">{{sitem.money}}</span></text>
										
								<!-- <view v-if="sitem.fee_status == 0" class="flex align-center justify-center ml-1"
									style="height: 60rpx;background-color: #FFE8E4;color: #FA4730;border-radius: 0rpx 8rpx 0rpx 8rpx;padding: 0 10rpx;">
									<text>悬赏:￥{{sitem.fee}}</text>
								</view> -->
								<view v-if="sitem.fee_status == 0" class="flex align-center justify-center position-absolute"
									style="height: 60rpx;background-color: #FFE8E4;color: #FA4730;border-radius: 0rpx 8rpx 0rpx 8rpx;padding: 0 10rpx;top: 0;right: 0;">
									<text>悬赏:￥{{sitem.fee}}</text>
								</view>
								
							</view>
						</view>
						<!-- <view class="flex justify-end align-center pr-2" style="height: 100%;width: 100rpx;border: 0px solid red;">
							<view class="" v-if="sitem.fee_status==0">
								<text class="text-white"
									style="border-radius: 50%;background-color: #FA4730;font-size: 40rpx;padding: 5rpx 15rpx;">赏</text>
							</view>
						</view> -->
					</view>
					<view class="px-2">
						<text style="color: #02B1BE;font-size: 28rpx;">{{sitem.tags}}</text>
					</view>
					<view class="px-2 my-2">
						<view v-if="sitem.content!=''&&sitem.content!=undefined" class="p-1"
							style="background-color: #f6f6f6;">
							<text style="color: #666;font-size: 26rpx;">{{sitem.content}}</text>
						</view>
						<view v-else class="p-1" style="background-color: #f6f6f6;">
							<text style="color: #666;font-size: 26rpx;">无特殊要求</text>
						</view>
					</view>
				</view>
				<view class="flex bg-white"
					style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);border-radius: 0 0 10rpx 10rpx;">
					<view class="flex align-center justify-center"
						style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
						<text style="font-size: 24rpx;color: #777;">{{sitem.create_time}}</text>
					</view>
					<view class="flex align-center justify-center"
						style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
						<text style="font-size: 24rpx;color: #777;">{{sitem.join_count}}人参与</text>
					</view>
					<view class="flex align-center justify-center" style="width: 100%;height: 100%;">
						<text style="font-size: 24rpx;color: #777;">{{sitem.end_day}}天到期</text>
					</view>
				</view>
			</view>

			<!-- <u-loadmore v-if="hiredatalist.length>5" bg-color="rgb(240, 240, 240)" :status="loadStatus1" @loadmore="addRandomData1"></u-loadmore> -->
			
			<view v-if="MissionHall.length == 0" class="flex justify-center align-center" style="height: 80vh">
				<u-empty text="暂无内容" mode="list"></u-empty>
			</view>
		</view>

		<!-- 我的任务 -->
		<view class="" v-if="current == 1">
			<u-sticky>
				<view class="flex" style="z-index: 999;">
					<view class="bg-white" style="width: 650rpx;">
						<!-- list 标签数组，元素为对象，如[{name: '推荐'}] -->
						<!-- active-color 选中的颜色 -->
						<!-- is-scroll tabs是否可以左右拖动 -->
						<!-- current 初始化显示第几个 -->
						<u-tabs :list="MyTaskTags" :active-color="ActiveColor" :is-scroll="true" :current="MyTaskCurrent"
							@change="MyTaskChange"></u-tabs>
					</view>
					<view @click="MenuShow" class="flex align-center justify-center bg-white" style="width: 100rpx;">
						<text class="iconfont text-dark" style="font-size: 40rpx;">&#xe66c;</text>
					</view>
				</view>
			</u-sticky>
			<!-- 占位 -->
			<view class="flex flex-column" @click="skipdesignassignment2(sitem)" style="margin: 20rpx;"
				v-for="(sitem,sindex) in MyTaskList">
				<view class="bg-white position-relative" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
					<view class="flex align-center py-2" style="border: 0px solid red;">
						<view class=" flex align-center justify-center" style="width: 140rpx;">
							<image class="rounded" :src="sitem.header" style="width: 100rpx;height: 100rpx;"></image>
						</view>
						<view class="flex flex-column justify-center" style="width: 480rpx;">
							<view class="">
								<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{sitem.name}}</text>
							</view>
							<view class="flex align-center">
								<text style="color: #777;font-size: 26rpx;">预算金额：</text>
								<text style="color: #FF0000;font-weight: bold;"><span
										style="font-size: 26rpx;">￥</span><span
										style="font-size: 30rpx;">{{sitem.money}}</span></text>
										
								<!-- <view v-if="sitem.fee_status == 0" class="flex align-center justify-center ml-1"
									style="height: 60rpx;background-color: #FFE8E4;color: #FA4730;border-radius: 0rpx 8rpx 0rpx 8rpx;padding: 0 10rpx;">
									<text>悬赏:￥{{sitem.fee}}</text>
								</view> -->
								<view v-if="sitem.fee_status == 0" class="flex align-center justify-center position-absolute"
									style="height: 60rpx;background-color: #FFE8E4;color: #FA4730;border-radius: 0rpx 8rpx 0rpx 8rpx;padding: 0 10rpx;top: 0;right: 0;">
									<text>悬赏:￥{{sitem.fee}}</text>
								</view>
							</view>
							<view class="flex align-center">
								<text style="color: #777;font-size: 26rpx;">设计费用：</text>
								<text style="color: #FF0000;font-weight: bold;"><span
										style="font-size: 26rpx;">￥</span><span
										style="font-size: 30rpx;">{{sitem.design_money}}</span></text>
							</view>
						</view>
						<!-- <view class="flex justify-end align-center pr-2" style="width: 100rpx;">
							<view class="" v-if="sitem.fee_status==0">
								<text class="text-white"
									style="border-radius: 50%;background-color: #FA4730;font-size: 40rpx;padding: 5rpx 15rpx;">赏</text>
							</view>
						</view> -->
					</view>
					
					<view class="px-2">
						<text style="color: #02B1BE;font-size: 28rpx;">{{sitem.tags}}</text>
					</view>
					<view class="px-2 my-2">
						<view v-if="sitem.content!=''&&sitem.content!=undefined" class="p-1"
							style="background-color: #f6f6f6;">
							<text style="color: #666;font-size: 26rpx;">{{sitem.content}}</text>
						</view>
						<view v-else class="p-1" style="background-color: #f6f6f6;">
							<text style="color: #666;font-size: 26rpx;">无特殊要求</text>
						</view>
					</view>
					<!-- <view v-if="sitem.fee_status == 0" class="position-absolute flex align-center justify-center"
						style="right: 0;top: 0;width: 200rpx;height: 60rpx;background-color: #FFE8E4;color: #FA4730;border-radius: 0rpx 8rpx 0rpx 8rpx;">
						<text>悬赏:￥{{sitem.fee}}</text>
					</view> -->
				</view>
				<view class="flex bg-white"
					style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);border-radius: 0 0 10rpx 10rpx;">
					<view class="flex align-center justify-center"
						style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
						<text style="font-size: 24rpx;color: #777;">{{sitem.create_time}}</text>
					</view>
					<view class="flex align-center justify-center"
						style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
						<text v-if="sitem.status == 0" style="font-size: 24rpx;color: #777;">{{sitem.status_text}}</text>
						<text v-else style="font-size: 24rpx;color: red;">{{sitem.status_text}}</text>
						
					</view>
					<view class="flex align-center justify-center" style="width: 100%;height: 100%;">
						<text style="font-size: 24rpx;color: #777;">{{sitem.end_day}}天到期</text>
					</view>
				</view>
			</view>
			<u-loadmore v-if="taskdatelist.length>0 && current == 1" bg-color="rgb(240, 240, 240)" :status="loadStatus2"
				@loadmore="addRandomData2"></u-loadmore>
			
			<view v-if="current == 1 && MyTaskList.length == 0" class="flex justify-center align-center" style="height: 80vh">
				<u-empty text="暂无内容" mode="list"></u-empty>
			</view>
		</view>

		<!-- 我的任务弹出框样式开始 -->
		<view class="u-demo-area">
			<u-toast ref="uToast"></u-toast>
			<u-popup border-radius="10" v-model="HireShow" :mode="HireMode" length="50%" :mask="HireMask"
				:closeable="HireCloseable" :close-icon-pos="HireCloseIconPos">
				<view class="flex flex-wrap justify-start pl-2 py-2">
					<!-- <block v-for="(item,index) in HireList" :key="index"> -->
					<block v-for="(item,index) in MyTaskTags" :key="index">
						<text @click="SwitchMenu(index)"
							:style="{color:(index==HireCurrent?'#FFFFFF':'#101010'),backgroundColor:(index==HireCurrent?'#FF9900':'#FFFFFF')}"
							class="mb-2 py-2 mr-2 label-style">{{item.name}}</text>
					</block>
				</view>
			</u-popup>
		</view>
		<!-- 我的任务弹出框样式结束 -->

		<!-- tabbar导航栏 -->
		<u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list"
			:mid-button="midButton" :inactive-color="inactiveColor" :activeColor="activeColor"></u-tabbar>
	</view>
</template>

<script>
	import $T from '@/common/free-lib/time.js';
	export default {
		onLoad(options) {
			if(options.module != 'undefined'){
				this.module = options.module;
			}
		},
		onShow() {
			// 任务大厅
			this.GetreceiveData();
			// 我的任务
			this.GetireData();
		},
		// 下拉刷新
		onPullDownRefresh() {
			//任务大厅
			if (this.current == 0) {
				this.GetreceiveData();
			}
			//我的任务
			if (this.current == 1) {
				this.GetireData();
			}
		},
		// 上拉加载
		onReachBottom() {
			//任务大厅
			if (this.current == 0) {
				// this.loadStatus0 = "loading"; //加载中
				// this.addRandomData0();
			}
			//我的任务
			if (this.current == 1) {
				// this.loadStatus1 = "loading"; //加载中
				// this.addRandomData1();
			}
		},
		data() {
			return {
				module:'',
				MissionHall: [], //任务大厅
				MyTaskList: [], //我的任务
				//我的任务顶部菜单
				MyTaskTags: [{
						name: '全部',
						value: ''
					},
					{
						name: '已完成',
						value: '0'
					},
					{
						name: '待确认',
						value: '1'
					},
					{
						name: '进行中',
						value: '2'
					},
					{
						name: '已拒绝',
						value: '-2'
					},
					{
						name: '已取消',
						value: '-1'
					},
				],
				MyTaskCurrent: 0,
				ActiveColor: this.$u.color['warning'],
				MyTaskStatus:'',
				loadStatus0: "loadmore",
				loadStatus1: "loadmore",
				loadStatus2: "loadmore",
				loadStatus3: "loadmore",
				page0: 0, //分页数据
				page1: 0, //分页数据
				page2: 0, //分页数据
				page3: 0, //分页数据
				totalCount0: 0, //总共条数
				totalCount1: 0, //总共条数
				totalCount2: 0, //总共条数
				totalCount3: 0, //总共条数
				triggered: false, //设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
				receivedatalist: [],
				hiredatalist: [],
				taskdatelist: [],
				finishdatelist: [],
				current: 0, //当前菜单索引
				show: true, //是否显示导航栏
				bgColor: '#ffffff', //导航栏背景颜色
				borderTop: true, //是否显示顶部边框
				midButton: false, //是否显示凸起按钮
				inactiveColor: '#909399', //未选中的颜色
				activeColor: '#FF9900', //选中的颜色
				// 菜单开始
				list: [{
						iconPath: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/task/jiedan.png",
						selectedIconPath: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/task/jiedan-on.png",
						text: '任务大厅',
						customIcon: false,
					},
					{
						iconPath: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/task/renwu.png",
						selectedIconPath: "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/task/renwu-on.png",
						text: '我的任务',
						customIcon: false,
					}
				],
				MenuHeight: 0,
				// 菜单结束
				// 雇佣菜单开始
				HireList: [{
					name: '待确认',
					value: 1
				}, {
					name: '待取货',
					value: 2
				}, {
					name: '已完成',
					value: 0
				}, {
					name: '已失效',
					value: -1
				}, {
					name: '已拒绝',
					value: -2
				}],
				HireCurrent: 0,
				HireShow: false,
				HireMode: 'top', //显示位置
				HireMask: true, //是否显示遮罩
				HireCloseable: false, //是否显示关闭按钮
				HireCloseIconPos: 'top-right', //关闭按钮位置
				// 雇佣菜单结束
				// 任务管理开始
				TaskList: [{
					name: '已完成',
					value: 0
				}, {
					name: '已接受',
					value: 1
				}, {
					name: '已取消',
					value: -1
				}, {
					name: '已拒绝',
					value: -2
				}],
				TaskActiveColor: this.$u.color['warning'],
				TaskCurrent: 0,
				TaskShow: false,
				TaskMode: 'top', //显示位置
				TaskMask: true, //是否显示遮罩
				TaskCloseable: false, //是否显示关闭按钮
				TaskCloseIconPos: 'top-right', //关闭按钮位置
				// 任务管理结束
				// 完成任务开始
				CompleteList: [{
					name: '全部'
				}, {
					name: '雇佣'
				}, {
					name: '任务'
				}],
				CompleteActiveColor: this.$u.color['warning'],
				CompleteCurrent: 0,
				CompleteShow: false,
				CompleteMode: 'top', //显示位置
				CompleteMask: true, //是否显示遮罩
				CompleteCloseable: false, //是否显示关闭按钮
				CompleteCloseIconPos: 'top-right', //关闭按钮位置
				// 完成任务结束

			}
		},
		watch: {
			current(newVal, oldVal) {
				if (newVal === 0) {
					uni.setNavigationBarTitle({
						title: '任务大厅'
					})
				} else if (newVal === 1) {
					uni.setNavigationBarTitle({
						title: '我的任务'
					})
				}
			}
		},
		methods: {
			// 任务大厅
			GetreceiveData() {
				uni.stopPullDownRefresh();
				this.page0 = 0;
				let requestData = {
					key: "", //关键字
					page_no: 1, //页码
					page_size: 10 //每一页数量
				}
				this.$post(this.$url.Task.GetTasks, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					if (res.code == 200 && res.status == 0) {
						this.MissionHall = res.data.list;
					}
				})
			},
			// 我的任务
			GetireData() {
				uni.stopPullDownRefresh();
				this.page1 = 0;
				let requestData = {
					key: "", //关键字
					status: this.MyTaskStatus, //0=已完成；1待确认；2=进行中；-2=已拒绝；-1=已取消
					page_no: 1, //页码
					page_size: 10 //每一页数量
				}
				this.$post(this.$url.Task.GetDesignOrders, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					if (res.code == 200 && res.status == 0) {
						this.MyTaskList = res.data.list;
					}
				})
			},
			MyTaskChange(index) {
				this.MyTaskCurrent = index;
				this.MyTaskStatus = this.MyTaskTags[index].value;
				this.GetireData();
			},
			// 切换菜单
			SwitchMenu(index) {
				this.HireCurrent = index;
				this.HireShow = false;
				
				this.MyTaskCurrent = index;
				this.MyTaskStatus = this.MyTaskTags[index].value;
				this.GetireData();
			},
			// 显示弹出框菜单
			MenuShow() {
				this.HireShow = true;
			},
			TaskMenuShow() {
				this.TaskShow = true;
			},
			CompleteMenuShow() {
				this.CompleteShow = true;
			},
			// 雇佣任务菜单改变
			change(index) {
				this.HireCurrent = index;
				this.GetireData(false);
			},
			taskchange(index) {
				this.TaskCurrent = index;
				this.GetaskData(false);
			},
			completechange(index) {
				this.CompleteCurrent = index;
				this.GetCompleteData(false);
			},
			SwitchTaskMenu(index) {
				this.TaskCurrent = index;
				this.TaskShow = false;
			},
			SwitchCompleteMenu(index) {
				this.CompleteCurrent = index;
				this.CompleteShow = false;
			},
			// 任务大厅跳转到设计任务界面
			skipdesignassignment1(item) {
				uni.navigateTo({
					url: '/pages/design/design_detail?order_id=' + item.order_id+'&status='+item.status+'&module='+this.module
				})
			},
			// 我的任务跳转到设计任务界面
			skipdesignassignment2(item) {
				uni.navigateTo({
					url: '/pages/design/design_detail?order_id=' + item.order_id+'&order_design_id='+item.id+'&status='+item.status+'&module='+this.module
				})
			},
			vFormateTime(datetime) {
				var timestamps = (new Date(datetime)).getTime();
				return $T.getDateDiffv1(timestamps); //时差结果
			}
		}

	}
</script>

<style scoped lang="scss">
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
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>