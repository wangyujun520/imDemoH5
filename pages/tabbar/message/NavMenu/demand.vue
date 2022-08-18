<template>
	<view class="content">
		<!-- 顶部菜单 -->
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<view style="height: 80rpx;width: 750rpx;">
				<view class="flex">
					<view class="bg-white" style="width: 650rpx;">
						<u-tabs :list="list" :active-color="activeColor" :is-scroll="true" :current="current"
							@change="change"></u-tabs>
					</view>
					<view @click="MenuShow" class="flex align-center justify-center"
						style="width: 100rpx;background-color: #FFFFFF;">
						<text class="iconfont text-dark" style="font-size: 40rpx;">&#xe66c;</text>
					</view>
				</view>
			</view>
		</u-sticky>

		<!-- 占位 -->
		<!-- <view class="" style="height: 80rpx;"></view> -->
		<view class="flex flex-column" @click="skipdesignassignment(sitem)" style="margin: 20rpx;"
			v-for="(sitem,sindex) in DataList">
			<view class="bg-white position-relative" style="width: 100%;border-radius: 10rpx 10rpx 0 0;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" :src="sitem.header" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="flex flex-column justify-center" style="width: 570rpx;height: 100%;">
						<view class="">
							<text style="font-size: 30rpx;color: #101010;font-weight: bold;">{{sitem.name}} </text>
						</view>
						<view class="flex align-center justify-between pr-2" style="width: 100%;">
							<view v-if="sitem.money!=null" class="flex align-center">
								<text style="color: #777;font-size: 26rpx;">预算金额：</text>
								<text v-if="sitem.money!=null" style="color: #FF0000;font-weight: bold;"><span
										style="font-size: 26rpx;">￥</span><span
										style="font-size: 30rpx;">{{sitem.money}}</span></text>
							</view>
							<text :class="sitem.status==10?'red':''">{{sitem.status_text}}</text>
						</view>
					</view>
					<!-- <view class="flex justify-end align-center pr-2" style="height: 100%;width: 200rpx;">
						<view class="" v-if="sitem.fee_status==0">
							<text class="text-white"
								style="border-radius: 50%;background-color: #FA4730;font-size: 40rpx;padding: 5rpx 15rpx;">赏</text>
						</view>
					</view> -->
				</view>
				<view class="px-2">
					<text style="color: #02B1BE;font-size: 28rpx;">{{sitem.tags}}
					</text>
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
				<view v-if="sitem.fee_status == 0" class="position-absolute flex align-center justify-center"
					style="right: 0;top: 0;width: 200rpx;height: 60rpx;background-color: #FFE8E4;color: #FA4730;border-radius: 0rpx 8rpx 0rpx 8rpx;">
					<text>悬赏:￥{{sitem.fee}}</text>
				</view>
			</view>
			<view class="flex bg-white"
				style="height: 80rpx;border-top: 1px solid rgba(187,187,187,0.2);border-radius: 0 0 10rpx 10rpx;">
				<view class="flex align-center justify-center"
					style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<!-- <text style="font-size: 24rpx;color: #777;" v-html="vFormateTime(sitem.createTime)"></text> -->
					<text style="font-size: 24rpx;color: #777;">{{sitem.create_time}}</text>

				</view>
				<view class="flex align-center justify-center"
					style="width: 100%;height: 100%;border-right: 1px solid rgba(187,187,187,0.2);">
					<text style="font-size: 24rpx;color: #777;">{{sitem.join_count}}人参与</text>
				</view>
				<view v-if="sitem.end_day>=0" class="flex align-center justify-center"
					style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #777;">{{sitem.end_day}}天到期</text>
				</view>
				<view v-else class="flex align-center justify-center" style="width: 100%;height: 100%;">
					<text style="font-size: 24rpx;color: #DF0101;">已到期</text>
				</view>
			</view>
		</view>
		<u-loadmore v-if="totalCount > 5" bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData" icon-type="flower"></u-loadmore>
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
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
	</view>
</template>

<script>
	import $T from '@/common/free-lib/time.js';
	export default {
		onLoad(options) {
			if(options.module != 'undefined'){
				this.module = options.module
			}
		},
		onShow() {
			this.InitData();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.RefreshData();
		},
		onReachBottom() {
			this.loadStatus = "loading"; //加载中
			this.addRandomData();
		},
		data() {
			return {
				module:'',
				pageNo: 1,//显示第几页的数据
				pageSize: 5,//当前页显示多少条数据
				totalCount: 0, //总共条数
				page: 0 ,//分页数据
				loadStatus: 'loadmore', //总共条数
				//列表数据
				status: '',
				list: [{
						name: '全部',
						value: ''
					}, {
						name: '发布中',
						value: '1'
					},
					{
						name: '未支付',
						value: '10'
					},
					{
						name: '已接单',
						value: '2'
					},
					{
						name: '已完成',
						value: '0'
					},
					{
						name: '已到期',
						value: '3'
					},
					{
						name: '已拒绝',
						value: '-2'
					},
					{
						name: '已取消',
						value: '-3'
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
				DataList: []
			};
		},
		methods: {
			PageInit(){
				this.page = 0;
				this.pageNo = 1;
				this.pageSize = 5;
				this.loadStatus = "loadmore";
			},
			InitData() {
				let requestData = {
					key: "", //关键字
					status: this.list[this.current].value, //状态；1发布 2已接单  0已完成 3已到期,-2=已拒绝，-3=已取消
					page_no: this.pageNo, //页码
					page_size: this.pageSize //每页数量
				}
				// 获取设计需求明细
				this.$post(this.$url.Task.GetOrders, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList = res.data.list;
					this.totalCount = res.data.total_count;
				})
			},
			// 下拉刷新
			RefreshData() {
				this.PageInit();
				uni.stopPullDownRefresh();
				let requestData = {
					key: "", //关键字
					status: this.list[this.current].value, //状态；1发布 2已接单  0已完成 3已到期,-2=已拒绝，-3=已取消
					page_no: this.pageNo, //页码
					page_size: this.pageSize //每页数量
				}
				// 获取设计需求明细
				this.$post(this.$url.Task.GetOrders, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList = res.data.list;
					this.totalCount = res.data.total_count;
				})
			},
			// 上拉加载更多
			addRandomData() {
				this.loadStatus = 'loading'; 
				this.page += 5;
				this.pageNo++;
				if (this.page >= this.totalCount) {
					this.loadStatus = 'nomore';
					return;
				}
				let requestData = {
					key: "", //关键字
					status: this.list[this.current].value, //状态；1发布 2已接单  0已完成 3已到期,-2=已拒绝，-3=已取消
					page_no: this.pageNo,
					page_size: this.pageSize
				};
				// 获取设计需求明细
				this.$post(this.$url.Task.GetOrders, requestData, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.loadStatus = 'loadmore';
					this.DataList = [...this.DataList, ...res.data.list];
					this.totalCount = res.data.total_count;
				})
			},
			// 跳转到设计任务界面
			skipdesignassignment(item) {
				uni.navigateTo({
					url: '/pages/design/design_detail?order_id=' + item.order_id+'&status='+item.status+"&module="+this.module
				})
			},
			// 切换菜单
			SwitchMenu(index) {
				this.current = index;
				this.show = false;
				this.PageInit();
				this.InitData();
			},
			// 菜单改变
			change(index) {
				console.log(index)
				this.current = index;
				this.PageInit();
				this.InitData();
			},
			// 显示弹出框菜单
			MenuShow() {
				this.show = true;
			},
			//swiper滑动菜单改变事件
			changeSwiper(event) {
				this.current = event.detail.current;
				this.PageInit();
				this.InitData();
			},
			vFormateTime(datetime) {
				var timestamps = (new Date(datetime)).getTime();
				return $T.getDateDiffv1(timestamps); //时差结果
			}

		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}
	.red{
		color: red;
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
</style>
